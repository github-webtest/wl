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
	
const langNotification = {
    en: "Notification",
    de: "Benachrichtigungen",
    fr: "Notifications",
    es: "Notificaciones",
    pt: "Notificações",
    tr: "Bildirimler",
    ru: "Уведомления",
    zh: "通知",
};

const langTimeAgo = {
    en: { second: " second ago", minute: " minute ago", hour: " hour ago", day: " day ago", week: " week ago", month: " month ago", year: " year ago" },
    de: { second: " Sekunde zuvor", minute: " Minute zuvor", hour: " Stunde zuvor", day: " Tag zuvor", week: " Woche zuvor", month: " Monat zuvor", year: " Jahr zuvor" },
    fr: { second: " seconde(s) auparavant", minute: " minute(s) auparavant", hour: " heure(s) auparavant", day: " jour(s) auparavant", week: " semaine(s) auparavant", month: " mois auparavant", year: " an(s) auparavant" },
    es: { second: " segundo(s) atrás", minute: " minuto(s) atrás", hour: " hora(s) atrás", day: " día(s) atrás", week: " semana(s) atrás", month: " mes(es) atrás", year: " año(s) atrás" },
    pt: { second: " segundo(s) atrás", minute: " minuto(s) atrás", hour: " hora(s) atrás", day: " dia(s) atrás", week: " semana(s) atrás", month: " mês(es) atrás", year: " ano(s) atrás" },
    tr: { second: " saniye önce", minute: " dakika önce", hour: " saat önce", day: " gün önce", week: " hafta önce", month: " ay önce", year: " yıl önce" },
    ru: { second: " секунд назад", minute: " минут назад", hour: " часов назад", day: " дней назад", week: " недель назад", month: " месяцев назад", year: " лет назад" },
    zh: { second: " 秒前", minute: " 分钟前", hour: " 小时前", day: " 天前", week: " 周前", month: " 月前", year: " 年前" }
};

const lang = localStorage.getItem("language") || "en";
const lang_TimeAgo = langTimeAgo[lang];
const lang_Messages = langMessages[lang] || "Messages";
const lang_Notification = langNotification[lang] || "Notification";

