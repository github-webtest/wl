const express = require('express');
const fs = require("fs");
const fsPromises = fs.promises;
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const rateLimit = require('express-rate-limit');
const nodemailer = require("nodemailer");
require('dotenv').config();
const { promisify } = require("util");
const { open } = require('sqlite');

const app = express();
const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET;

const userCooldowns = {};
const userCooldowns_codes = {};
const userCooldowns_codes2 = {};
const COOLDOWN_MS = 750;
const COOLDOWN_MS_email = 180000;

const langCooldown = {
    en: "Please wait {waitTime}s before sending another request.",
    de: "Bitte warten Sie {waitTime}s, bevor Sie eine weitere Anfrage senden.",
    fr: "Veuillez attendre {waitTime}s avant d'envoyer une autre demande.",
    es: "Por favor espera {waitTime}s antes de enviar otra solicitud.",
    pt: "Por favor, aguarde {waitTime}s antes de enviar outra solicitação.",
    tr: "Lütfen başka bir istek göndermeden önce {waitTime}s bekleyin.",
    ru: "Пожалуйста, подождите {waitTime}с перед отправкой следующего запроса.",
    zh: "请等待 {waitTime} 秒再发送另一个请求。"
};

const langCooldown_email = {
    en: "Please wait {waitTime}s before requesting a new verification code.",
    de: "Bitte warten Sie {waitTime}s, bevor Sie einen neuen Verifizierungscode anfordern.",
    fr: "Veuillez attendre {waitTime}s avant de demander un nouveau code de vérification.",
    es: "Por favor espera {waitTime}s antes de solicitar un nuevo código de verificación.",
    pt: "Por favor, aguarde {waitTime}s antes de solicitar um novo código de verificação.",
    tr: "Lütfen yeni doğrulama kodu göndermeden önce {waitTime}s bekleyin.",
    ru: "Пожалуйста, подождите {waitTime}с перед запросом нового кода подтверждения.",
    zh: "请等待 {waitTime} 秒再请求新的验证码。"
};

const verificationCodes = new Map();
const verificationCodes_cemail_1 = new Map();
const verificationCodes_cemail_2 = new Map();
const verificationCodes_cpassword = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,          
    lastModified: false,  
    maxAge: 0             
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use((req, res, next) => {
    if (req.method === 'GET') {
        if (!req.route) {
            return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
        }
    } else {
        next();
    }
});

app.post("/worlds-count", (req, res) => {
  const dirPath = path.join(__dirname, "worlds");

  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(404).json({ message: "Worlds folder not found." });
    }

    const folders = files.filter((file) => file.isDirectory());
    res.json({ count: folders.length });
  });
});

app.post("/worlds/status", (req, res) => {
    const { num_world } = req.body;

    if (num_world === undefined || isNaN(Number(num_world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const filePath = path.join(__dirname, "worlds", String(num_world), "status.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("File read error:", err);
            return res.status(404).json({ message: "World not found or status.json missing." });
        }

        try {
            const jsonData = JSON.parse(data);

            if (!Array.isArray(jsonData) || jsonData.length === 0) {
                return res.status(500).json({ message: "Invalid JSON format or empty array." });
            }

            let { status, pop } = jsonData[0];

            if (pop >= 9800 && status === "open") {
                return res.json({ status: "full" });
            }

            return res.json({ status });
        } catch (parseErr) {
            console.error("JSON parse error:", parseErr);
            return res.status(500).json({ message: "Invalid JSON format." });
        }
    });
});

app.post("/get_map_data", async (req, res) => {
    const { world } = req.body;

    if (!world) {
        return res.status(400).json({ success: false, message: "World is required." });
    }

    try {
        const WORLDS_PATH = path.join(__dirname, "worlds", world);
        const dbPath = path.join(WORLDS_PATH, "users_map.db");
        const statusPath = path.join(WORLDS_PATH, "status.json");

        if (!fs.existsSync(statusPath)) {
            return res.status(404).json({ success: false, message: "status.json not found for this world." });
        }

        let statusDataRaw = JSON.parse(fs.readFileSync(statusPath, "utf-8"));
        const statusData = Array.isArray(statusDataRaw) ? statusDataRaw[0] : statusDataRaw;

        if (!statusData.status || statusData.status.toLowerCase() !== "open") {
            return res.status(403).json({ success: false, message: "World is not open." });
        }

        if (!fs.existsSync(dbPath)) {
            return res.status(404).json({ success: false, message: "users_map.db not found for this world." });
        }

        const db = new sqlite3.Database(dbPath);

        const getMapData = () => {
            return new Promise((resolve, reject) => {
                db.all("SELECT * FROM map", (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
        };

        const mapData = await getMapData();

        db.close();

        return res.json({ success: true, data: mapData });

    } catch (error) {
        console.error("Error reading users_map.db:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});


const emailTemplates = {
  en: {
    subject: "Email Verification Code",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">Verify Your Email</h2>
        <p style="color:#555; font-size:16px;">Use the code below to verify your email address.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">This code will expire in 3 minutes.</p>
      </div>
    `
  },
  de: {
    subject: "E-Mail Bestätigungscode",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">Bestätigen Sie Ihre E-Mail</h2>
        <p style="color:#555; font-size:16px;">Verwenden Sie den folgenden Code, um Ihre E-Mail-Adresse zu bestätigen.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">Dieser Code ist 3 Minuten gültig.</p>
      </div>
    `
  },
  fr: {
    subject: "Code de vérification par e-mail",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">Vérifiez votre e-mail</h2>
        <p style="color:#555; font-size:16px;">Utilisez le code ci-dessous pour vérifier votre adresse e-mail.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">Ce code expirera dans 3 minutes.</p>
      </div>
    `
  },
  es: {
    subject: "Código de verificación de correo electrónico",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">Verifica tu correo electrónico</h2>
        <p style="color:#555; font-size:16px;">Usa el siguiente código para verificar tu dirección de correo electrónico.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">Este código expirará en 3 minutos.</p>
      </div>
    `
  },
  pt: {
    subject: "Código de verificação de e-mail",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">Verifique seu e-mail</h2>
        <p style="color:#555; font-size:16px;">Use o código abaixo para verificar seu endereço de e-mail.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">Este código expira em 3 minutos.</p>
      </div>
    `
  },
  tr: {
    subject: "E-posta Doğrulama Kodu",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">E-postanızı Doğrulayın</h2>
        <p style="color:#555; font-size:16px;">E-posta adresinizi doğrulamak için aşağıdaki kodu kullanın.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">Bu kod 3 dakika içinde geçersiz olacak.</p>
      </div>
    `
  },
  ru: {
    subject: "Код подтверждения электронной почты",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">Подтвердите ваш email</h2>
        <p style="color:#555; font-size:16px;">Используйте приведенный ниже код для подтверждения адреса электронной почты.</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">Этот код истечет через 3 минуты.</p>
      </div>
    `
  },
  zh: {
    subject: "电子邮件验证码",
    body: (code) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; text-align:center; background:#f9f9f9;">
        <h2 style="color:#333;">验证您的邮箱</h2>
        <p style="color:#555; font-size:16px;">使用以下验证码验证您的邮箱地址。</p>
        <div style="margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:24px; font-weight:bold; background:#007BFF; color:#fff; border-radius:6px;">${code}</span>
        </div>
        <p style="color:#777; font-size:14px;">该验证码将在3分钟后失效。</p>
      </div>
    `
  }
};

const emailTemplatesPassword = {
  en: {
    subject: "Your New Password",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Change Password</h2>
        <p style="color:#003366; font-size:16px;">Your new password is:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Please login and change it after signing in.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">If you did not request this, contact support immediately.</p>
      </div>
    `
  },
  de: {
    subject: "Ihr Neues Passwort",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Passwort ändern</h2>
        <p style="color:#003366; font-size:16px;">Ihr neues Passwort lautet:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Bitte melden Sie sich an und ändern Sie es nach dem Login.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Wenn Sie dies nicht angefordert haben, kontaktieren Sie bitte sofort den Support.</p>
      </div>
    `
  },
  fr: {
    subject: "Votre Nouveau Mot de Passe",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Changer le mot de passe</h2>
        <p style="color:#003366; font-size:16px;">Votre nouveau mot de passe est :</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Veuillez vous connecter et le changer après la connexion.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Si vous n'avez pas demandé ceci, contactez immédiatement le support.</p>
      </div>
    `
  },
  es: {
    subject: "Su Nueva Contraseña",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Cambiar contraseña</h2>
        <p style="color:#003366; font-size:16px;">Su nueva contraseña es:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Inicie sesión y cámbiela después de iniciar sesión.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Si no solicitó esto, comuníquese con el soporte de inmediato.</p>
      </div>
    `
  },
  pt: {
    subject: "Sua Nova Senha",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Alterar senha</h2>
        <p style="color:#003366; font-size:16px;">Sua nova senha é:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Faça login e altere-a após entrar.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Se você não solicitou isso, entre em contato com o suporte imediatamente.</p>
      </div>
    `
  },
  tr: {
    subject: "Yeni Şifreniz",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Şifreyi Değiştir</h2>
        <p style="color:#003366; font-size:16px;">Yeni şifreniz:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Lütfen giriş yaptıktan sonra şifrenizi değiştirin.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Bunu siz talep etmediyseniz, hemen destek ile iletişime geçin.</p>
      </div>
    `
  },
  ru: {
    subject: "Ваш Новый Пароль",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Сменить пароль</h2>
        <p style="color:#003366; font-size:16px;">Ваш новый пароль:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">Пожалуйста, войдите и измените его после входа.</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Если вы не запрашивали это, немедленно свяжитесь с поддержкой.</p>
      </div>
    `
  },
  zh: {
    subject: "您的新密码",
    body: (password) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">更改密码</h2>
        <p style="color:#003366; font-size:16px;">您的新密码是：</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${password}</p>
        <p style="color:#003366; font-size:14px;">请登录后更改密码。</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">如果不是您请求的，请立即联系支持。</p>
      </div>
    `
  }
};

const emailTemplatesEmailChange = {
  en: {
    subject: "Your New Email",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Change Email</h2>
        <p style="color:#003366; font-size:16px;">Your new email is:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">If you did not request this, contact support immediately.</p>
      </div>
    `
  },
  de: {
    subject: "Ihre Neue E-Mail",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">E-Mail ändern</h2>
        <p style="color:#003366; font-size:16px;">Ihre neue E-Mail ist:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Wenn Sie dies nicht angefordert haben, kontaktieren Sie bitte sofort den Support.</p>
      </div>
    `
  },
  fr: {
    subject: "Votre Nouvelle E-mail",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Changer l'e-mail</h2>
        <p style="color:#003366; font-size:16px;">Votre nouvelle e-mail est :</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Si vous n'avez pas demandé ceci, contactez immédiatement le support.</p>
      </div>
    `
  },
  es: {
    subject: "Su Nueva E-mail",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Cambiar correo electrónico</h2>
        <p style="color:#003366; font-size:16px;">Su nueva e-mail es:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Si no solicitó esto, comuníquese con el soporte de inmediato.</p>
      </div>
    `
  },
  pt: {
    subject: "Sua Nova E-mail",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Alterar e-mail</h2>
        <p style="color:#003366; font-size:16px;">Sua nova e-mail é:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Se você não solicitou isso, entre em contato com o suporte imediatamente.</p>
      </div>
    `
  },
  tr: {
    subject: "Yeni E-postanız",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">E-postayı Değiştir</h2>
        <p style="color:#003366; font-size:16px;">Yeni e-postanız:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Bunu siz talep etmediyseniz, hemen destek ile iletişime geçin.</p>
      </div>
    `
  },
  ru: {
    subject: "Ваш Новый E-mail",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">Сменить e-mail</h2>
        <p style="color:#003366; font-size:16px;">Ваш новый e-mail:</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">Если вы не запрашивали это, немедленно свяжитесь с поддержкой.</p>
      </div>
    `
  },
  zh: {
    subject: "您的新电子邮件",
    body: (email) => `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f0f8ff; border-radius:8px; border:1px solid #b3d1ff; text-align:center;">
        <h2 style="color:#0059b3;">更改电子邮件</h2>
        <p style="color:#003366; font-size:16px;">您的新电子邮件是：</p>
        <p style="font-size:22px; font-weight:bold; color:#001f4d; background:#cce0ff; padding:10px; border-radius:5px;">${email}</p>
        <hr style="border:none; border-top:1px solid #b3d1ff; margin:20px 0;">
        <p style="font-size:12px; color:#666;">如果不是您请求的，请立即联系支持。</p>
      </div>
    `
  }
};

const Limiter = rateLimit({
    windowMs: 1000, 
    max: 4,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        jsonResponse(
		    res,
            "error",
            "Too many requests. Please slow down."
        );
    }
});

const db = new sqlite3.Database("users.db", (err) => {
    if (err) {
        console.error("Failed to open DB:", err);
    } else {
        console.log("Connected to SQLite DB: users.db");

        db.serialize(() => {
            db.run("PRAGMA journal_mode = WAL;");

            db.run("PRAGMA foreign_keys = ON;");

            db.run("PRAGMA synchronous = NORMAL;");

            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE,
                    password TEXT,
                    token TEXT UNIQUE,
                    verification TEXT
                )
            `, (err) => {
                if (err) {
                    console.error("Failed to create users table:", err);
                } else {
                }
            });

            db.run("CREATE INDEX IF NOT EXISTS idx_users_token ON users(token);");
            db.run("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);");
        });
    }
});

const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

app.post("/register", Limiter, async (req, res) => {
    const { email, password, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";
	
	if (/^[\x20-\x7E]+$/.test(password)) {
	} else {
        return res.json({ status: "error", message: "Password must contain only characters and symbols." });
	}

    if (!email || !password) {
        return res.json({ status: "error", message: "Email and password fields are required." });
    }

    if (!emailRegex.test(email)) {
        return res.json({ status: "error", message: "Please enter a valid email address." });
    }

    if (password.length < 6 || password.length > 12) {
        return res.json({ status: "error", message: "Password must be between 6 and 12 characters." });
    }

    db.get("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email], async (err, row) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (row && row.count > 0) {
            return res.json({ status: "error", message: "This email is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 9);

        db.run(
            "INSERT INTO users (email, password, verification) VALUES (?, ?, 'no')",
            [email, hashedPassword],
            async function(err2) {
                if (err2) {
                    console.error("DB insert error:", err2);
                    return res.json({ status: "error", message: "Server error." });
                }

                const userId = this.lastID;

                const token = jwt.sign({ id: userId, email }, JWT_SECRET);

                db.run("UPDATE users SET token = ? WHERE id = ?", [token, userId], (err3) => {
                    if (err3) {
                        console.error("DB update token error:", err3);
                        return res.json({ status: "error", message: "Server error." });
                    }

                    const verificationCode = Math.floor(100000 + Math.random() * 900000);
                    const expiresAt = Date.now() + 3 * 60 * 1000;
                    verificationCodes.set(email, { code: verificationCode, expiresAt });

                    res.json({
                        status: "success",
                        message: "Registration successful. Please verify your email.",
                        redirect: "accepted_email.html"
                    });

                    try {
                        transporter.sendMail({
                            from: "'World Lords' <no-reply@worldlords.com>",
                            to: email,
                            subject: emailTemplates[language].subject,
                            html: emailTemplates[language].body(verificationCode)
                        });
                    } catch (mailErr) {
                        console.error("Mail send error:", mailErr);
                    }
                });
            }
        );
    });
});

app.post("/login", Limiter, (req, res) => {
    const { email, password, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (email == null || password == null) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT token, verification, password FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (!user) {
            return res.json({ status: "error", message: "Invalid email or password." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ status: "error", message: "Invalid email or password." });
        }

        if (user.verification === "yes") {
            return res.json({
                status: "success",
                message: "Login successful.",
                token: user.token,
                redirect: "enter.html"
            });
        }

        const code = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 3 * 60 * 1000;
        verificationCodes.set(email, { code, expiresAt });

        res.json({
            status: "error",
            message: "Please verify your email.",
            redirect: "accepted_email.html"
        });

        try {
            await transporter.sendMail({
                from: "'World Lords' <no-reply@worldlords.com>",
                to: email,
                subject: emailTemplates[language].subject,
                html: emailTemplates[language].body(code)
            });
        } catch (mailErr) {
            console.error("Mail send error:", mailErr);
        }
    });
});

app.post("/change_email_code_1", Limiter, async (req, res) => {
    const { token, world, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";
    const now = Date.now();

    if (userCooldowns_codes[token] && now < userCooldowns_codes[token]) {
        const waitTime = ((userCooldowns_codes[token] - now) / 1000).toFixed(2);
        const message = (langCooldown_email[lang] || langCooldown_email["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns_codes[token] = now + COOLDOWN_MS_email;

    if (token == null || world == null) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT * FROM users WHERE token = ?", [token], async (err, user) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (!user) {
            return res.json({ status: "error", message: "User not found." });
        }

        if (user.verification === "no") {
            return res.json({ status: "error", message: "Email is not verified." });
        }

        const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
        const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error("World DB error:", err);
            }
        });

        worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
            if (err) {
                console.error("World DB select error:", err);
                worldDB.close();
                return res.json({ status: "error", message: "World DB read error." });
            }

            if (!wUser) {
                worldDB.close();
                return res.json({ status: "error", message: "User not found in world DB." });
            }

            if (wUser.email_change_a === "on" && wUser.password_changed_s == 0) {
                worldDB.close();
                return res.json({ status: "error", message: "Try again in 3 minutes." });
            } else if (wUser.email_changed_s !== 0) {
                worldDB.close();
                return res.json({ status: "error", message: "Email can be changed once a day." });
            }

            worldDB.run(
                "UPDATE users SET email_change_a = 'on', email_change_s = ? WHERE token = ?",
                [now, token],
                (err) => {
                    if (err) {
                        console.error("Failed to update users_world:", err);
                        worldDB.close();
                        return res.json({ status: "error", message: "Failed to update world DB." });
                    }

                    const verificationCode = Math.floor(100000 + Math.random() * 900000);
                    const expiresAt = now + 3 * 60 * 1000;
                    verificationCodes_cemail_1.set(user.email, { code: verificationCode, expiresAt });

                    transporter.sendMail({
                        from: "'World Lords' <no-reply@worldlords.com>",
                        to: user.email,
                        subject: emailTemplates[language].subject,
                        html: emailTemplates[language].body(verificationCode)
                    })
                    .then(() => {
                        worldDB.close();
                        return res.json({
                            status: "success",
                            message: "Verification code sent email."
                        });
                    })
                    .catch((mailErr) => {
                        console.error("Mail send error:", mailErr);
                        worldDB.close();
                        return res.json({ status: "error", message: "Failed to send verification code." });
                    });
                }
            );
        });
    });
});

app.post("/change_password_code", Limiter, async (req, res) => {
    const { token, world, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";
    const now = Date.now();

    if (userCooldowns_codes[token] && now < userCooldowns_codes[token]) {
        const waitTime = ((userCooldowns_codes[token] - now) / 1000).toFixed(2);
        const message = (langCooldown_email[lang] || langCooldown_email["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns_codes[token] = now + COOLDOWN_MS_email;

    if (token == null || world == null) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT * FROM users WHERE token = ?", [token], async (err, user) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (!user) {
            return res.json({ status: "error", message: "User not found." });
        }

        if (user.verification === "no") {
            return res.json({ status: "error", message: "Email is not verified." });
        }

        const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
        const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error("World DB error:", err);
            }
        });

        worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
            if (err) {
                console.error("World DB select error:", err);
                worldDB.close();
                return res.json({ status: "error", message: "World DB read error." });
            }

            if (!wUser) {
                worldDB.close();
                return res.json({ status: "error", message: "User not found in world DB." });
            }

            if (wUser.password_change_a === "on" && wUser.password_changed_s == 0) {
                worldDB.close();
                return res.json({ status: "error", message: "Try again in 3 minutes." });
            } else if (wUser.password_changed_s !== 0) {
                worldDB.close();
                return res.json({ status: "error", message: "Password can be changed once a day." });
            }

            worldDB.run(
                "UPDATE users SET password_change_a = 'on', password_change_s = ? WHERE token = ?",
                [now, token],
                (err) => {
                    if (err) {
                        console.error("Failed to update users_world:", err);
                        worldDB.close();
                        return res.json({ status: "error", message: "Failed to update world DB." });
                    }

                    const verificationCode = Math.floor(100000 + Math.random() * 900000);
                    const expiresAt = now + 3 * 60 * 1000;
                    verificationCodes_cpassword.set(user.email, { code: verificationCode, expiresAt });

                    transporter.sendMail({
                        from: "'World Lords' <no-reply@worldlords.com>",
                        to: user.email,
                        subject: emailTemplates[language].subject,
                        html: emailTemplates[language].body(verificationCode)
                    })
                    .then(() => {
                        worldDB.close();
                        return res.json({
                            status: "success",
                            message: "Verification code sent email."
                        });
                    })
                    .catch((mailErr) => {
                        console.error("Mail send error:", mailErr);
                        worldDB.close();
                        return res.json({ status: "error", message: "Failed to send verification code." });
                    });
                }
            );
        });
    });
});

