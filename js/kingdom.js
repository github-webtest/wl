const token = localStorage.getItem("token");
const world = localStorage.getItem("world");
let c_email_s = 0;

const langBonus = {
    en: "Bonus",
    de: "Bonus",
    fr: "Bonus",
    es: "Bono",
    pt: "Bônus",
    tr: "Bonus",
    ru: "Бонус",
    zh: "加成",
    };
	
	const langTasks = {
    en: "Tasks",
    de: "Aufgaben",
    fr: "Tâches",
    es: "Tareas",
    pt: "Tarefas",
    tr: "Görevler",
    ru: "Задания",
    zh: "任务",
    };
	
	const langMessages = {
    en: "Messages",
    de: "Nachrichten",
    fr: "Messages",
    es: "Mensajes",
    pt: "Mensagens",
    tr: "Mesajlar",
    ru: "Сообщения",
    zh: "消息",
    };
	
	const langProcesses = {  
    en: "Processes",
    de: "Prozesse",
    fr: "Processus",
    es: "Procesos",
    pt: "Processos",
    tr: "İşlemler",
    ru: "Процессы",
    zh: "进程",
    };
	
	const langSettings = {   
    en: "Settings",
    de: "Einstellungen",
    fr: "Paramètres",
    es: "Configuración",
    pt: "Configurações",
    tr: "Ayarlar",
    ru: "Настройки",
    zh: "设置",
    };
	
	const langKN = {    
    en: "Lord Name", 
    de: "Lordname",
    fr: "Nom du seigneur",
    es: "Nombre del señor",
    pt: "Nome do senhor",
    tr: "Lord Adı",
    ru: "Имя лорда",
    zh: "领主的名字",
    };
	
	const langWorld = {     
    en: "World: ",  
    de: "Welt: ",
    fr: "Monde : ",
    es: "Mundo: ",
    pt: "Mundo: ",
    tr: "Dünya: ",
    ru: "Мир: ",
    zh: "世界: ",
    };
	
	const langSave = {      
    en: "Save",   
    de: "Speichern",
    fr: "Enregistrer",
    es: "Guardar",
    pt: "Salvar",
    tr: "Kaydet",
    ru: "Сохранить",
    zh: "保存",
    };
	
	const langKN2 = {    
    en: "Lord Name (max 12 chars)", 
    de: "Lordname (max. 12 Zeichen)",
    fr: "Nom du seigneur (12 caractères max.)",
    es: "Nombre del señor (máx. 12 caracteres)",
    pt: "Nome do senhor (máx. 12 caracteres)",
    tr: "Lord Adı (en fazla 12 karakter)",
    ru: "Имя лорда (макс. 12 символов)",
    zh: "领主的名字 (最多12个字符)",
    };
	
	const langLanguage = {     
    en: "Language", 
    de: "Sprache",
    fr: "Langue",
    es: "Idioma",
    pt: "Idioma",
    tr: "Dil",
    ru: "Язык",
    zh: "语言",
    };
	
	const langFlag = {     
    en: "url('images/en_flag.png')", 
    de: "url('images/de_flag.png')",
    fr: "url('images/fr_flag.png')",
    es: "url('images/es_flag.png')",
    pt: "url('images/pt_flag.png')",
    tr: "url('images/tr_flag.png')",
    ru: "url('images/ru_flag.png')",
    zh: "url('images/zh_flag.png')",
    };
	
	const langLangs = {     
    en: "English", 
    de: "Deutsch",
    fr: "Français",
    es: "Español",
    pt: "Português",
    tr: "Türkçe",
    ru: "Русский",
    zh: "中国人",
    };
	
	const langAccount = {       
    en: "Account",  
    de: "Konto",  
    fr: "Compte",  
    es: "Cuenta",  
    pt: "Conta",  
    tr: "Hesap",  
    ru: "Аккаунт",  
    zh: "账户",  
    };
	
	const langCPassword = {       
    en: "Change Password",  
    de: "Passwort ändern",  
    fr: "Changer de passe",  
    es: "Cambiar contraseña",  
    pt: "Alterar senha",  
    tr: "Şifre Değiştir",  
    ru: "Сменить пароль",  
    zh: "修改密码",  
    };
	
	const langCEmail = {        
    en: "Change Email",   
    de: "E-Mail ändern",  
    fr: "Changer l'e-mail",  
    es: "Cambiar correo electrónico",  
    pt: "Alterar e-mail",  
    tr: "E-postayı Değiştir",  
    ru: "Изменить электронную почту",  
    zh: "修改电子邮件",  
    };
	
	const langSupport = {          
    en: "Support",     
    de: "Support",  
    fr: "Support",  
    es: "Soporte",  
    pt: "Suporte",  
    tr: "Destek",  
    ru: "Поддержка",  
    zh: "支持",  
    };
	
	const langExit = {           
    en: "Exit",     
    de: "Beenden",  
    fr: "Quitter",  
    es: "Salir",  
    pt: "Sair",  
    tr: "Çıkış",  
    ru: "Выход",  
    zh: "退出",  
    };
	
	const langESEND = {            
    en: "A verification code has been sent to your email address.",     
    de: "Ein Bestätigungscode wurde an Ihre E-Mail-Adresse gesendet.",  
    fr: "Un code de vérification a été envoyé à votre adresse e-mail.",  
    es: "Se ha enviado un código de verificación a su dirección de correo electrónico.",  
    pt: "Um código de verificação foi enviado para o seu endereço de e-mail.",  
    tr: "E-posta adresinize bir doğrulama kodu gönderildi.",  
    ru: "Код подтверждения был отправлен на ваш адрес электронной почты.",  
    zh: "验证码已发送到您的电子邮箱。",  
    };
	
	const langESEND2 = {            
    en: "Enter your new email address.",     
    de: "Geben Sie Ihre neue E-Mail-Adresse ein.",  
    fr: "Entrez votre nouvelle adresse e-mail.",  
    es: "Ingrese su nueva dirección de correo electrónico.",  
    pt: "Digite seu novo endereço de e-mail.",  
    tr: "Yeni e-posta adresinizi girin.",  
    ru: "Введите ваш новый адрес электронной почты.",  
    zh: "输入您的新电子邮箱地址。",  
    };
	
	const langESEND3 = {
    en: "Enter New Password",
    de: "Neues Passwort eingeben",
    fr: "Entrez le nouveau mot de passe",
    es: "Ingrese la nueva contraseña",
    pt: "Digite a nova senha",
    tr: "Yeni şifreyi girin",
    ru: "Введите новый пароль",
    zh: "输入新密码",
    };
	
	const langESEND4 = {            
    en: "A verification code has been sent to your new email address.",     
    de: "Ein Bestätigungscode wurde an Ihre neue E-Mail-Adresse gesendet.",  
    fr: "Un code de vérification a été envoyé à votre nouvelle adresse e-mail.",  
    es: "Se ha enviado un código de verificación a su nueva dirección de correo electrónico.",  
    pt: "Um código de verificação foi enviado para o seu novo endereço de e-mail.",  
    tr: "Yeni e-posta adresinize bir doğrulama kodu gönderildi.",  
    ru: "Код подтверждения был отправлен на ваш новый адрес электронной почты.",  
    zh: "验证码已发送到您的新电子邮箱。",  
    };
	
	const langSend = {             
    en: "Send",      
    de: "Senden",  
    fr: "Envoyer",  
    es: "Enviar",  
    pt: "Enviar",  
    tr: "Gönder",  
    ru: "Отправить",  
    zh: "发送",  
    };
	
	const Resend = {             
    en: "Resend",      
    de: "E. senden",  
    fr: "Renvoyer",  
    es: "Reenviar",  
    pt: "Reenviar",  
    tr: "Y. Gönder",  
    ru: "Повторить",  
    zh: "重发",  
    };

	const lang = localStorage.getItem("language") || "en";
	const lang_Messages = langMessages[lang] || "Messages";
	const lang_Resend = Resend[lang] || "Resend";
	const lang_Processes = langProcesses[lang] || "Processes";
    const lang_Bonus = langBonus[lang] || "Bonus";
	const lang_Tasks = langTasks[lang] || "Tasks";
	const lang_Settings = langSettings[lang] || "Settings";
	const lang_KN = langKN[lang] || "Lord Name";
	const lang_World = langWorld[lang] || "World: ";
	const lang_Save = langSave[lang] || "Save";
	const lang_KN2 = langKN2[lang] || "Lord Name (max 12 chars)";
	const lang_Language = langLanguage[lang] || "Language";
	const lang_Flag = langFlag[lang] || "images/en_flag.png";
	const lang_Langs = langLangs[lang] || "English";
	const lang_Account = langAccount[lang] || "Account";
	const lang_CPassword = langCPassword[lang] || "Change Password";
	const lang_CEmail = langCEmail[lang] || "Change Email";
	const lang_Support = langSupport[lang] || "Support";
	const lang_Exit = langExit[lang] || "Exit";
	const lang_Send = langSend[lang] || "Send";
	const lang_ESEND = langESEND[lang] || "A verification code has been sent to your email address.";
	const lang_ESEND2 = langESEND2[lang] || "Enter your new email address.";
	const lang_ESEND3 = langESEND3[lang] || "Enter New Password.";
	const lang_ESEND4 = langESEND4[lang] || "A verification code has been sent to your new email address.";

