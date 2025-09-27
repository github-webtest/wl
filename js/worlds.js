
  const langWorld = {
    en: "World ",
    de: "Welt ",
    fr: "Monde ",
    es: "Mundo ",
    pt: "Mundo ",
    tr: "Dünya ",
    ru: "Мир ",
    zh: "世界 "
  };
  
  const langClose = {
    en: "Close",
    de: "Schließen",
    fr: "Fermer",
    es: "Cerca",
    pt: "Perto",
    tr: "Kapalı",
    ru: "Закрывать",
    zh: "关闭"
  };
  
  const langOpen = {
    en: "Open",
    de: "Offen",
    fr: "Ouvrir",
    es: "Abierto",
    pt: "Aberto",
    tr: "Açık",
    ru: "Открыть",
    zh: "打开"
  };
  
  const langFull = {
    en: "Full",
    de: "Voll",
    fr: "Plein",
    es: "Lleno",
    pt: "Cheio",
    tr: "Dolu",
    ru: "Полный",
    zh: "满"
};
  
  const langTitle = {
  en: "Worlds",
  de: "Welten",
  fr: "Mondes",
  es: "Mundos",
  pt: "Mundos",
  tr: "Dünyalar",
  ru: "Миры",
  zh: "世界"
};

  const lang = localStorage.getItem("language") || "en";
  const lang_World = langWorld[lang] || "World ";
  const lang_Open = langOpen[lang] || "Open";
  const lang_Close = langClose[lang] || "Close";
  const lang_Full = langFull[lang] || "Full";
  const lang_tit = langTitle[lang] || "Worlds";
  
async function save() {
  document.getElementById("title_lang").innerText = lang_tit;

  try {
    const response = await fetch("/worlds-count", {
      method: "POST"
    });
    const data = await response.json();
    const num = data.count;

    const parentDiv = document.getElementById('container');
    parentDiv.innerHTML = "";

    for (let i = Number(num) - 1; i > -1; i--) {
      const status = await getWorldStatus(i);
	  console.log(status)

      const sta = status === "open" ? "green" : status === "full" ? "yellow" : "red";
	  const sta2 = status === "open" ? lang_Open : status === "full" ? lang_Full : lang_Close;
	  const sta3 = status === "open" ? "open" : status === "full" ? "full" : "close";
      const sta4 = (status == "open") ? "w_c_hover" : "";
      const sta5 = (status == "open") ? i : null;

      const card = document.createElement('div');
      card.className = `world-card ${sta4}`;

      if (status === "open") {
        card.onclick = () => {
          localStorage.setItem("world", sta5);
          window.location.href = "enter.html";
        };
      }

      card.innerHTML = `
        <div class="world-info">
          <div class="status-dot ${sta}"></div>
          <span>${lang_World}${i}${i === 0 ? " (BETA)" : ""}</span>
        </div>
        <button id="w${i}_s_lang" class="world-btn ${sta3}-btn">${sta2}</button>
      `;

      parentDiv.appendChild(card);
    }
  } catch (err) {
    console.error("Server error.", err);
  }
}

async function getWorldStatus(num_world) {
  try {
    const response = await fetch("/worlds/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num_world: Number(num_world) })
    });

    if (!response.ok) {
      showToast("Error: " + response.statusText);
      return null;
    }

    const data = await response.json();

    if (data.message) {
      showToast("Error: " + data.message);
      return null;
    }

    return data.status;
	
  } catch {
    console.error("Error:", err);
    showToast("Request failed.");
    return null;
  }
}