function save() {
	
	const langMilitary = {    
    en: "Military",  
    de: "Militär",  
    fr: "Militaire",  
    es: "Militar",  
    pt: "Militar",  
    tr: "Askeri",  
    ru: "Военный",  
    zh: "军事",  
    };
	
	const langTrade = {                    
    en: "Trade",                 
    de: "Handel",  
    fr: "Commerce",  
    es: "Comercio",  
    pt: "Comércio",  
    tr: "Ticaret",  
    ru: "Торговля",  
    zh: "贸易",  
    };
	
	const langLogs = {                     
    en: "Logs",                  
    de: "Protokolle",  
    fr: "Journaux",  
    es: "Registros",  
    pt: "Registros",  
    tr: "Kayıtlar",  
    ru: "Журналы",  
    zh: "日志",  
    };
	
	const lang1 = {                     
    en: `You attacked <a class="a_href" href="">AoKW_10000</a>'s Kingdom Center.`,
    de: `Du hast AoKW_10000s Königreichszentrum angegriffen.`,
    fr: `Tu as attaqué le centre du royaume de <a class="a_href" href="">AoKW_10000</a>.`,
    es: `Atacaste el centro del reino de <a class="a_href" href="">AoKW_10000</a>.`,
    pt: `Você atacou o centro do reino de <a class="a_href" href="">AoKW_10000</a>.`,
    tr: `<a class="a_href" href="">AoKW_10000</a>'ın Krallık Merkezine saldırdın.`,
    ru: `Ты атаковал Королевский центр <a class="a_href" href="">AoKW_10000</a>.`,
    zh: `你攻击了<a class="a_href" href="">AoKW_10000</a>的王国中心。`,
    };
	
	const lang2 = {                     
    en: `<a class="a_href" href="">AoKW_10000</a> attacked your Kingdom Center.`,                  
    de: `<a class="a_href" href="">AoKW_10000</a> hat dein Königreichszentrum angegriffen.`,  
    fr: `<a class="a_href" href="">AoKW_10000</a> a attaqué votre centre du royaume.`,  
    es: `<a class="a_href" href="">AoKW_10000</a> atacó tu centro del reino.`,  
    pt: `<a class="a_href" href="">AoKW_10000</a> atacou seu centro do reino.`,  
    tr: `<a class="a_href" href="">AoKW_10000</a>'ın Krallık Merkezinize saldırdı.`,  
    ru: `<a class="a_href" href="">AoKW_10000</a> атаковал ваш Центральный замок.`,  
    zh: `<a class="a_href" href="">AoKW_10000</a>攻击了你的王国中心。`,  
    };
	
	const lang3 = {
    en: `<a class="a_href" href="">AoKW_10000</a> scouted your Kingdom Center.`,
    de: `<a class="a_href" href="">AoKW_10000</a> hat dein Königreichszentrum ausspioniert.`,
    fr: `<a class="a_href" href="">AoKW_10000</a> a espionné votre centre du royaume.`,
    es: `<a class="a_href" href="">AoKW_10000</a> exploró tu centro del reino.`,
    pt: `<a class="a_href" href="">AoKW_10000</a> espionou seu centro do reino.`,
    tr: `<a class="a_href" href="">AoKW_10000</a>'ın Krallık Merkezinizi gözlemledi.`,
    ru: `<a class="a_href" href="">AoKW_10000</a> разведал ваш Центральный замок.`,
    zh: `<a class="a_href" href="">AoKW_10000</a>侦察了你的王国中心。`,
    };
	
	const lang4 = {
    en: `You scouted <a class="a_href" href="">AoKW_10000</a>'s Kingdom Center.`,
    de: `Du hast <a class="a_href" href="">AoKW_10000</a>s Königreichszentrum ausspioniert.`,
    fr: `Tu as espionné le centre du royaume de <a class="a_href" href="">AoKW_10000</a>.`,
    es: `Exploraste el centro del reino de <a class="a_href" href="">AoKW_10000</a>.`,
    pt: `Você espionou o centro do reino de <a class="a_href" href="">AoKW_10000</a>.`,
    tr: `<a class="a_href" href="">AoKW_10000</a>'ın Krallık Merkezini gözlemledin.`,
    ru: `Ты разведал Королевский центр <a class="a_href" href="">AoKW_10000</a>.`,
    zh: `你侦察了<a class="a_href" href="">AoKW_10000</a>的王国中心。`,
    };
	
	const lang5 = {                     
    en: `<a class="a_href" href="">AoKW_10000</a> attacked your <a class="a_href" href="">Colony_10000</a>.`,
    de: `<a class="a_href" href="">AoKW_10000</a> hat deine <a class="a_href" href="">Kolonie_10000</a> angegriffen.`,
    fr: `<a class="a_href" href="">AoKW_10000</a> a attaqué ta <a class="a_href" href="">Colonie_10000</a>.`,
    es: `<a class="a_href" href="">AoKW_10000</a> atacó a tu <a class="a_href" href="">Colonia_10000</a>.`,
    pt: `<a class="a_href" href="">AoKW_10000</a> atacou sua <a class="a_href" href="">Colônia_10000</a>.`,
    tr: `<a class="a_href" href="">AoKW_10000</a> senin <a class="a_href" href="">Koloni_10000</a>'e saldırdı.`,
    ru: `<a class="a_href" href="">AoKW_10000</a> атаковал твою <a class="a_href" href="">Колонию_10000</a>.`,
    zh: `<a class="a_href" href="">AoKW_10000</a>攻击了你的<a class="a_href" href="">殖民地_10000</a>。`,
    };
	
	const lang6 = {
    en: `You attacked <a class="a_href" href="">Colony_10000</a>.`,
    de: `Du hast <a class="a_href" href="">Kolonie_10000</a> angegriffen.`,
    fr: `Tu as attaqué <a class="a_href" href="">Colonie_10000</a>.`,
    es: `Atacaste <a class="a_href" href="">Colonia_10000</a>.`,
    pt: `Você atacou <a class="a_href" href="">Colônia_10000</a>.`,
    tr: `<a class="a_href" href="">Koloni_10000</a>'e saldırdın.`,
    ru: `Ты атаковал <a class="a_href" href="">Колонию_10000</a>.`,
    zh: `你攻击了<a class="a_href" href="">殖民地_10000</a>。`,
    };
	
	const lang7 = {
    en: `Your <a class="a_href" href="">Colony_10000</a> was scouted.`,
    de: `Deine <a class="a_href" href="">Kolonie_10000</a> wurde ausspioniert.`,
    fr: `Ta <a class="a_href" href="">Colonie_10000</a> a été espionnée.`,
    es: `Tu <a class="a_href" href="">Colonia_10000</a> fue explorada.`,
    pt: `Sua <a class="a_href" href="">Colônia_10000</a> foi espionada.`,
    tr: `Senin <a class="a_href" href="">Koloni_10000</a>'ın gözlemlendi.`,
    ru: `Твоя <a class="a_href" href="">Колония_10000</a> была разведана.`,
    zh: `你的<a class="a_href" href="">殖民地_10000</a>被侦察了。`,
    };
	
	const lang8 = {
    en: `You scouted <a class="a_href" href="">Colony_10000</a>.`,
    de: `Du hast <a class="a_href" href="">Kolonie_10000</a> ausspioniert.`,
    fr: `Tu as espionné <a class="a_href" href="">Colonie_10000</a>.`,
    es: `Exploraste <a class="a_href" href="">Colonia_10000</a>.`,
    pt: `Você espionou <a class="a_href" href="">Colônia_10000</a>.`,
    tr: `<a class="a_href" href="">Koloni_10000</a>'ı gözlemledin.`,
    ru: `Ты разведал <a class="a_href" href="">Колонию_10000</a>.`,
    zh: `你侦察了<a class="a_href" href="">殖民地_10000</a>。`,
    };

  const lang = localStorage.getItem("language") || "en";
  const lang_Military = langMilitary[lang] || "Military";
  const lang_Logs = langLogs[lang] || "Logs";
  const lang_Trade = langTrade[lang] || "Trade";
  const lang_1 = lang1[lang] || "AoKW_10000's Kingdom Center was attacked.";
  const lang_2 = lang2[lang] || "AoKW_10000 attacked your Kingdom Center.";
  const lang_3 = lang3[lang] || "AoKW_10000 scouted your Kingdom Center.";
  const lang_4 = lang4[lang] || "AoKW_10000 scouted the Kingdom Center.";
  const lang_5 = lang5[lang] || "AoKW_10000 attacked Colony_10000.";
  const lang_6 = lang6[lang] || "You attacked Colony_10000.";
  const lang_7 = lang7[lang] || "Your Colony_10000 was scouted.";
  const lang_8 = lang8[lang] || "You scouted Colony_10000.";
  
  document.getElementById("title_lang").innerText = lang_Logs;
  document.getElementById("lang_header1_button").innerText = lang_Military;
  document.getElementById("lang_header2_button").innerText = lang_Trade;
  document.getElementById("1_lang").innerHTML = lang_1;
  document.getElementById("2_lang").innerHTML = lang_2;
  document.getElementById("3_lang").innerHTML = lang_3;
  document.getElementById("4_lang").innerHTML = lang_4;
  document.getElementById("5_lang").innerHTML = lang_5;
  document.getElementById("6_lang").innerHTML = lang_6;
  document.getElementById("7_lang").innerHTML = lang_7;
  document.getElementById("8_lang").innerHTML = lang_8;
  
}