async function save() {
  
  document.getElementById("title_lang").innerText = lang_Messages;
  document.getElementById("lang_header1_button").innerText = lang_Notification;
  document.getElementById("lang_header2_button").innerText = lang_Messages;
  
  const token = localStorage.getItem("token");
	const world = localStorage.getItem("world");

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
			
			const jsonParse = JSON.parse(data.notifications);
			console.log(jsonParse);
			
			if (data.notifications.length > 0) {
				
				for (let i = Number(jsonParse.length) - 1; i >= 0; i--) {
					
					const n = jsonParse[i];
					
					if (n.type === "produce") {
						
						let n_m = "";
						let img_m = "";
						
						if (n.message == "spy") {
							
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spy trained.";
							if (localStorage.getItem("language") == "de") n_m = "Spion ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Espion formé.";
							if (localStorage.getItem("language") == "es") n_m = "Espía entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Espião treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Casus eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Шпион шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "间谍训练有素的。";
							img_m = "log_spy";
						}
						
						if (n.message == "spearman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spearman trained.";
							if (localStorage.getItem("language") == "de") n_m = "Spearman ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Spearman formé.";
							if (localStorage.getItem("language") == "es") n_m = "Spearman entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Spearman treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Spearman eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Spearman шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Spearman 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "archer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Archer trained.";
							if (localStorage.getItem("language") == "de") n_m = "Archer ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Archer formé.";
							if (localStorage.getItem("language") == "es") n_m = "Archer entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Archer treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Archer eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Archer шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Archer 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "cataphract") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Cataphract trained.";
							if (localStorage.getItem("language") == "de") n_m = "Cataphract ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Cataphract formé.";
							if (localStorage.getItem("language") == "es") n_m = "Cataphract entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Cataphract treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Cataphract eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Cataphract шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Cataphract 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "swordsman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Swordsman trained.";
							if (localStorage.getItem("language") == "de") n_m = "Swordsman ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Swordsman formé.";
							if (localStorage.getItem("language") == "es") n_m = "Swordsman entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Swordsman treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Swordsman eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Swordsman шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Swordsman 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "crossbowman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Crossbowman trained.";
							if (localStorage.getItem("language") == "de") n_m = "Crossbowman ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Crossbowman formé.";
							if (localStorage.getItem("language") == "es") n_m = "Crossbowman entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Crossbowman treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Crossbowman eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Crossbowman шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Crossbowman 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "arquebusiers") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Arquebusiers trained.";
							if (localStorage.getItem("language") == "de") n_m = "Arquebusiers ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Arquebusiers formé.";
							if (localStorage.getItem("language") == "es") n_m = "Arquebusiers entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Arquebusiers treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Arquebusiers eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Arquebusiers шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Arquebusiers 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "knight") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Knight trained.";
							if (localStorage.getItem("language") == "de") n_m = "Knight ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Knight formé.";
							if (localStorage.getItem("language") == "es") n_m = "Knight entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Knight treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Knight eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Knight шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Knight 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "imperial_spearman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Imperial Spearman trained.";
							if (localStorage.getItem("language") == "de") n_m = "Imperial Spearman ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Imperial Spearman formé.";
							if (localStorage.getItem("language") == "es") n_m = "Imperial Spearman entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Imperial Spearman treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Imperial Spearman eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Imperial Spearman шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Imperial Spearman 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "ballista") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Ballista trained.";
							if (localStorage.getItem("language") == "de") n_m = "Ballista ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Ballista formé.";
							if (localStorage.getItem("language") == "es") n_m = "Ballista entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Ballista treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Ballista eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Ballista шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Ballista 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "onager") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Onager trained.";
							if (localStorage.getItem("language") == "de") n_m = "Onager ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Onager formé.";
							if (localStorage.getItem("language") == "es") n_m = "Onager entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Onager treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Onager eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Onager шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Onager 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "cannon") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Cannon trained.";
							if (localStorage.getItem("language") == "de") n_m = "Cannon ausgebildet.";
							if (localStorage.getItem("language") == "fr") n_m = "Cannon formé.";
							if (localStorage.getItem("language") == "es") n_m = "Cannon entrenado.";
							if (localStorage.getItem("language") == "pt") n_m = "Cannon treinado.";
							if (localStorage.getItem("language") == "tr") n_m = "Cannon eğitildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Cannon шпион.";
							if (localStorage.getItem("language") == "zh") n_m = "Cannon 训练有素的。";
							img_m = "troops";
						}
						
						if (n.message == "trade_cart") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Trade Cart produced.";
							if (localStorage.getItem("language") == "de") n_m = "Handelswagen hergestellt.";
							if (localStorage.getItem("language") == "fr") n_m = "Chariot Commercial produit.";
							if (localStorage.getItem("language") == "es") n_m = "Carro Comercial producido.";
							if (localStorage.getItem("language") == "pt") n_m = "Carrinho de Comércio produzido.";
							if (localStorage.getItem("language") == "tr") n_m = "Ticaret Vagonu üretildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Произведена 1 торговая тележка.";
							if (localStorage.getItem("language") == "zh") n_m = "贸易车产生的。";
							img_m = "vagon_go";
						}
						
						if (n.message == "watchtower") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Watchtower built.";
							if (localStorage.getItem("language") == "de") n_m = "Wachturm gebaut.";
							if (localStorage.getItem("language") == "fr") n_m = "Tour de guet construite.";
							if (localStorage.getItem("language") == "es") n_m = "Torre de vigilancia construida.";
							if (localStorage.getItem("language") == "pt") n_m = "Torre de vigia construída.";
							if (localStorage.getItem("language") == "tr") n_m = "Gözcü Kulesi inşa edildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Сторожевая башня.";
							if (localStorage.getItem("language") == "zh") n_m = "瞭望塔建造的。";
							img_m = "build";
						}
						
						if (n.message == "farmer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Farmer produced.";
							if (localStorage.getItem("language") == "de") n_m = "Bauer produziert.";
							if (localStorage.getItem("language") == "fr") n_m = "Fermier produit.";
							if (localStorage.getItem("language") == "es") n_m = "Granjero producido.";
							if (localStorage.getItem("language") == "pt") n_m = "Agricultor produziu.";
							if (localStorage.getItem("language") == "tr") n_m = "Çiftçi üretildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Фермер произведено.";
							if (localStorage.getItem("language") == "zh") n_m = "农民产生的。";
							img_m = "villagers";
						}
						
						if (n.message == "woodcutter") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Woodcutter produced.";
							if (localStorage.getItem("language") == "de") n_m = "Holzfäller produziert.";
							if (localStorage.getItem("language") == "fr") n_m = "Bûcheron produit.";
							if (localStorage.getItem("language") == "es") n_m = "Leñador producido.";
							if (localStorage.getItem("language") == "pt") n_m = "Lenhador produzido.";
							if (localStorage.getItem("language") == "tr") n_m = "Oduncu üretildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Дровосек произведено.";
							if (localStorage.getItem("language") == "zh") n_m = "樵夫产生的。";
							img_m = "villagers";
						}
						
						if (n.message == "gold_miner") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Gold Miner produced.";
							if (localStorage.getItem("language") == "de") n_m = "Goldbergarbeiter produziert.";
							if (localStorage.getItem("language") == "fr") n_m = "Mineur d'or produit.";
							if (localStorage.getItem("language") == "es") n_m = "Minero de oro producido.";
							if (localStorage.getItem("language") == "pt") n_m = "Minerador de ouro produzido.";
							if (localStorage.getItem("language") == "tr") n_m = "Altın Madencisi üretildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Золотодобытчик произведено.";
							if (localStorage.getItem("language") == "zh") n_m = "淘金者产生的。";
							img_m = "villagers";
						}
						
						const produce_div = `<div class="top_ll_div"><div class="logs_div"><span>${n_m}</span><div class="regions_img" style="background-image: url('images/${img_m}.png');"></div></div><p class="head_logs_div_text"><span id="produce_time_${i}"></span></p></div>`;
					
					    document.getElementById("container1").innerHTML += produce_div;
					
					}
					
					if (n.type === "upgrade") {
						
						let n_m = "";
						let img_m = "";
						
						if (n.message == "spearman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spearman upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Spearman aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Spearman mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Spearman actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Spearman atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Spearman yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Spearman обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Spearman 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "archer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Archer upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Archer aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Archer mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Archer actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Archer atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Archer yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Archer обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Archer 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "spy") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spy upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Spion aktualisiert.";
							if (localStorage.getItem("language") == "fr") n_m = "Espion mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Espía actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Espião atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Casus yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Шпион обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "间谍升级了。";
							img_m = "log_spy";
						}
						
						if (n.message == "swordsman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Swordsman upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Swordsman aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Swordsman mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Swordsman actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Swordsman atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Swordsman yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Swordsman обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Swordsman 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "crossbowman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Crossbowman upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Crossbowman aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Crossbowman mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Crossbowman actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Crossbowman atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Crossbowman yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Crossbowman обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Crossbowman 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "arquebusiers") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Arquebusiers upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Arquebusiers aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Arquebusiers mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Arquebusiers actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Arquebusiers atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Arquebusiers yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Arquebusiers обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Arquebusiers 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "castle") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Castle upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Schloss aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Château mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Castillo actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Castelo atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Kale yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Замок обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "城堡升级了。";
							img_m = "build";
						}
						
						if (n.message == "knight") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Knight upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Knight aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Knight mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Knight actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Knight atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Knight yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Knight обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Knight 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "imperial_spearman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Imperial Spearman upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Imperial Spearman aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Imperial Spearman mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Imperial Spearman actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Imperial Spearman atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Imperial Spearman yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Imperial Spearman обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Imperial Spearman 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "ballista") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Ballista upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Ballista aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Ballista mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Ballista actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Ballista atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Ballista yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Ballista обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Ballista 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "onager") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Onager upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Onager aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Onager mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Onager actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Onager atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Onager yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Onager обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Onager 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "cannon") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Cannon upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Cannon aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Cannon mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Cannon actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Cannon atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Cannon yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Cannon обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "Cannon 升级了。";
							img_m = "troops";
						}
						
						if (n.message == "farming") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Farming upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Landwirtschaft aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Agriculture mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Agricultura actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Agricultura atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Tarım yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Сельское хозяйство обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "农业升级了。";
							img_m = "research_source";
						}
						
						if (n.message == "lumbering") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Lumbering upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Holzwirtschaft aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Exploitation forestière mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Explotación forestal actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Exploração madeireira atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Kerestecilik yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Лесозаготовка обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "伐木业升级了。";
							img_m = "research_source";
						}
						
						if (n.message == "mining") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Mining upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Bergbau aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Exploitation minière mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Minería actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Mineração atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Madencilik yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "майнинг обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "采矿升级了。";
							img_m = "research_source";
						}
						
						if (n.message == "blacksmithing") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Blacksmithing upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Schmiedekunst aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Forge mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Herrería actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Ferraria atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Demircilik yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Кузнечное дело обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "锻造升级了。";
							img_m = "research_power";
						}
						
						if (n.message == "riding") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Riding upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Reiten aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Équitation mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Equitación actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Equitação atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Binicilik yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Верховая езда обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "骑术升级了。";
							img_m = "research_power";
						}
						
						if (n.message == "geometry") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Geometry upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Geometrie aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Géométrie mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Geometría actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Geometria atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Geometri yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Геометрия обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "几何学升级了。";
							img_m = "research_power";
						}
						
						if (n.message == "cartography") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Cartography upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Kartografie aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Cartographie mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Cartografía actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Cartografia atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Haritacılık yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Картография обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "制图学升级了。";
							img_m = "research_cartography";
						}
						
						if (n.message == "spying") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spying upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Spionage aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Espionnage mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Espionaje actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Espionagem atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Casusluk yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Шпионаж обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "间谍活动升级了。";
							img_m = "research_spying";
						}
						
						if (n.message == "masonry") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Masonry upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Maurerhandwerk aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Maçonnerie mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Albañilería actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Alvenaria atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Duvarcılık yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Каменное дело обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "石工升级了。";
							img_m = "research_masonry";
						}
						
						if (n.message == "trade_cart") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Trade Cart upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Handelswagen aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Chariot de commerce mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Carreta de comercio actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Carroça de comércio atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Ticaret Vagonu yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Торговая повозка обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "贸易马车升级了。";
							img_m = "vagon_go";
						}
						
						if (n.message == "wall") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Wall upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Mauer aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Mur mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Muro actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Muro atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Duvar yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Стена обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "城墙升级了。";
							img_m = "build";
						}
						
						if (n.message == "watchtower") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Watchtower upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Wachturm aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Tour de guet mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Torre de vigilancia actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Torre de vigia atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Gözcü Kulesi yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Сторожевая башня обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "瞭望塔升级了。";
							img_m = "build";
						}
						
						if (n.message == "farmer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Farmer upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Bauer aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Fermier mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Granjero actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Agricultor atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Çiftçi yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Фермер обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "农民升级了。";
							img_m = "villagers";
						}
						
						if (n.message == "woodcutter") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Woodcutter upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Holzfäller aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Bûcheron mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Leñador actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Lenhador atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Oduncu yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Дровосек обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "樵夫升级了。";
							img_m = "villagers";
						}
						
						if (n.message == "gold_miner") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Gold Miner upgraded.";
							if (localStorage.getItem("language") == "de") n_m = "Goldbergarbeiter aufgewertet.";
							if (localStorage.getItem("language") == "fr") n_m = "Mineur d'or mis à niveau.";
							if (localStorage.getItem("language") == "es") n_m = "Minero de oro actualizado.";
							if (localStorage.getItem("language") == "pt") n_m = "Minerador de ouro atualizado.";
							if (localStorage.getItem("language") == "tr") n_m = "Altın Madencisi yükseltildi.";
							if (localStorage.getItem("language") == "ru") n_m = "Золотодобытчик обновлен.";
							if (localStorage.getItem("language") == "zh") n_m = "淘金者升级了。";
							img_m = "villagers";
						}
						
						const upgrade_div = `<div class="top_ll_div"><div class="logs_div"><span>${n_m}</span><div class="regions_img" style="background-image: url('images/${img_m}.png');"></div></div><p class="head_logs_div_text"><span id="upgrade_time_${i}"></span></p></div>`;
					
					    document.getElementById("container1").innerHTML += upgrade_div;
					}
					
					if (n.type === "boost") {
						
						let n_m = "";
						let img_m = "";
						
						if (n.message == "farmer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "25% Food boost ended.";
							if (localStorage.getItem("language") == "de") n_m = "25 % Nahrungsschub beendet.";
							if (localStorage.getItem("language") == "fr") n_m = "Fin de l'augmentation de 25 % de la nourriture.";
							if (localStorage.getItem("language") == "es") n_m = "El aumento de alimentos del 25% finalizó.";
							if (localStorage.getItem("language") == "pt") n_m = "Aumento de 25% nos alimentos encerrado.";
							if (localStorage.getItem("language") == "tr") n_m = "%25 Gıda artışı sona erdi.";
							if (localStorage.getItem("language") == "ru") n_m = "25%-ное повышение продовольственной безопасности закончилось.";
							if (localStorage.getItem("language") == "zh") n_m = "25% 食品增幅已结束。";
							img_m = "troops";
						}
						
						if (n.message == "woodcutter") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "25% Wood boost ended.";
							if (localStorage.getItem("language") == "de") n_m = "25 % Holz-Boost beendet.";
							if (localStorage.getItem("language") == "fr") n_m = "Fin du boost de bois de 25 %.";
							if (localStorage.getItem("language") == "es") n_m = "El aumento del 25% de madera finalizó.";
							if (localStorage.getItem("language") == "pt") n_m = "Aumento de 25% na madeira encerrado.";
							if (localStorage.getItem("language") == "tr") n_m = "%25 Odun artışı sona erdi.";
							if (localStorage.getItem("language") == "ru") n_m = "25%-ное усиление древесины завершено.";
							if (localStorage.getItem("language") == "zh") n_m = "25% 木材增幅结束。";
							img_m = "troops";
						}
						
						if (n.message == "gold_miner") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "25% Gold boost ended.";
							if (localStorage.getItem("language") == "de") n_m = "25 % Gold-Boost beendet.";
							if (localStorage.getItem("language") == "fr") n_m = "Fin du boost d'or de 25 %.";
							if (localStorage.getItem("language") == "es") n_m = "El aumento del 25% de oro finalizó.";
							if (localStorage.getItem("language") == "pt") n_m = "Aumento de 25% em ouro encerrado.";
							if (localStorage.getItem("language") == "tr") n_m = "%25 Altın artışı sona erdi.";
							if (localStorage.getItem("language") == "ru") n_m = "25%-ное повышение цен на золото завершено.";
							if (localStorage.getItem("language") == "zh") n_m = "25% 黄金增幅结束。";
							img_m = "troops";
						}
						
						const boost_div = `<div class="top_ll_div"><div class="logs_div"><span>${n_m}</span><div class="regions_img" style="background-image: url('images/${img_m}.png');"></div></div><p class="head_logs_div_text"><span id="boost_time_${i}"></span></p></div>`;
						document.getElementById("container1").innerHTML += boost_div;
					}
					
					if (n.type === "bonus") {
						
						let n_m = "";
						let img_m = "";
						
						if (n.message == "") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Bonus Chest is ready.";
							if (localStorage.getItem("language") == "de") n_m = "Die Bonustruhe ist bereit.";
							if (localStorage.getItem("language") == "fr") n_m = "Le coffre bonus est prêt.";
							if (localStorage.getItem("language") == "es") n_m = "El cofre de bonificación está listo.";
							if (localStorage.getItem("language") == "pt") n_m = "O Baú Bónus está pronto.";
							if (localStorage.getItem("language") == "tr") n_m = "Bonus Sandığı hazır.";
							if (localStorage.getItem("language") == "ru") n_m = "Бонусный сундук готов.";
							if (localStorage.getItem("language") == "zh") n_m = "奖金箱已准备好。";
							img_m = "bonus_box1";
						}
						
						const bonus_div = `<div class="top_ll_div"><div class="logs_div"><span>${n_m}</span><div class="regions_img" style="background-image: url('images/${img_m}.png');"></div></div><p class="head_logs_div_text"><span id="bonus_time_${i}"></span></p></div>`;
						
						document.getElementById("container1").innerHTML += bonus_div;
						
					}
					
					if (n.type === "death") {
						
						let n_m = "";
						let img_m = "";
						
						if (n.message == "spearman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spearman died.";
							if (localStorage.getItem("language") == "de") n_m = "Spearman gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Spearman décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Spearman fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Spearman morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Spearman öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Spearman умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Spearman 死了。";
							img_m = "troops";
						}
						
						if (n.message == "archer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Archer died.";
							if (localStorage.getItem("language") == "de") n_m = "Archer gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Archer décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Archer fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Archer morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Archer öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Archer умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Archer 死了。";
							img_m = "troops";
						}
						
						if (n.message == "spy") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Spy died.";
							if (localStorage.getItem("language") == "de") n_m = "Spion gestorben";
							if (localStorage.getItem("language") == "fr") n_m = "Espion décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Espía fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Espião morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Casus öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Шпион умер.";
							if (localStorage.getItem("language") == "zh") n_m = "间谍死了。";
							img_m = "log_spy";
						}
						
						if (n.message == "swordsman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Swordsman died.";
							if (localStorage.getItem("language") == "de") n_m = "Swordsman gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Swordsman décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Swordsman fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Swordsman morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Swordsman öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Swordsman умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Swordsman 死了。";
							img_m = "troops";
						}
						
						if (n.message == "crossbowman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Crossbowman died.";
							if (localStorage.getItem("language") == "de") n_m = "Crossbowman gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Crossbowman décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Crossbowman fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Crossbowman morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Crossbowman öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Crossbowman умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Crossbowman 死了。";
							img_m = "troops";
						}
						
						if (n.message == "arquebusiers") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Arquebusiers died.";
							if (localStorage.getItem("language") == "de") n_m = "Arquebusiers gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Arquebusiers décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Arquebusiers fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Arquebusiers morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Arquebusiers öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Arquebusiers умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Arquebusiers 死了。";
							img_m = "troops";
						}
						
						if (n.message == "knight") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Knight died.";
							if (localStorage.getItem("language") == "de") n_m = "Knight gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Knight décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Knight fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Knight morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Knight öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Knight умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Knight 死了。";
							img_m = "troops";
						}
						
						if (n.message == "imperial_spearman") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Imperial Spearman died.";
							if (localStorage.getItem("language") == "de") n_m = "Imperial Spearman gestorben";
							if (localStorage.getItem("language") == "fr") n_m = "Imperial Spearman décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Imperial Spearman fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Imperial Spearman morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Imperial Spearman öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Imperial Spearman умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Imperial Spearman 死了。";
							img_m = "troops";
						}
						
						if (n.message == "ballista") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Ballista died.";
							if (localStorage.getItem("language") == "de") n_m = "Ballista gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Ballista décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Ballista fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Ballista morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Ballista öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Ballista умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Ballista 死了。";
							img_m = "troops";
						}
						
						if (n.message == "onager") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Onager died.";
							if (localStorage.getItem("language") == "de") n_m = "Onager gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Onager décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Onager fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Onager morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Onager öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Onager умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Onager 死了。";
							img_m = "troops";
						}
						
						if (n.message == "cannon") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Cannon died.";
							if (localStorage.getItem("language") == "de") n_m = "Cannon gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Cannon décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Cannon fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Cannon morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Cannon öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Cannon умер.";
							if (localStorage.getItem("language") == "zh") n_m = "Cannon 死了。";
							img_m = "troops";
						}
						
						if (n.message == "farmer") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Farmer died.";
							if (localStorage.getItem("language") == "de") n_m = "Bauer gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Fermier décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Granjero fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Agricultor morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Çiftçi öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Фермер умер.";
							if (localStorage.getItem("language") == "zh") n_m = "农民死了。";
							img_m = "villagers";
						}
						
						if (n.message == "woodcutter") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Woodcutter died.";
							if (localStorage.getItem("language") == "de") n_m = "Holzfäller gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Bûcheron décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Leñador fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Lenhador morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Oduncu öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Дровосек умер.";
							if (localStorage.getItem("language") == "zh") n_m = "樵夫死了。";
							img_m = "villagers";
						}
						
						if (n.message == "gold_miner") {
							if (localStorage.getItem("language") == "en" || !localStorage.getItem("language")) n_m = "Gold Miner died.";
							if (localStorage.getItem("language") == "de") n_m = "Goldbergarbeiter gestorben.";
							if (localStorage.getItem("language") == "fr") n_m = "Mineur d'or décédé.";
							if (localStorage.getItem("language") == "es") n_m = "Minero de oro fallecido.";
							if (localStorage.getItem("language") == "pt") n_m = "Minerador de ouro morreu.";
							if (localStorage.getItem("language") == "tr") n_m = "Altın Madencisi öldü.";
							if (localStorage.getItem("language") == "ru") n_m = "Золотодобытчик умер.";
							if (localStorage.getItem("language") == "zh") n_m = "淘金者死了。";
							img_m = "villagers";
						}
						
						const death_div = `<div class="top_ll_div"><div class="logs_div"><span>${n.kill} ${n_m}</span><div class="regions_img" style="background-image: url('images/${img_m}.png');"></div></div><p class="head_logs_div_text"><span id="death_time_${i}"></span></p></div>`;
						
						document.getElementById("container1").innerHTML += death_div;
						
					}
				}
				
				if (jsonParse[0]?.type !== undefined) {
					
					const endTime = jsonParse[0].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[0].type + "_time_0").innerText = remaining;
					
				}
				
				if (jsonParse[1]?.type !== undefined) {
					
					const endTime = jsonParse[1].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[1].type + "_time_1").innerText = remaining;
				}
				
                if (jsonParse[2]?.type !== undefined) {
					
					const endTime = jsonParse[2].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[2].type + "_time_2").innerText = remaining;
					
				}
				
				if (jsonParse[3]?.type !== undefined) {
					
					const endTime = jsonParse[3].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[3].type + "_time_3").innerText = remaining;
					
				}
				
				if (jsonParse[4]?.type !== undefined) {
					
					const endTime = jsonParse[4].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[4].type + "_time_4").innerText = remaining;
					
				}
				
				if (jsonParse[5]?.type !== undefined) {
					
					const endTime = jsonParse[5].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[5].type + "_time_5").innerText = remaining;
					
				}
				
				if (jsonParse[6]?.type !== undefined) {
					
					const endTime = jsonParse[6].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[6].type + "_time_6").innerText = remaining;
					
				}
				
				if (jsonParse[7]?.type !== undefined) {
					
					const endTime = jsonParse[7].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[7].type + "_time_7").innerText = remaining;
					
				}
				
				if (jsonParse[8]?.type !== undefined) {
					
					const endTime = jsonParse[8].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[8].type + "_time_8").innerText = remaining;
					
				}
				
				if (jsonParse[9]?.type !== undefined) {
					
					const endTime = jsonParse[9].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[9].type + "_time_9").innerText = remaining;
					
				}
				
				if (jsonParse[10]?.type !== undefined) {
					
					const endTime = jsonParse[10].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[10].type + "_time_10").innerText = remaining;
					
				}
					
				if (jsonParse[11]?.type !== undefined) {
					
					const endTime = jsonParse[11].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[11].type + "_time_11").innerText = remaining;
					
				}
				
				if (jsonParse[12]?.type !== undefined) {
					
					const endTime = jsonParse[12].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[12].type + "_time_12").innerText = remaining;
					
				}
				
				if (jsonParse[13]?.type !== undefined) {
					
					const endTime = jsonParse[13].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[13].type + "_time_13").innerText = remaining;
					
				}
				
				if (jsonParse[14]?.type !== undefined) {
					
					const endTime = jsonParse[14].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[14].type + "_time_14").innerText = remaining;
					
				}
				
				if (jsonParse[15]?.type !== undefined) {
					
					const endTime = jsonParse[15].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[15].type + "_time_15").innerText = remaining;
					
				}
				
				if (jsonParse[16]?.type !== undefined) {
					
					const endTime = jsonParse[16].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[16].type + "_time_16").innerText = remaining;
					
				}
				
				if (jsonParse[17]?.type !== undefined) {
					
					const endTime = jsonParse[17].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[17].type + "_time_17").innerText = remaining;
					
				}
				
				if (jsonParse[18]?.type !== undefined) {
					
					const endTime = jsonParse[18].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[18].type + "_time_18").innerText = remaining;
					
				}
				
				if (jsonParse[19]?.type !== undefined) {
					
					const endTime = jsonParse[19].time;
                    const nowTime = Number(sessionStorage.getItem("time"));

                    let remaining = "";

                    if (endTime != null && nowTime != null) {
                    let diff = nowTime - endTime;
                    if (diff < 0) diff = 0;

                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours   = Math.floor(minutes / 60);
                    const days    = Math.floor(hours / 24);
                    const weeks   = Math.floor(days / 7);
                    const months  = Math.floor(days / 30);
                    const years   = Math.floor(days / 365);

                    if (seconds < 60) remaining = seconds + lang_TimeAgo.second;
                    else if (minutes < 60) remaining = minutes + lang_TimeAgo.minute;
                    else if (hours < 24) remaining = hours + lang_TimeAgo.hour;
                    else if (days < 7) remaining = days + lang_TimeAgo.day;
                    else if (days < 31) remaining = weeks + lang_TimeAgo.week;
                    else if (months < 12) remaining = months + lang_TimeAgo.month;
                    else remaining = years + lang_TimeAgo.year;
                    }

                    document.getElementById(jsonParse[19].type + "_time_19").innerText = remaining;
					
				}
			}
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
  
}