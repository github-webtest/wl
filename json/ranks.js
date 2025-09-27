const langLords = {
    en: "Lords",
    de: "Herren",
    fr: "Seigneurs",
    es: "Señores",
    pt: "Senhores",
    tr: "Lordlar",
    ru: "Лорды",
    zh: "领主们",
};

const langAlliances = {
    en: "Alliances",
    de: "Allianzen",
    fr: "Alliances",
    es: "Alianzas",
    pt: "Alianças",
    tr: "İttifaklar",
    ru: "Альянсы",
    zh: "联盟",
};

const langRanks = {
    en: "Ranks",
    de: "Ränge",
    fr: "Rangs",
    es: "Rangos",
    pt: "Classificações",
    tr: "Sıralamalar",
    ru: "Ранги",
    zh: "排名",
};

const langAlliance = {
    en: "Alliance",
    de: "Allianz",
    fr: "Alliance",
    es: "Alianza",
    pt: "Aliança",
    tr: "İttifak",
    ru: "Альянс",
    zh: "联盟",
};
	
const lang = localStorage.getItem("language") || "en";
const lang_Ranks = langRanks[lang] || "Ranks";
const lang_Lords = langLords[lang] || "Lords";
const lang_Alliances = langAlliances[lang] || "Alliances";

function save() {
  
  document.getElementById("title_lang").innerText = lang_Ranks;
  document.getElementById("lang_header1_button").innerText = lang_Lords;
  document.getElementById("lang_header2_button").innerText = lang_Alliances;
  
}