app.post("/verification_password_1", Limiter, (req, res) => {
    const { token, world, code, lang } = req.body;
    const now = Date.now();
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[language] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (token == null || code == null || world == null) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT * FROM users WHERE token = ?", [token], (err, user) => {
        if (err || !user) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error or user not found." });
        }

        const stored = verificationCodes_cpassword.get(user.email);
        if (!stored || stored.expiresAt < now) {
            return res.json({ status: "error", message: "Verification code expired or not found." });
        }

        if (stored.code.toString() !== code) {
            return res.json({ status: "error", message: "Invalid verification code." });
        }

        verificationCodes_cpassword.delete(user.email);

        const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
        const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (errWorld) => {
            if (errWorld) {
                console.error("World DB open error:", errWorld);
            }

            worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
                if (err) {
                    console.error("World DB select error:", err);
                    worldDB.close();
                    return res.json({ status: "error", message: "World DB read error." });
                }

                if (!wUser) {
                    worldDB.close();
                    return res.json({ status: "error", message: "User not found in world DB." });
                }

                if (wUser.password_change_a === "off" && wUser.password_changed_s == 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Password change deadline has passed, please try again." });
                } else if (wUser.password_changed_s !== 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Password can be changed once a day." });
                }

                worldDB.run(
                    "UPDATE users SET password_change_a = 'on', password_change_s = ? WHERE token = ?",
                    [now, token],
                    (err3) => {
                        if (err3) console.error("World DB update error:", err3);
                        worldDB.close();

                        return res.json({
                            status: "success",
                            message: "Code verified successfully."
                        });
                    }
                );
            });
        });
    });
});

app.post("/verification_password_2", Limiter, async (req, res) => {
    const { token, world, password, lang } = req.body;
    const now = Date.now();
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (!/^[\x20-\x7E]+$/.test(password)) {
        return res.json({ status: "error", message: "Password must contain only characters and symbols." });
    }

    if (password.length < 6 || password.length > 12) {
        return res.json({ status: "error", message: "Password must be between 6 and 12 characters." });
    }

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[language] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (!token || !world || !password) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT email, password FROM users WHERE token = ?", [token], async (err, row) => {
        if (err || !row) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error or user not found." });
        }

        const hashedPassword = await bcrypt.hash(password, 9);
        db.run("UPDATE users SET password = ? WHERE token = ?", [hashedPassword, token], async (err2) => {
            if (err2) console.error("DB update error:", err2);

            const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
            const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (errWorld) => {
                if (errWorld) {
                    console.error("World DB open error:", errWorld);
                }
            });

            worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
                if (err || !wUser) {
                    worldDB.close();
                    return res.json({ status: "error", message: "User not found in world DB." });
                }

                if (wUser.password_change_a === "off" && wUser.password_changed_s == 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Password change deadline has passed, please try again." });
                } else if (wUser.password_changed_s !== 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Password can be changed once a day." });
                }

                worldDB.run(
                    "UPDATE users SET password_change_a = 'off', password_change_s = NULL, password_changed_s = ? WHERE token = ?",
                    [now, token],
                    (err3) => {
                        if (err3) console.error("World DB update error:", err3);
                        worldDB.close();

                        res.json({
                            status: "success",
                            message: "Password changed successfully."
                        });

                        transporter.sendMail({
                            from: "'World Lords' <no-reply@worldlords.com>",
                            to: row.email,
                            subject: emailTemplatesPassword[language].subject,
                            html: emailTemplatesPassword[language].body(password)
                        }).catch(mailErr => console.error("Mail send error:", mailErr));
                    }
                );
            });
        });
    });
});

app.post("/change_email_code_2", Limiter, async (req, res) => {
    const { token, world, email, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";
    const now = Date.now();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.json({ status: "error", message: "Invalid email format." });
    }

    if (userCooldowns_codes2[token] && now < userCooldowns_codes2[token]) {
        const waitTime = ((userCooldowns_codes2[token] - now) / 1000).toFixed(2);
        const message = (langCooldown_email[lang] || langCooldown_email["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns_codes2[token] = now + 30000;

    if (!token || !world) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT * FROM users WHERE token = ?", [token], async (err, user) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (!user) {
            return res.json({ status: "error", message: "User not found." });
        }

        if (user.verification === "no") {
            return res.json({ status: "error", message: "Email is not verified." });
        }

        if (user.email === email) {
            return res.json({ status: "error", message: "New email cannot be the same as your current email." });
        }

        db.get("SELECT token FROM users WHERE email = ?", [email], (errCheck, otherUser) => {
            if (errCheck) {
                console.error("DB error:", errCheck);
                return res.json({ status: "error", message: "Server error." });
            }

            if (otherUser) {
                return res.json({ status: "error", message: "This email is already in use." });
            }

            const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
            const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (err) => {
                if (err) console.error("World DB error:", err);
            });

            worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
                if (err || !wUser) {
                    worldDB.close();
                    return res.json({ status: "error", message: "World DB read error or user not found." });
                }

                if (wUser.email_change_a === "off" && wUser.email_changed_s == 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Email change deadline has passed, please try again." });
                } else if (wUser.email_changed_s !== 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Email can be changed once a day." });
                }

                worldDB.run(
                    "UPDATE users SET email_change_a = 'on', email_change_s = ? WHERE token = ?",
                    [now, token],
                    (err) => {
                        if (err) {
                            console.error("Failed to update users_world:", err);
                            worldDB.close();
                            return res.json({ status: "error", message: "Failed to update world DB." });
                        }

                        const verificationCode = Math.floor(100000 + Math.random() * 900000);
                        const expiresAt = now + 3 * 60 * 1000;
                        verificationCodes_cemail_2.set(email, { code: verificationCode, expiresAt });

                        transporter.sendMail({
                            from: "'World Lords' <no-reply@worldlords.com>",
                            to: email,
                            subject: emailTemplates[language].subject,
                            html: emailTemplates[language].body(verificationCode)
                        })
                        .then(() => {
                            worldDB.close();
                            return res.json({
                                status: "success",
                                message: "Verification code sent to new email."
                            });
                        })
                        .catch((mailErr) => {
                            console.error("Mail send error:", mailErr);
                            worldDB.close();
                            return res.json({ status: "error", message: "Failed to send verification code." });
                        });
                    }
                );
            });
        });
    });
});

app.post("/verification_email_1", Limiter, (req, res) => {
    const { token, world, code, lang } = req.body;
    const now = Date.now();
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[language] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (!token || !code || !world) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    db.get("SELECT * FROM users WHERE token = ?", [token], (err, user) => {
        if (err || !user) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error or user not found." });
        }

        const stored = verificationCodes_cemail_1.get(user.email);
        if (!stored || stored.expiresAt < now) {
            return res.json({ status: "error", message: "Verification code expired or not found." });
        }

        if (stored.code.toString() !== code) {
            return res.json({ status: "error", message: "Invalid verification code." });
        }

        verificationCodes_cemail_1.delete(user.email);

        const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
        const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (errWorld) => {
            if (errWorld) {
                console.error("World DB open error:", errWorld);
            }

            worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
                if (err) {
                    console.error("World DB select error:", err);
                    worldDB.close();
                    return res.json({ status: "error", message: "World DB read error." });
                }

                if (!wUser) {
                    worldDB.close();
                    return res.json({ status: "error", message: "User not found in world DB." });
                }

                if (wUser.email_change_a === "off" && wUser.email_changed_s == 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Email change deadline has passed, please try again." });
                } else if (wUser.email_changed_s !== 0) {
                    worldDB.close();
                    return res.json({ status: "error", message: "Email can be changed once a day." });
                }

                worldDB.run(
                    "UPDATE users SET email_change_a = 'on', email_change_s = ? WHERE token = ?",
                    [now, token],
                    (err3) => {
                        if (err3) console.error("World DB update error:", err3);
                        worldDB.close();

                        return res.json({
                            status: "success",
                            message: "Code verified successfully."
                        });
                    }
                );
            });
        });
    });
});

app.post("/verification_email_2", Limiter, (req, res) => {
    const { token, world, code, email, lang } = req.body;
    const now = Date.now();
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[language] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (!token || !world || !email || !code) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    const stored = verificationCodes_cemail_2.get(email);
    if (!stored || stored.expiresAt < now) {
        return res.json({ status: "error", message: "Verification code expired or not found." });
    }

    if (stored.code.toString() !== code) {
        return res.json({ status: "error", message: "Invalid verification code." });
    }

    verificationCodes_cemail_2.delete(email);

    db.get("SELECT email FROM users WHERE token = ?", [token], (err, row) => {
        if (err || !row) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error or user not found." });
        }

        if (email === row.email) {
            return res.json({ status: "error", message: "Please try a different email." });
        }

        db.get("SELECT token FROM users WHERE email = ?", [email], (errCheck, otherUser) => {
            if (errCheck) {
                console.error("DB error:", errCheck);
                return res.json({ status: "error", message: "Server error." });
            }

            if (otherUser) {
                return res.json({ status: "error", message: "This email is already in use." });
            }

            const oldEmail = row.email;

            db.run(
                "UPDATE users SET email = ? WHERE token = ?",
                [email, token],
                (err2) => {
                    if (err2) console.error("DB update error:", err2);

                    const worldDBPath = path.join(__dirname, "worlds", world, "users_world.db");
                    const worldDB = new sqlite3.Database(worldDBPath, sqlite3.OPEN_READWRITE, (errWorld) => {
                        if (errWorld) console.error("World DB open error:", errWorld);
                    });

                    worldDB.get("SELECT * FROM users WHERE token = ?", [token], (err, wUser) => {
                        if (err || !wUser) {
                            worldDB.close();
                            return res.json({ status: "error", message: "World DB read error or user not found." });
                        }

                        if (wUser.email_change_a === "off" && wUser.email_changed_s == 0) {
                            worldDB.close();
                            return res.json({ status: "error", message: "Email change deadline has passed, please try again." });
                        } else if (wUser.email_changed_s !== 0) {
                            worldDB.close();
                            return res.json({ status: "error", message: "Email can be changed once a day." });
                        }

                        worldDB.run(
                            "UPDATE users SET email_change_a = 'off', email_change_s = NULL, email_changed_s = ? WHERE token = ?",
                            [now, token],
                            (err3) => {
                                if (err3) console.error("World DB update error:", err3);
                                worldDB.close();

                                res.json({
                                    status: "success",
                                    message: "Email changed successfully."
                                });

                                transporter.sendMail({
                                    from: "'World Lords' <no-reply@worldlords.com>",
                                    to: oldEmail,
                                    subject: emailTemplatesEmailChange[language].subject,
                                    html: emailTemplatesEmailChange[language].body(email)
                                }).catch(mailErr => console.error("Mail send error:", mailErr));
                            }
                        );
                    });
                }
            );
        });
    });
});

