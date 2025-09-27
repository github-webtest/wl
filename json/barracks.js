async function save() {
  
  const langBarracks = {
  en: "Barracks",
  de: "Kaserne",
  fr: "Caserne",
  es: "Cuartel",
  pt: "Quartel",
  tr: "Kışla",
  ru: "Казарма",
  zh: "兵营",
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
  en: "Train troops to strengthen your army!",
  de: "Rekrutiere Truppen, um deine Armee zu stärken!",
  fr: "Entraînez des troupes pour renforcer votre armée !",
  es: "Entrena tropas para fortalecer tu ejército.",
  pt: "Treine tropas para fortalecer seu exército!",
  tr: "Ordunu güçlendirmek için asker eğit!",
  ru: "Тренируйте войска, чтобы усилить свою армию!",
  zh: "训练部队以加强你的军队！",
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
  
  const langSpy = {      
    en: "Spy",        
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
  const lang_Barracks = langBarracks[lang] || "Barracks";
  const lang_Spy = langSpy[lang] || "Spy";
  const lang_Level = langLevel[lang] || "Level: ";
  const lang_BTitle = langBTitle[lang] || "Train troops to strengthen your army!";
  const lang_DefenseBonus = langDefenseBonus[lang] || "Defense Bonus: ";
  
  document.getElementById("title_lang").innerText = lang_Barracks;
  document.getElementById("lang_build_title").innerText = lang_BTitle;
  document.getElementById("lang_level1").innerText = lang_Level;
  document.getElementById("lang_level2").innerText = lang_Level;
  document.getElementById("lang_level3").innerText = lang_Level;
  document.getElementById("lang_level4").innerText = lang_Level;
  document.getElementById("lang_level5").innerText = lang_Level;
  document.getElementById("lang_level6").innerText = lang_Level;
  document.getElementById("lang_level7").innerText = lang_Level;
  document.getElementById("lang_level8").innerText = lang_Level;
  document.getElementById("lang_level9").innerText = lang_Level;
  document.getElementById("lang_level10").innerText = lang_Level;
  document.getElementById("lang_level11").innerText = lang_Level;
  document.getElementById("lang_level12").innerText = lang_Level;
  document.getElementById("lang_level13").innerText = lang_Level;
  document.getElementById("lang_level14").innerText = lang_Level;
  document.getElementById("lang_cancel1").innerText = lang_Cancel;
  document.getElementById("lang_cancel2").innerText = lang_Cancel;
  document.getElementById("lang_cancel3").innerText = lang_Cancel;
  document.getElementById("lang_cancel4").innerText = lang_Cancel;
  document.getElementById("lang_cancel5").innerText = lang_Cancel;
  document.getElementById("lang_cancel6").innerText = lang_Cancel;
  document.getElementById("lang_cancel7").innerText = lang_Cancel;
  document.getElementById("lang_cancel8").innerText = lang_Cancel;
  document.getElementById("lang_cancel9").innerText = lang_Cancel;
  document.getElementById("lang_cancel10").innerText = lang_Cancel;
  document.getElementById("lang_cancel11").innerText = lang_Cancel;
  document.getElementById("lang_cancel12").innerText = lang_Cancel;
  document.getElementById("lang_cancel13").innerText = lang_Cancel;
  document.getElementById("lang_cancel14").innerText = lang_Cancel;
  document.getElementById("lang_spy").innerText = lang_Spy;
  
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
			document.getElementById("spearman_level").innerText = data.spearman_lvl;
			document.getElementById("spearman_amount").innerText = data.spearman;
			document.getElementById("spearman_pg_diamond").innerText = data.spearman_p_a;
			document.getElementById("archer_level").innerText = data.archer_lvl;
			document.getElementById("archer_amount").innerText = data.archer;
			document.getElementById("archer_pg_diamond").innerText = data.archer_p_a;
			document.getElementById("spy_level").innerText = data.spy_lvl;
			document.getElementById("spy_amount").innerText = data.spy;
			document.getElementById("spy_pg_diamond").innerText = data.spy_p_a;
			document.getElementById("cataphract_level").innerText = data.cataphract_lvl;
			document.getElementById("cataphract_amount").innerText = data.cataphract;
			document.getElementById("cataphract_pg_diamond").innerText = data.cataphract_p_a;
			document.getElementById("swordsman_level").innerText = data.swordsman_lvl;
			document.getElementById("swordsman_amount").innerText = data.swordsman;
			document.getElementById("swordsman_pg_diamond").innerText = data.swordsman_p_a;
			document.getElementById("crossbowman_level").innerText = data.crossbowman_lvl;
			document.getElementById("crossbowman_amount").innerText = data.crossbowman;
			document.getElementById("crossbowman_pg_diamond").innerText = data.crossbowman_p_a;
			document.getElementById("arquebusiers_level").innerText = data.arquebusiers_lvl;
			document.getElementById("arquebusiers_amount").innerText = data.arquebusiers;
			document.getElementById("arquebusiers_pg_diamond").innerText = data.arquebusiers_p_a;
			
			if (data.spearman != null) {	
			 let costDiamond = 0;
			 let costGold = 50;
			 let costFood = 50;
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
			 
			 document.getElementById("spearman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.archer != null) {	
			 let costDiamond = 0;
			 let costGold = 50;
			 let costFood = 0;
			 let costWood = 50;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("archer_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.spy != null) {	
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
			 
			 document.getElementById("spy_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.cataphract != null) {	
			 let costDiamond = 0;
			 let costGold = 100;
			 let costFood = 100;
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
			 
			 document.getElementById("cataphract_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.swordsman != null) {	
			 let costDiamond = 0;
			 let costGold = 75;
			 let costFood = 75;
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
			 
			 document.getElementById("swordsman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.crossbowman != null) {	
			 let costDiamond = 0;
			 let costGold = 75;
			 let costFood = 0;
			 let costWood = 75;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("crossbowman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.arquebusiers != null) {	
			 let costDiamond = 0;
			 let costGold = 150;
			 let costFood = 150;
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
			 
			 document.getElementById("arquebusiers_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.spearman_lvl < 20) {
			document.getElementById("spearman_next_level").innerText = data.spearman_lvl + 1;
			} else {
			    document.getElementById("spearman_next_level").innerText = "Max";
			}
			if (data.archer_lvl < 20) {
			document.getElementById("archer_next_level").innerText = data.archer_lvl + 1;
			} else{
			    document.getElementById("archer_next_level").innerText = "Max";
			}
			if (data.spy_lvl < 20) {
			document.getElementById("spy_next_level").innerText = data.spy_lvl + 1;
			} else {
			    document.getElementById("spy_next_level").innerText = "Max";
			}
			if (data.cataphract_lvl < 20) {
			document.getElementById("cataphract_next_level").innerText = data.cataphract_lvl + 1;
			} else {
			    document.getElementById("cataphract_next_level").innerText = "Max";
			}
			if (data.swordsman_lvl < 20) {
			document.getElementById("swordsman_next_level").innerText = data.swordsman_lvl + 1;
			} else {
				document.getElementById("swordsman_next_level").innerText = "Max";
			}
			if (data.crossbowman_lvl < 20) {
				document.getElementById("crossbowman_next_level").innerText = data.crossbowman_lvl + 1;
			} else {
				document.getElementById("crossbowman_next_level").innerText = "Max";
			}
			if (data.arquebusiers_lvl < 20) {
				document.getElementById("arquebusiers_next_level").innerText = data.arquebusiers_lvl + 1;
			} else {
				document.getElementById("arquebusiers_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 500) {
				document.getElementById("cataphract_img").style.backgroundImage = "url('images/cataphract.png')";
				document.getElementById("cataphract_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("swordsman_img").style.backgroundImage = "url('images/swordsman.png')";
				document.getElementById("swordsman_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("cataphract_top_2").style.display = "flex";
				document.getElementById("swordsman_top_2").style.display = "flex";
				
				if (data.age_points >= 1500) {
				
				document.getElementById("crossbowman_img").style.backgroundImage = "url('images/crossbowman.png')";
				document.getElementById("crossbowman_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("crossbowman_top_2").style.display = "flex";
				
				}
				
				if (data.age_points >= 5000) {
					document.getElementById("arquebusiers_img").style.backgroundImage = "url('images/arquebusiers.png')";
				    document.getElementById("arquebusiers_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
					document.getElementById("arquebusiers_top_2").style.display = "flex";
				}
				
			}
			
			if (data.spearman_up == 'on' || data.archer_up == 'on' || data.spy_up == 'on' || data.cataphract_up == 'on' || data.swordsman_up == 'on' || data.crossbowman_up == 'on' || data.arquebusiers_up == 'on') {
				
				if (data.spearman_up == 'off') {
				document.getElementById("spearman_main1").style.display = "none";
				document.getElementById("spearman_main2").style.display = "none";
				document.getElementById("spearman_main3").style.display = "flex";
				document.getElementById("spearman_u_buttons").style.display = "none";
				document.getElementById("spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spearman_main1").style.display = "none";
                      document.getElementById("spearman_main2").style.display = "flex";
                      document.getElementById("spearman_main3").style.display = "none";
					  document.getElementById("spearman_u_buttons").style.display = "flex";
					  document.getElementById("spearman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spearman_up_time;

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

                    document.getElementById("spearman_u_textarea").value = remaining;
                }
				
				if (data.archer_up == 'off') {
				document.getElementById("archer_main1").style.display = "none";
				document.getElementById("archer_main2").style.display = "none";
				document.getElementById("archer_main3").style.display = "flex";
				document.getElementById("archer_u_buttons").style.display = "none";
				document.getElementById("archer_p_buttons").style.display = "none";
				} else {
                      document.getElementById("archer_main1").style.display = "none";
                      document.getElementById("archer_main2").style.display = "flex";
                      document.getElementById("archer_main3").style.display = "none";
					  document.getElementById("archer_u_buttons").style.display = "flex";
					  document.getElementById("archer_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.archer_up_time;

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

                    document.getElementById("archer_u_textarea").value = remaining;
                }
				
				if (data.spy_up == 'off') {
				document.getElementById("spy_main1").style.display = "none";
				document.getElementById("spy_main2").style.display = "none";
				document.getElementById("spy_main3").style.display = "flex";
				document.getElementById("spy_u_buttons").style.display = "none";
				document.getElementById("spy_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spy_main1").style.display = "none";
                      document.getElementById("spy_main2").style.display = "flex";
                      document.getElementById("spy_main3").style.display = "none";
					  document.getElementById("spy_u_buttons").style.display = "flex";
				      document.getElementById("spy_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spy_up_time;

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

                    document.getElementById("spy_u_textarea").value = remaining;
                }
				
				if (data.cataphract_up == 'off') {
				document.getElementById("cataphract_main1").style.display = "none";
				document.getElementById("cataphract_main2").style.display = "none";
				document.getElementById("cataphract_main3").style.display = "flex";
				document.getElementById("cataphract_u_buttons").style.display = "none";
				document.getElementById("cataphract_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cataphract_main1").style.display = "none";
                      document.getElementById("cataphract_main2").style.display = "flex";
                      document.getElementById("cataphract_main3").style.display = "none";
					  document.getElementById("cataphract_u_buttons").style.display = "flex";
				      document.getElementById("cataphract_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cataphract_up_time;

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

                    document.getElementById("cataphract_u_textarea").value = remaining;
                }
				
				if (data.swordsman_up == 'off') {
				document.getElementById("swordsman_main1").style.display = "none";
				document.getElementById("swordsman_main2").style.display = "none";
				document.getElementById("swordsman_main3").style.display = "flex";
				document.getElementById("swordsman_u_buttons").style.display = "none";
				document.getElementById("swordsman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("swordsman_main1").style.display = "none";
                      document.getElementById("swordsman_main2").style.display = "flex";
                      document.getElementById("swordsman_main3").style.display = "none";
					  document.getElementById("swordsman_u_buttons").style.display = "flex";
				      document.getElementById("swordsman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.swordsman_up_time;

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

                    document.getElementById("swordsman_u_textarea").value = remaining;
                }
				
				if (data.crossbowman_up == 'off') {
				document.getElementById("crossbowman_main1").style.display = "none";
				document.getElementById("crossbowman_main2").style.display = "none";
				document.getElementById("crossbowman_main3").style.display = "flex";
				document.getElementById("crossbowman_u_buttons").style.display = "none";
				document.getElementById("crossbowman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("crossbowman_main1").style.display = "none";
                      document.getElementById("crossbowman_main2").style.display = "flex";
                      document.getElementById("crossbowman_main3").style.display = "none";
					  document.getElementById("crossbowman_u_buttons").style.display = "flex";
				      document.getElementById("crossbowman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.crossbowman_up_time;

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

                    document.getElementById("crossbowman_u_textarea").value = remaining;
                }
				
				if (data.arquebusiers_up == 'off') {
				document.getElementById("arquebusiers_main1").style.display = "none";
				document.getElementById("arquebusiers_main2").style.display = "none";
				document.getElementById("arquebusiers_main3").style.display = "flex";
				document.getElementById("arquebusiers_u_buttons").style.display = "none";
				document.getElementById("arquebusiers_p_buttons").style.display = "none";
				} else {
                      document.getElementById("arquebusiers_main1").style.display = "none";
                      document.getElementById("arquebusiers_main2").style.display = "flex";
                      document.getElementById("arquebusiers_main3").style.display = "none";
					  document.getElementById("arquebusiers_u_buttons").style.display = "flex";
				      document.getElementById("arquebusiers_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.arquebusiers_up_time;

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

                    document.getElementById("arquebusiers_u_textarea").value = remaining;
                }
				
			} else if (data.spearman_p == 'on' || data.archer_p == 'on' || data.spy_p == 'on' || data.cataphract_p == 'on' || data.swordsman_p == 'on' || data.crossbowman_p == 'on' || data.arquebusiers_p == 'on') {
                if (data.spearman_p == 'off') {
				document.getElementById("spearman_main1").style.display = "none";
				document.getElementById("spearman_main2").style.display = "none";
				document.getElementById("spearman_main3").style.display = "flex";
				document.getElementById("spearman_u_buttons").style.display = "none";
				document.getElementById("spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spearman_main1").style.display = "none";
                      document.getElementById("spearman_main2").style.display = "flex";
                      document.getElementById("spearman_main3").style.display = "none";
					  document.getElementById("spearman_u_buttons").style.display = "none";
					  document.getElementById("spearman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spearman_p_time;

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

                    document.getElementById("spearman_p_textarea").value = "x" + data.spearman_p_a + "\n" + remaining;
                }
				
				if (data.archer_p == 'off') {
				document.getElementById("archer_main1").style.display = "none";
				document.getElementById("archer_main2").style.display = "none";
				document.getElementById("archer_main3").style.display = "flex";
				document.getElementById("archer_u_buttons").style.display = "none";
				document.getElementById("archer_p_buttons").style.display = "none";
				} else {
                      document.getElementById("archer_main1").style.display = "none";
                      document.getElementById("archer_main2").style.display = "flex";
                      document.getElementById("archer_main3").style.display = "none";
					  document.getElementById("archer_u_buttons").style.display = "none";
					  document.getElementById("archer_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.archer_p_time;

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

                    document.getElementById("archer_p_textarea").value = "x" + data.archer_p_a + "\n" + remaining;
                }
				
				if (data.spy_p == 'off') {
				document.getElementById("spy_main1").style.display = "none";
				document.getElementById("spy_main2").style.display = "none";
				document.getElementById("spy_main3").style.display = "flex";
				document.getElementById("spy_u_buttons").style.display = "none";
				document.getElementById("spy_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spy_main1").style.display = "none";
                      document.getElementById("spy_main2").style.display = "flex";
                      document.getElementById("spy_main3").style.display = "none";
					  document.getElementById("spy_u_buttons").style.display = "none";
				      document.getElementById("spy_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spy_p_time;

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

                    document.getElementById("spy_p_textarea").value = "x" + data.spy_p_a + "\n" + remaining;
                }
				
				if (data.cataphract_p == 'off') {
				document.getElementById("cataphract_main1").style.display = "none";
				document.getElementById("cataphract_main2").style.display = "none";
				document.getElementById("cataphract_main3").style.display = "flex";
				document.getElementById("cataphract_u_buttons").style.display = "none";
				document.getElementById("cataphract_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cataphract_main1").style.display = "none";
                      document.getElementById("cataphract_main2").style.display = "flex";
                      document.getElementById("cataphract_main3").style.display = "none";
					  document.getElementById("cataphract_u_buttons").style.display = "none";
				      document.getElementById("cataphract_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cataphract_p_time;

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

                    document.getElementById("cataphract_p_textarea").value = "x" + data.cataphract_p_a + "\n" + remaining;
                }
				
				if (data.swordsman_p == 'off') {
				document.getElementById("swordsman_main1").style.display = "none";
				document.getElementById("swordsman_main2").style.display = "none";
				document.getElementById("swordsman_main3").style.display = "flex";
				document.getElementById("swordsman_u_buttons").style.display = "none";
				document.getElementById("swordsman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("swordsman_main1").style.display = "none";
                      document.getElementById("swordsman_main2").style.display = "flex";
                      document.getElementById("swordsman_main3").style.display = "none";
					  document.getElementById("swordsman_u_buttons").style.display = "none";
				      document.getElementById("swordsman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.swordsman_p_time;

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

                    document.getElementById("swordsman_p_textarea").value = "x" + data.swordsman_p_a + "\n" + remaining;
                }
				
				if (data.crossbowman_p == 'off') {
				document.getElementById("crossbowman_main1").style.display = "none";
				document.getElementById("crossbowman_main2").style.display = "none";
				document.getElementById("crossbowman_main3").style.display = "flex";
				document.getElementById("crossbowman_u_buttons").style.display = "none";
				document.getElementById("crossbowman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("crossbowman_main1").style.display = "none";
                      document.getElementById("crossbowman_main2").style.display = "flex";
                      document.getElementById("crossbowman_main3").style.display = "none";
					  document.getElementById("crossbowman_u_buttons").style.display = "none";
				      document.getElementById("crossbowman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.crossbowman_p_time;

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

                    document.getElementById("crossbowman_p_textarea").value = "x" + data.crossbowman_p_a + "\n" + remaining;
                }
				
				if (data.arquebusiers_p == 'off') {
				document.getElementById("arquebusiers_main1").style.display = "none";
				document.getElementById("arquebusiers_main2").style.display = "none";
				document.getElementById("arquebusiers_main3").style.display = "flex";
				document.getElementById("arquebusiers_u_buttons").style.display = "none";
				document.getElementById("arquebusiers_p_buttons").style.display = "none";
				} else {
                      document.getElementById("arquebusiers_main1").style.display = "none";
                      document.getElementById("arquebusiers_main2").style.display = "flex";
                      document.getElementById("arquebusiers_main3").style.display = "none";
					  document.getElementById("arquebusiers_u_buttons").style.display = "none";
				      document.getElementById("arquebusiers_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.arquebusiers_p_time;

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

                    document.getElementById("arquebusiers_p_textarea").value = "x" + data.arquebusiers_p_a + "\n" + remaining;
                }
			} else {
					document.getElementById("spearman_main1").style.display = "flex";
				    document.getElementById("spearman_main2").style.display = "none";
				    document.getElementById("spearman_main3").style.display = "none";
					document.getElementById("archer_main1").style.display = "flex";
				    document.getElementById("archer_main2").style.display = "none";
				    document.getElementById("archer_main3").style.display = "none";
					document.getElementById("spy_main1").style.display = "flex";
				    document.getElementById("spy_main2").style.display = "none";
				    document.getElementById("spy_main3").style.display = "none";
					document.getElementById("cataphract_main1").style.display = "flex";
				    document.getElementById("cataphract_main2").style.display = "none";
				    document.getElementById("cataphract_main3").style.display = "none";
					document.getElementById("swordsman_main1").style.display = "flex";
				    document.getElementById("swordsman_main2").style.display = "none";
				    document.getElementById("swordsman_main3").style.display = "none";
					document.getElementById("crossbowman_main1").style.display = "flex";
				    document.getElementById("crossbowman_main2").style.display = "none";
				    document.getElementById("crossbowman_main3").style.display = "none";
					document.getElementById("arquebusiers_main1").style.display = "flex";
				    document.getElementById("arquebusiers_main2").style.display = "none";
				    document.getElementById("arquebusiers_main3").style.display = "none";
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
			document.getElementById("spearman_level").innerText = data.spearman_lvl;
			document.getElementById("spearman_amount").innerText = data.spearman;
			document.getElementById("spearman_pg_diamond").innerText = data.spearman_p_a;
			document.getElementById("archer_level").innerText = data.archer_lvl;
			document.getElementById("archer_amount").innerText = data.archer;
			document.getElementById("archer_pg_diamond").innerText = data.archer_p_a;
			document.getElementById("spy_level").innerText = data.spy_lvl;
			document.getElementById("spy_amount").innerText = data.spy;
			document.getElementById("spy_pg_diamond").innerText = data.spy_p_a;
			document.getElementById("cataphract_level").innerText = data.cataphract_lvl;
			document.getElementById("cataphract_amount").innerText = data.cataphract;
			document.getElementById("cataphract_pg_diamond").innerText = data.cataphract_p_a;
			document.getElementById("swordsman_level").innerText = data.swordsman_lvl;
			document.getElementById("swordsman_amount").innerText = data.swordsman;
			document.getElementById("swordsman_pg_diamond").innerText = data.swordsman_p_a;
			document.getElementById("crossbowman_level").innerText = data.crossbowman_lvl;
			document.getElementById("crossbowman_amount").innerText = data.crossbowman;
			document.getElementById("crossbowman_pg_diamond").innerText = data.crossbowman_p_a;
			document.getElementById("arquebusiers_level").innerText = data.arquebusiers_lvl;
			document.getElementById("arquebusiers_amount").innerText = data.arquebusiers;
			document.getElementById("arquebusiers_pg_diamond").innerText = data.arquebusiers_p_a;
			
			if (data.spearman != null) {	
			 let costDiamond = 0;
			 let costGold = 50;
			 let costFood = 50;
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
			 
			 document.getElementById("spearman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.archer != null) {	
			 let costDiamond = 0;
			 let costGold = 50;
			 let costFood = 0;
			 let costWood = 50;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("archer_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.spy != null) {	
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
			 
			 document.getElementById("spy_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.cataphract != null) {	
			 let costDiamond = 0;
			 let costGold = 100;
			 let costFood = 100;
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
			 
			 document.getElementById("cataphract_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.swordsman != null) {	
			 let costDiamond = 0;
			 let costGold = 75;
			 let costFood = 75;
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
			 
			 document.getElementById("swordsman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.crossbowman != null) {	
			 let costDiamond = 0;
			 let costGold = 75;
			 let costFood = 0;
			 let costWood = 75;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 document.getElementById("crossbowman_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.arquebusiers != null) {	
			 let costDiamond = 0;
			 let costGold = 150;
			 let costFood = 150;
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
			 
			 document.getElementById("arquebusiers_max").innerText = Math.floor(maxProduce);
			}
			
			if (data.spearman_lvl < 20) {
			document.getElementById("spearman_next_level").innerText = data.spearman_lvl + 1;
			} else {
			    document.getElementById("spearman_next_level").innerText = "Max";
			}
			if (data.archer_lvl < 20) {
			document.getElementById("archer_next_level").innerText = data.archer_lvl + 1;
			} else{
			    document.getElementById("archer_next_level").innerText = "Max";
			}
			if (data.spy_lvl < 20) {
			document.getElementById("spy_next_level").innerText = data.spy_lvl + 1;
			} else {
			    document.getElementById("spy_next_level").innerText = "Max";
			}
			if (data.cataphract_lvl < 20) {
			document.getElementById("cataphract_next_level").innerText = data.cataphract_lvl + 1;
			} else {
			    document.getElementById("cataphract_next_level").innerText = "Max";
			}
			if (data.swordsman_lvl < 20) {
			document.getElementById("swordsman_next_level").innerText = data.swordsman_lvl + 1;
			} else {
				document.getElementById("swordsman_next_level").innerText = "Max";
			}
			if (data.crossbowman_lvl < 20) {
				document.getElementById("crossbowman_next_level").innerText = data.crossbowman_lvl + 1;
			} else {
				document.getElementById("crossbowman_next_level").innerText = "Max";
			}
			if (data.arquebusiers_lvl < 20) {
				document.getElementById("arquebusiers_next_level").innerText = data.arquebusiers_lvl + 1;
			} else {
				document.getElementById("arquebusiers_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 500) {
				document.getElementById("cataphract_img").style.backgroundImage = "url('images/cataphract.png')";
				document.getElementById("cataphract_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("swordsman_img").style.backgroundImage = "url('images/swordsman.png')";
				document.getElementById("swordsman_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("cataphract_top_2").style.display = "flex";
				document.getElementById("swordsman_top_2").style.display = "flex";
				
				if (data.age_points >= 1500) {
				
				document.getElementById("crossbowman_img").style.backgroundImage = "url('images/crossbowman.png')";
				document.getElementById("crossbowman_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("crossbowman_top_2").style.display = "flex";
				
				}
				
				if (data.age_points >= 5000) {
					document.getElementById("arquebusiers_img").style.backgroundImage = "url('images/arquebusiers.png')";
				    document.getElementById("arquebusiers_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
					document.getElementById("arquebusiers_top_2").style.display = "flex";
				}
				
			}
			
			if (data.spearman_up == 'on' || data.archer_up == 'on' || data.spy_up == 'on' || data.cataphract_up == 'on' || data.swordsman_up == 'on' || data.crossbowman_up == 'on' || data.arquebusiers_up == 'on') {
				
				if (data.spearman_up == 'off') {
				document.getElementById("spearman_main1").style.display = "none";
				document.getElementById("spearman_main2").style.display = "none";
				document.getElementById("spearman_main3").style.display = "flex";
				document.getElementById("spearman_u_buttons").style.display = "none";
				document.getElementById("spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spearman_main1").style.display = "none";
                      document.getElementById("spearman_main2").style.display = "flex";
                      document.getElementById("spearman_main3").style.display = "none";
					  document.getElementById("spearman_u_buttons").style.display = "flex";
					  document.getElementById("spearman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spearman_up_time;

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

                    document.getElementById("spearman_u_textarea").value = remaining;
                }
				
				if (data.archer_up == 'off') {
				document.getElementById("archer_main1").style.display = "none";
				document.getElementById("archer_main2").style.display = "none";
				document.getElementById("archer_main3").style.display = "flex";
				document.getElementById("archer_u_buttons").style.display = "none";
				document.getElementById("archer_p_buttons").style.display = "none";
				} else {
                      document.getElementById("archer_main1").style.display = "none";
                      document.getElementById("archer_main2").style.display = "flex";
                      document.getElementById("archer_main3").style.display = "none";
					  document.getElementById("archer_u_buttons").style.display = "flex";
					  document.getElementById("archer_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.archer_up_time;

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

                    document.getElementById("archer_u_textarea").value = remaining;
                }
				
				if (data.spy_up == 'off') {
				document.getElementById("spy_main1").style.display = "none";
				document.getElementById("spy_main2").style.display = "none";
				document.getElementById("spy_main3").style.display = "flex";
				document.getElementById("spy_u_buttons").style.display = "none";
				document.getElementById("spy_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spy_main1").style.display = "none";
                      document.getElementById("spy_main2").style.display = "flex";
                      document.getElementById("spy_main3").style.display = "none";
					  document.getElementById("spy_u_buttons").style.display = "flex";
				      document.getElementById("spy_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spy_up_time;

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

                    document.getElementById("spy_u_textarea").value = remaining;
                }
				
				if (data.cataphract_up == 'off') {
				document.getElementById("cataphract_main1").style.display = "none";
				document.getElementById("cataphract_main2").style.display = "none";
				document.getElementById("cataphract_main3").style.display = "flex";
				document.getElementById("cataphract_u_buttons").style.display = "none";
				document.getElementById("cataphract_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cataphract_main1").style.display = "none";
                      document.getElementById("cataphract_main2").style.display = "flex";
                      document.getElementById("cataphract_main3").style.display = "none";
					  document.getElementById("cataphract_u_buttons").style.display = "flex";
				      document.getElementById("cataphract_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cataphract_up_time;

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

                    document.getElementById("cataphract_u_textarea").value = remaining;
                }
				
				if (data.swordsman_up == 'off') {
				document.getElementById("swordsman_main1").style.display = "none";
				document.getElementById("swordsman_main2").style.display = "none";
				document.getElementById("swordsman_main3").style.display = "flex";
				document.getElementById("swordsman_u_buttons").style.display = "none";
				document.getElementById("swordsman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("swordsman_main1").style.display = "none";
                      document.getElementById("swordsman_main2").style.display = "flex";
                      document.getElementById("swordsman_main3").style.display = "none";
					  document.getElementById("swordsman_u_buttons").style.display = "flex";
				      document.getElementById("swordsman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.swordsman_up_time;

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

                    document.getElementById("swordsman_u_textarea").value = remaining;
                }
				
				if (data.crossbowman_up == 'off') {
				document.getElementById("crossbowman_main1").style.display = "none";
				document.getElementById("crossbowman_main2").style.display = "none";
				document.getElementById("crossbowman_main3").style.display = "flex";
				document.getElementById("crossbowman_u_buttons").style.display = "none";
				document.getElementById("crossbowman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("crossbowman_main1").style.display = "none";
                      document.getElementById("crossbowman_main2").style.display = "flex";
                      document.getElementById("crossbowman_main3").style.display = "none";
					  document.getElementById("crossbowman_u_buttons").style.display = "flex";
				      document.getElementById("crossbowman_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.crossbowman_up_time;

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

                    document.getElementById("crossbowman_u_textarea").value = remaining;
                }
				
				if (data.arquebusiers_up == 'off') {
				document.getElementById("arquebusiers_main1").style.display = "none";
				document.getElementById("arquebusiers_main2").style.display = "none";
				document.getElementById("arquebusiers_main3").style.display = "flex";
				document.getElementById("arquebusiers_u_buttons").style.display = "none";
				document.getElementById("arquebusiers_p_buttons").style.display = "none";
				} else {
                      document.getElementById("arquebusiers_main1").style.display = "none";
                      document.getElementById("arquebusiers_main2").style.display = "flex";
                      document.getElementById("arquebusiers_main3").style.display = "none";
					  document.getElementById("arquebusiers_u_buttons").style.display = "flex";
				      document.getElementById("arquebusiers_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.arquebusiers_up_time;

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

                    document.getElementById("arquebusiers_u_textarea").value = remaining;
                }
				
			} else if (data.spearman_p == 'on' || data.archer_p == 'on' || data.spy_p == 'on' || data.cataphract_p == 'on' || data.swordsman_p == 'on' || data.crossbowman_p == 'on' || data.arquebusiers_p == 'on') {
                if (data.spearman_p == 'off') {
				document.getElementById("spearman_main1").style.display = "none";
				document.getElementById("spearman_main2").style.display = "none";
				document.getElementById("spearman_main3").style.display = "flex";
				document.getElementById("spearman_u_buttons").style.display = "none";
				document.getElementById("spearman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spearman_main1").style.display = "none";
                      document.getElementById("spearman_main2").style.display = "flex";
                      document.getElementById("spearman_main3").style.display = "none";
					  document.getElementById("spearman_u_buttons").style.display = "none";
					  document.getElementById("spearman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spearman_p_time;

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

                    document.getElementById("spearman_p_textarea").value = "x" + data.spearman_p_a + "\n" + remaining;
                }
				
				if (data.archer_p == 'off') {
				document.getElementById("archer_main1").style.display = "none";
				document.getElementById("archer_main2").style.display = "none";
				document.getElementById("archer_main3").style.display = "flex";
				document.getElementById("archer_u_buttons").style.display = "none";
				document.getElementById("archer_p_buttons").style.display = "none";
				} else {
                      document.getElementById("archer_main1").style.display = "none";
                      document.getElementById("archer_main2").style.display = "flex";
                      document.getElementById("archer_main3").style.display = "none";
					  document.getElementById("archer_u_buttons").style.display = "none";
					  document.getElementById("archer_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.archer_p_time;

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

                    document.getElementById("archer_p_textarea").value = "x" + data.archer_p_a + "\n" + remaining;
                }
				
				if (data.spy_p == 'off') {
				document.getElementById("spy_main1").style.display = "none";
				document.getElementById("spy_main2").style.display = "none";
				document.getElementById("spy_main3").style.display = "flex";
				document.getElementById("spy_u_buttons").style.display = "none";
				document.getElementById("spy_p_buttons").style.display = "none";
				} else {
                      document.getElementById("spy_main1").style.display = "none";
                      document.getElementById("spy_main2").style.display = "flex";
                      document.getElementById("spy_main3").style.display = "none";
					  document.getElementById("spy_u_buttons").style.display = "none";
				      document.getElementById("spy_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spy_p_time;

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

                    document.getElementById("spy_p_textarea").value = "x" + data.spy_p_a + "\n" + remaining;
                }
				
				if (data.cataphract_p == 'off') {
				document.getElementById("cataphract_main1").style.display = "none";
				document.getElementById("cataphract_main2").style.display = "none";
				document.getElementById("cataphract_main3").style.display = "flex";
				document.getElementById("cataphract_u_buttons").style.display = "none";
				document.getElementById("cataphract_p_buttons").style.display = "none";
				} else {
                      document.getElementById("cataphract_main1").style.display = "none";
                      document.getElementById("cataphract_main2").style.display = "flex";
                      document.getElementById("cataphract_main3").style.display = "none";
					  document.getElementById("cataphract_u_buttons").style.display = "none";
				      document.getElementById("cataphract_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cataphract_p_time;

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

                    document.getElementById("cataphract_p_textarea").value = "x" + data.cataphract_p_a + "\n" + remaining;
                }
				
				if (data.swordsman_p == 'off') {
				document.getElementById("swordsman_main1").style.display = "none";
				document.getElementById("swordsman_main2").style.display = "none";
				document.getElementById("swordsman_main3").style.display = "flex";
				document.getElementById("swordsman_u_buttons").style.display = "none";
				document.getElementById("swordsman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("swordsman_main1").style.display = "none";
                      document.getElementById("swordsman_main2").style.display = "flex";
                      document.getElementById("swordsman_main3").style.display = "none";
					  document.getElementById("swordsman_u_buttons").style.display = "none";
				      document.getElementById("swordsman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.swordsman_p_time;

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

                    document.getElementById("swordsman_p_textarea").value = "x" + data.swordsman_p_a + "\n" + remaining;
                }
				
				if (data.crossbowman_p == 'off') {
				document.getElementById("crossbowman_main1").style.display = "none";
				document.getElementById("crossbowman_main2").style.display = "none";
				document.getElementById("crossbowman_main3").style.display = "flex";
				document.getElementById("crossbowman_u_buttons").style.display = "none";
				document.getElementById("crossbowman_p_buttons").style.display = "none";
				} else {
                      document.getElementById("crossbowman_main1").style.display = "none";
                      document.getElementById("crossbowman_main2").style.display = "flex";
                      document.getElementById("crossbowman_main3").style.display = "none";
					  document.getElementById("crossbowman_u_buttons").style.display = "none";
				      document.getElementById("crossbowman_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.crossbowman_p_time;

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

                    document.getElementById("crossbowman_p_textarea").value = "x" + data.crossbowman_p_a + "\n" + remaining;
                }
				
				if (data.arquebusiers_p == 'off') {
				document.getElementById("arquebusiers_main1").style.display = "none";
				document.getElementById("arquebusiers_main2").style.display = "none";
				document.getElementById("arquebusiers_main3").style.display = "flex";
				document.getElementById("arquebusiers_u_buttons").style.display = "none";
				document.getElementById("arquebusiers_p_buttons").style.display = "none";
				} else {
                      document.getElementById("arquebusiers_main1").style.display = "none";
                      document.getElementById("arquebusiers_main2").style.display = "flex";
                      document.getElementById("arquebusiers_main3").style.display = "none";
					  document.getElementById("arquebusiers_u_buttons").style.display = "none";
				      document.getElementById("arquebusiers_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.arquebusiers_p_time;

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

                    document.getElementById("arquebusiers_p_textarea").value = "x" + data.arquebusiers_p_a + "\n" + remaining;
                }
			} else {
					document.getElementById("spearman_main1").style.display = "flex";
				    document.getElementById("spearman_main2").style.display = "none";
				    document.getElementById("spearman_main3").style.display = "none";
					document.getElementById("archer_main1").style.display = "flex";
				    document.getElementById("archer_main2").style.display = "none";
				    document.getElementById("archer_main3").style.display = "none";
					document.getElementById("spy_main1").style.display = "flex";
				    document.getElementById("spy_main2").style.display = "none";
				    document.getElementById("spy_main3").style.display = "none";
					document.getElementById("cataphract_main1").style.display = "flex";
				    document.getElementById("cataphract_main2").style.display = "none";
				    document.getElementById("cataphract_main3").style.display = "none";
					document.getElementById("swordsman_main1").style.display = "flex";
				    document.getElementById("swordsman_main2").style.display = "none";
				    document.getElementById("swordsman_main3").style.display = "none";
					document.getElementById("crossbowman_main1").style.display = "flex";
				    document.getElementById("crossbowman_main2").style.display = "none";
				    document.getElementById("crossbowman_main3").style.display = "none";
					document.getElementById("arquebusiers_main1").style.display = "flex";
				    document.getElementById("arquebusiers_main2").style.display = "none";
				    document.getElementById("arquebusiers_main3").style.display = "none";
			}
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
	
}, 1000);