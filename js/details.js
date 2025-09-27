function save() {

const langDetails = {
    en: "Details",
    de: "Einzelheiten",
    fr: "Détails",
    es: "Detalles",
    pt: "Detalhes",
    tr: "Detaylar",
    ru: "Подробности",
    zh: "详细信息",
};

const langDelete = {
    en: "Delete",
    de: "Löschen",
    fr: "Supprimer",
    es: "Eliminar",
    pt: "Excluir",
    tr: "Sil",
    ru: "Удалить",
    zh: "删除",
};
	
  const lang = localStorage.getItem("language") || "en";
  const lang_Details = langDetails[lang] || "Details";
  const lang_Delete = langDelete[lang] || "Delete";
  
  document.getElementById("title_lang").innerText = lang_Details;
  document.getElementById("delete_lang").innerText = lang_Delete;
  
}