app.post("/verification", Limiter, (req, res) => {
    const { email, code } = req.body;

    if (email == null || code == null) {
        return res.json({ status: "error", message: "Missing parameters!" });
    }

    const stored = verificationCodes.get(email);
    if (!stored) {
        return res.json({ status: "error", message: "Verification code expired or not found." });
    }

    if (stored.code.toString() !== code) {
        return res.json({ status: "error", message: "Invalid verification code." });
    }

    verificationCodes.delete(email);

    db.get("SELECT token FROM users WHERE email = ?", [email], (err, row) => {
        if (err || !row) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error or user not found." });
        }

        db.run(
            "UPDATE users SET verification = 'yes' WHERE email = ?",
            [email],
            (err2) => {
                if (err2) {
                    console.error("DB update error:", err2);
                }

                return res.json({
                    status: "success",
                    message: "Email verified successfully.",
                    token: row.token,
                    redirect: "enter.html"
                });
            }
        );
    });
});

app.post("/verification2", Limiter, async (req, res) => {
    const { email, code, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (!email || !code) {
        return res.json({ status: "error", message: "Email and code are required." });
    }

    const stored = verificationCodes.get(email);
    if (!stored) {
        return res.json({ status: "error", message: "Verification code expired or not found." });
    }

    if (stored.code.toString() !== code) {
        return res.json({ status: "error", message: "Invalid verification code." });
    }

    verificationCodes.delete(email);

    db.get("SELECT token FROM users WHERE email = ?", [email], async (err, row) => {
        if (err || !row) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error or user not found." });
        }

        const token = row.token;

        const generatePassword = (length = 8) => {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };

        const newPasswordPlain = generatePassword(8);
        const hashedPassword = await bcrypt.hash(newPasswordPlain, 9);

        db.run(
            "UPDATE users SET password = ?, verification = 'yes' WHERE email = ?",
            [hashedPassword, email],
            async (err2) => {
                if (err2) {
                    console.error("DB update error:", err2);
                    return res.json({ status: "error", message: "Failed to update password." });
                }

                res.json({
                    status: "success",
                    message: "Email verified successfully. New password sent via email.",
                    redirect: "login.html",
                    token: token
                });

                try {
                    await transporter.sendMail({
                        from: "'World Lords' <no-reply@worldlords.com>",
                        to: email,
                        subject: emailTemplatesPassword[language].subject,
                        html: emailTemplatesPassword[language].body(newPasswordPlain)
                    });
                } catch (mailErr) {
                    console.error("Mail send error:", mailErr);
                }
            }
        );
    });
});

