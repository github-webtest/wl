function save() {

const langSupport = { 
    en: "Support",
    de: "Unterstützung",
    fr: "Soutien",
    es: "Apoyo",
    pt: "Apoio",
    tr: "Destek",
    ru: "Поддержка",
    zh: "支持",
};
	
  const lang = localStorage.getItem("language") || "en";
  const lang_Support = langSupport[lang] || "Support";
  
  document.getElementById("title_lang").innerText = lang_Support;

  
}