async function save() {
	
	const screenwidth = window.innerWidth;
	document.getElementById('set_flag').style.backgroundImage = lang_Flag;
	document.getElementById('language').innerText = lang_Langs;
	document.getElementById("world").innerText = localStorage.getItem("world");
	
	if (screenwidth > 500) {
		
		const mresult = (screenwidth - 500) / 2;
		const mresult2 = ((screenwidth - 500) / 2) + 10;
		document.getElementById("top_menus3").style.right = mresult + "px";
		document.getElementById("bottom_menus_img_id").style.right = mresult2 + "px";
		
	}
	
	document.getElementById("lang_messages").innerText = lang_Messages;
	document.getElementById("lang_processes").innerText = lang_Processes;
	document.getElementById("lang_tasks").innerText = lang_Tasks;

    if (token == null || world == null) return;

   try {
    const response = await fetch("/users_world", {
        method: "POST",               
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ token, world })
    });

    const data = await response.json();

    if (!data.error) {
        document.getElementById("diamond").innerText = data.diamond;
		document.getElementById("gold").innerText = formatNumber(data.gold);
        document.getElementById("food").innerText = formatNumber(data.food);
		document.getElementById("wood").innerText = formatNumber(data.wood);
		document.getElementById("age_points").innerText = data.age_points;
		document.getElementById("lordname_input").value = data.lord_name;
		c_email_s = data.email_changed_s;
		c_password_s = data.password_changed_s;
		
		if (data.messages_status > 0 && data.messages_status < 10) {
			document.getElementById("message_box_bg").style.backgroundImage = `url('images/messages_box_${data.messages_status}.png')`;
		} else if (data.messages_status >= 10) {
			document.getElementById("message_box_bg").style.backgroundImage = "url('images/messages_box_10.png')";
		} else {
			document.getElementById("message_box_bg").style.backgroundImage = "url('images/messages_box.png')";
		}
		
		if (data.food < 1 && data.food > 0) {
			document.getElementById("food").innerText = Math.max(data.food, 0).toFixed(2);
		}
		
		let food_hour = (100 + ((data.farmer * 30) + (data.farmer * data.farmer_lvl * 3))) * 
                 (data.food_percent + (data.farming_lvl / 100)) - 
                  data.spearman - data.archer - data.spy - data.cataphract - 
                  data.swordsman - data.crossbowman - data.arquebusiers - data.ballista - 
                  data.onager - data.cannon - data.farmer - data.woodcutter - data.gold_miner -
				  data.knight - data.imperial_spearman;
		
		if (food_hour < 0) {
			document.getElementById("food").style.animation = "food_red 2s infinite";
		}
		
		if (data.bonus == 'on') {
			document.getElementById("bonus_icon_img").style.backgroundImage = "url('images/bonus_box1.png')";
			document.getElementById("lang_bonus").style.display = "block";
			document.getElementById("bonus_time").style.display = "none";
		} else {
			    document.getElementById("bonus_icon_img").style.backgroundImage = "url('images/bonus_box2.png')";
                document.getElementById("lang_bonus").style.display = "none";
			    document.getElementById("bonus_time").style.display = "block";

                const startTime = Number(sessionStorage.getItem("time"));
                const endTime = data.bonus_time;

                let remaining = "00:00:00:00";

                if (startTime != null && endTime != null) {
                    let diff = endTime - startTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000) % 60;
                    const minutes = Math.floor(diff / (1000 * 60)) % 60;
                    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                    const pad = (n) => n.toString().padStart(2, "0");
                    remaining = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                }

            document.getElementById("bonus_time").innerText = remaining;
        }
			
		if (data.lord_name_changed == 'yes') {
			document.getElementById("l_n_max12").style.display = "none";
			document.getElementById("ln_div_id1").style.display = "none";
			document.getElementById("ln_div_id2").style.display = "flex";
			document.getElementById("ln_div_id2").innerHTML = `<div class="lord_name_te">${data.lord_name}</div>`;
		}
		
		if (data.barracks_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.barracks_processing_time; 
		 const barStart = data.barracks_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("barracks_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("barracks_div_click").innerHTML = "";
		}
		
		if (data.castle_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.castle_processing_time; 
		 const barStart = data.castle_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("castle_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("castle_div_click").innerHTML = "";
		}
		
		if (data.academy_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.academy_processing_time; 
		 const barStart = data.academy_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("academy_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("academy_div_click").innerHTML = "";
		}
		
		if (data.workshop_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.workshop_processing_time; 
		 const barStart = data.workshop_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("workshop_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("workshop_div_click").innerHTML = "";
		}
		
		if (data.market_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.market_processing_time; 
		 const barStart = data.market_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("market_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("market_div_click").innerHTML = "";
		}
		
		if (data.wall_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.wall_processing_time; 
		 const barStart = data.wall_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("wall_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("wall_div_click").innerHTML = "";
		}
		
		if (data.village_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.village_processing_time; 
		 const barStart = data.village_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("village_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("village_div_click").innerHTML = "";
		}
		
		let location_id = data.player_id;

		let location_x = ((location_id - 1) % 500) + 1;
		let location_y = Math.floor((location_id - 1) / 500) + 1;
		localStorage.setItem("x", location_x);
		localStorage.setItem("y", location_y);

		document.getElementById("map_onclick").onclick = function() {
    		window.location.href = `map.html?x=${location_x}&y=${location_y}`;
		};
		
    }
   } catch (err) {
    console.error("Error:", err);
   }
	
}

function showSettings(x) {
	document.getElementById("build_info_bg").style.display = "flex";
	document.getElementById("show_info_title").innerText = lang_Settings;
	document.getElementById("world_lang").innerText = lang_World;
	document.getElementById("lordname_lang").innerText = lang_KN;
	document.getElementById("save_lang").innerText = lang_Save;
	document.getElementById("lordname_lang2").innerText = lang_KN2;
	document.getElementById("language_lang").innerText = lang_Language;
	document.getElementById("language_lang2").innerText = lang_Language;
	document.getElementById("account_lang").innerText = lang_Account;
	document.getElementById("cpassword_lang").innerText = lang_CPassword;
	document.getElementById("cpassword_lang2").innerText = lang_CPassword;
	document.getElementById("cpassword_lang3").innerText = lang_CPassword;
	document.getElementById("cemail_lang").innerText = lang_CEmail;
	document.getElementById("cemail_lang2").innerText = lang_CEmail;
	document.getElementById("cemail_lang3").innerText = lang_CEmail;
	document.getElementById("cemail_lang4").innerText = lang_CEmail;
	document.getElementById("support_lang").innerText = lang_Support;
	document.getElementById("exit_lang").innerText = lang_Exit;
	document.getElementById("esend_lang").innerText = lang_ESEND;
	document.getElementById("esend_lang2").innerText = lang_ESEND;
	document.getElementById("esend_lang3").innerText = lang_ESEND2;
	document.getElementById("esend_lang4").innerText = lang_ESEND4;
	document.getElementById("esend_lang5").innerText = lang_ESEND3;
	document.getElementById("send_lang").innerText = lang_Send;
	document.getElementById("send_lang2").innerText = lang_Send;
	document.getElementById("send_lang3").innerText = lang_Send;
	document.getElementById("send_lang4").innerText = lang_Send;
	document.getElementById("send_lang5").innerText = lang_Send;
	document.getElementById("resend_lang1").innerText = lang_Resend;
	document.getElementById("resend_lang2").innerText = lang_Resend;
	document.getElementById("resend_lang3").innerText = lang_Resend;
	
	document.getElementById("show_iner1").style.display = "block";
	document.getElementById("show_iner2").style.display = "none";
	document.getElementById("show_iner3").style.display = "none";
	document.getElementById("show_iner4").style.display = "none";
	document.getElementById("show_iner5").style.display = "none";
	document.getElementById("show_iner6").style.display = "none";
	document.getElementById("show_iner7").style.display = "none";
	
	const lang = localStorage.getItem("language");
	
	
	if (x == "Exit") {
		document.getElementById("build_info_bg").style.display = "none";
	} else if (x == "Flags") {
		document.getElementById("show_iner1").style.display = "none";
		document.getElementById("show_iner2").style.display = "block";
		document.getElementById("show_iner3").style.display = "none";
		document.getElementById("show_iner4").style.display = "none";
		document.getElementById("show_iner5").style.display = "none";
		document.getElementById("show_iner6").style.display = "none";
		document.getElementById("show_iner7").style.display = "none";
	} else if (x == "Back") {
		document.getElementById("show_iner1").style.display = "block";
		document.getElementById("show_iner2").style.display = "none";
		document.getElementById("show_iner3").style.display = "none";
		document.getElementById("show_iner4").style.display = "none";
		document.getElementById("show_iner5").style.display = "none";
		document.getElementById("show_iner6").style.display = "none";
		document.getElementById("show_iner7").style.display = "none";
	} else if (x == "Lang_EN") {
		localStorage.setItem("language", "en");
		location.reload();
	} else if (x == "Lang_DE") {
		localStorage.setItem("language", "de");
		location.reload();
	} else if (x == "Lang_FR") {
		localStorage.setItem("language", "fr");
		location.reload();
	} else if (x == "Lang_ES") {
		localStorage.setItem("language", "es");
		location.reload();
	} else if (x == "Lang_PT") {
		localStorage.setItem("language", "pt");
		location.reload();
	} else if (x == "Lang_TR") {
		localStorage.setItem("language", "tr");
		location.reload();
	} else if (x == "Lang_RU") {
		localStorage.setItem("language", "ru");
		location.reload();
	} else if (x == "Lang_ZH") {
		localStorage.setItem("language", "zh");
		location.reload();
	} else if (x == "CEmail" && c_email_s == 0) {
		document.getElementById("show_iner1").style.display = "none";
		document.getElementById("show_iner2").style.display = "none";
		document.getElementById("show_iner3").style.display = "block";
		document.getElementById("show_iner4").style.display = "none";
		document.getElementById("show_iner5").style.display = "none";
		document.getElementById("show_iner6").style.display = "none";
		document.getElementById("show_iner7").style.display = "none";

		fetch("/change_email_code_1", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
		
		
	} else if (x == "CPassword" && c_password_s == 0) {
		document.getElementById("show_iner1").style.display = "none";
		document.getElementById("show_iner2").style.display = "none";
		document.getElementById("show_iner3").style.display = "none";
		document.getElementById("show_iner4").style.display = "block";
		document.getElementById("show_iner5").style.display = "none";
		document.getElementById("show_iner6").style.display = "none";
		document.getElementById("show_iner7").style.display = "none";

		fetch("/change_password_code", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
		
		
	} else if (x == "NewEmail1") {
		document.getElementById("show_iner1").style.display = "none";
		document.getElementById("show_iner2").style.display = "none";
		document.getElementById("show_iner3").style.display = "none";
		document.getElementById("show_iner4").style.display = "none";
		document.getElementById("show_iner5").style.display = "block";
		document.getElementById("show_iner6").style.display = "none";
		document.getElementById("show_iner7").style.display = "none";
	} else if (x == "NewEmail2") {
		document.getElementById("show_iner1").style.display = "none";
		document.getElementById("show_iner2").style.display = "none";
		document.getElementById("show_iner3").style.display = "none";
		document.getElementById("show_iner4").style.display = "none";
		document.getElementById("show_iner5").style.display = "none";
		document.getElementById("show_iner6").style.display = "block";
		document.getElementById("show_iner7").style.display = "none";
	} else if (x == "NewPassword") {
		document.getElementById("show_iner1").style.display = "none";
		document.getElementById("show_iner2").style.display = "none";
		document.getElementById("show_iner3").style.display = "none";
		document.getElementById("show_iner4").style.display = "none";
		document.getElementById("show_iner5").style.display = "none";
		document.getElementById("show_iner6").style.display = "none";
		document.getElementById("show_iner7").style.display = "block";
	} else if (x == "CEmail" && c_email_s > 0) {
		
		showToast("Email can be changed once a day.");
		
	} else if (x == "CPassword" && c_password_s > 0) {
		
		showToast("Password can be changed once a day.");
		
	}
	
}

function formatNumber(num) {
    if (num === null || num === undefined) return "0";

    num = Math.floor(num);

    function truncate(value, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.floor(value * factor) / factor;
    }

    if (num >= 1_000_000_000) return truncate(num / 1_000_000_000, num >= 100_000_000_000 ? 1 : 2) + "B";
    if (num >= 1_000_000)     return truncate(num / 1_000_000, num >= 100_000_000 ? 1 : 2) + "M";
    if (num >= 10_000)        return truncate(num / 1_000, num >= 100_000 ? 1 : 2) + "K";

    if (num >= 1_000) return num.toLocaleString("en-US"); 

    return num.toString();
}

setInterval(async () => {

    if (token == null || world == null) return;

    try {
        const response = await fetch("/users_world", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, world })
        });

        const data = await response.json();

        if (!data.error) {
			document.getElementById("diamond").innerText = data.diamond;
            document.getElementById("food").innerText = formatNumber(data.food);
            document.getElementById("wood").innerText = formatNumber(data.wood);
            document.getElementById("gold").innerText = formatNumber(data.gold);
            document.getElementById("age_points").innerText = data.age_points;
			c_email_s = data.email_changed_s;
		    c_password_s = data.password_changed_s;
			
			if (data.messages_status > 0 && data.messages_status < 10) {
			document.getElementById("message_box_bg").style.backgroundImage = `url('images/messages_box_${data.messages_status}.png')`;
			} else if (data.messages_status >= 10) {
			document.getElementById("message_box_bg").style.backgroundImage = "url('images/messages_box_10.png')";
			} else {
			document.getElementById("message_box_bg").style.backgroundImage = "url('images/messages_box.png')";
			}
			
			if (data.food < 1 && data.food > 0) {
			document.getElementById("food").innerText = Math.max(data.food, 0).toFixed(2);
		    }
			
			let food_hour =
            (data.food_p + ((data.farmer * 30) + (data.farmer * data.farmer_lvl * 3))) *
            (data.food_percent + (data.farming_lvl / 100)) -
             data.food_m - data.spearman - data.archer - data.spy - data.cataphract -
             data.swordsman - data.crossbowman - data.arquebusiers - data.ballista -
             data.onager - data.cannon - data.farmer - data.woodcutter -
             data.gold_miner - data.knight - data.imperial_spearman;
		
		    if (food_hour < 0) {
			   document.getElementById("food").style.animation = "food_red 2s infinite";
		    }
			
			if (data.bonus == 'on') {
			document.getElementById("bonus_icon_img").style.backgroundImage = "url('images/bonus_box1.png')";
			document.getElementById("lang_bonus").style.display = "block";
			document.getElementById("bonus_time").style.display = "none";
		    } else {
			    document.getElementById("bonus_icon_img").style.backgroundImage = "url('images/bonus_box2.png')";
                document.getElementById("lang_bonus").style.display = "none";
			    document.getElementById("bonus_time").style.display = "block";

                const startTime = Number(sessionStorage.getItem("time"));
                const endTime = data.bonus_time;

                let remaining = "00:00:00:00";

                if (startTime != null && endTime != null) {
                    let diff = endTime - startTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000) % 60;
                    const minutes = Math.floor(diff / (1000 * 60)) % 60;
                    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                    const pad = (n) => n.toString().padStart(2, "0");
                    remaining = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                }

                document.getElementById("bonus_time").innerText = remaining;
            }
			
			if (data.lord_name_changed == 'yes') {
				document.getElementById("l_n_max12").style.display = "none";
				document.getElementById("ln_div_id1").style.display = "none";
				document.getElementById("ln_div_id2").style.display = "flex";
				document.getElementById("ln_div_id2").innerHTML = `<div class="lord_name_te">${data.lord_name}</div>`;
			}
			
			if (data.barracks_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.barracks_processing_time; 
		 const barStart = data.barracks_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("barracks_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("barracks_div_click").innerHTML = "";
		}
		
		if (data.castle_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.castle_processing_time; 
		 const barStart = data.castle_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("castle_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("castle_div_click").innerHTML = "";
		}
		
		if (data.academy_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.academy_processing_time; 
		 const barStart = data.academy_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("academy_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("academy_div_click").innerHTML = "";
		}
		
		if (data.workshop_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.workshop_processing_time; 
		 const barStart = data.workshop_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("workshop_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("workshop_div_click").innerHTML = "";
		}
		
		if (data.market_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.market_processing_time; 
		 const barStart = data.market_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("market_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("market_div_click").innerHTML = "";
		}
		
		if (data.wall_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.wall_processing_time; 
		 const barStart = data.wall_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("wall_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("wall_div_click").innerHTML = "";
		}
		
		if (data.village_processing_time > 0) {

		 const nowTime = Number(sessionStorage.getItem("time"));
		 const endTime = data.village_processing_time; 
		 const barStart = data.village_processing_time_st;

		 let remaining = "00:00:00:00";
		 let percent = 0;

		 if (nowTime != null && endTime != null) {
			let diff = endTime - nowTime;
			if (diff < 0) diff = 0;

			const seconds = Math.floor(diff / 1000) % 60;
			const minutes = Math.floor(diff / (1000 * 60)) % 60;
			const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			const pad = (n) => n.toString().padStart(2, "0");
			remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

			const total = endTime - barStart;
			const elapsed = nowTime - barStart;
			percent = (elapsed / total) * 100;
			if (percent < 0) percent = 0;
			if (percent > 100) percent = 100;
		 }

			document.getElementById("village_div_click").innerHTML = `<div class="processing_timer_center">
			<div class="processing_timer_text">${remaining}</div>
			<div class="processing_timer_div">
			<div class="processing_timer_in" style="width:${percent}%"></div>
			</div>
			</div>`;
		} else {
			document.getElementById("village_div_click").innerHTML = "";
		}
			
        }
    } catch (err) {
        console.error("Error:" + err);
    }
}, 1000);

async function Lord_Name_Change() {
    const lang = localStorage.getItem("language");

    const lord_name = document.getElementById("lordname_input").value;

    try {
        const response = await fetch('/lord_name_change', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, lord_name, lange: lang })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

function Resend_Code_Email_1() {
	
	const lang = localStorage.getItem("language");
	
	fetch("/change_email_code_1", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Send_Code_Email_1() {
	
	const lang = localStorage.getItem("language");
	const code = document.getElementById("cemail_code_input").value;
	
	fetch("/verification_email_1", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, code, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showSettings("NewEmail1");
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Send_Email() {
	
	const lang = localStorage.getItem("language");
	const email = document.getElementById("newemail_input").value;
	
	fetch("/change_email_code_2", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, email, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showSettings("NewEmail2");
			showToast(data.message);
			sessionStorage.setItem("email", email);
			document.getElementById("newemail_input").value = "";
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Resend_Code_Email_2() {
	
	const lang = localStorage.getItem("language");
	const email = sessionStorage.getItem("email");
	
	fetch("/change_email_code_2", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, email: email, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
		
}

function Send_Code_Email_2() {
	
	const lang = localStorage.getItem("language");
	const email = sessionStorage.getItem("email");
	const code = document.getElementById("newemail_code_input").value;
	
	fetch("/verification_email_2", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, code, email, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showSettings("NewEmail3");
			showToast(data.message);
			sessionStorage.removeItem("email");
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Resend_Code_Password() {
	
	const lang = localStorage.getItem("language");
	
	fetch("/change_password_code", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Send_Code_Password() {
	
	const lang = localStorage.getItem("language");
	const code = document.getElementById("cpassword_code_input").value;
	
	fetch("/verification_password_1", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, code, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showSettings("NewPassword");
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Send_New_Password() {
	
	const lang = localStorage.getItem("language");
	const password = document.getElementById("newpassword_input").value;
	
	fetch("/verification_password_2", {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world, password, lang })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			showSettings("Back");
			showToast(data.message);
    	} else {
			console.error("Error:", data.message);
			showToast(data.message);
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}

function Go_Url(x) {
	
	fetch(`/${x}_status`, {
    		method: "POST",
    		headers: {
        		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({ token, world })
		})
		.then(response => response.json())
		.then(data => {
    	if (data.status === "success") {
			window.location.href = `${x}.html`;
    	} else {
			console.error("Error:");
    	}
		})
		.catch(err => {
			console.error("Fetch error:", err);
			showToast("Server error. Please try again later.");
		});
	
}