app.post("/resend-code", Limiter, async (req, res) => {
    const { email, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (!email) {
        return res.json({ status: "error", message: "Email is required." });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (!user) {
            return res.json({ status: "error", message: "User not found." });
        }

        if (user.verification === "yes") {
            return res.json({ status: "error", message: "Email is already verified." });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 3 * 60 * 1000;
        verificationCodes.set(email, { code: verificationCode, expiresAt });

        try {
            await transporter.sendMail({
                from: "'World Lords' <no-reply@worldlords.com>",
                to: email,
                subject: emailTemplates[language].subject,
                html: emailTemplates[language].body(verificationCode)
            });

            console.log(`Verification code resent to ${email}`);
            return res.json({
                status: "success",
                message: "Verification code resent. Please check your email."
            });
        } catch (mailErr) {
            console.error("Mail send error:", mailErr);
            return res.json({ status: "error", message: "Failed to send verification code." });
        }
    });
});

app.post("/recover_code", Limiter, async (req, res) => {
    const { email, lang } = req.body;
    const language = ["en","de","fr","es","pt","tr","ru","zh"].includes(lang) ? lang : "en";

    if (!email) {
        return res.json({ status: "error", message: "Email is required." });
    }
    if (!emailRegex.test(email)) {
        return res.json({ status: "error", message: "Please enter a valid email address." });
    }

    db.get("SELECT id FROM users WHERE email = ?", [email], async (err, row) => {
        if (err) {
            console.error("DB error:", err);
            return res.json({ status: "error", message: "Server error." });
        }

        if (!row) {
            return res.json({ status: "error", message: "This email is not registered." });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 3 * 60 * 1000;

        verificationCodes.set(email, { code: verificationCode, expiresAt });

        res.json({
            status: "success",
            message: "Verification code sent successfully.",
            redirect: "accepted_email2.html"
        });

        try {
            await transporter.sendMail({
                from: "'World Lords' <no-reply@worldlords.com>",
                to: email,
                subject: emailTemplates[language].subject,
                html: emailTemplates[language].body(verificationCode)
            });
        } catch (mailErr) {
            console.error("Mail send error:", mailErr);
        }
    });
});

app.post("/join-world", async (req, res) => {
    const { world, token } = req.body;
    if (!world || !token) return res.status(400).json({ message: "World and token are required." });

    const WORLDS_PATH = path.join(__dirname, "worlds");
    const JSONS_PATH = path.join(__dirname, "map_locations");
    const mapFile = path.join(JSONS_PATH, "map_player_xy.json");
    const chunksFile = path.join(JSONS_PATH, "chunks.json");
    const statusFile = path.join(WORLDS_PATH, world, "status.json");
    const dbFile = path.join(WORLDS_PATH, world, "users_world.db");
    const mainUsersDb = path.join(__dirname, "users.db");
    const mapDbfile = path.join(WORLDS_PATH, world, "users_map.db");

    if (!fs.existsSync(statusFile)) return res.status(404).json({ message: "World not found." });

    try {
        const mainDb = await open({ filename: mainUsersDb, driver: sqlite3.Database });
        const mainUser = await mainDb.get("SELECT token FROM users WHERE token = ?", [token]);
        await mainDb.close();
        if (!mainUser) return res.status(400).json({ message: "Registration error." });

        const worldStatus = JSON.parse(fs.readFileSync(statusFile, "utf-8"))[0];
        if (worldStatus.pop >= 9800) return res.json({ message: "This World is full" });
        if (worldStatus.status !== "open") return res.json({ message: "World is not open" });

        const p_xy_data = JSON.parse(fs.readFileSync(mapFile, "utf-8"));
        const g_xy_data = JSON.parse(fs.readFileSync(chunksFile, "utf-8"));
        const count = worldStatus.count;
        const chunk = worldStatus.chunk;
        const p_x = g_xy_data[chunk].x + p_xy_data[count].x;
        const p_y = g_xy_data[chunk].y + p_xy_data[count].y;
        const player_id = p_x + ((p_y - 1) * 500);
        const colony_id = (p_x - 2) + (((p_y + 2) - 1) * 500);
        const lord_name = 'WL_' + player_id;

        const Mapdb = await open({ filename: mapDbfile, driver: sqlite3.Database });
        await Mapdb.exec("PRAGMA journal_mode = WAL;");
        await Mapdb.exec("PRAGMA foreign_keys = ON;");
        await Mapdb.exec("PRAGMA synchronous = NORMAL;");
        await Mapdb.exec(`
            CREATE TABLE IF NOT EXISTS map (
                x INTEGER,
                y INTEGER,
                player_id INTEGER,
				lord_name TEXT,
                build TEXT
            )
        `);
        await Mapdb.exec("CREATE INDEX IF NOT EXISTS idx_users_player_id ON map(player_id);");
		
		const mapCount = await Mapdb.get("SELECT COUNT(*) as cnt FROM map");
		if (mapCount.cnt === 0) {
			const defaultCities = [
			{ mx: 50, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Thrynd" },
			{ mx: 50, my: 110, mbuild: "city", mplayer_id: 1, mlord_name: "Dorynthia" },
			{ mx: 50, my: 250, mbuild: "city", mplayer_id: 1, mlord_name: "Myralith" },
			{ mx: 50, my: 390, mbuild: "city", mplayer_id: 1, mlord_name: "Drakemire" },
			{ mx: 50, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Xandor" },
			{ mx: 110, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Syldor" },
			{ mx: 110, my: 110, mbuild: "city", mplayer_id: 1, mlord_name: "Malverion" },
			{ mx: 110, my: 190, mbuild: "city", mplayer_id: 1, mlord_name: "Nyrathis" },
			{ mx: 110, my: 310, mbuild: "city", mplayer_id: 1, mlord_name: "Kelvashan" },
			{ mx: 110, my: 390, mbuild: "city", mplayer_id: 1, mlord_name: "Schwa" },
			{ mx: 110, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Veythar" },
			{ mx: 150, my: 250, mbuild: "royale", mplayer_id: 1, mlord_name: "Hrynn" },
			{ mx: 170, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Aquenor" },
			{ mx: 170, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Quenloria" },
			{ mx: 190, my: 130, mbuild: "city", mplayer_id: 1, mlord_name: "Dorvashan" },
			{ mx: 190, my: 370, mbuild: "city", mplayer_id: 1, mlord_name: "Rainthar" },
			{ mx: 250, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Durneth" },
			{ mx: 250, my: 150, mbuild: "royale", mplayer_id: 1, mlord_name: "Tyraketh" },
			{ mx: 250, my: 250, mbuild: "royale", mplayer_id: 1, mlord_name: "Eldrathia" },
			{ mx: 250, my: 350, mbuild: "royale", mplayer_id: 1, mlord_name: "Thundralis" },
			{ mx: 250, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Sunmarsh" },
			{ mx: 310, my: 130, mbuild: "city", mplayer_id: 1, mlord_name: "Mistglen" },
			{ mx: 310, my: 370, mbuild: "city", mplayer_id: 1, mlord_name: "Zorynthal" },
			{ mx: 330, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Olvryn" },
			{ mx: 330, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Thryssalor" },
			{ mx: 350, my: 250, mbuild: "royale", mplayer_id: 1, mlord_name: "Arvoketh" },
			{ mx: 390, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Drelmora" },
			{ mx: 390, my: 110, mbuild: "city", mplayer_id: 1, mlord_name: "Phyrrathen" },
			{ mx: 390, my: 190, mbuild: "city", mplayer_id: 1, mlord_name: "Solvaris" },
			{ mx: 390, my: 310, mbuild: "city", mplayer_id: 1, mlord_name: "Kranthoril" },
			{ mx: 390, my: 390, mbuild: "city", mplayer_id: 1, mlord_name: "Trosmire" },
			{ mx: 390, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Altharwyn" },
			{ mx: 450, my: 50, mbuild: "city", mplayer_id: 1, mlord_name: "Fenrydal" },
			{ mx: 450, my: 110, mbuild: "city", mplayer_id: 1, mlord_name: "Miryathor" },
			{ mx: 450, my: 250, mbuild: "city", mplayer_id: 1, mlord_name: "Zevralith" },
			{ mx: 450, my: 390, mbuild: "city", mplayer_id: 1, mlord_name: "Ormaveth" },
			{ mx: 450, my: 450, mbuild: "city", mplayer_id: 1, mlord_name: "Cylthawa" }
			];
		for (const city of defaultCities) {
			await Mapdb.run(
            `INSERT INTO map (x, y, player_id, lord_name, build) VALUES (?, ?, ?, ?, ?)`,
            [city.mx, city.my, city.mplayer_id, city.mlord_name, city.mbuild]
			);
		}
		console.log("Default cities inserted into map.");
		}
		

        const existingMap = await Mapdb.get("SELECT * FROM map WHERE player_id = ?", [player_id]);
        if (!existingMap) {
            await Mapdb.run(
                `INSERT INTO map (x, y, player_id, lord_name, build) VALUES (?, ?, ?, ?, 'castle')`,
                [p_x, p_y, player_id, lord_name]
            );
        }
        await Mapdb.close();

        const db = await open({ filename: dbFile, driver: sqlite3.Database });
        await db.exec("PRAGMA journal_mode = WAL;");
        await db.exec("PRAGMA foreign_keys = ON;");
        await db.exec("PRAGMA synchronous = NORMAL;");

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                       token TEXT PRIMARY KEY,
                       lord_name TEXT,
					   lord_name_changed TEXT,
                       player_id INTEGER,
                       colony_id INTEGER,
					   banned TEXT,
                       food REAL,
                       wood REAL,
                       gold REAL,
                       diamond INTEGER,
                       age_points INTEGER,
                       quest INTEGER,
                       bonus TEXT,
                       bonus_time INTEGER,
					   bonus_results TEXT,
                       food_percent REAL,
                       wood_percent REAL,
                       gold_c INTEGER,
                       gold_a INTEGER,
                       gold_city INTEGER,
                       gold_percent REAL,
                       farmer INTEGER,
                       farmer_lvl INTEGER,
                       farmer_up TEXT,
                       farmer_up_time INTEGER,
                       farmer_p TEXT,
                       farmer_p_a INTEGER,
                       farmer_p_time INTEGER,
					   farmer_p_start INTEGER,
					   farmer_boost INTEGER,
					   farmer_boost_time INTEGER,
                       woodcutter INTEGER,
                       woodcutter_lvl INTEGER,
                       woodcutter_up TEXT,
                       woodcutter_up_time INTEGER,
					   woodcutter_p TEXT,
                       woodcutter_p_a INTEGER,
                       woodcutter_p_time INTEGER,
					   woodcutter_p_start INTEGER,
					   woodcutter_boost INTEGER,
					   woodcutter_boost_time INTEGER,
                       gold_miner INTEGER,
                       gold_miner_lvl INTEGER,
                       gold_miner_up TEXT,
                       gold_miner_up_time INTEGER,
					   gold_miner_p TEXT,
					   gold_miner_p_a INTEGER,
                       gold_miner_p_time INTEGER,
					   gold_miner_p_start INTEGER,
					   gold_miner_boost INTEGER,
					   gold_miner_boost_time INTEGER,
                       c_troops INTEGER,
                       city_troops INTEGER,
                       s_troops INTEGER,
                       c_spy INTEGER,
                       city_spy INTEGER,
                       spearman INTEGER,
                       spearman_lvl INTEGER,
                       spearman_up TEXT,
                       spearman_up_time INTEGER,
                       spearman_p TEXT,
                       spearman_p_a INTEGER,
                       spearman_p_time INTEGER,
					   spearman_p_start INTEGER,
                       archer INTEGER,
                       archer_lvl INTEGER,
                       archer_up TEXT,
                       archer_up_time INTEGER,
                       archer_p TEXT,
                       archer_p_a INTEGER,
                       archer_p_time INTEGER,
					   archer_p_start INTEGER,
                       spy INTEGER,
                       spy_lvl INTEGER,
                       spy_up TEXT,
                       spy_up_time INTEGER,
                       spy_p TEXT,
                       spy_p_a INTEGER,
                       spy_p_time INTEGER,
					   spy_p_start INTEGER,
                       cataphract INTEGER,
                       cataphract_lvl INTEGER,
                       cataphract_up TEXT,
                       cataphract_up_time INTEGER,
                       cataphract_p TEXT,
                       cataphract_p_a INTEGER,
                       cataphract_p_time INTEGER,
					   cataphract_p_start INTEGER,
                       swordsman INTEGER,
                       swordsman_lvl INTEGER,
                       swordsman_up TEXT,
                       swordsman_up_time INTEGER,
                       swordsman_p TEXT,
                       swordsman_p_a INTEGER,
                       swordsman_p_time INTEGER,
					   swordsman_p_start INTEGER,
                       crossbowman INTEGER,
                       crossbowman_lvl INTEGER,
                       crossbowman_up TEXT,
                       crossbowman_up_time INTEGER,
                       crossbowman_p TEXT,
                       crossbowman_p_a INTEGER,
                       crossbowman_p_time INTEGER,
					   crossbowman_p_start INTEGER,
                       arquebusiers INTEGER,
                       arquebusiers_lvl INTEGER,
                       arquebusiers_up TEXT,
                       arquebusiers_up_time INTEGER,
                       arquebusiers_p TEXT,
                       arquebusiers_p_a INTEGER,
                       arquebusiers_p_time INTEGER,
					   arquebusiers_p_start INTEGER,
                       castle_lvl INTEGER,
                       castle_up TEXT,
                       castle_up_time INTEGER,
                       knight INTEGER,
                       knight_lvl INTEGER,
                       knight_up TEXT,
                       knight_up_time INTEGER,
                       knight_p TEXT,
                       knight_p_a INTEGER,
                       knight_p_time INTEGER,
					   knight_p_start INTEGER,
                       imperial_spearman INTEGER,
                       imperial_spearman_lvl INTEGER,
                       imperial_spearman_up TEXT,
                       imperial_spearman_up_time INTEGER,
                       imperial_spearman_p TEXT,
                       imperial_spearman_p_a INTEGER,
                       imperial_spearman_p_time INTEGER,
					   imperial_spearman_p_start INTEGER,
                       ballista INTEGER,
                       ballista_lvl INTEGER,
                       ballista_up TEXT,
                       ballista_up_time INTEGER,
                       ballista_p TEXT,
                       ballista_p_a INTEGER,
                       ballista_p_time INTEGER,
					   ballista_p_start INTEGER,
                       onager INTEGER,
                       onager_lvl INTEGER,
                       onager_up TEXT,
                       onager_up_time INTEGER,
                       onager_p TEXT,
                       onager_p_a INTEGER,
                       onager_p_time INTEGER,
					   onager_p_start INTEGER,
                       cannon INTEGER,
                       cannon_lvl INTEGER,
                       cannon_up TEXT,
                       cannon_up_time INTEGER,
                       cannon_p TEXT,
                       cannon_p_a INTEGER,
                       cannon_p_time INTEGER,
					   cannon_p_start INTEGER,
                       trade_cart INTEGER,
                       trade_cart_lvl INTEGER,
                       trade_cart_up TEXT,
                       trade_cart_up_time INTEGER,
                       trade_cart_p TEXT,
                       trade_cart_p_a INTEGER,
                       trade_cart_p_time INTEGER,
					   trade_cart_p_start INTEGER,
                       farming_lvl INTEGER,
                       farming_up TEXT,
                       farming_up_time INTEGER,
                       lumbering_lvl INTEGER,
                       lumbering_up TEXT,
                       lumbering_up_time INTEGER,
                       mining_lvl INTEGER,
                       mining_up TEXT,
                       mining_up_time INTEGER,
                       blacksmithing_lvl INTEGER,
                       blacksmithing_up TEXT,
                       blacksmithing_up_time INTEGER,
                       riding_lvl INTEGER,
                       riding_up TEXT,
                       riding_up_time INTEGER,
                       geometry_lvl INTEGER,
                       geometry_up TEXT,
                       geometry_up_time INTEGER,
                       cartography_lvl INTEGER,
                       cartography_up TEXT,
                       cartography_up_time INTEGER,
                       spying_lvl INTEGER,
                       spying_up TEXT,
                       spying_up_time INTEGER,
                       masonry_lvl INTEGER,
                       masonry_up TEXT,
                       masonry_up_time INTEGER,
                       wall_lvl INTEGER,
                       wall_up TEXT,
                       wall_up_time INTEGER,
                       watchtower INTEGER,
                       watchtower_lvl INTEGER,
                       watchtower_up TEXT,
                       watchtower_up_time INTEGER,
                       watchtower_p TEXT,
                       watchtower_p_a INTEGER,
                       watchtower_p_time INTEGER,
					   watchtower_p_start INTEGER,
                       castle_processing TEXT,
                       castle_processing_time INTEGER,
					   castle_processing_time_st INTEGER,
                       barracks_processing TEXT,
                       barracks_processing_time INTEGER,
					   barracks_processing_time_st INTEGER,
                       academy_processing TEXT,
                       academy_processing_time INTEGER,
					   academy_processing_time_st INTEGER,
                       workshop_processing TEXT,
                       workshop_processing_time INTEGER,
					   workshop_processing_time_st INTEGER,
                       market_processing TEXT,
                       market_processing_time INTEGER,
					   market_processing_time_st INTEGER,
                       wall_processing TEXT,
                       wall_processing_time INTEGER,
					   wall_processing_time_st INTEGER,
                       village_processing TEXT,
                       village_processing_time INTEGER,
					   village_processing_time_st INTEGER,
					   _deathBuffer REAL,
					   notifications TEXT,
					   email_change_a TEXT,
					   email_change_s INTEGER,
					   email_changed_s INTEGER,
					   password_change_a TEXT,
					   password_change_s INTEGER,
					   password_changed_s INTEGER,
					   messages_status INTEGER,
					   processes_status INTEGER,
					   logs_status INTEGER,
					   alliance_status INTEGER
                       )
                `);

            const existingUser = await db.get("SELECT * FROM users WHERE token = ?", [token]);
            if (!existingUser) {
                await db.run(
                        `INSERT INTO users (
                         token, lord_name, lord_name_changed, player_id, colony_id, banned,
                         food, wood, gold, diamond, age_points,
                         quest, bonus, bonus_time, bonus_results,
                         food_percent,
                         wood_percent,
                         gold_c, gold_a, gold_city, gold_percent,
                         farmer, farmer_lvl, farmer_up, farmer_up_time, farmer_p, farmer_p_a, farmer_p_time, farmer_p_start, farmer_boost, farmer_boost_time,
                         woodcutter, woodcutter_lvl, woodcutter_up, woodcutter_up_time, woodcutter_p, woodcutter_p_a, woodcutter_p_time, woodcutter_p_start, woodcutter_boost, woodcutter_boost_time,
                         gold_miner, gold_miner_lvl, gold_miner_up, gold_miner_up_time, gold_miner_p, gold_miner_p_a, gold_miner_p_time, gold_miner_p_start, gold_miner_boost, gold_miner_boost_time,
                         c_troops, city_troops, s_troops,
                         c_spy, city_spy,
                         spearman, spearman_lvl, spearman_up, spearman_up_time, spearman_p, spearman_p_a, spearman_p_time, spearman_p_start,
                         archer, archer_lvl, archer_up, archer_up_time, archer_p, archer_p_a, archer_p_time, archer_p_start,
                         spy, spy_lvl, spy_up, spy_up_time, spy_p, spy_p_a, spy_p_time, spy_p_start,
                         cataphract, cataphract_lvl, cataphract_up, cataphract_up_time, cataphract_p, cataphract_p_a, cataphract_p_time, cataphract_p_start,
                         swordsman, swordsman_lvl, swordsman_up, swordsman_up_time, swordsman_p, swordsman_p_a, swordsman_p_time, swordsman_p_start,
                         crossbowman, crossbowman_lvl, crossbowman_up, crossbowman_up_time, crossbowman_p, crossbowman_p_a, crossbowman_p_time, crossbowman_p_start,
                         arquebusiers, arquebusiers_lvl, arquebusiers_up, arquebusiers_up_time, arquebusiers_p, arquebusiers_p_a, arquebusiers_p_time, arquebusiers_p_start,
                         castle_lvl, castle_up, castle_up_time,
                         knight, knight_lvl, knight_up, knight_up_time, knight_p, knight_p_a, knight_p_time, knight_p_start,
                         imperial_spearman, imperial_spearman_lvl, imperial_spearman_up, imperial_spearman_up_time, imperial_spearman_p, imperial_spearman_p_a, imperial_spearman_p_time, imperial_spearman_p_start,
                         ballista, ballista_lvl, ballista_up, ballista_up_time, ballista_p, ballista_p_a, ballista_p_time, ballista_p_start,
                         onager, onager_lvl, onager_up, onager_up_time, onager_p, onager_p_a, onager_p_time, onager_p_start,
                         cannon, cannon_lvl, cannon_up, cannon_up_time, cannon_p, cannon_p_a, cannon_p_time, cannon_p_start,
                         trade_cart, trade_cart_lvl, trade_cart_up, trade_cart_up_time, trade_cart_p, trade_cart_p_a, trade_cart_p_time, trade_cart_p_start,
                         farming_lvl, farming_up, farming_up_time,
						 lumbering_lvl, lumbering_up, lumbering_up_time,
						 mining_lvl, mining_up, mining_up_time,
						 blacksmithing_lvl, blacksmithing_up, blacksmithing_up_time,
                         riding_lvl, riding_up, riding_up_time,
						 geometry_lvl, geometry_up, geometry_up_time, 
						 cartography_lvl, cartography_up, cartography_up_time,
						 spying_lvl, spying_up, spying_up_time,
						 masonry_lvl, masonry_up, masonry_up_time,
                         wall_lvl, wall_up, wall_up_time,
						 watchtower, watchtower_lvl, watchtower_up, watchtower_up_time, watchtower_p, watchtower_p_a, watchtower_p_time, watchtower_p_start,
						 castle_processing, castle_processing_time, castle_processing_time_st,
						 barracks_processing, barracks_processing_time, barracks_processing_time_st,
						 academy_processing, academy_processing_time, academy_processing_time_st,
						 workshop_processing, workshop_processing_time, workshop_processing_time_st,
						 market_processing, market_processing_time, market_processing_time_st,
						 wall_processing, wall_processing_time, wall_processing_time_st,
						 village_processing, village_processing_time, village_processing_time_st, _deathBuffer, notifications, email_change_a, email_change_s, email_changed_s, password_change_a, password_change_s, password_changed_s, messages_status, processes_status, logs_status, alliance_status
                         )
                         VALUES (
                         ?, ?, 'no', ?, ?, 'no',                                 -- token, lord_name, lord_name_changed, player_id, colony_id, banned
                         10000000, 10000000, 10000000, 10000000, 0,              -- food, wood, gold, diamond, age_points
                         1, 'on', NULL, NULL,                                    -- quest, bonus, bonus_time, bonus_results
                         1,                                                      -- food_percent
                         1,                                                      -- wood_percent
                         0, 0, 0, 1,                                             -- gold_c, gold_a, gold_city, gold_percent
                         1, 0, 'off', NULL, 'off', 0, NULL, NULL, 'off', NULL,   -- farmer, farmer_lvl, farmer_up, farmer_up_time, farmer_p, farmer_p_a, farmer_p_time, farmer_p_start, farmer_boost, farmer_boost_time
                         1, 0, 'off', NULL, 'off', 0, NULL, NULL, 'off', NULL,   -- woodcutter, woodcutter_lvl, woodcutter_up, woodcutter_up_time, woodcutter_p, woodcutter_p_a, woodcutter_p_time, woodcutter_p_start, woodcutter_boost, woodcutter_boost_time
                         1, 0, 'off', NULL, 'off', 0, NULL, NULL, 'off', NULL,   -- gold_miner, gold_miner_lvl, gold_miner_up, gold_miner_up_time, gold_miner_p, gold_miner_p_a, gold_miner_p_time, gold_miner_p_start, gold_miner_boost, gold_miner_boost_time
                         0, 0, 0,                                                -- c_troops, city_troops, s_troops
                         0, 0,                                                   -- c_spy, city_spy
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- spearman, spearman_lvl, spearman_up, spearman_up_time, spearman_p, spearman_p_a, spearman_p_time, spearman_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- archer, archer_lvl, archer_up, archer_up_time, archer_p, archer_p_a, archer_p_time, archer_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- spy, spy_lvl, spy_up, spy_up_time, spy_p, spy_p_a, spy_p_time, spy_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- cataphract, cataphract_lvl, cataphract_up, cataphract_up_time, cataphract_p, cataphract_p_a, cataphract_p_time, cataphract_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- swordsman, swordsman_lvl, swordsman_up, swordsman_up_time, swordsman_p, swordsman_p_a, swordsman_p_time, swordsman_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- crossbowman, crossbowman_lvl, crossbowman_up, crossbowman_up_time, crossbowman_p, crossbowman_p_a, crossbowman_p_time, crossbowman_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- arquebusiers, arquebusiers_lvl, arquebusiers_up, arquebusiers_up_time, arquebusiers_p, arquebusiers_p_a, arquebusiers_p_time, arquebusiers_p_start
                         0, 'off', NULL,                                         -- castle_lvl, castle_up, castle_up_time
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- knight, knight_lvl, knight_up, knight_up_time, knight_p, knight_p_a, knight_p_time, knight_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- imperial_spearman, imperial_spearman_lvl, imperial_spearman_up, imperial_spearman_up_time, imperial_spearman_p, imperial_spearman_p_a, imperial_spearman_p_time, imperial_spearman_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- ballista, ballista_lvl, ballista_up, ballista_up_time, ballista_p, ballista_p_a, ballista_p_time, ballista_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- onager, onager_lvl, onager_up, onager_up_time, onager_p, onager_p_a, onager_p_time, onager_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- cannon, cannon_lvl, cannon_up, cannon_up_time, cannon_p, cannon_p_a, cannon_p_time, cannon_p_start
                         0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- trade_cart, trade_cart_lvl, trade_cart_up, trade_cart_up_time, trade_cart_p, trade_cart_p_a, trade_cart_p_time, trade_cart_p_start
                         0, 'off', NULL,                                         -- farming_lvl, farming_up, farming_up_time
						 0, 'off', NULL,                                         -- lumbering_lvl, lumbering_up, lumbering_up_time
						 0, 'off', NULL,                                         -- mining_lvl, mining_up, mining_up_time
						 0, 'off', NULL,                                         -- blacksmithing_lvl, blacksmithing_up, blacksmithing_up_time
                         0, 'off', NULL,                                         -- riding_lvl, riding_up, riding_up_time
						 0, 'off', NULL,                                         -- geometry_lvl, geometry_up, geometry_up_time
						 0, 'off', NULL,                                         -- cartography_lvl, cartography_up, cartography_up_time
						 0, 'off', NULL,                                         -- spying_lvl, spying_up, spying_up_time
						 0, 'off', NULL,                                         -- masonry_lvl, masonry_up, masonry_up_time
                         0, 'off', NULL,                                         -- wall_lvl, wall_up, wall_up_time
						 0, 0, 'off', NULL, 'off', 0, NULL, NULL,                -- watchtower, watchtower_lvl, watchtower_up, watchtower_up_time, watchtower_p, watchtower_p_a, watchtower_p_time, watchtower_p_start
						 'no', NULL, NULL,                                       -- castle_processing, castle_processing_time, castle_processing_time_st
						 'no', NULL, NULL,                                       -- barracks_processing, barracks_processing_time, barracks_processing_time_st
						 'no', NULL, NULL,                                       -- academy_processing, academy_processing_time, academy_processing_time_st
						 'no', NULL, NULL,                                       -- workshop_processing, workshop_processing_time, workshop_processing_time_st
						 'no', NULL, NULL,                                       -- market_processing, market_processing_time, market_processing_time_st
						 'no', NULL, NULL,                                       -- wall_processing, wall_processing_time, wall_processing_time_st
						 'no', NULL, NULL,                                       -- village_processing, village_processing_time, village_processing_time_st
						 0, '[]', 'off', NULL, 0, 'off', NULL, 0,                -- _deathBuffer, notifications, email_change_a, email_change_s, email_changed_s, password_change_a, password_change_s, password_changed_s
                         0, 0, 0, 0                                              -- messages_status, processes_status, logs_status, alliance_status
						 )`,
                        [token, lord_name, player_id, colony_id]
            );

            worldStatus.pop += 1;
            if (worldStatus.count < 19) {
                worldStatus.count += 1;
            } else {
                worldStatus.count = 0;
                worldStatus.chunk += 1;
            }

            fs.writeFileSync(statusFile, JSON.stringify([worldStatus], null, 2));
        }
        await db.close();

        return res.json({ message: "User created successfully!", redirect: "kingdom.html" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
});

app.post("/users_world", async (req, res) => {
    const { token, world } = req.body;

    if (!token || !world) {
        return res.status(400).json({ error: "Token and world required." });
    }

    const dbPath = path.join(__dirname, "worlds", world, "users_world.db");

    if (!fs.existsSync(dbPath)) {
        return res.status(404).json({ error: "You are not registered in this world." });
    }

    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        const row = await db.get("SELECT * FROM users WHERE token = ?", [token]);

        if (!row) {
            await db.close();
            return res.status(404).json({ error: "User not found." });
        }

        res.json(row);
        await db.close();
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database operation failed." });
    }
});

app.post("/check-time", async (req, res) => {
    const serverTime = Date.now();
    return res.json({ serverTime });
});

async function resourceControl(currentLevel, gold, diamond, agePoints, upgradeType, Speed_up) {
    const dataPath = await path.join(__dirname, "processing_time", "upgrade_data.json");

    try {
        await fsPromises.access(dataPath);
    } catch {
        return { success: false, message: "Upgrade data file not found." };
    }

    let upgradeData;
    try {
        const fileContent = await fsPromises.readFile(dataPath, "utf-8");
        upgradeData = JSON.parse(fileContent);
    } catch (err) {
        return { success: false, message: "Invalid upgrade data file." };
    }

    const timeKey = `${upgradeType}_upgrade_time`;
    const costKey = `${upgradeType}_upgrade_cost`;

    if (upgradeData[0][timeKey] == undefined || upgradeData[0][costKey] == undefined) {
        return { success: false, message: "Upgrade type not found in data file." };
    }

    const timeMs = upgradeData[0][timeKey][Number(currentLevel)];
    const costValue = upgradeData[0][costKey][Number(currentLevel)];

    if (Speed_up === "yes") {
        if (diamond >= 50) return { success: true };
        return { success: false, message: "Not enough diamond." };
    }

    const enoughGold = Number(costValue) <= Number(gold);

    if (["farmer", "woodcutter", "gold_miner", "spearman", "archer"].includes(upgradeType) && enoughGold) {
        return { success: true, time: timeMs, cost: costValue };
    }

    if (["trade_cart", "castle", "wall"].includes(upgradeType) && enoughGold) {
        return { success: true, time: timeMs, cost: costValue };
    }

    if (["spy", "swordsman", "knight", "imperial_spearman"].includes(upgradeType) && enoughGold) {
        if (["spy", "knight"].includes(upgradeType)) return { success: true, time: timeMs, cost: costValue };
        if (upgradeType === "swordsman" && agePoints >= 500) return { success: true, time: timeMs, cost: costValue };
        if (upgradeType === "imperial_spearman" && agePoints >= 5000) return { success: true, time: timeMs, cost: costValue };
        return { success: false, message: "Not enough Age." };
    }

    if (["cataphract", "crossbowman"].includes(upgradeType) && enoughGold) {
        if (upgradeType === "cataphract" && agePoints >= 500) return { success: true, time: timeMs, cost: costValue };
        if (upgradeType === "crossbowman" && agePoints >= 1500) return { success: true, time: timeMs, cost: costValue };
        return { success: false, message: "Not enough Age." };
    }

    if (["arquebusiers", "farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"].includes(upgradeType) && enoughGold) {
        if (["farming", "lumbering", "mining"].includes(upgradeType)) return { success: true, time: timeMs, cost: costValue };
        if (["blacksmithing", "riding", "geometry"].includes(upgradeType) && agePoints >= 1500) return { success: true, time: timeMs, cost: costValue };
        if (["cartography", "spying", "masonry"].includes(upgradeType) && agePoints >= 5000) return { success: true, time: timeMs, cost: costValue };
        if (upgradeType === "arquebusiers" && agePoints >= 10000) return { success: true, time: timeMs, cost: costValue };
        return { success: false, message: "Not enough Age." };
    }

    if (["watchtower", "ballista", "onager", "cannon"].includes(upgradeType) && enoughGold) {
        if (["watchtower", "ballista"].includes(upgradeType)) return { success: true, time: timeMs, cost: costValue };
        if (upgradeType === "onager" && agePoints >= 1500) return { success: true, time: timeMs, cost: costValue };
        if (upgradeType === "cannon" && agePoints >= 10000) return { success: true, time: timeMs, cost: costValue };
        return { success: false, message: "Not enough Age." };
    }

    return { success: false, message: "Not enough resources.", cost: costValue };
}

app.post("/upgrade", async (req, res) => {
    const { world, token, upgradeType, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || upgradeType == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedUpgrades = [
        "spearman", "archer", "spy", "cataphract", "swordsman",
        "crossbowman", "arquebusiers", "castle", "knight", "imperial_spearman",
        "farming", "lumbering", "mining", "blacksmithing", "riding", "geometry",
        "cartography", "spying", "masonry", "ballista", "onager", "cannon",
        "trade_cart", "wall", "watchtower", "farmer", "woodcutter", "gold_miner"
    ];

    function isValidUpgrade(type) {
        return allowedUpgrades.includes(type);
    }

    if (!isValidUpgrade(upgradeType)) {
        return res.status(400).json({ message: "Invalid upgrade type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Upgrade not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const levelColumn = `${upgradeType}_lvl`;
    const upFlagColumn = `${upgradeType}_up`;
    const upTimeColumn = `${upgradeType}_up_time`;

    const castle_all_upgrade = ["castle", "knight", "imperial_spearman"];
    const barracks_all_upgrade = ["spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
    const academy_all_upgrade = ["farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
    const workshop_all_upgrade = ["ballista", "onager", "cannon"];
    const market_all_upgrade = ["trade_cart"];
    const wall_all_upgrade = ["wall", "watchtower"];
    const village_all_upgrade = ["farmer", "woodcutter", "gold_miner"];

    function getProcessingColumn(upgradeType) {
        if (castle_all_upgrade.includes(upgradeType)) return "castle_processing";
        if (barracks_all_upgrade.includes(upgradeType)) return "barracks_processing";
        if (academy_all_upgrade.includes(upgradeType)) return "academy_processing";
        if (workshop_all_upgrade.includes(upgradeType)) return "workshop_processing";
        if (market_all_upgrade.includes(upgradeType)) return "market_processing";
        if (wall_all_upgrade.includes(upgradeType)) return "wall_processing";
        if (village_all_upgrade.includes(upgradeType)) return "village_processing";
        return null;
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[levelColumn] === "undefined" || typeof user[upFlagColumn] === "undefined" || typeof user[upTimeColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        const currentLevel = Number(user[levelColumn]);

        let maxLevel = 20;
        if (upgradeType === "trade_cart") maxLevel = 5;

        if (currentLevel >= maxLevel) {
            db.close();
            return res.status(400).json({ message: "Max level reached." });
        }

        const processingColumn = getProcessingColumn(upgradeType);
        if (processingColumn && String(user[processingColumn]).toLowerCase() === "on") {
            db.close();
            return res.status(400).json({ message: "Only one upgrade can be in progress per building." });
        }

        const gold = Number(user.gold);
        const diamond = Number(user.diamond);
        const agePoints = Number(user.age_points);
        const Speed_up = "no";

        const rc = await resourceControl(currentLevel, gold, diamond, agePoints, upgradeType, Speed_up);

        if (rc.success == false) {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough resources.";
            return res.status(400).json({ message: msg });
        }

        const timeMs = Number(rc.time);
        const costGold = Number(rc.cost);

        if (!Number.isFinite(timeMs) || timeMs <= 0) {
            db.close();
            return res.status(500).json({ message: "Invalid upgrade time." });
        }

        const endTime = now + rc.time;
        const processingTimeColumn = processingColumn + "_time";
		const processingStartTimeColumn = processingColumn + "_time_st";

        const updateSql = `
            UPDATE users
            SET gold = gold - ?,
                ${upFlagColumn} = 'on',
                ${upTimeColumn} = ?,
                ${processingColumn} = 'on',
                ${processingTimeColumn} = ?,
				${processingStartTimeColumn} = ?
            WHERE token = ?
        `;

        await dbRun(updateSql, [costGold, endTime, endTime, now, token]);
        db.close();

        res.json({
            message: `${upgradeType} upgrade started.`
        });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Database error. (code: 515)", error: err });
    }
});

app.post("/upgrade_cancel", async (req, res) => {
    const { world, token, upgradeType, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || upgradeType == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedUpgrades = [
        "spearman", "archer", "spy", "cataphract", "swordsman",
        "crossbowman", "arquebusiers", "castle", "knight", "imperial_spearman",
        "farming", "lumbering", "mining", "blacksmithing", "riding", "geometry",
        "cartography", "spying", "masonry", "ballista", "onager", "cannon",
        "trade_cart", "wall", "watchtower", "farmer", "woodcutter", "gold_miner"
    ];

    function isValidUpgrade(type) {
        return allowedUpgrades.includes(type);
    }

    if (!isValidUpgrade(upgradeType)) {
        return res.status(400).json({ message: "Invalid upgrade type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Upgrade not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const levelColumn = `${upgradeType}_lvl`;
    const upFlagColumn = `${upgradeType}_up`;
    const upTimeColumn = `${upgradeType}_up_time`;

    const castle_all_upgrade = ["castle", "knight", "imperial_spearman"];
    const barracks_all_upgrade = ["spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
    const academy_all_upgrade = ["farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
    const workshop_all_upgrade = ["ballista", "onager", "cannon"];
    const market_all_upgrade = ["trade_cart"];
    const wall_all_upgrade = ["wall", "watchtower"];
    const village_all_upgrade = ["farmer", "woodcutter", "gold_miner"];

    function getProcessingColumn(upgradeType) {
        if (castle_all_upgrade.includes(upgradeType)) return "castle_processing";
        if (barracks_all_upgrade.includes(upgradeType)) return "barracks_processing";
        if (academy_all_upgrade.includes(upgradeType)) return "academy_processing";
        if (workshop_all_upgrade.includes(upgradeType)) return "workshop_processing";
        if (market_all_upgrade.includes(upgradeType)) return "market_processing";
        if (wall_all_upgrade.includes(upgradeType)) return "wall_processing";
        if (village_all_upgrade.includes(upgradeType)) return "village_processing";
        return null;
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[levelColumn] === "undefined" || typeof user[upFlagColumn] === "undefined" || typeof user[upTimeColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        if (user[upFlagColumn] === 'off') {
            db.close();
            return res.status(500).json({ message: "No upgrade in progress." });
        }

        const currentLevel = Number(user[levelColumn]);
        const processingColumn = getProcessingColumn(upgradeType);

        const gold = Number(user.gold);
        const diamond = Number(user.diamond);
        const agePoints = Number(user.age_points);
        const Speed_up = "no";

        const rc = await resourceControl(currentLevel, gold, diamond, agePoints, upgradeType, Speed_up);

        if (rc.success == false && rc.message == "Not enough Age.") {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough Age.";
            return res.status(400).json({ message: msg });
        }

        const costGold = Number(rc.cost);
        const processingTimeColumn = processingColumn + "_time";
		const processingStartTimeColumn = processingColumn + "_time_st";

        const updateSql = `
            UPDATE users
            SET gold = gold + ?,
                ${upFlagColumn} = 'off',
                ${upTimeColumn} = NULL,
                ${processingColumn} = 'off',
                ${processingTimeColumn} = NULL,
				${processingStartTimeColumn} = NULL
            WHERE token = ?
        `;

        await dbRun(updateSql, [costGold, token]);
        db.close();

        res.json({
            message: `${upgradeType} upgrade cancelled.`
        });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Database error. (code: 515)", error: err });
    }
});

app.post("/upgrade_speed_up", async (req, res) => {
    const { world, token, upgradeType, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || upgradeType == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedUpgrades = [
        "spearman", "archer", "spy", "cataphract", "swordsman",
        "crossbowman", "arquebusiers", "castle", "knight", "imperial_spearman",
        "farming", "lumbering", "mining", "blacksmithing", "riding", "geometry",
        "cartography", "spying", "masonry", "ballista", "onager", "cannon",
        "trade_cart", "wall", "watchtower", "farmer", "woodcutter", "gold_miner"
    ];

    function isValidUpgrade(type) {
        return allowedUpgrades.includes(type);
    }

    if (!isValidUpgrade(upgradeType)) {
        return res.status(400).json({ message: "Invalid upgrade type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Upgrade not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const levelColumn = `${upgradeType}_lvl`;
    const upFlagColumn = `${upgradeType}_up`;
    const upTimeColumn = `${upgradeType}_up_time`;

    const castle_all_upgrade = ["castle", "knight", "imperial_spearman"];
    const barracks_all_upgrade = ["spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
    const academy_all_upgrade = ["farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
    const workshop_all_upgrade = ["ballista", "onager", "cannon"];
    const market_all_upgrade = ["trade_cart"];
    const wall_all_upgrade = ["wall", "watchtower"];
    const village_all_upgrade = ["farmer", "woodcutter", "gold_miner"];

    function getProcessingColumn(upgradeType) {
        if (castle_all_upgrade.includes(upgradeType)) return "castle_processing";
        if (barracks_all_upgrade.includes(upgradeType)) return "barracks_processing";
        if (academy_all_upgrade.includes(upgradeType)) return "academy_processing";
        if (workshop_all_upgrade.includes(upgradeType)) return "workshop_processing";
        if (market_all_upgrade.includes(upgradeType)) return "market_processing";
        if (wall_all_upgrade.includes(upgradeType)) return "wall_processing";
        if (village_all_upgrade.includes(upgradeType)) return "village_processing";
        return null;
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[levelColumn] === "undefined" || typeof user[upFlagColumn] === "undefined" || typeof user[upTimeColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        if (String(user[upFlagColumn]) === "off") {
            db.close();
            return res.status(500).json({ message: "No upgrade in progress." });
        }

        const currentLevel = Number(user[levelColumn]);
        const processingColumn = getProcessingColumn(upgradeType);
        const gold = Number(user.gold);
        const diamond = Number(user.diamond);
        const agePoints = Number(user.age_points);
        const Speed_up = "yes";
        const gainAge = await getGainAge(upgradeType);

        const rc = await resourceControl(currentLevel, gold, diamond, agePoints, upgradeType, Speed_up);

        if (rc.success == false) {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough diamond.";
            return res.status(400).json({ message: msg });
        }

        const processingTimeColumn = processingColumn + "_time";
		const processingStartTimeColumn = processingColumn + "_time_st";

        const updateSql = `
            UPDATE users
            SET diamond = diamond - 50,
                ${levelColumn} = ${levelColumn} + 1,
                ${upFlagColumn} = 'off',
                ${upTimeColumn} = NULL,
                ${processingColumn} = 'off',
                ${processingTimeColumn} = NULL,
				${processingStartTimeColumn} = NULL,
                age_points = age_points + ?
            WHERE token = ?
        `;

        await dbRun(updateSql, [gainAge, token]);
        db.close();

        res.json({
            message: `${upgradeType} upgrade completed.`
        });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Database error. (code: 515)", error: err });
    }
});

async function resourceControl_Produce(produceType, produceAmout, diamond_v, gold_v, food_v, wood_v, agePoints, Speed_up) {
    const dataPath = await path.join(__dirname, "processing_time", "produce_data.json");

    try {
        await fsPromises.access(dataPath);
    } catch {
        return { success: false, message: "Produce data file not found." };
    }

    let produceData;
    try {
        const fileContent = await fsPromises.readFile(dataPath, "utf-8");
        produceData = JSON.parse(fileContent);
    } catch (err) {
        return { success: false, message: "Invalid produce data file." };
    }

    const timeKey = `${produceType}_produce_time`;
    const costKey = `${produceType}_produce_cost`;

    if (produceData[0][timeKey][0] == undefined || produceData[0][costKey].diamond == undefined || produceData[0][costKey].gold == undefined || produceData[0][costKey].food == undefined || produceData[0][costKey].wood == undefined) {
        return { success: false, message: "Produce type not found in data file." };
    }

    const timeMs = produceData[0][timeKey][0];
    const costDiamond = produceData[0][costKey].diamond;
    const costGold = produceData[0][costKey].gold;
    const costFood = produceData[0][costKey].food;
    const costWood = produceData[0][costKey].wood;

    let T_Amout = Math.floor(produceAmout);
    let totalTime = T_Amout * Number(timeMs);
    let tDiamond = T_Amout * Number(costDiamond);
    let tGold = T_Amout * Number(costGold);
    let tFood = T_Amout * Number(costFood);
    let tWood = T_Amout * Number(costWood);

    let maxDiamond = costDiamond ? diamond_v / costDiamond : Infinity;
    let maxGold = costGold ? gold_v / costGold : Infinity;
    let maxFood = costFood ? food_v / costFood : Infinity;
    let maxWood = costWood ? wood_v / costWood : Infinity;

    let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);

    if (T_Amout > 0 && Speed_up === "no") {
        if (T_Amout <= Math.floor(maxProduce)) {
            if ((produceType === 'cataphract' || produceType === 'swordsman') && agePoints < 500) return { success: false, message: "Not enough Age." };
            if ((produceType === 'crossbowman' || produceType === 'onager') && agePoints < 1500) return { success: false, message: "Not enough Age." };
            if (produceType === 'imperial_spearman' && agePoints < 5000) return { success: false, message: "Not enough Age." };
            if ((produceType === 'arquebusiers' || produceType === 'cannon') && agePoints < 10000) return { success: false, message: "Not enough Age." };

            return {
                success: true,
                tTime: totalTime,
                cDiamond: tDiamond,
                cGold: tGold,
                cFood: tFood,
                cWood: tWood
            };
        } else {
            return {
                success: false,
                cDiamond: tDiamond,
                cGold: tGold,
                cFood: tFood,
                cWood: tWood,
                message: "Not enough resources."
            };
        }
    } else if (T_Amout > 0 && Speed_up === "yes") {
        if ((produceType === 'cataphract' || produceType === 'swordsman') && agePoints < 500) return { success: false, message: "Not enough Age." };
        if ((produceType === 'crossbowman' || produceType === 'onager') && agePoints < 1500) return { success: false, message: "Not enough Age." };
        if (produceType === 'imperial_spearman' && agePoints < 5000) return { success: false, message: "Not enough Age." };
        if ((produceType === 'arquebusiers' || produceType === 'cannon') && agePoints < 10000) return { success: false, message: "Not enough Age." };

        if (T_Amout <= diamond_v) {
            return { success: true, cDiamond: T_Amout };
        } else {
            return { success: false, message: "Not enough diamond." };
        }
    } else {
        return { success: false, message: "Invalid number." };
    }
}

app.post("/produce", async (req, res) => {
    const { world, token, produceType, produceAmout, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || produceType == null || produceAmout == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedProduces = [
        "spearman", "archer", "spy", "cataphract", "swordsman",
        "crossbowman", "arquebusiers", "knight", "imperial_spearman",
        "ballista", "onager", "cannon",
        "trade_cart", "watchtower", "farmer", "woodcutter", "gold_miner"
    ];

    function isValidProduce(type) {
        return allowedProduces.includes(type);
    }

    if (!isValidProduce(produceType)) {
        return res.status(400).json({ message: "Invalid produce type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Produce not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const paColumn = `${produceType}_p_a`;
    const pColumn = `${produceType}_p`;
    const ptimeColumn = `${produceType}_p_time`;
    const pstartColumn = `${produceType}_p_start`;

    const castle_all_produce = ["castle", "knight", "imperial_spearman"];
    const barracks_all_produce = ["spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
    const academy_all_produce = ["farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
    const workshop_all_produce = ["ballista", "onager", "cannon"];
    const market_all_produce = ["trade_cart"];
    const wall_all_produce = ["wall", "watchtower"];
    const village_all_produce = ["farmer", "woodcutter", "gold_miner"];

    function getProcessingColumn(produceType) {
        if (castle_all_produce.includes(produceType)) return "castle_processing";
        if (barracks_all_produce.includes(produceType)) return "barracks_processing";
        if (academy_all_produce.includes(produceType)) return "academy_processing";
        if (workshop_all_produce.includes(produceType)) return "workshop_processing";
        if (market_all_produce.includes(produceType)) return "market_processing";
        if (wall_all_produce.includes(produceType)) return "wall_processing";
        if (village_all_produce.includes(produceType)) return "village_processing";
        return null;
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[produceType] === "undefined" || typeof user[pColumn] === "undefined" || typeof user[ptimeColumn] === "undefined" || typeof user[pstartColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        const currentAmout = Math.floor(Number(produceAmout));
        const currentAmout_TC = Number(user.trade_cart);
        const currentAmout_TCT = Number(user.trade_cart) + currentAmout;
        const currentAmout_W = Number(user.watchtower);
        const currentAmout_WT = Number(user.watchtower) + currentAmout;
        const currentAmout_V = Number(user.farmer) + Number(user.woodcutter) + Number(user.gold_miner);
        const currentAmout_VT = currentAmout_V + currentAmout;

        if (produceType === "trade_cart" && (currentAmout > 5 || currentAmout_TC == 5 || currentAmout_TCT > 5)) {
            db.close();
            return res.status(400).json({ message: "Max amout reached." });
        }
        if (produceType === "watchtower" && (currentAmout > 50 || currentAmout_W == 50 || currentAmout_WT > 50)) {
            db.close();
            return res.status(400).json({ message: "Max amout reached." });
        }
        if ((produceType === "farmer" || produceType === "woodcutter" || produceType === "gold_miner") && (currentAmout > 200 || currentAmout_V == 200 || currentAmout_VT > 200)) {
            db.close();
            return res.status(400).json({ message: "Max amout reached." });
        }

        const processingColumn = getProcessingColumn(produceType);
        if (processingColumn && String(user[processingColumn]).toLowerCase() === "on") {
            db.close();
            return res.status(400).json({ message: "Only one produce can be in progress per building." });
        }

        const diamond = Number(user.diamond);
        const gold = Number(user.gold);
        const food = Number(user.food);
        const wood = Number(user.wood);
        const agePoints = Number(user.age_points);

        const rc = await resourceControl_Produce(produceType, currentAmout, diamond, gold, food, wood, agePoints, "no");

        if (rc.success == false) {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough resources.";
            return res.status(400).json({ message: msg });
        }

        const TotaltimeMs = Number(rc.tTime);
        const costDiamond = Number(rc.cDiamond);
        const costGold = Number(rc.cGold);
        const costFood = Number(rc.cFood);
        const costWood = Number(rc.cWood);

        if (!Number.isFinite(TotaltimeMs) || TotaltimeMs <= 0) {
            db.close();
            return res.status(500).json({ message: "Invalid produce time." });
        }

        const startTime = now;
        const endTime = now + TotaltimeMs;

        const processingTimeColumn = processingColumn + "_time";
		const processingStartTimeColumn = processingColumn + "_time_st";

        const updateSql = `
            UPDATE users
            SET gold = gold - ?,
                food = food - ?,
                wood = wood - ?,
                diamond = diamond - ?,
                ${paColumn} = ?,
                ${pColumn} = 'on',
                ${ptimeColumn} = ?,
                ${pstartColumn} = ?,
                ${processingColumn} = 'on',
                ${processingTimeColumn} = ?,
				${processingStartTimeColumn} = ?
            WHERE token = ?
        `;

        await dbRun(updateSql, [costGold, costFood, costWood, costDiamond, currentAmout, endTime, startTime, endTime, startTime, token]);
        db.close();

        res.json({ message: `${produceType} produce started.` });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Database error. (code: 515)", error: err });
    }
});

app.post("/produce_cancel", async (req, res) => {
    const { world, token, produceType, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || produceType == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedProduces = [
        "spearman", "archer", "spy", "cataphract", "swordsman",
        "crossbowman", "arquebusiers", "knight", "imperial_spearman",
        "ballista", "onager", "cannon",
        "trade_cart", "watchtower", "farmer", "woodcutter", "gold_miner"
    ];

    function isValidProduce(type) {
        return allowedProduces.includes(type);
    }

    if (!isValidProduce(produceType)) {
        return res.status(400).json({ message: "Invalid produce type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Produce not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const paColumn = `${produceType}_p_a`;
    const pColumn = `${produceType}_p`;
    const ptimeColumn = `${produceType}_p_time`;
    const pstartColumn = `${produceType}_p_start`;

    const castle_all_produce = ["castle", "knight", "imperial_spearman"];
    const barracks_all_produce = ["spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
    const academy_all_produce = ["farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
    const workshop_all_produce = ["ballista", "onager", "cannon"];
    const market_all_produce = ["trade_cart"];
    const wall_all_produce = ["wall", "watchtower"];
    const village_all_produce = ["farmer", "woodcutter", "gold_miner"];

    function getProcessingColumn(produceType) {
        if (castle_all_produce.includes(produceType)) return "castle_processing";
        if (barracks_all_produce.includes(produceType)) return "barracks_processing";
        if (academy_all_produce.includes(produceType)) return "academy_processing";
        if (workshop_all_produce.includes(produceType)) return "workshop_processing";
        if (market_all_produce.includes(produceType)) return "market_processing";
        if (wall_all_produce.includes(produceType)) return "wall_processing";
        if (village_all_produce.includes(produceType)) return "village_processing";
        return null;
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[produceType] === "undefined" || typeof user[paColumn] === "undefined" || typeof user[pColumn] === "undefined" || typeof user[ptimeColumn] === "undefined" || typeof user[pstartColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        if (user[pColumn] === 'off') {
            db.close();
            return res.status(500).json({ message: "No produce in progress." });
        }

        const processingColumn = getProcessingColumn(produceType);
        const produceAmout = Number(user[paColumn]);
        const diamond = Number(user.diamond);
        const gold = Number(user.gold);
        const food = Number(user.food);
        const wood = Number(user.wood);
        const agePoints = Number(user.age_points);
        const Speed_up = "no";

        const rc = await resourceControl_Produce(produceType, produceAmout, diamond, gold, food, wood, agePoints, Speed_up);

        if (rc.success == false && rc.message == "Not enough Age.") {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough resources.";
            return res.status(400).json({ message: msg });
        }

        const costDiamond = Number(rc.cDiamond);
        const costGold = Number(rc.cGold);
        const costFood = Number(rc.cFood);
        const costWood = Number(rc.cWood);

        const processingTimeColumn = processingColumn + "_time";
		const processingStartTimeColumn = processingColumn + "_time_st";

        const updateSql = `
            UPDATE users
            SET gold = gold + ?,
                food = food + ?,
                wood = wood + ?,
                diamond = diamond + ?,
                ${paColumn} = 0,
                ${pColumn} = 'off',
                ${ptimeColumn} = NULL,
                ${pstartColumn} = NULL,
                ${processingColumn} = 'off',
                ${processingTimeColumn} = NULL,
				${processingStartTimeColumn} = NULL
            WHERE token = ?
        `;

        await dbRun(updateSql, [costGold, costFood, costWood, costDiamond, token]);
        db.close();

        res.json({ message: `${produceType} produce cancelled.` });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Failed to cancel produce.", error: err });
    }
});

app.post("/produce_speed_up", async (req, res) => {
    const { world, token, produceType, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || produceType == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedProduces = [
        "spearman", "archer", "spy", "cataphract", "swordsman",
        "crossbowman", "arquebusiers", "knight", "imperial_spearman",
        "farmer", "woodcutter", "gold_miner"
    ];

    function isValidProduce(type) {
        return allowedProduces.includes(type);
    }

    if (!isValidProduce(produceType)) {
        return res.status(400).json({ message: "Invalid produce type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Produce not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const paColumn = `${produceType}_p_a`;
    const pColumn = `${produceType}_p`;
    const ptimeColumn = `${produceType}_p_time`;
    const pstartColumn = `${produceType}_p_start`;

    const castle_all_produce = ["castle", "knight", "imperial_spearman"];
    const barracks_all_produce = ["spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
    const academy_all_produce = ["farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
    const workshop_all_produce = ["ballista", "onager", "cannon"];
    const market_all_produce = ["trade_cart"];
    const wall_all_produce = ["wall", "watchtower"];
    const village_all_produce = ["farmer", "woodcutter", "gold_miner"];

    function getProcessingColumn(produceType) {
        if (castle_all_produce.includes(produceType)) return "castle_processing";
        if (barracks_all_produce.includes(produceType)) return "barracks_processing";
        if (academy_all_produce.includes(produceType)) return "academy_processing";
        if (workshop_all_produce.includes(produceType)) return "workshop_processing";
        if (market_all_produce.includes(produceType)) return "market_processing";
        if (wall_all_produce.includes(produceType)) return "wall_processing";
        if (village_all_produce.includes(produceType)) return "village_processing";
        return null;
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[produceType] === "undefined" || typeof user[paColumn] === "undefined" || typeof user[pColumn] === "undefined" || typeof user[ptimeColumn] === "undefined" || typeof user[pstartColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        if (user[pColumn] === 'off') {
            db.close();
            return res.status(500).json({ message: "No produce in progress." });
        }

        const processingColumn = getProcessingColumn(produceType);
        const produceAmout = Number(user[paColumn]);
        const diamond = Number(user.diamond);
        const gold = Number(user.gold);
        const food = Number(user.food);
        const wood = Number(user.wood);
        const agePoints = Number(user.age_points);
        const Speed_up = "yes";

        const rc = await resourceControl_Produce(produceType, produceAmout, diamond, gold, food, wood, agePoints, Speed_up);

        if (rc.success == false) {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough diamond.";
            return res.status(400).json({ message: msg });
        }

        const costDiamond = Number(rc.cDiamond);
        const processingTimeColumn = processingColumn + "_time";
		const processingStartTimeColumn = processingColumn + "_time_st";

        const updateSql = `
            UPDATE users
            SET diamond = diamond - ?,
                ${produceType} = ${produceType} + ?,
                ${paColumn} = 0,
                ${pColumn} = 'off',
                ${ptimeColumn} = NULL,
                ${pstartColumn} = NULL,
                ${processingColumn} = 'off',
                ${processingTimeColumn} = NULL,
				${processingStartTimeColumn} = NULL
            WHERE token = ?
        `;

        await dbRun(updateSql, [costDiamond, costDiamond, token]);
        db.close();

        res.json({ message: `${produceType} produce completed.` });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Failed to complete produce.", error: err });
    }
});

async function boostControl(diamond) {
    if (diamond > 100) {
        return { success: true, time: 604800000 };
    } else {
        return { success: false, message: "Not enough diamond." };
    }
}

app.post("/boost", async (req, res) => {
    const { world, token, boostType, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || boostType == null) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedBoosts = ["farmer", "woodcutter", "gold_miner"];
    function isValidBoosts(type) {
        return allowedBoosts.includes(type);
    }
    if (!isValidBoosts(boostType)) {
        return res.status(400).json({ message: "Invalid boost type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status == "close") {
        return res.status(403).json({ message: "World is closed. Boost not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const bColumn = `${boostType}_boost`;
    const TimeColumn = `${boostType}_boost_time`;
    let percentColumn;
    if (boostType == 'farmer') percentColumn = `food_percent`;
    else if (boostType == 'woodcutter') percentColumn = `wood_percent`;
    else if (boostType == 'gold_miner') percentColumn = `gold_percent`;

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[bColumn] === "undefined" || typeof user[TimeColumn] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        if (user.farmer_boost == 'on' || user.woodcutter_boost == 'on' || user.gold_miner_boost == 'on') {
            db.close();
            return res.status(500).json({ message: "Boost continues." });
        }

        const diamond = Number(user.diamond);
        const rc = await boostControl(diamond);

        if (rc.success == false) {
            db.close();
            const msg = rc && rc.message ? rc.message : "Not enough diamond.";
            return res.status(400).json({ message: msg });
        }

        const timeMs = Number(rc.time);
        if (!Number.isFinite(timeMs) || timeMs <= 0) {
            db.close();
            return res.status(500).json({ message: "Invalid boost time." });
        }

        const endTime = now + rc.time;

        const updateSql = `
            UPDATE users
            SET diamond = diamond - 100,
                ${bColumn} = 'on',
                ${TimeColumn} = ?,
                ${percentColumn} = 1.25
            WHERE token = ?
        `;

        await dbRun(updateSql, [endTime, token]);
        db.close();

        res.json({ message: `${boostType} boost started.` });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Failed to start boost.", error: err });
    }
});

app.post("/kick", async (req, res) => {
    const { world, token, kickType, kickAmout, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (world == null || token == null || kickType == null || kickAmout == null || isNaN(kickAmout)) {
        return res.status(400).json({ message: "Missing parameters!" });
    }

    const allowedKicks = ["farmer", "woodcutter", "gold_miner"];
    if (!allowedKicks.includes(kickType)) {
        return res.status(400).json({ message: "Invalid kick type!" });
    }

    if (world === undefined || isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 501)" });
    }

    let statusData;
    try {
        const rawStatus = await fs.promises.readFile(statusFile, "utf-8");
        statusData = JSON.parse(rawStatus);
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status === "close") {
        return res.status(403).json({ message: "World is closed. Kick not allowed." });
    }

    try {
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error. (code: 505)" });
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) {
            db.close();
            return res.status(404).json({ message: "You are not registered in this world." });
        }

        if (String(user.banned).toLowerCase() === "yes") {
            db.close();
            return res.status(403).json({ message: "You are banned from this world." });
        }

        if (typeof user[kickType] === "undefined") {
            db.close();
            return res.status(500).json({ message: "Database error: (code: 505)" });
        }

        const kickAmout_T = Math.floor(Number(kickAmout));

        if ((kickType === 'farmer' && kickAmout_T > Number(user.farmer)) ||
            (kickType === 'woodcutter' && kickAmout_T > Number(user.woodcutter)) ||
            (kickType === 'gold_miner' && kickAmout_T > Number(user.gold_miner))) {
            db.close();
            return res.status(500).json({ message: `${kickType.charAt(0).toUpperCase() + kickType.slice(1)} cannot be kicked more.` });
        }

        if (!Number.isFinite(kickAmout_T) || kickAmout_T < 0) {
            db.close();
            return res.status(400).json({ message: "Invalid kick amount!" });
        }

        const updateSql = `UPDATE users SET ${kickType} = ${kickType} - ? WHERE token = ?`;
        await dbRun(updateSql, [kickAmout_T, token]);
        db.close();

        res.json({ message: `${kickType} kicked.` });

    } catch (err) {
        db.close();
        return res.status(500).json({ message: "Failed to kick.", error: err });
    }
});

app.post("/lord_name_change", async (req, res) => {
    const { world, token, lord_name, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (!world || !token || !lord_name) {
        return res.status(400).json({ message: "Missing parameters!" });
    }
    if (isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid ID format. Must be a number." });
    }
    if (lord_name.length < 4 || lord_name.length > 12) {
        return res.status(400).json({ message: "Lord name must be 4-12 characters long!" });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");
    const mapDbFile = path.join(path_w, String(world), "users_map.db");

    try {
        await fs.promises.access(statusFile);
        await fs.promises.access(dbFile);
        await fs.promises.access(mapDbFile);
    } catch {
        return res.status(404).json({ message: "Database error." });
    }

    let statusData;
    try {
        statusData = JSON.parse(await fs.promises.readFile(statusFile, "utf-8"));
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status === "close") {
        return res.status(403).json({ message: "World is closed. Lord name change not allowed." });
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) return res.status(404).json({ message: "You are not registered in this world." });
        if (String(user.banned).toLowerCase() === "yes") return res.status(403).json({ message: "You are banned." });
        if (user.lord_name_changed === "yes") return res.status(403).json({ message: "Lord name cannot be changed again." });

        const notallowedNames = [ /* ... senin yasaklı listeni bırakıyorum ... */ ];
        const forbiddenRegex = new RegExp(`^(${notallowedNames.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})$`, "i");
        const allowedCharsRegex = /^[a-zA-Z0-9_ ]+$/;
        const emojiRegex = /[\u{1F600}-\u{1F64F}]/u;

        if (forbiddenRegex.test(lord_name.toLowerCase()) ||
            lord_name.startsWith(" ") || lord_name.endsWith(" ") ||
            !allowedCharsRegex.test(lord_name) ||
            emojiRegex.test(lord_name) ||
            /^WL_/i.test(lord_name)) {
            return res.status(400).json({ message: "Invalid Lord name!" });
        }

        const existing = await dbGet("SELECT 1 FROM users WHERE lord_name = ?", [lord_name]);
        if (existing) return res.status(400).json({ message: "This Lord name is already in use!" });

        await dbRun("UPDATE users SET lord_name = ?, lord_name_changed = 'yes' WHERE token = ?", [lord_name, token]);

        const player_id = user.player_id;
        const mapDb = new sqlite3.Database(mapDbFile);
        const mapRun = promisify(mapDb.run.bind(mapDb));

        await mapRun("UPDATE map SET lord_name = ? WHERE player_id = ?", [lord_name, player_id]);

        mapDb.close();

        res.json({ message: "Lord name changed." });

    } catch (err) {
        return res.status(500).json({ message: "Failed to change.", error: err });
    } finally {
        db.close();
    }
});

app.post("/bonus", async (req, res) => {
    const { world, token, bonus_number, lange } = req.body;
    const now = Date.now();

    if (userCooldowns[token] && now < userCooldowns[token]) {
        const waitTime = ((userCooldowns[token] - now) / 1000).toFixed(2);
        const message = (langCooldown[lange] || langCooldown["en"]).replace("{waitTime}", waitTime);
        return res.status(429).json({ message });
    }
    userCooldowns[token] = now + COOLDOWN_MS;

    if (!world || !token || bonus_number == null || isNaN(bonus_number) || bonus_number < 0 || bonus_number > 8) {
        return res.status(400).json({ message: "Missing or invalid parameters!" });
    }

    if (isNaN(Number(world))) {
        return res.status(400).json({ message: "Invalid world ID format. Must be a number." });
    }

    const path_w = path.join(__dirname, "worlds");
    const statusFile = path.join(path_w, String(world), "status.json");
    const dbFile = path.join(path_w, String(world), "users_world.db");

    try {
        await fs.promises.access(statusFile);
        await fs.promises.access(dbFile);
    } catch {
        return res.status(404).json({ message: "Database error." });
    }

    let statusData;
    try {
        statusData = JSON.parse(await fs.promises.readFile(statusFile, "utf-8"));
    } catch {
        return res.status(500).json({ message: "Database error. (code: 501)" });
    }

    if (statusData.status === "close") {
        return res.status(403).json({ message: "World is closed. Bonus not allowed." });
    }

    const db = new sqlite3.Database(dbFile);
    const dbGet = promisify(db.get.bind(db));
    const dbRun = promisify(db.run.bind(db));

    try {
        const user = await dbGet("SELECT * FROM users WHERE token = ?", [token]);

        if (!user) return res.status(404).json({ message: "You are not registered in this world." });
        if (String(user.banned).toLowerCase() === "yes") return res.status(403).json({ message: "You are banned from this world." });
        if (user.bonus === 'off') return res.status(403).json({ message: "Bonus not ready." });

        function getBonuses(age_points, bonus_num) {
            let types = [];
            if (age_points < 500) types = ["spearman", "archer", "spy", "knight"];
            else if (age_points < 1500) types = ["spearman", "archer", "spy", "knight", "cataphract", "swordsman"];
            else if (age_points < 5000) types = ["spearman", "archer", "spy", "knight", "cataphract", "swordsman", "crossbowman"];
            else if (age_points < 10000) types = ["spearman", "archer", "spy", "knight", "cataphract", "swordsman", "crossbowman", "imperial_spearman"];
            else types = ["spearman", "archer", "spy", "knight", "cataphract", "swordsman", "crossbowman", "imperial_spearman", "arquebusiers"];

            const bonuses = [];
            for (let i = 0; i < 9; i++) {
                const bonus_type = types[Math.floor(Math.random() * types.length)];
                const bonus_amount = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
                bonuses.push({ type: bonus_type, amount: bonus_amount, selected: bonus_num });
            }
            return bonuses;
        }

        const bonus_num = Math.floor(bonus_number);
        const results = getBonuses(Number(user.age_points), bonus_num);
        const resultsJson = JSON.stringify(results);

        const bonusType = results[bonus_num].type;
        const bonusAmount = results[bonus_num].amount;

        const allowedTypes = ["spearman","archer","spy","knight","cataphract","swordsman","crossbowman","imperial_spearman","arquebusiers"];
        if (!allowedTypes.includes(bonusType)) {
            return res.status(403).json({ message: "Invalid bonus Type!" });
        }

        await dbRun(
            `UPDATE users SET bonus = 'off', bonus_time = ?, ${bonusType} = ${bonusType} + ?, bonus_results = ? WHERE token = ?`,
            [now + 86400000, bonusAmount, resultsJson, token]
        );

        res.json({ bonus_data: resultsJson });

    } catch (err) {
        return res.status(500).json({ message: "Failed to process bonus.", error: err.message });
    } finally {
        db.close();
    }
});

async function updateStatus(world, token, column) {
    if (!world || !token) return { error: "Missing parameters" };

    const dbPath = path.join(__dirname, "worlds", world, "users_world.db");
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

    const dbRun = promisify(db.run.bind(db));

    try {
        const result = await dbRun(`UPDATE users SET ${column} = 0 WHERE token = ?`, [token]);
        db.close();
        return { status: "success" };
    } catch (err) {
        db.close();
        return { error: err.message };
    }
}

app.post("/messages_status", async (req, res) => {
    const { token, world } = req.body;
    const result = await updateStatus(world, token, "messages_status");
    if (result.error) return res.status(500).json({ message: result.error });
    res.json({ status: "success" });
});

app.post("/processes_status", async (req, res) => {
    const { token, world } = req.body;
    const result = await updateStatus(world, token, "processes_status");
    if (result.error) return res.status(500).json({ message: result.error });
    res.json({ status: "success" });
});

app.post("/logs_status", async (req, res) => {
    const { token, world } = req.body;
    const result = await updateStatus(world, token, "logs_status");
    if (result.error) return res.status(500).json({ message: result.error });
    res.json({ status: "success" });
});

app.post("/alliance_status", async (req, res) => {
    const { token, world } = req.body;
    const result = await updateStatus(world, token, "alliance_status");
    if (result.error) return res.status(500).json({ message: result.error });
    res.json({ status: "success" });
});

async function addNotification(db, token, type, message, time, kill) {
    try {
        const row = await new Promise((resolve, reject) => {
            db.get(
                `SELECT rowid AS id, notifications FROM users WHERE token = ?`,
                [token],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });

        if (!row) throw new Error("Kullanıcı bulunamadı.");

        let notifications = [];
        if (row.notifications) {
            try {
                notifications = JSON.parse(row.notifications);
            } catch (e) {
                console.error("JSON parse error:", e);
                notifications = [];
            }
        }

        if (notifications.length >= 20) {
            notifications.shift();
        }

        notifications.push({ type, message, time, kill });

        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET notifications = ? WHERE rowid = ?`,
                [JSON.stringify(notifications), row.id],
                function(err) {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });

        return notifications;
    } catch (err) {
        console.error("addNotification error:", err);
        throw err;
    }
}

async function updateWorldsProduceTime() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    const now = Date.now();
    const userDurationPercents = {};

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);

        const dbAll = (sql, params = []) =>
            new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));
        const dbRun = (sql, params = []) =>
            new Promise((resolve, reject) => db.run(sql, params, function (err) { err ? reject(err) : resolve(this); }));
        const dbClose = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()));

        try {
            const columns = await dbAll('PRAGMA table_info(users)');
            const colNames = new Set(columns.map(c => c.name));
            const timeColumns = Array.from(colNames).filter(n => n.endsWith('_time'));

            for (const timeCol of timeColumns) {
                if (timeCol.endsWith('_p_time')) {
                    const type = timeCol.replace('_p_time', '');
                    const pCol = `${type}_p`;
                    const paCol = `${type}_p_a`;
                    const pstartCol = `${type}_p_start`;
                    const processingCol = await getProcessingColumn3(type);
                    const processingTimeCol = `${processingCol}_time`;

                    const rows = await dbAll(`SELECT rowid, token, ${timeCol} as t, ${pCol}, ${paCol}, ${pstartCol}${processingCol ? `, ${processingCol}, ${processingTimeCol}` : ''} FROM users WHERE ${timeCol} IS NOT NULL`);

                    for (const row of rows) {
                        if (!userDurationPercents[row.rowid]) userDurationPercents[row.rowid] = 1;

                        let duration = null;
                        if (type === 'farmer' || type === 'woodcutter' || type === 'gold_miner') duration = 20000;
                        else if (type === 'trade_cart' || type === 'watchtower') duration = 300000;
                        else if (type === 'spearman' || type === 'archer') duration = 30000;
                        else if (type === 'spy' || type === 'cataphract' || type === 'swordsman' || type === 'crossbowman') duration = 60000;
                        else if (type === 'arquebusiers') duration = 80000;
                        else if (type === 'knight') duration = 120000;
                        else if (type === 'imperial_spearman') duration = 160000;
                        else if (type === 'ballista' || type === 'onager') duration = 280000;
                        else if (type === 'cannon') duration = 340000;

                        if (row[pstartCol] != null && duration !== null) {
                            let duration_percent = userDurationPercents[row.rowid];

                            while (now >= Number(row[pstartCol]) + duration && row[paCol] > 0) {
                                const updates_p = [
                                    `${type} = ${type} + 1`,
                                    `${paCol} = ${paCol} - 1`,
                                    `${pstartCol} = ${pstartCol} + (${duration} * ${duration_percent})`
                                ];
                                await dbRun(`UPDATE users SET ${updates_p.join(", ")} WHERE rowid = ?`, [row.rowid]);

                                row[pstartCol] = Number(row[pstartCol]) + (duration * duration_percent);
                                row[paCol] = row[paCol] - 1;

                                duration_percent = 1;
                                userDurationPercents[row.rowid] = duration_percent;
                            }
                        } else if (row[pstartCol] == null) {
                            userDurationPercents[row.rowid] = 1;
                        }

                        if (now >= Number(row.t)) {
                            userDurationPercents[row.rowid] = 1;

                            const updates = [
                                `${pCol} = 'off'`,
                                `${timeCol} = NULL`,
                                `${paCol} = 0`,
                                `${pstartCol} = NULL`,
                                `messages_status = messages_status + 1`
                            ];
                            if (processingCol && colNames.has(processingCol)) {
                                updates.push(`${processingCol} = 'off'`);
                                if (processingTimeCol && colNames.has(processingTimeCol)) updates.push(`${processingTimeCol} = NULL`);
                            }

                            await addNotification(db, row.token, "produce", `${type}`, Date.now(), ``);
                            await dbRun(`UPDATE users SET ${updates.join(", ")} WHERE rowid = ?`, [row.rowid]);
                        }
                    }

                } else if (timeCol.endsWith('_processing_time')) {
                    const type = timeCol.replace('_processing_time', '');
                    const processingCol = await getProcessingColumn3(type);
                    const processingTimeCol = timeCol;
					const processingStartTimeColumn = processingCol + "_time_st";

                    if (!processingCol) continue;

                    const rows = await dbAll(`SELECT rowid, ${processingCol} as p, ${processingTimeCol} as t FROM users WHERE ${processingTimeCol} IS NOT NULL`);
                    for (const row of rows) {
                        if (now >= Number(row.t)) {
                            await dbRun(
                                `UPDATE users SET ${processingCol} = 'off', ${processingTimeCol} = NULL, ${processingStartTimeColumn} = NULL WHERE rowid = ?`,
                                [row.rowid]
                            );
                        }
                    }
                }
            }

        } catch (err) {
            console.error(`Error in world ${world}:`, err);
        } finally {
            await dbClose();
        }
    }
}

async function getGainAge(type) {
    if (["farmer", "woodcutter", "gold_miner", "spearman", "archer"].includes(type)) return 4;
    if (["trade_cart", "castle", "wall"].includes(type)) return 50;
    if (["spy", "swordsman", "crossbowman", "knight", "imperial_spearman"].includes(type)) return 6;
    if (["cataphract"].includes(type)) return 8;
    if (["arquebusiers", "farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"].includes(type)) return 10;
    if (["watchtower", "ballista", "onager", "cannon"].includes(type)) return 40;
}

const castle_all_upgrade2 = ["castle", "knight", "imperial_spearman"];
const barracks_all_upgrade2 = ["barracks", "spearman", "archer", "spy", "cataphract", "swordsman", "crossbowman", "arquebusiers"];
const academy_all_upgrade2 = ["academy", "farming", "lumbering", "mining", "blacksmithing", "riding", "geometry", "cartography", "spying", "masonry"];
const workshop_all_upgrade2 = ["workshop", "ballista", "onager", "cannon"];
const market_all_upgrade2 = ["market", "trade_cart"];
const wall_all_upgrade2 = ["wall", "watchtower"];
const village_all_upgrade2 = ["village", "farmer", "woodcutter", "gold_miner"];

async function getProcessingColumn2(type) {
    if (castle_all_upgrade2.includes(type)) return "castle_processing";
    if (barracks_all_upgrade2.includes(type)) return "barracks_processing";
    if (academy_all_upgrade2.includes(type)) return "academy_processing";
    if (workshop_all_upgrade2.includes(type)) return "workshop_processing";
    if (market_all_upgrade2.includes(type)) return "market_processing";
    if (wall_all_upgrade2.includes(type)) return "wall_processing";
    if (village_all_upgrade2.includes(type)) return "village_processing";
    return;
}

async function getProcessingColumn3(type) {
    if (castle_all_upgrade2.includes(type)) return "castle_processing";
    if (barracks_all_upgrade2.includes(type)) return "barracks_processing";
    if (academy_all_upgrade2.includes(type)) return "academy_processing";
    if (workshop_all_upgrade2.includes(type)) return "workshop_processing";
    if (market_all_upgrade2.includes(type)) return "market_processing";
    if (wall_all_upgrade2.includes(type)) return "wall_processing";
    if (village_all_upgrade2.includes(type)) return "village_processing";
    return;
}

async function updateWorldsUpgradeTime() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    const now = Date.now();

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);

        const dbAll = (sql, params = []) =>
            new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));
        const dbRun = (sql, params = []) =>
            new Promise((resolve, reject) => db.run(sql, params, function(err) { err ? reject(err) : resolve(this); }));
        const dbClose = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()));

        try {
            const columns = await dbAll('PRAGMA table_info(users)');
            const colNames = new Set(columns.map(c => c.name));
            const timeColumns = Array.from(colNames).filter(n => n.endsWith('_time'));

            for (const timeCol of timeColumns) {
                if (timeCol.endsWith('_up_time')) {
                    const type = timeCol.replace('_up_time', '');
                    const upCol = `${type}_up`;
                    const lvlCol = `${type}_lvl`;
                    const gainAge = await getGainAge(type);
                    const processingCol = await getProcessingColumn2(type);
                    const processingTimeCol = `${processingCol}_time`;

                    const rows = await dbAll(
                        `SELECT rowid, token, ${timeCol} as t, ${upCol}, ${lvlCol}, age_points${processingCol ? `, ${processingCol}, ${processingTimeCol}` : ''} FROM users WHERE ${timeCol} IS NOT NULL`
                    );

                    for (const row of rows) {
                        if (now >= Number(row.t)) {
                            const updates = [
                                `${upCol} = 'off'`,
                                `${timeCol} = NULL`,
                                `${lvlCol} = ${lvlCol} + 1`,
                                `age_points = age_points + ${gainAge}`,
                                `messages_status = messages_status + 1`
                            ];

                            if (processingCol && colNames.has(processingCol)) {
                                updates.push(`${processingCol} = 'off'`);
                                if (processingTimeCol && colNames.has(processingTimeCol)) updates.push(`${processingTimeCol} = NULL`);
                            }

                            await addNotification(db, row.token, "upgrade", `${type}`, Date.now(), ``);
                            await dbRun(`UPDATE users SET ${updates.join(", ")} WHERE rowid = ?`, [row.rowid]);
                        }
                    }

                } else if (timeCol.endsWith('_processing_time')) {
                    const type = timeCol.replace('_processing_time', '');
                    const processingCol = await getProcessingColumn2(type);
                    const processingTimeCol = timeCol;
					const processingStartTimeColumn = processingCol + "_time_st";

                    if (!processingCol) continue;

                    const rows = await dbAll(
                        `SELECT rowid, ${processingCol} as p, ${processingTimeCol} as t FROM users WHERE ${processingTimeCol} IS NOT NULL`
                    );

                    for (const row of rows) {
                        if (now >= Number(row.t)) {
                            await dbRun(
                                `UPDATE users SET ${processingCol} = 'off', ${processingTimeCol} = NULL, ${processingStartTimeColumn} = NULL WHERE rowid = ?`,
                                [row.rowid]
                            );
                        }
                    }
                }
            }

        } catch (err) {
            console.error(`Error in world ${world}:`, err);
        } finally {
            await dbClose();
        }
    }
}

