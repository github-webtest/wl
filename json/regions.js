const langCities = {
    en: "Cities",
    de: "Städte",
    fr: "Villes",
    es: "Ciudades",
    pt: "Cidades",
    tr: "Şehirler",
    ru: "Города",
    zh: "城市",
};

const langColonies = {
    en: "Colonies",
    de: "Kolonien",
    fr: "Colonies",
    es: "Colonias",
    pt: "Colônias",
    tr: "Koloniler",
    ru: "Колонии",
    zh: "殖民地",
};

const langRegions = {
    en: "Regions",
    de: "Regionen",
    fr: "Régions",
    es: "Regiones",
    pt: "Regiões",
    tr: "Bölgeler",
    ru: "Регионы",
    zh: "地区",
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
const lang_Regions = langRegions[lang] || "Regions";
const lang_Cities = langCities[lang] || "Cities";
const lang_Colonies = langColonies[lang] || "Colonies";

function save() {
  
  document.getElementById("title_lang").innerText = lang_Regions;
  document.getElementById("lang_header1_button").innerText = lang_Cities;
  document.getElementById("lang_header2_button").innerText = lang_Colonies;
  
}