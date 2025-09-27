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

const langCancel = {
    en: "Cancel",
    de: "Abbrechen",
    fr: "Annuler",
    es: "Cancelar",
    pt: "Cancelar",
    tr: "İptal",
    ru: "Отмена",
    zh: "取消",
};
	
  const lang = localStorage.getItem("language") || "en";
  const lang_Details = langDetails[lang] || "Details";
  const lang_Cancel = langCancel[lang] || "Cancel";
  
  document.getElementById("title_lang").innerText = lang_Details;
  document.getElementById("cancel_lang").innerText = lang_Cancel;
  
}