async function updateWorldsBoostTime() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    const now = Date.now();

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);

        const dbAll = (sql, params = []) =>
            new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));
        const dbRun = (sql, params = []) =>
            new Promise((resolve, reject) => db.run(sql, params, function(err) { err ? reject(err) : resolve(this); }));
        const dbClose = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()));

        try {
            const columns = await dbAll('PRAGMA table_info(users)');
            const colNames = new Set(columns.map(c => c.name));
            const timeColumns = Array.from(colNames).filter(n => n.endsWith('_boost_time'));

            for (const timeCol of timeColumns) {
                const type = timeCol.replace('_boost_time', '');
                const bCol = `${type}_boost`;

                const rows = await dbAll(
                    `SELECT rowid, token, ${timeCol} as t, ${bCol} as boostStatus 
                     FROM users 
                     WHERE ${timeCol} IS NOT NULL AND ${bCol} = 'on'`
                );

                for (const row of rows) {
                    if (now >= Number(row.t)) {
                        const updates = [
                            `${bCol} = 'off'`,
                            `${timeCol} = NULL`,
							`food_percent = 1`,
							`wood_percent = 1`,
							`gold_percent = 1`,
							`messages_status = messages_status + 1`
                        ];
						await addNotification(db, row.token, "boost", `${type}`, Date.now(), ``);
                        await dbRun(`UPDATE users SET ${updates.join(", ")} WHERE rowid = ?`, [row.rowid]);
                    }
                }
            }

        } catch (err) {
            console.error(`Error in world ${world}:`, err);
        } finally {
            await dbClose();
        }
    }
}

