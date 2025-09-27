function save() {

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

const langnoAllianceMsg = {
    en: "You haven't joined an Alliance yet.",
    de: "Du bist noch keiner Allianz beigetreten.",
    fr: "Vous n'avez pas encore rejoint une Alliance.",
    es: "Aún no te has unido a una Alianza.",
    pt: "Você ainda não entrou em uma Aliança.",
    tr: "Henüz bir İttifak'a katılmadınız.",
    ru: "Вы ещё не присоединились к Альянсу.",
    zh: "你还没有加入联盟。",
};

const img1 = `<div id="al_img1" class="al_btn_img" style="background-image: url('images/a_c_alliance.png');"></div>`;
const img2 = `<div id="al_img2" class="al_btn_img" style="background-image: url('images/members.png');"></div>`;
const img3 = `<div id="al_img3" class="al_btn_img" style="background-image: url('images/diplomacy.png');"></div>`;
const img4 = `<div id="al_img4" class="al_btn_img" style="background-image: url('images/a_logs.png');"></div>`;
const img5 = `<div id="al_img5" class="al_btn_img" style="background-image: url('images/members.png');"></div>`;

const langcreativeMsg = {
    en: `${img1}Create`,
    de: `${img1}Erstellen`,
    fr: `${img1}Créer`,
    es: `${img1}Crear`,
    pt: `${img1}Criar`,
    tr: `${img1}Kur`,
    ru: `${img1}Создать`,
    zh: `${img1}创建`,
};

const langjoinMsg = {
    en: `${img2}Join`,
    de: `${img2}Beitreten`,
    fr: `${img2}Rejoindre`,
    es: `${img2}Unirse`,
    pt: `${img2}Entrar`,
    tr: `${img2}Katıl`,
    ru: `${img2}Присоединиться`,
    zh: `${img2}加入`,
};

const langdiplomacy = {
    en: `${img3}Diplomacy`,
    de: `${img3}Diplomatie`,
    fr: `${img3}Diplomatie`,
    es: `${img3}Diplomacia`,
    pt: `${img3}Diplomacia`,
    tr: `${img3}Diplomasi`,
    ru: `${img3}Дипломатия`,
    zh: `${img3}外交`,
};

const langrecruitments = {
    en: `${img4}Recruitments`,
    de: `${img4}Rekrutierungen`,
    fr: `${img4}Recrutements`,
    es: `${img4}Reclutamientos`,
    pt: `${img4}Recrutamentos`,
    tr: `${img4}Başvurular`,
    ru: `${img4}Наборы`,
    zh: `${img4}招募`,
};

const langmembers = {
    en: `${img5}Members`,
    de: `${img5}Mitglieder`,
    fr: `${img5}Membres`,
    es: `${img5}Miembros`,
    pt: `${img5}Membros`,
    tr: `${img5}Üyeler`,
    ru: `${img5}Участники`,
    zh: `${img5}成员`,
};

const langIFA = {
    en: "Invitations from Alliances",
    de: "Einladungen von Allianzen",
    fr: "Invitations des Alliances",
    es: "Invitaciones de Alianzas",
    pt: "Convites de Alianças",
    tr: "İttifaklardan Gelen Davetler",
    ru: "Приглашения от Альянсов",
    zh: "来自联盟的邀请",
};
	
  const lang = localStorage.getItem("language") || "en";
  const lang_Alliance = langAlliance[lang] || "Alliance";
  const lang_noAllianceMsg = langnoAllianceMsg[lang] || "You haven't joined an Alliance yet.";
  const lang_creativeMsg = langcreativeMsg[lang] || `${img1}Create`;
  const lang_joinMsg = langjoinMsg[lang] || `${img2}Join`;
  const lang_IFA = langIFA[lang] || "Invitations from Alliances";
  const lang_diplomacy = langdiplomacy[lang] || `${img3}Diplomacy`;
  const lang_recruitments = langrecruitments[lang] || `${img4}Recruitments`;
  const lang_members = langmembers[lang] || `${img5}Members`;
  
  //document.getElementById("container1").style.display = "block";
  
  var albtnWith2 = document.getElementById("create_lang").offsetWidth;
  var rbtn = (albtnWith2 - 32) / 2;

  var albtnWith = document.getElementById("al_bbtn1").offsetWidth;
  var rbtn2 = (albtnWith - 32) / 2;
  
  document.getElementById("title_lang").innerText = lang_Alliance;
  document.getElementById("noa_lang").innerText = lang_noAllianceMsg;
  document.getElementById("create_lang").innerHTML = lang_creativeMsg;
  document.getElementById("join_lang").innerHTML = lang_joinMsg;
  document.getElementById("al_bbtn1").innerHTML = lang_diplomacy;
  document.getElementById("recruitments_lang").innerHTML = lang_recruitments;
  document.getElementById("members_lang").innerHTML = lang_members;
  document.getElementById("al_img1").style.marginLeft = rbtn + "px";
  document.getElementById("al_img2").style.marginLeft = rbtn + "px";
  document.getElementById("al_img3").style.marginLeft = rbtn2 + "px";
  document.getElementById("al_img4").style.marginLeft = rbtn2 + "px";
  document.getElementById("al_img5").style.marginLeft = rbtn2 + "px";
  document.getElementById("ifa_lang").innerText = lang_IFA;
  
}