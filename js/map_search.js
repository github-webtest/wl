const langSearch = {        
    en: "Search",
    de: "Suchen",
    fr: "Rechercher",
    es: "Buscar",
    pt: "Pesquisar",
    tr: "Ara",
    ru: "Поиск",
    zh: "搜索",
};

const lang = localStorage.getItem("language") || "en";
const lang_Search = langSearch[lang] || "Search";

function save() {
	
	document.getElementById("title_lang").innerText = lang_Search;

}