async function updateWorldsBonusTime() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    const now = Date.now();

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);

        const dbAll = (sql, params = []) =>
            new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));
        const dbRun = (sql, params = []) =>
            new Promise((resolve, reject) => db.run(sql, params, function(err) { err ? reject(err) : resolve(this); }));
        const dbClose = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()));

        try {
            const columns = await dbAll('PRAGMA table_info(users)');
            const colNames = new Set(columns.map(c => c.name));
            const timeColumns = Array.from(colNames).filter(n => n.endsWith('bonus_time'));

            for (const timeCol of timeColumns) {

                const rows = await dbAll(
                    `SELECT rowid, token, bonus_time as t, bonus as bonusStatus 
                     FROM users 
                     WHERE bonus_time IS NOT NULL AND bonus = 'off'`
                );

                for (const row of rows) {
                    if (now >= Number(row.t)) {
                        const updates = [
                            `bonus = 'on'`,
                            `bonus_time = NULL`,
							`bonus_results = NULL`,
							`messages_status = messages_status + 1`
                        ];
						await addNotification(db, row.token, "bonus", ``, Date.now(), `no`);
                        await dbRun(`UPDATE users SET ${updates.join(", ")} WHERE rowid = ?`, [row.rowid]);
                    }
                }
            }

        } catch (err) {
            console.error(`Error in world ${world}:`, err);
        } finally {
            await dbClose();
        }
    }
}

