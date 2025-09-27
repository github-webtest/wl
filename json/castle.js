async function save() {
  
  const langCastle = {
  en: "Castle",
  de: "Burg",
  fr: "Château",
  es: "Castillo",
  pt: "Castelo",
  tr: "Kale",
  ru: "Замок",
  zh: "城堡",
  };

  const langLevel = { 
  en: "Level: ", 
  de: "Stufe: ", 
  fr: "Niveau: ", 
  es: "Nivel: ", 
  pt: "Nível: ", 
  tr: "Seviye: ", 
  ru: "Уровень: ", 
  zh: "等级: ",
  };

  const langBTitle = {
  en: "Produce elite warriors for your army and fortify the castle to protect your kingdom center!",
  de: "Produziere Elitekrieger für deine Armee und verstärke das Schloss, um das Zentrum deines Königreichs zu schützen!",
  fr: "Produisez des guerriers d’élite pour votre armée et fortifiez le château afin de protéger le centre de votre royaume !",
  es: "Produce guerreros de élite para tu ejército y fortifica el castillo para proteger el centro de tu reino.",
  pt: "Produza guerreiros de elite para seu exército e fortifique o castelo para proteger o centro do seu reino!",
  tr: "Ordun için elit savaşçılar üret ve krallığının merkezini korumak için kaleyi güçlendir!",
  ru: "Создавайте элитных воинов для своей армии и укрепляйте замок, чтобы защитить центр вашего королевства!",
  zh: "为你的军队培养精英战士，并加固城堡以保护王国中心！",
  };
  
  const langDefenseBonus = {
  en: "Defense Bonus: ",
  de: "Verteidigungsbonus: ",
  fr: "Bonus de défense : ",
  es: "Bono de defensa: ",
  pt: "Bônus de defesa: ",
  tr: "Savunma Bonusu: ",
  ru: "Бонус к защите: ",
  zh: "防御加成： ",
  };

  const lang = localStorage.getItem("language") || "en";
  const lang_Cancel = langCancel[lang] || "Cancel";
  const lang_Castle = langCastle[lang] || "Castle";
  const lang_Level = langLevel[lang] || "Level: ";
  const lang_BTitle = langBTitle[lang] || "Produce elite warriors for your army and fortify the castle to protect your kingdom center! <br> Defence bonus";
  const lang_DefenseBonus = langDefenseBonus[lang] || "Defense Bonus: ";
  
  document.getElementById("title_lang").innerText = lang_Castle;
  document.getElementById("castlex_text").innerText = lang_Castle;
  document.getElementById("lang_level").innerText = lang_Level;
  document.getElementById("lang_level2").innerText = lang_Level;
  document.getElementById("lang_level3").innerText = lang_Level;
  document.getElementById("lang_level4").innerText = lang_Level;
  document.getElementById("lang_level5").innerText = lang_Level;
  document.getElementById("lang_level6").innerText = lang_Level;
  document.getElementById("lang_build_title").innerText = lang_BTitle;
  document.getElementById("defense_bonus_text").innerText = lang_DefenseBonus;
  document.getElementById("lang_cancel1").innerText = lang_Cancel;
  document.getElementById("lang_cancel2").innerText = lang_Cancel;
  document.getElementById("lang_cancel3").innerText = lang_Cancel;
  document.getElementById("lang_cancel4").innerText = lang_Cancel;
  document.getElementById("lang_cancel5").innerText = lang_Cancel; 

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
			document.getElementById("castle_level").innerText = data.castle_lvl;
			document.getElementById("knight_level").innerText = data.knight_lvl;
			document.getElementById("knight_amount").innerText = data.knight;
			document.getElementById("knight_pg_diamond").innerText = data.knight_p_a;
			document.getElementById("imperial_spearman_level").innerText = data.imperial_spearman_lvl;
			document.getElementById("imperial_spearman_amount").innerText = data.imperial_spearman;
			document.getElementById("imperial_spearman_pg_diamond").innerText = data.imperial_spearman_p_a;
			
			if (data.knight != null) {	
			 let costDiamond = 2;
			 let costGold = 0;
			 let costFood = 0;
			 let costWood = 0;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("knight_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.imperial_spearman != null) {	
			 let costDiamond = 0;
			 let costGold = 200;
			 let costFood = 200;
			 let costWood = 0;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("imperial_spearman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.castle_lvl < 20) {
			document.getElementById("castle_next_level").innerText = data.castle_lvl + 1;
			} else {
			    document.getElementById("castle_next_level").innerText = "Max";
			}
			if (data.knight_lvl < 20) {
			document.getElementById("knight_next_level").innerText = data.knight_lvl + 1;
			} else{
			    document.getElementById("knight_next_level").innerText = "Max";
			}
			if (data.imperial_spearman_lvl < 20) {
			document.getElementById("imperial_spearman_next_level").innerText = data.imperial_spearman_lvl + 1;
			} else {
			    document.getElementById("imperial_spearman_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 2500) {
				
					document.getElementById("imperial_spearman_img").style.backgroundImage = "url('images/imperial_spearman.png')";
				    document.getElementById("imperial_spearman_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
					document.getElementById("imperial_spearman_top_2").style.display = "flex";
				
			}
			
			if (data.castle_up == 'on' || data.knight_up == 'on' || data.imperial_spearman_up == 'on') {
				
				if (data.castle_up == 'off') {
				document.getElementById("castle_main1").style.display = "none";
				document.getElementById("castle_main2").style.display = "none";
				document.getElementById("castle_main3").style.display = "flex";
				} else {
                      document.getElementById("castle_main1").style.display = "none";
                      document.getElementById("castle_main2").style.display = "flex";
                      document.getElementById("castle_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.castle_up_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("castle_textarea").value = remaining;
                }
				
				if (data.knight_up == 'off') {
				document.getElementById("knight_main1").style.display = "none";
				document.getElementById("knight_main2").style.display = "none";
				document.getElementById("knight_main3").style.display = "flex";
				document.getElementById("knight_u_buttons").style.display = "none";
				document.getElementById("knight_p_buttons").style.display = "none";
				} else {
                      document.getElementById("knight_main1").style.display = "none";
                      document.getElementById("knight_main2").style.display = "flex";
                      document.getElementById("knight_main3").style.display = "none";
					  document.getElementById("knight_u_buttons").style.display = "flex";
					  document.getElementById("knight_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.knight_up_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("knight_u_textarea").value = remaining;
                }
				
				if (data.imperial_spearman_up == 'off') {
				document.getElementById("imperial_spearman_main1").style.display = "none";
				document.getElementById("imperial_spearman_main2").style.display = "none";
				document.getElementById("imperial_spearman_main3").style.display = "flex";
				document.getElementById("imperial_spearman_u_buttons").style.display = "none";
				document.getElementById("imperial_spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("imperial_spearman_main1").style.display = "none";
                      document.getElementById("imperial_spearman_main2").style.display = "flex";
                      document.getElementById("imperial_spearman_main3").style.display = "none";
					  document.getElementById("imperial_spearman_u_buttons").style.display = "flex";
				      document.getElementById("imperial_spearman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.imperial_spearman_up_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("imperial_spearman_u_textarea").value = remaining;
                }
				
			} else if (data.knight_p == 'on' || data.imperial_spearman_p == 'on') {
			
				document.getElementById("castle_main1").style.display = "none";
				document.getElementById("castle_main2").style.display = "none";
				document.getElementById("castle_main3").style.display = "flex";
				
				if (data.knight_p == 'off') {
				document.getElementById("knight_main1").style.display = "none";
				document.getElementById("knight_main2").style.display = "none";
				document.getElementById("knight_main3").style.display = "flex";
				document.getElementById("knight_u_buttons").style.display = "none";
				document.getElementById("knight_p_buttons").style.display = "none";
				} else {
                      document.getElementById("knight_main1").style.display = "none";
                      document.getElementById("knight_main2").style.display = "flex";
                      document.getElementById("knight_main3").style.display = "none";
					  document.getElementById("knight_u_buttons").style.display = "none";
					  document.getElementById("knight_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.knight_p_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("knight_p_textarea").value = "x" + data.knight_p_a + "\n" + remaining;
                }
				
				if (data.imperial_spearman_p == 'off') {
				document.getElementById("imperial_spearman_main1").style.display = "none";
				document.getElementById("imperial_spearman_main2").style.display = "none";
				document.getElementById("imperial_spearman_main3").style.display = "flex";
				document.getElementById("imperial_spearman_u_buttons").style.display = "none";
				document.getElementById("imperial_spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("imperial_spearman_main1").style.display = "none";
                      document.getElementById("imperial_spearman_main2").style.display = "flex";
                      document.getElementById("imperial_spearman_main3").style.display = "none";
					  document.getElementById("imperial_spearman_u_buttons").style.display = "none";
				      document.getElementById("imperial_spearman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.imperial_spearman_p_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("imperial_spearman_p_textarea").value = "x" + data.imperial_spearman_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("castle_main1").style.display = "flex";
				    document.getElementById("castle_main2").style.display = "none";
				    document.getElementById("castle_main3").style.display = "none";
					document.getElementById("knight_main1").style.display = "flex";
				    document.getElementById("knight_main2").style.display = "none";
				    document.getElementById("knight_main3").style.display = "none";
					document.getElementById("imperial_spearman_main1").style.display = "flex";
				    document.getElementById("imperial_spearman_main2").style.display = "none";
				    document.getElementById("imperial_spearman_main3").style.display = "none";
			}
			
			document.getElementById("defense_bonus").innerText = ((data.castle_lvl * 2) + (data.wall_lvl * 2) + ((1 + 0.1 * data.watchtower_lvl) * data.watchtower)) * (1 + data.masonry_lvl * 0.01);
			
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
			document.getElementById("castle_level").innerText = data.castle_lvl;
			document.getElementById("knight_level").innerText = data.knight_lvl;
			document.getElementById("knight_amount").innerText = data.knight;
			document.getElementById("knight_pg_diamond").innerText = data.knight_p_a;
			document.getElementById("imperial_spearman_level").innerText = data.imperial_spearman_lvl;
			document.getElementById("imperial_spearman_amount").innerText = data.imperial_spearman;
			document.getElementById("imperial_spearman_pg_diamond").innerText = data.imperial_spearman_p_a;
			
			if (data.knight != null) {	
			 let costDiamond = 2;
			 let costGold = 0;
			 let costFood = 0;
			 let costWood = 0;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("knight_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.imperial_spearman != null) {	
			 let costDiamond = 0;
			 let costGold = 200;
			 let costFood = 200;
			 let costWood = 0;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("imperial_spearman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.castle_lvl < 20) {
			document.getElementById("castle_next_level").innerText = data.castle_lvl + 1;
			} else {
			    document.getElementById("castle_next_level").innerText = "Max";
			}
			if (data.knight_lvl < 20) {
			document.getElementById("knight_next_level").innerText = data.knight_lvl + 1;
			} else{
			    document.getElementById("knight_next_level").innerText = "Max";
			}
			if (data.imperial_spearman_lvl < 20) {
			document.getElementById("imperial_spearman_next_level").innerText = data.imperial_spearman_lvl + 1;
			} else {
			    document.getElementById("imperial_spearman_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 2500) {
				
					document.getElementById("imperial_spearman_img").style.backgroundImage = "url('images/imperial_spearman.png')";
				    document.getElementById("imperial_spearman_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
					document.getElementById("imperial_spearman_top_2").style.display = "flex";
				
			}
			
			if (data.castle_up == 'on' || data.knight_up == 'on' || data.imperial_spearman_up == 'on') {
				
				if (data.castle_up == 'off') {
				document.getElementById("castle_main1").style.display = "none";
				document.getElementById("castle_main2").style.display = "none";
				document.getElementById("castle_main3").style.display = "flex";
				} else {
                      document.getElementById("castle_main1").style.display = "none";
                      document.getElementById("castle_main2").style.display = "flex";
                      document.getElementById("castle_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.castle_up_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("castle_textarea").value = remaining;
                }
				
				if (data.knight_up == 'off') {
				document.getElementById("knight_main1").style.display = "none";
				document.getElementById("knight_main2").style.display = "none";
				document.getElementById("knight_main3").style.display = "flex";
				document.getElementById("knight_u_buttons").style.display = "none";
				document.getElementById("knight_p_buttons").style.display = "none";
				} else {
                      document.getElementById("knight_main1").style.display = "none";
                      document.getElementById("knight_main2").style.display = "flex";
                      document.getElementById("knight_main3").style.display = "none";
					  document.getElementById("knight_u_buttons").style.display = "flex";
					  document.getElementById("knight_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.knight_up_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("knight_u_textarea").value = remaining;
                }
				
				if (data.imperial_spearman_up == 'off') {
				document.getElementById("imperial_spearman_main1").style.display = "none";
				document.getElementById("imperial_spearman_main2").style.display = "none";
				document.getElementById("imperial_spearman_main3").style.display = "flex";
				document.getElementById("imperial_spearman_u_buttons").style.display = "none";
				document.getElementById("imperial_spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("imperial_spearman_main1").style.display = "none";
                      document.getElementById("imperial_spearman_main2").style.display = "flex";
                      document.getElementById("imperial_spearman_main3").style.display = "none";
					  document.getElementById("imperial_spearman_u_buttons").style.display = "flex";
				      document.getElementById("imperial_spearman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.imperial_spearman_up_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("imperial_spearman_u_textarea").value = remaining;
                }
				
			} else if (data.knight_p == 'on' || data.imperial_spearman_p == 'on') {
			
				document.getElementById("castle_main1").style.display = "none";
				document.getElementById("castle_main2").style.display = "none";
				document.getElementById("castle_main3").style.display = "flex";
				
				if (data.knight_p == 'off') {
				document.getElementById("knight_main1").style.display = "none";
				document.getElementById("knight_main2").style.display = "none";
				document.getElementById("knight_main3").style.display = "flex";
				document.getElementById("knight_u_buttons").style.display = "none";
				document.getElementById("knight_p_buttons").style.display = "none";
				} else {
                      document.getElementById("knight_main1").style.display = "none";
                      document.getElementById("knight_main2").style.display = "flex";
                      document.getElementById("knight_main3").style.display = "none";
					  document.getElementById("knight_u_buttons").style.display = "none";
					  document.getElementById("knight_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.knight_p_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("knight_p_textarea").value = "x" + data.knight_p_a + "\n" + remaining;
                }
				
				if (data.imperial_spearman_p == 'off') {
				document.getElementById("imperial_spearman_main1").style.display = "none";
				document.getElementById("imperial_spearman_main2").style.display = "none";
				document.getElementById("imperial_spearman_main3").style.display = "flex";
				document.getElementById("imperial_spearman_u_buttons").style.display = "none";
				document.getElementById("imperial_spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("imperial_spearman_main1").style.display = "none";
                      document.getElementById("imperial_spearman_main2").style.display = "flex";
                      document.getElementById("imperial_spearman_main3").style.display = "none";
					  document.getElementById("imperial_spearman_u_buttons").style.display = "none";
				      document.getElementById("imperial_spearman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.imperial_spearman_p_time;

                      let remaining = "00:00:00:00";

                      if (startTime != null && endTime != null) {
                        let diff = endTime - startTime;
                        if (diff < 0) diff = 0;

                        const seconds = Math.floor(diff / 1000) % 60;
                        const minutes = Math.floor(diff / (1000 * 60)) % 60;
                        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        const pad = (n) => n.toString().padStart(2, "0");
                        remaining = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                      }

                    document.getElementById("imperial_spearman_p_textarea").value = "x" + data.imperial_spearman_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("castle_main1").style.display = "flex";
				    document.getElementById("castle_main2").style.display = "none";
				    document.getElementById("castle_main3").style.display = "none";
					document.getElementById("knight_main1").style.display = "flex";
				    document.getElementById("knight_main2").style.display = "none";
				    document.getElementById("knight_main3").style.display = "none";
					document.getElementById("imperial_spearman_main1").style.display = "flex";
				    document.getElementById("imperial_spearman_main2").style.display = "none";
				    document.getElementById("imperial_spearman_main3").style.display = "none";
			}
			
			document.getElementById("defense_bonus").innerText = ((data.castle_lvl * 2) + (data.wall_lvl * 2) + ((1 + 0.1 * data.watchtower_lvl) * data.watchtower)) * (1 + data.masonry_lvl * 0.01);
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
	
}, 1000);