async function save() {
  
  const langWorkshop = { 
  en: "Workshop",
  de: "Werkstatt",
  fr: "Atelier",
  es: "Taller",
  pt: "Oficina",
  tr: "Atölye",
  ru: "Мастерская",
  zh: "工坊",
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
  en: "Craft and upgrade weapons of war to strengthen your army!",
  de: "Stelle Kriegswaffen her und rüste sie auf, um deine Armee zu stärken!",
  fr: "Fabriquez et améliorez des armes de guerre pour renforcer votre armée !",
  es: "Fabrica y mejora armas de guerra para fortalecer tu ejército.",
  pt: "Forje e melhore armas de guerra para fortalecer seu exército!",
  tr: "Ordunu güçlendirmek için savaş silahları üret ve geliştir!",
  ru: "Создавайте и улучшайте оружие войны, чтобы укрепить свою армию!",
  zh: "打造并升级战争武器来增强你的军队！",
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
  
  const langcannon = {      
    en: "cannon",        
    de: "Spion",  
    fr: "Espion",  
    es: "Espía",  
    pt: "Espião",  
    tr: "Casus",  
    ru: "Шпион",  
    zh: "间谍",  
    };

  const lang = localStorage.getItem("language") || "en";
  const lang_Cancel = langCancel[lang] || "Cancel";
  const lang_Workshop = langWorkshop[lang] || "Workshop";
  const lang_cannon = langcannon[lang] || "cannon";
  const lang_Level = langLevel[lang] || "Level: ";
  const lang_BTitle = langBTitle[lang] || "Train troops to strengthen your army!";
  const lang_DefenseBonus = langDefenseBonus[lang] || "Defense Bonus: ";
  
  document.getElementById("title_lang").innerText = lang_Workshop;
  document.getElementById("lang_build_title").innerText = lang_BTitle;
  document.getElementById("lang_level1").innerText = lang_Level;
  document.getElementById("lang_level2").innerText = lang_Level;
  document.getElementById("lang_level3").innerText = lang_Level;
  document.getElementById("lang_level4").innerText = lang_Level;
  document.getElementById("lang_level5").innerText = lang_Level;
  document.getElementById("lang_level6").innerText = lang_Level;
  document.getElementById("lang_cancel1").innerText = lang_Cancel;
  document.getElementById("lang_cancel2").innerText = lang_Cancel;
  document.getElementById("lang_cancel3").innerText = lang_Cancel;
  document.getElementById("lang_cancel4").innerText = lang_Cancel;
  document.getElementById("lang_cancel5").innerText = lang_Cancel;
  document.getElementById("lang_cancel6").innerText = lang_Cancel;
  
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
			document.getElementById("ballista_level").innerText = data.ballista_lvl;
			document.getElementById("ballista_amount").innerText = data.ballista;
			document.getElementById("ballista_pg_diamond").innerText = data.ballista_p_a;
			document.getElementById("onager_level").innerText = data.onager_lvl;
			document.getElementById("onager_amount").innerText = data.onager;
			document.getElementById("onager_pg_diamond").innerText = data.onager_p_a;
			document.getElementById("cannon_level").innerText = data.cannon_lvl;
			document.getElementById("cannon_amount").innerText = data.cannon;
			document.getElementById("cannon_pg_diamond").innerText = data.cannon_p_a;
			
			if (data.ballista != null) {	
			 let costDiamond = 0;
			 let costGold = 500;
			 let costFood = 0;
			 let costWood = 500;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("ballista_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.onager != null) {	
			 let costDiamond = 0;
			 let costGold = 500;
			 let costFood = 0;
			 let costWood = 500;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("onager_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.cannon != null) {	
			 let costDiamond = 0;
			 let costGold = 750;
			 let costFood = 0;
			 let costWood = 750;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("cannon_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.ballista_lvl < 20) {
			document.getElementById("ballista_next_level").innerText = data.ballista_lvl + 1;
			} else {
			    document.getElementById("ballista_next_level").innerText = "Max";
			}
			if (data.onager_lvl < 20) {
			document.getElementById("onager_next_level").innerText = data.onager_lvl + 1;
			} else{
			    document.getElementById("onager_next_level").innerText = "Max";
			}
			if (data.cannon_lvl < 20) {
			document.getElementById("cannon_next_level").innerText = data.cannon_lvl + 1;
			} else {
			    document.getElementById("cannon_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 1500) {
				document.getElementById("onager_img").style.backgroundImage = "url('images/onager.png')";
				document.getElementById("onager_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("onager_top_2").style.display = "flex";
				
				if (data.age_points >= 5000) {
				
				document.getElementById("cannon_img").style.backgroundImage = "url('images/cannon.png')";
				document.getElementById("cannon_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("cannon_top_2").style.display = "flex";
				
				}
				
			}
			
			if (data.ballista_up == 'on' || data.onager_up == 'on' || data.cannon_up == 'on') {
				
				if (data.ballista_up == 'off') {
				document.getElementById("ballista_main1").style.display = "none";
				document.getElementById("ballista_main2").style.display = "none";
				document.getElementById("ballista_main3").style.display = "flex";
				document.getElementById("ballista_u_buttons").style.display = "none";
				document.getElementById("ballista_p_buttons").style.display = "none";
				} else {
                      document.getElementById("ballista_main1").style.display = "none";
                      document.getElementById("ballista_main2").style.display = "flex";
                      document.getElementById("ballista_main3").style.display = "none";
					  document.getElementById("ballista_u_buttons").style.display = "flex";
					  document.getElementById("ballista_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.ballista_up_time;

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

                    document.getElementById("ballista_u_textarea").value = remaining;
                }
				
				if (data.onager_up == 'off') {
				document.getElementById("onager_main1").style.display = "none";
				document.getElementById("onager_main2").style.display = "none";
				document.getElementById("onager_main3").style.display = "flex";
				document.getElementById("onager_u_buttons").style.display = "none";
				document.getElementById("onager_p_buttons").style.display = "none";
				} else {
                      document.getElementById("onager_main1").style.display = "none";
                      document.getElementById("onager_main2").style.display = "flex";
                      document.getElementById("onager_main3").style.display = "none";
					  document.getElementById("onager_u_buttons").style.display = "flex";
					  document.getElementById("onager_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.onager_up_time;

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

                    document.getElementById("onager_u_textarea").value = remaining;
                }
				
				if (data.cannon_up == 'off') {
				document.getElementById("cannon_main1").style.display = "none";
				document.getElementById("cannon_main2").style.display = "none";
				document.getElementById("cannon_main3").style.display = "flex";
				document.getElementById("cannon_u_buttons").style.display = "none";
				document.getElementById("cannon_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cannon_main1").style.display = "none";
                      document.getElementById("cannon_main2").style.display = "flex";
                      document.getElementById("cannon_main3").style.display = "none";
					  document.getElementById("cannon_u_buttons").style.display = "flex";
				      document.getElementById("cannon_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cannon_up_time;

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

                    document.getElementById("cannon_u_textarea").value = remaining;
                }
				
			} else if (data.ballista_p == 'on' || data.onager_p == 'on' || data.cannon_p == 'on') {
                if (data.ballista_p == 'off') {
				document.getElementById("ballista_main1").style.display = "none";
				document.getElementById("ballista_main2").style.display = "none";
				document.getElementById("ballista_main3").style.display = "flex";
				document.getElementById("ballista_u_buttons").style.display = "none";
				document.getElementById("ballista_p_buttons").style.display = "none";
				} else {
                      document.getElementById("ballista_main1").style.display = "none";
                      document.getElementById("ballista_main2").style.display = "flex";
                      document.getElementById("ballista_main3").style.display = "none";
					  document.getElementById("ballista_u_buttons").style.display = "none";
					  document.getElementById("ballista_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.ballista_p_time;

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

                    document.getElementById("ballista_p_textarea").value = "x" + data.ballista_p_a + "\n" + remaining;
                }
				
				if (data.onager_p == 'off') {
				document.getElementById("onager_main1").style.display = "none";
				document.getElementById("onager_main2").style.display = "none";
				document.getElementById("onager_main3").style.display = "flex";
				document.getElementById("onager_u_buttons").style.display = "none";
				document.getElementById("onager_p_buttons").style.display = "none";
				} else {
                      document.getElementById("onager_main1").style.display = "none";
                      document.getElementById("onager_main2").style.display = "flex";
                      document.getElementById("onager_main3").style.display = "none";
					  document.getElementById("onager_u_buttons").style.display = "none";
					  document.getElementById("onager_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.onager_p_time;

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

                    document.getElementById("onager_p_textarea").value = "x" + data.onager_p_a + "\n" + remaining;
                }
				
				if (data.cannon_p == 'off') {
				document.getElementById("cannon_main1").style.display = "none";
				document.getElementById("cannon_main2").style.display = "none";
				document.getElementById("cannon_main3").style.display = "flex";
				document.getElementById("cannon_u_buttons").style.display = "none";
				document.getElementById("cannon_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cannon_main1").style.display = "none";
                      document.getElementById("cannon_main2").style.display = "flex";
                      document.getElementById("cannon_main3").style.display = "none";
					  document.getElementById("cannon_u_buttons").style.display = "none";
				      document.getElementById("cannon_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cannon_p_time;

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

                    document.getElementById("cannon_p_textarea").value = "x" + data.cannon_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("ballista_main1").style.display = "flex";
				    document.getElementById("ballista_main2").style.display = "none";
				    document.getElementById("ballista_main3").style.display = "none";
					document.getElementById("onager_main1").style.display = "flex";
				    document.getElementById("onager_main2").style.display = "none";
				    document.getElementById("onager_main3").style.display = "none";
					document.getElementById("cannon_main1").style.display = "flex";
				    document.getElementById("cannon_main2").style.display = "none";
				    document.getElementById("cannon_main3").style.display = "none";
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
			document.getElementById("ballista_level").innerText = data.ballista_lvl;
			document.getElementById("ballista_amount").innerText = data.ballista;
			document.getElementById("ballista_pg_diamond").innerText = data.ballista_p_a;
			document.getElementById("onager_level").innerText = data.onager_lvl;
			document.getElementById("onager_amount").innerText = data.onager;
			document.getElementById("onager_pg_diamond").innerText = data.onager_p_a;
			document.getElementById("cannon_level").innerText = data.cannon_lvl;
			document.getElementById("cannon_amount").innerText = data.cannon;
			document.getElementById("cannon_pg_diamond").innerText = data.cannon_p_a;
			
			if (data.ballista != null) {	
			 let costDiamond = 0;
			 let costGold = 500;
			 let costFood = 0;
			 let costWood = 500;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("ballista_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.onager != null) {	
			 let costDiamond = 0;
			 let costGold = 500;
			 let costFood = 0;
			 let costWood = 500;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("onager_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.cannon != null) {	
			 let costDiamond = 0;
			 let costGold = 750;
			 let costFood = 0;
			 let costWood = 750;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("cannon_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.ballista_lvl < 20) {
			document.getElementById("ballista_next_level").innerText = data.ballista_lvl + 1;
			} else {
			    document.getElementById("ballista_next_level").innerText = "Max";
			}
			if (data.onager_lvl < 20) {
			document.getElementById("onager_next_level").innerText = data.onager_lvl + 1;
			} else{
			    document.getElementById("onager_next_level").innerText = "Max";
			}
			if (data.cannon_lvl < 20) {
			document.getElementById("cannon_next_level").innerText = data.cannon_lvl + 1;
			} else {
			    document.getElementById("cannon_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 1500) {
				document.getElementById("onager_img").style.backgroundImage = "url('images/onager.png')";
				document.getElementById("onager_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("onager_top_2").style.display = "flex";
				
				if (data.age_points >= 5000) {
				
				document.getElementById("cannon_img").style.backgroundImage = "url('images/cannon.png')";
				document.getElementById("cannon_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("cannon_top_2").style.display = "flex";
				
				}
				
			}
			
			if (data.ballista_up == 'on' || data.onager_up == 'on' || data.cannon_up == 'on') {
				
				if (data.ballista_up == 'off') {
				document.getElementById("ballista_main1").style.display = "none";
				document.getElementById("ballista_main2").style.display = "none";
				document.getElementById("ballista_main3").style.display = "flex";
				document.getElementById("ballista_u_buttons").style.display = "none";
				document.getElementById("ballista_p_buttons").style.display = "none";
				} else {
                      document.getElementById("ballista_main1").style.display = "none";
                      document.getElementById("ballista_main2").style.display = "flex";
                      document.getElementById("ballista_main3").style.display = "none";
					  document.getElementById("ballista_u_buttons").style.display = "flex";
					  document.getElementById("ballista_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.ballista_up_time;

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

                    document.getElementById("ballista_u_textarea").value = remaining;
                }
				
				if (data.onager_up == 'off') {
				document.getElementById("onager_main1").style.display = "none";
				document.getElementById("onager_main2").style.display = "none";
				document.getElementById("onager_main3").style.display = "flex";
				document.getElementById("onager_u_buttons").style.display = "none";
				document.getElementById("onager_p_buttons").style.display = "none";
				} else {
                      document.getElementById("onager_main1").style.display = "none";
                      document.getElementById("onager_main2").style.display = "flex";
                      document.getElementById("onager_main3").style.display = "none";
					  document.getElementById("onager_u_buttons").style.display = "flex";
					  document.getElementById("onager_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.onager_up_time;

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

                    document.getElementById("onager_u_textarea").value = remaining;
                }
				
				if (data.cannon_up == 'off') {
				document.getElementById("cannon_main1").style.display = "none";
				document.getElementById("cannon_main2").style.display = "none";
				document.getElementById("cannon_main3").style.display = "flex";
				document.getElementById("cannon_u_buttons").style.display = "none";
				document.getElementById("cannon_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cannon_main1").style.display = "none";
                      document.getElementById("cannon_main2").style.display = "flex";
                      document.getElementById("cannon_main3").style.display = "none";
					  document.getElementById("cannon_u_buttons").style.display = "flex";
				      document.getElementById("cannon_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cannon_up_time;

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

                    document.getElementById("cannon_u_textarea").value = remaining;
                }
				
			} else if (data.ballista_p == 'on' || data.onager_p == 'on' || data.cannon_p == 'on') {
                if (data.ballista_p == 'off') {
				document.getElementById("ballista_main1").style.display = "none";
				document.getElementById("ballista_main2").style.display = "none";
				document.getElementById("ballista_main3").style.display = "flex";
				document.getElementById("ballista_u_buttons").style.display = "none";
				document.getElementById("ballista_p_buttons").style.display = "none";
				} else {
                      document.getElementById("ballista_main1").style.display = "none";
                      document.getElementById("ballista_main2").style.display = "flex";
                      document.getElementById("ballista_main3").style.display = "none";
					  document.getElementById("ballista_u_buttons").style.display = "none";
					  document.getElementById("ballista_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.ballista_p_time;

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

                    document.getElementById("ballista_p_textarea").value = "x" + data.ballista_p_a + "\n" + remaining;
                }
				
				if (data.onager_p == 'off') {
				document.getElementById("onager_main1").style.display = "none";
				document.getElementById("onager_main2").style.display = "none";
				document.getElementById("onager_main3").style.display = "flex";
				document.getElementById("onager_u_buttons").style.display = "none";
				document.getElementById("onager_p_buttons").style.display = "none";
				} else {
                      document.getElementById("onager_main1").style.display = "none";
                      document.getElementById("onager_main2").style.display = "flex";
                      document.getElementById("onager_main3").style.display = "none";
					  document.getElementById("onager_u_buttons").style.display = "none";
					  document.getElementById("onager_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.onager_p_time;

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

                    document.getElementById("onager_p_textarea").value = "x" + data.onager_p_a + "\n" + remaining;
                }
				
				if (data.cannon_p == 'off') {
				document.getElementById("cannon_main1").style.display = "none";
				document.getElementById("cannon_main2").style.display = "none";
				document.getElementById("cannon_main3").style.display = "flex";
				document.getElementById("cannon_u_buttons").style.display = "none";
				document.getElementById("cannon_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cannon_main1").style.display = "none";
                      document.getElementById("cannon_main2").style.display = "flex";
                      document.getElementById("cannon_main3").style.display = "none";
					  document.getElementById("cannon_u_buttons").style.display = "none";
				      document.getElementById("cannon_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cannon_p_time;

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

                    document.getElementById("cannon_p_textarea").value = "x" + data.cannon_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("ballista_main1").style.display = "flex";
				    document.getElementById("ballista_main2").style.display = "none";
				    document.getElementById("ballista_main3").style.display = "none";
					document.getElementById("onager_main1").style.display = "flex";
				    document.getElementById("onager_main2").style.display = "none";
				    document.getElementById("onager_main3").style.display = "none";
					document.getElementById("cannon_main1").style.display = "flex";
				    document.getElementById("cannon_main2").style.display = "none";
				    document.getElementById("cannon_main3").style.display = "none";
			}
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
	
}, 1000);