function save() {
	
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
  en: "Recover Password",
  de: "Passwort wiederherstellen",
  fr: "Récupérer le mot de passe",
  es: "Recuperar contraseña",
  pt: "Recuperar senha",
  tr: "Şifreyi Kurtar",
  ru: "Восстановить пароль",
  zh: "找回密码"
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
  
  const lang = localStorage.getItem("language") || "en";
  const lang_Login = langLogin[lang] || "Login";
  const lang_R_Password = langR_Password[lang] || "Recover Password";
  const lang_Send = langSend[lang] || "Send";
  const lang_R2 = langR2[lang] || "Do you already have an account?";
  const lang_Email = langEmail[lang] || "Email";
  
  document.getElementById("login_lang").innerText = lang_Login;
  document.getElementById("r_password_lang").innerText = lang_R_Password;
  document.getElementById("send_lang").innerText = lang_Send;
  document.getElementById("recover2_lang").innerText = lang_R2;
  document.getElementById("email_lang").innerText = lang_Email;
	
}

document.getElementById('recoverForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
	const lang = localStorage.getItem("language") || "en";

    if (!email) {
        showToast("Email and password fields are required.");
        return;
    }

    try {
        const response = await fetch('/recover_code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, lang })
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