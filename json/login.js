window.addEventListener('DOMContentLoaded', () => {
	
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

  const langPassword = {
  en: "Password",
  de: "Passwort",
  fr: "Mot de passe",
  es: "Contraseña",
  pt: "Senha",
  tr: "Şifre",
  ru: "Пароль",
  zh: "密码"
  };
  
  const langR_Password = {
  en: "Recover Password",
  de: "Passwort wiederherstellen",
  fr: "Récupérer le mot de passe",
  es: "Recuperar contraseña",
  pt: "Recuperar senha",
  tr: "Şifreyi kurtar",
  ru: "Восстановить пароль",
  zh: "找回密码"
};

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

    const langEnter = {
    en: "Enter ",
    de: "Eingeben ",
    fr: "Entrer ",
    es: "Ingresar ",
    pt: "Digitar ",
    tr: "Gir ",
    ru: "Входить ",
    zh: "进入 "
    };
	
	const langEnter2 = {
  en: "Don't have an account?",
  de: "Sie haben kein Konto?",
  fr: "Vous n'avez pas de compte ?",
  es: "¿No tienes una cuenta?",
  pt: "Não tem uma conta?",
  tr: "Hesabın yok mu?",
  ru: "У вас нет аккаунта?",
  zh: "还没有账号？"
};
	
	const langRegister = {
  en: "Register",
  de: "Registrieren",
  fr: "S'inscrire",
  es: "Registrarse",
  pt: "Registrar-se",
  tr: "Kayıt ol",
  ru: "Зарегистрироваться",
  zh: "注册"
};
  
  const lang = localStorage.getItem("language") || "en";
  const lang_Login = langLogin[lang] || "Login";
  const lang_Password = langPassword[lang] || "Password";
  const lang_R_Password = langR_Password[lang] || "Recover Password";
  const lang_Enter = langEnter[lang] || "Enter";
  const lang_Enter2 = langEnter2[lang] || "Don't have an account?";
  const lang_Register = langRegister[lang] || "Register";
  const lang_Email = langEmail[lang] || "Email";
  
  
  document.getElementById("login_lang").innerText = lang_Login;
  document.getElementById("password_lang").innerText = lang_Password;
  document.getElementById("r_password_lang").innerText = lang_R_Password;
  document.getElementById("enter_lang").innerText = lang_Enter;
  document.getElementById("enter2_lang").innerText = lang_Enter2;
  document.getElementById("register_lang").innerText = lang_Register;
  document.getElementById("email_lang").innerText = lang_Email;
	
	
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const lang = localStorage.getItem('lang') || 'en';
	sessionStorage.setItem('email', email);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, lang })
        });

        const data = await response.json();

        if (data.status === "success") {
            localStorage.setItem('token', data.token);
            showToast(data.message);

            if (data.redirect) {
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