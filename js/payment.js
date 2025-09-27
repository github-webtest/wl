function save() {
  
  const langBuyDiamond = {
  en: "Buy Diamond",
  de: "Diamant kaufen",
  fr: "Acheter un diamant",
  es: "Comprar diamante",
  pt: "Comprar diamante",
  tr: "Elmas Satın Al",
  ru: "Купить алмаз",
  zh: "购买钻石",
};

  const lang = localStorage.getItem("language") || "en";
  const lang_BuyDiamond = langBuyDiamond[lang] || "Buy Diamond";
  
  document.getElementById("title_lang").innerText = lang_BuyDiamond;
  
  
  
}
