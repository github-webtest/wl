function save() {

const langAlliance = {
    en: "Alliance: ",
    de: "Allianz: ",
    fr: "Alliance: ",
    es: "Alianza: ",
    pt: "Aliança: ",
    tr: "İttifak: ",
    ru: "Альянс: ",
    zh: "联盟: ",
};

const langKI = { 
    en: "Kingdom Info",
    de: "Königreich-Info",
    fr: "Infos sur le Royaume",
    es: "Información del Reino",
    pt: "Informações do Reino",
    tr: "Krallık Bilgisi",
    ru: "Информация о королевстве",
    zh: "王国信息",
};

const langAge = {  
    en: "Age:", 
    de: "Zeitalter:",
    fr: "Âge:",
    es: "Edad:",
    pt: "Idade:",
    tr: "Çağ:",
    ru: "Эпоха:",
    zh: "时代:",
};

const langAgeP = {   
    en: "Age Points:",  
    de: "Zeitalterpunkte:",
    fr: "Points d'âge :",
    es: "Puntos de edad:",
    pt: "Pontos de idade:",
    tr: "Çağ Puanı:",
    ru: "Очки эпохи:",
    zh: "时代点数：",
};

const langVT = {    
    en: "Victory/Total:",   
    de: "Sieg/Gesamt:",
    fr: "Victoire/Total :",
    es: "Victoria/Total:",
    pt: "Vitória/Total:",
    tr: "Zafer/Toplam:",
    ru: "Победы/Всего:",
    zh: "胜利/总计：",
};

const langTK = {     
    en: "Troops Killed:",    
    de: "Getötete Truppen:",
    fr: "Troupes tuées :",
    es: "Tropas eliminadas:",
    pt: "Tropas eliminadas:",
    tr: "Öldürülen Birlik:",
    ru: "Убито войск:",
    zh: "击杀部队：",
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

const langEmbassy = {         
    en: "Embassy",
    de: "Botschaft",
    fr: "Ambassade",
    es: "Embajada",
    pt: "Embaixada",
    tr: "Elçilik",
    ru: "Посольство",
    zh: "大使馆",
};

const langPM = {          
    en: "Send PM", 
    de: "PN senden",
    fr: "Env. MP",
    es: "Enviar MP",
    pt: "Env. MP",
    tr: "PM Gönder",
    ru: "Отпр. ЛС",
    zh: "发送私信",
};
	
  const lang = localStorage.getItem("language") || "en";
  const lang_KI = langKI[lang] || "Kingdom Info";
  const lang_Alliance = langAlliance[lang] || "Alliance:";
  const lang_Age = langAge[lang] || "Age:";
  const lang_AgeP = langAgeP[lang] || "Age Points:";
  const lang_VT = langVT[lang] || "Victory/Total:";
  const lang_TK = langTK[lang] || "Troops Killed:";
  const lang_Regions = langRegions[lang] || "Regions: ";
  const lang_KCenter = langKCenter[lang] || "Kingdom Center";
  const lang_Embassy = langEmbassy[lang] || "Embassy";
  const lang_PM = langPM[lang] || "Send PM";
  
  document.getElementById("title_lang").innerText = "Player";
  document.getElementById("k_info_lang").innerText = lang_KI;
  document.getElementById("alliance_lang").innerText = lang_Alliance;
  document.getElementById("age_lang").innerText = lang_Age;
  document.getElementById("age_points_lang").innerText = lang_AgeP;
  document.getElementById("vt_lang").innerText = lang_VT;
  document.getElementById("tk_lang").innerText = lang_TK;
  document.getElementById("regions_lang").innerText = lang_Regions;
  document.getElementById("kc_lang").innerText = lang_KCenter;
  document.getElementById("embassy_lang").innerText = lang_Embassy;
  document.getElementById("pm_lang").innerText = lang_PM;
  
}