function save() {
	
	const langEmbassyN = {     
    en: "Embassy News",  
    de: "Botschafts-Nachrichten",  
    fr: "Nouvelles de l'ambassade",  
    es: "Noticias de la embajada",  
    pt: "Notícias da embaixada",  
    tr: "Elçilik Haberleri",  
    ru: "Новости посольства",  
    zh: "大使馆新闻",  
    };
	
	const langNews = {      
    en: "News",  
    de: "Nachrichten",  
    fr: "Actualités",  
    es: "Noticias",  
    pt: "Notícias",  
    tr: "Haberler",  
    ru: "Новости",  
    zh: "新闻",  
    };

    const langEmbassies = {      
    en: "Embassies",  
    de: "Botschaften",  
    fr: "Ambassades",  
    es: "Embajadas",  
    pt: "Embaixadas",  
    tr: "Elçilikler",  
    ru: "Посольства",  
    zh: "大使馆",  
    };

  const lang = localStorage.getItem("language") || "en";
  const lang_EmbassyN = langEmbassyN[lang] || "Embassy News";
  const lang_News = langNews[lang] || "News";
  const lang_Embassies = langEmbassies[lang] || "Embassies";
  
  document.getElementById("title_lang").innerText = lang_EmbassyN;
  document.getElementById("lang_header1_button").innerText = lang_News;
  document.getElementById("lang_header2_button").innerText = lang_Embassies;
  
}