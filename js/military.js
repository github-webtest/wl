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
	
	const langTroops = { 
    en: "Troops",
    de: "Truppen",
    fr: "Troupes",
    es: "Tropas",
    pt: "Tropas",
    tr: "Birlikler",
    ru: "Войска",
    zh: "部队",
    };

    const langSupportTroops = {
    en: "Support Troops",
    de: "Unterstützungstruppen",
    fr: "Troupes de soutien",
    es: "Tropas de apoyo",
    pt: "Tropas de apoio",
    tr: "Destek Birlikleri",
    ru: "Войска поддержки",
    zh: "支援部队",
    };
	
	const langRegions = {      
    en: "Regions: ",      
    de: "Regionen: ",
    fr: "Régions : ",
    es: "Regiones: ",
    pt: "Regiões: ",
    tr: "Bölgeler: ",
    ru: "Регионы: ",
    zh: "区域：",
    };
	
	const langKCenter = {        
    en: "Kingdom Center",       
    de: "Königreichzentrum",
    fr: "Centre du royaume",
    es: "Centro del reino",
    pt: "Centro do reino",
    tr: "Krallık Merkezi",
    ru: "Центр королевства",
    zh: "王国中心",
    };
	
	const langSpy = {      
    en: "Spy",        
    de: "Spion",  
    fr: "Espion",  
    es: "Espía",  
    pt: "Espião",  
    tr: "Casus",  
    ru: "Шпион",  
    zh: "间谍",  
    };

  const lang = localStorage.getItem("language") || "en";
  const lang_Military = langMilitary[lang] || "Military";
  const lang_Troops = langTroops[lang] || "Troops";
  const lang_SupportTroops = langSupportTroops[lang] || "Support Troops";
  const lang_Regions = langRegions[lang] || "Regions: ";
  const lang_KCenter = langKCenter[lang] || "Kingdom Center";
  const lang_Spy = langSpy[lang] || "Spy";
  
  document.getElementById("title_lang").innerText = lang_Military;
  document.getElementById("lang_header1_button").innerText = lang_Troops;
  document.getElementById("lang_header2_button").innerText = lang_SupportTroops;
  document.getElementById("troops_lang").innerText = lang_Troops;
  document.getElementById("regions_lang").innerText = lang_Regions;
  document.getElementById("kingdomcenter_lang").innerText = lang_KCenter;
  document.getElementById("spy_lang").innerText = lang_Spy;
  
}