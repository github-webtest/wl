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
  
  const langRegister3 = {
  en: "Do you already have an account?",
  de: "Haben Sie bereits ein Konto?",
  fr: "Vous avez déjà un compte ?",
  es: "¿Ya tienes una cuenta?",
  pt: "Você já tem uma conta?",
  tr: "Zaten bir hesabın var mı?",
  ru: "У вас уже есть аккаунт?",
  zh: "您已经有账号了吗？"
};
  
  const lang = localStorage.getItem("language") || "en";
  const lang_Login = langLogin[lang] || "Login";
  const lang_Password = langPassword[lang] || "Password";
  const lang_Register = langRegister[lang] || "Register";
  const lang_Register3 = langRegister3[lang] || "Do you already have an account?";
  const lang_Email = langEmail[lang] || "Email";
  
  document.getElementById("login_lang").innerText = lang_Login;
  document.getElementById("password_lang").innerText = lang_Password;
  document.getElementById("register_lang").innerText = lang_Register;
  document.getElementById("register2_lang").innerText = lang_Register;
  document.getElementById("register3_lang").innerText = lang_Register3;
  document.getElementById("email_lang").innerText = lang_Email;
	
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
	const lang = localStorage.getItem("language") || "en";

    if (!email || !password) {
        showToast("Email and password fields are required.");
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, lang })
        });

        const data = await response.json();

        showToast(data.message);

        if (data.status === "success") {
			sessionStorage.setItem("email", email);

          if (data.redirect) {
            window.location.href = data.redirect;
           }
		
		}

    } catch {
        console.error('Error:', err);
        showToast("Server error.");
    }
});