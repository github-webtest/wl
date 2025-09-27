function save() {

const langBuy = {       
    en: "Buy",
    de: "Kaufen",
    fr: "Acheter",
    es: "Comprar",
    pt: "Comprar",
    tr: "Satın Al",
    ru: "Купить",
    zh: "购买",
    };
	
  const lang = localStorage.getItem("language") || "en";
  const lang_Buy = langBuy[lang] || "Buy";
  
  document.getElementById("title_lang").innerText = lang_Buy;

  
}