async function updateWorldsEmailStatus() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    const now = Date.now();

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);

        const dbAll = (sql, params = []) =>
            new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));

        const dbRun = (sql, params = []) =>
            new Promise((resolve, reject) => db.run(sql, params, function(err) { err ? reject(err) : resolve(this); }));

        const dbClose = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()));

        try {
            const rowsEmailChange = await dbAll(
                `SELECT rowid, token, email_change_a, email_change_s, email_changed_s 
                 FROM users 
                 WHERE email_change_a = 'on'`
            );

            for (const row of rowsEmailChange) {
                if (row.email_change_s && now >= Number(row.email_change_s) + 3 * 60 * 1000) {
                    await dbRun(
                        `UPDATE users SET email_change_a = 'off', email_change_s = NULL WHERE rowid = ?`,
                        [row.rowid]
                    );
                }
            }

            const rowsEmailChanged = await dbAll(
                `SELECT rowid, token, email_changed_s 
                 FROM users 
                 WHERE email_changed_s IS NOT NULL AND email_changed_s != 0`
            );

            for (const row of rowsEmailChanged) {
                if (now >= Number(row.email_changed_s) + 24 * 60 * 60 * 1000) {
                    await dbRun(
                        `UPDATE users SET email_changed_s = 0 WHERE rowid = ?`,
                        [row.rowid]
                    );
                }
            }

        } catch (err) {
            console.error(`Error in world ${world}:`, err);
        } finally {
            await dbClose();
        }
    }
}

