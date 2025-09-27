async function save() {
	
	const langBonus = {   
   en: "Bonus",
   de: "Bonus",
   fr: "Prime",
   es: "Bono",
   pt: "Bônus",
   tr: "Bonus",
   ru: "Бонус",
   zh: "奖金",
   };
   
   const langBonust = {    
    en: "Choose one of the treasure chests",
    de: "Wähle eine der Schatzkisten",
    fr: "Choisissez l’un des coffres au trésor",
    es: "Elige uno de los cofres del tesoro",
    pt: "Escolha um dos baús do tesouro",
    tr: "Hazine sandıklarından birini seç",
    ru: "Выберите один из сундуков с сокровищами",
    zh: "选择一个宝箱",
    };
	
	const langBonust2 = {     
    en: "Your awards",
    de: "Deine Auszeichnungen",
    fr: "Vos récompenses",
    es: "Tus premios",
    pt: "Seus prêmios",
    tr: "Ödüllerin",
    ru: "Ваши награды",
    zh: "你的奖励",
};

  const lang = localStorage.getItem("language") || "en";
  const lang_Bonus = langBonus[lang] || "Bonus";
  const lang_Bonust = langBonust[lang] || "Choose one of the treasure chests";
  const lang_Bonust2 = langBonust2[lang] || "Your awards";
  
  
  document.getElementById("title_lang").innerText = lang_Bonus;
  document.getElementById("lang_bonus_t").innerText = lang_Bonust;
  document.getElementById("lang_bonus_t2").innerText = lang_Bonust2;
  
  const token = localStorage.getItem("token");
	const world = localStorage.getItem("world");

    if (token == null || world == null) return;

    try {
        const response = await fetch("/users_world", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, world })
        });

        const data = await response.json();

        if (!data.error) {
			
			if (data.bonus == 'off') {
				
				document.getElementById("bonus_check1").style.display = "none";
				document.getElementById("bonus_check2").style.display = "block";
				
				const bonus_results = JSON.parse(data.bonus_results)
				
				document.getElementById("bonus_1_img").src = "images/" + bonus_results[0].type + ".png";
				document.getElementById("bonus_2_img").src = "images/" + bonus_results[1].type + ".png";;
				document.getElementById("bonus_3_img").src = "images/" + bonus_results[2].type + ".png";;
				document.getElementById("bonus_4_img").src = "images/" + bonus_results[3].type + ".png";;
				document.getElementById("bonus_5_img").src = "images/" + bonus_results[4].type + ".png";;
				document.getElementById("bonus_6_img").src = "images/" + bonus_results[5].type + ".png";;
				document.getElementById("bonus_7_img").src = "images/" + bonus_results[6].type + ".png";;
				document.getElementById("bonus_8_img").src = "images/" + bonus_results[7].type + ".png";;
				document.getElementById("bonus_9_img").src = "images/" + bonus_results[8].type + ".png";;
				
				document.getElementById("bonus_1").innerText = bonus_results[0].amount;
				document.getElementById("bonus_2").innerText = bonus_results[1].amount;
				document.getElementById("bonus_3").innerText = bonus_results[2].amount;
				document.getElementById("bonus_4").innerText = bonus_results[3].amount;
				document.getElementById("bonus_5").innerText = bonus_results[4].amount;
				document.getElementById("bonus_6").innerText = bonus_results[5].amount;
				document.getElementById("bonus_7").innerText = bonus_results[6].amount;
				document.getElementById("bonus_8").innerText = bonus_results[7].amount;
				document.getElementById("bonus_9").innerText = bonus_results[8].amount;
					
				let selected = bonus_results[0].selected;
				let selec = Number(selected) + 1;
				document.getElementById("bonus" + selec + "_in").style.backgroundImage = "url('images/box2.png')";
				

				
			} else {
				document.getElementById("bonus_check1").style.display = "block";
				document.getElementById("bonus_check2").style.display = "none";
			}
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
  
}

setInterval(async () => {
	
	const token = localStorage.getItem("token");
	const world = localStorage.getItem("world");

    if (token == null || world == null) return;

    try {
        const response = await fetch("/users_world", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, world })
        });

        const data = await response.json();

        if (!data.error) {
			
			if (data.bonus == 'off') {
				
				document.getElementById("bonus_check1").style.display = "none";
				document.getElementById("bonus_check2").style.display = "block";
				
				const bonus_results = JSON.parse(data.bonus_results)
				
				document.getElementById("bonus_1_img").src = "images/" + bonus_results[0].type + ".png";
				document.getElementById("bonus_2_img").src = "images/" + bonus_results[1].type + ".png";;
				document.getElementById("bonus_3_img").src = "images/" + bonus_results[2].type + ".png";;
				document.getElementById("bonus_4_img").src = "images/" + bonus_results[3].type + ".png";;
				document.getElementById("bonus_5_img").src = "images/" + bonus_results[4].type + ".png";;
				document.getElementById("bonus_6_img").src = "images/" + bonus_results[5].type + ".png";;
				document.getElementById("bonus_7_img").src = "images/" + bonus_results[6].type + ".png";;
				document.getElementById("bonus_8_img").src = "images/" + bonus_results[7].type + ".png";;
				document.getElementById("bonus_9_img").src = "images/" + bonus_results[8].type + ".png";;
				
				document.getElementById("bonus_1").innerText = bonus_results[0].amount;
				document.getElementById("bonus_2").innerText = bonus_results[1].amount;
				document.getElementById("bonus_3").innerText = bonus_results[2].amount;
				document.getElementById("bonus_4").innerText = bonus_results[3].amount;
				document.getElementById("bonus_5").innerText = bonus_results[4].amount;
				document.getElementById("bonus_6").innerText = bonus_results[5].amount;
				document.getElementById("bonus_7").innerText = bonus_results[6].amount;
				document.getElementById("bonus_8").innerText = bonus_results[7].amount;
				document.getElementById("bonus_9").innerText = bonus_results[8].amount;
					
				let selected = bonus_results[0].selected;
				let selec = Number(selected) + 1;
				document.getElementById("bonus" + selec + "_in").style.backgroundImage = "url('images/box2.png')";
				

				
			} else {
				document.getElementById("bonus_check1").style.display = "block";
				document.getElementById("bonus_check2").style.display = "none";
			}
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
	
}, 1000);

async function Bonus(x) {
	
	const world = localStorage.getItem("world");
    const token = localStorage.getItem("token");
    const lange = localStorage.getItem("language");
    
    const bonus_number = Number(x);

    try {
        const response = await fetch('/bonus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, bonus_number, lange })
        });

        const data = await response.json();

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
	
}