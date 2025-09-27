function save() {	
	const langEnter = {
    en: "Enter ",
    de: "Eingeben ",
    fr: "Entrer ",
    es: "Ingresar ",
    pt: "Digitar ",
    tr: "Gir ",
    ru: "Входить ",
    zh: "进入 "
  };
  
  const langWorlds = {
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
  const lang_Enter = langEnter[lang] || "Enter";
  const lang_Worlds = langWorlds[lang] || "Enter";

    document.getElementById("login_lang").innerText = lang_Enter;
    document.getElementById("worlds_lang").innerText = lang_Worlds;
	
	document.getElementById("world_number").innerText = localStorage.getItem("world");
	
}

async function enter() {
	
	if (!localStorage.getItem("world")) {
		
		window.location.href = 'worlds.html';
		
	} else {
		
		const world = localStorage.getItem("world");
    const token = localStorage.getItem("token");

    if (!world || !token) {
        showToast("Client error token not found.");
        return;
    }

    try {
        const response = await fetch("/join-world", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ world, token })
        });

        const data = await response.json();

        if (data.redirect) {
            window.location.href = data.redirect;
        } else if (data.message) {
            showToast(data.message);
        }

    } catch (err) {
        console.error("Request failed:", err);
        showToast("An error occurred, try again.");
    }
	
     }

}

function worlds() {
	window.location.href = 'worlds.html';
}