async function updateWorldsPasswordStatus() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    const now = Date.now();

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);

        const dbAll = (sql, params = []) =>
            new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));

        const dbRun = (sql, params = []) =>
            new Promise((resolve, reject) => db.run(sql, params, function(err) { err ? reject(err) : resolve(this); }));

        const dbClose = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()));

        try {
            const rowsPasswordChange = await dbAll(
                `SELECT rowid, token, password_change_a, password_change_s, password_changed_s 
                 FROM users 
                 WHERE password_change_a = 'on'`
            );

            for (const row of rowsPasswordChange) {
                if (row.password_change_s && now >= Number(row.password_change_s) + 3 * 60 * 1000) {
                    await dbRun(
                        `UPDATE users SET password_change_a = 'off', password_change_s = NULL WHERE rowid = ?`,
                        [row.rowid]
                    );
                }
            }

            const rowsPasswordChanged = await dbAll(
                `SELECT rowid, token, password_changed_s 
                 FROM users 
                 WHERE password_changed_s IS NOT NULL AND password_changed_s != 0`
            );

            for (const row of rowsPasswordChanged) {
                if (now >= Number(row.password_changed_s) + 24 * 60 * 60 * 1000) {
                    await dbRun(
                        `UPDATE users SET password_changed_s = 0 WHERE rowid = ?`,
                        [row.rowid]
                    );
                }
            }

        } catch (err) {
            console.error(`Error in world ${world}:`, err);
        } finally {
            await dbClose();
        }
    }
}


setInterval(updateWorldsUpgradeTime, 1000);
setInterval(updateWorldsProduceTime, 1000);
setInterval(updateWorldsBoostTime, 1000);
setInterval(updateWorldsBonusTime, 1000);
setInterval(updateWorldsEmailStatus, 1000);
setInterval(updateWorldsPasswordStatus, 1000);

setInterval(async () => {
    const now = Date.now();
    for (const [email, data] of verificationCodes) {
        if (data.expiresAt <= now) {
            verificationCodes.delete(email);
        }
    }
}, 180 * 1000);

async function getCapacities(agePoints) {
    if (agePoints < 500) {
        return { gold: Infinity, food: Infinity, wood: Infinity };
    } else if (agePoints < 1500) {
        return { gold: Infinity, food: Infinity, wood: Infinity };
    } else if (agePoints < 5000) {
        return { gold: Infinity, food: Infinity, wood: Infinity };
    } else if (agePoints < 10000) {
        return { gold: Infinity, food: Infinity, wood: Infinity };
    } else {
        return { gold: Infinity, food: Infinity, wood: Infinity };
    }
}

async function updateWorldsResources() {
    const WORLDS_PATH = path.join(__dirname, "worlds");
    const worlds = fs.readdirSync(WORLDS_PATH).filter(f =>
        fs.statSync(path.join(WORLDS_PATH, f)).isDirectory()
    );

    for (const world of worlds) {
        const statusFile = path.join(WORLDS_PATH, world, "status.json");
        const dbFile = path.join(WORLDS_PATH, world, "users_world.db");

        if (!fs.existsSync(statusFile)) continue;
        const statusData = JSON.parse(fs.readFileSync(statusFile, "utf8"));
        if (statusData.status === "close") continue;
        if (!fs.existsSync(dbFile)) continue;

        const db = new sqlite3.Database(dbFile);
        const dbAll = promisify(db.all.bind(db));
        const dbRun = promisify(db.run.bind(db));

        let rows;
        try {
            rows = await dbAll("SELECT * FROM users");
        } catch (err) {
            console.error("DB read error:", err);
            db.close();
            continue;
        }

        for (const user of rows) {
            let food_hour =
                (100 + ((user.farmer * 30) + (user.farmer * user.farmer_lvl * 3))) *
                (user.food_percent + (user.farming_lvl / 100)) -
                user.spearman - user.archer - user.spy - user.cataphract -
                user.swordsman - user.crossbowman - user.arquebusiers - user.ballista -
                user.onager - user.cannon - user.farmer - user.woodcutter - user.gold_miner
				- user.imperial_spearman - user.knight;

            let wood_hour =
                ((user.woodcutter * 20) + (user.woodcutter * user.woodcutter_lvl * 2)) *
                (user.wood_percent + (user.lumbering_lvl / 100));

            let gold_hour =
                ((user.gold_miner * 10) + (user.gold_miner * user.gold_miner_lvl * 1)) *
                (user.gold_percent + (user.mining_lvl / 100)) +
                user.gold_c + user.gold_a + user.gold_city;

            let food_extra_hour = 0;
            if (food_hour < 0) food_extra_hour = -food_hour;

            let food_min = food_hour / 60;
            let wood_min = wood_hour / 60;
            let gold_min = gold_hour / 60;

            const capacities = await getCapacities(user.age_points);

            let newFood = Math.min(Number(user.food) + food_min, capacities.food);
            let newWood = Math.min(Number(user.wood) + wood_min, capacities.wood);
            let newGold = Math.min(Number(user.gold) + gold_min, capacities.gold);

            if (!user._deathBuffer) user._deathBuffer = 0;

            if (food_extra_hour > 0 && newFood <= 0) {
                let food_extra_min = food_extra_hour / 60;
                user._deathBuffer += food_extra_min;

                let deaths = Math.floor(user._deathBuffer);
                if (deaths >= 1) {
                    user._deathBuffer = 0;

                    const deathOrder = [
                        "spearman","archer","knight","spy","ballista","cataphract",
                        "swordsman","crossbowman","onager","imperial_spearman",
                        "arquebusiers","cannon","woodcutter","gold_miner","farmer"
                    ];

                    let updates = [];
                    let params = [];

                    for (let type of deathOrder) {
                        if (deaths <= 0) break;
                        let available = user[type] || 0;
                        if (available > 0) {
                            let kill = Math.min(available, deaths);
                            user[type] -= kill;
                            deaths -= kill;
                            updates.push(`${type} = ?`);
                            params.push(user[type]);

                            await addNotification(db, user.token, "death", `${type}`, Date.now(), `${kill}`);
                        }
                    }

                    await updates.push(`_deathBuffer = ?, messages_status = messages_status + 1`);
                    await params.push(user._deathBuffer);

                    await params.push(user.token);

                    try {
                        await dbRun(`UPDATE users SET ${updates.join(", ")} WHERE token = ?`, params);
                    } catch (err) {
                        console.error("Death update error:", err);
                    }
                } else {
                    try {
                        await dbRun(`UPDATE users SET _deathBuffer = ? WHERE token = ?`, [user._deathBuffer, user.token]);
                    } catch (err) {
                        console.error("Death buffer update error:", err);
                    }
                }
            }

            if (newFood < 0) newFood = 0;

            try {
                await dbRun(
                    `UPDATE users SET food = ?, wood = ?, gold = ? WHERE token = ?`,
                    [newFood, newWood, newGold, user.token]
                );
            } catch (err) {
                console.error("Update error:", err);
            }
        }

        db.close();
    }
}

setInterval(updateWorldsResources, 60000);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
