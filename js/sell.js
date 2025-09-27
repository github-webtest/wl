const langSell = {        
    en: "Sell",
    de: "Verkaufen",
    fr: "Vendre",
    es: "Vender",
    pt: "Vender",
    tr: "Sat",
    ru: "Продать",
    zh: "出售",
};

function save() {
	
  const lang = localStorage.getItem("language") || "en";
  const lang_Sell = langSell[lang] || "Sell";
  
  document.getElementById("title_lang").innerText = lang_Sell;

  
}