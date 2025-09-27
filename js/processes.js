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
	
	const langProcesses = {  
    en: "Processes",
    de: "Prozesse",
    fr: "Processus",
    es: "Procesos",
    pt: "Processos",
    tr: "İşlemler",
    ru: "Процессы",
    zh: "进程",
    };

  const lang = localStorage.getItem("language") || "en";
  const lang_Processes = langProcesses[lang] || "Processes";
  const lang_Military = langMilitary[lang] || "Military";
  const lang_Trade = langTrade[lang] || "Trade";
  
  document.getElementById("title_lang").innerText = lang_Processes;
  document.getElementById("lang_header1_button").innerText = lang_Military;
  document.getElementById("lang_header2_button").innerText = lang_Trade;
  
}