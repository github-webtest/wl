document.addEventListener('DOMContentLoaded', () => {
	
	const langEmail = {
  en: "Email",
  de: "E-Mail",
  fr: "Email",
  es: "Correo electrónico",
  pt: "Email",
  tr: "E-posta",
  ru: "Электронная почта",
  zh: "电子邮件"
};

const langDidntReceive = {
  en: "Didn't receive the code?",
  de: "Code nicht erhalten?",
  fr: "Vous n'avez pas reçu le code ?",
  es: "¿No recibiste el código?",
  pt: "Não recebeu o código?",
  tr: "Kodu almadınız mı?",
  ru: "Не получили код?",
  zh: "没有收到验证码？"
};
	
	const langVerification = {
  en: "Verification Code",
  de: "Verifizierungscode",
  fr: "Code de vérification",
  es: "Código de verificación",
  pt: "Código de verificação",
  tr: "Doğrulama Kodu",
  ru: "Код подтверждения",
  zh: "验证码"
};
	
	const langLogin = {
    en: "Login",
    de: "Login",
    fr: "Se connecter",
    es: "Acceso",
    pt: "Conecte-se",
    tr: "Giriş",
    ru: "Авторизоваться",
    zh: "登录"
  };
  
  const langR_Password = {
  en: "Confirm Email",
  de: "E-Mail bestätigen",
  fr: "Confirmer l'e-mail",
  es: "Confirmar correo electrónico",
  pt: "Confirmar e-mail",
  tr: "E-postayı Onayla",
  ru: "Подтвердить электронную почту",
  zh: "确认邮箱"
};

const langSend = {
  en: "Send",
  de: "Senden",
  fr: "Envoyer",
  es: "Enviar",
  pt: "Enviar",
  tr: "Gönder",
  ru: "Отправить",
  zh: "发送"
};

const langR2 = {
  en: "Do you already have an account?",
  de: "Haben Sie bereits ein Konto?",
  fr: "Vous avez déjà un compte ?",
  es: "¿Ya tienes una cuenta?",
  pt: "Você já tem uma conta?",
  tr: "Zaten bir hesabın var mı?",
  ru: "У вас уже есть аккаунт?",
  zh: "您已经有账号了吗？"
};

const langResend = {
  en: "Resend",
  de: "Erneut senden",
  fr: "Renvoyer",
  es: "Reenviar",
  pt: "Reenviar",
  tr: "Tekrar Gönder",
  ru: "Отправить снова",
  zh: "重新发送"
};
  
  const lang = localStorage.getItem("language") || "en";
  const lang_Login = langLogin[lang] || "Login";
  const lang_R_Password = langR_Password[lang] || "Confirm Email";
  const lang_Send = langSend[lang] || "Send";
  const lang_R2 = langR2[lang] || "Do you already have an account?";
  const lang_Verification = langVerification[lang] || "Email";
  const lang_DidntReceive = langDidntReceive[lang] || "Didn't receive the code?";
  const lang_Resend = langResend[lang] || "Resend";
  
  document.getElementById("login_lang").innerText = lang_Login;
  document.getElementById("r_password_lang").innerText = lang_R_Password;
  document.getElementById("send_lang").innerText = lang_Send;
  document.getElementById("recover2_lang").innerText = lang_R2;
  document.getElementById("ver_lang").innerText = lang_Verification;
  document.getElementById("resend1_lang").innerText = lang_DidntReceive;
  document.getElementById("resend2_lang").innerText = lang_Resend;
	
});

document.getElementById('verificationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
	const email = sessionStorage.getItem("email");
    const code = document.getElementById("code").value;

    try {
        const response = await fetch('/verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        });

        const data = await response.json();

        if (data.status === "success") {
            localStorage.setItem('token', data.token);
            showToast(data.message);

            if (data.redirect) {
				sessionStorage.removeItem("email");
                window.location.href = data.redirect;
            }
			

        } else {
            showToast(data.message);

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        }

    } catch {
        console.error('Error:', err);
        showToast("An error occurred. Please try again.");
    }
});

document.getElementById('resend2_lang').addEventListener('click', async () => {
	
    const email = sessionStorage.getItem("email");
    const lang = sessionStorage.getItem("lang") || "en";
    
    if (!email) {
        showToast("Email not found. Please register again.", "error");
        return;
    }

    try {
        const response = await fetch('/resend-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, lang })
        });

        const data = await response.json();

        if (data.status === "success") {
            showToast(data.message, "success");
        } else {
            showToast(data.message, "error");
        }

    } catch {
        console.error('Error:', err);
        showToast("An error occurred. Please try again.", "error");
    }
});