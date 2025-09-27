async function save() {
  
  const langWall = { 
  en: "Wall", 
  de: "Mauer",
  fr: "Mur",
  es: "Muro",
  pt: "Muralha",
  tr: "Sur",
  ru: "Стена",
  zh: "城墙",
  };
  
  const langWall2 = { 
  en: "Wall", 
  de: "Mauer",
  fr: "Mur",
  es: "Muro",
  pt: "Muralha",
  tr: "Duvar",
  ru: "Стена",
  zh: "城墙",
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
  en: "Fortify the wall to protect the kingdom center!",
  de: "Befestige die Mauer, um das Königszentrum zu schützen!",
  fr: "Renforcez le mur pour protéger le centre du royaume !",
  es: "Fortifica el muro para proteger el centro del reino.",
  pt: "Fortifique a muralha para proteger o centro do reino!",
  tr: "Krallık merkezini korumak için suru güçlendir!",
  ru: "Укрепите стену, чтобы защитить центр королевства!",
  zh: "加固城墙以保护王国中心！",
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
  
  const langBuildingCapacity  = { 
  en: "Building Capacity: ", 
  de: "Gebäudekapazität: ",
  fr: "Capacité du bâtiment : ",
  es: "Capacidad del edificio: ",
  pt: "Capacidade do edifício: ",
  tr: "Yapı Kapasitesi: ",
  ru: "Вместимость здания: ",
  zh: "建筑容量：",
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
	
	const langWatchtower = {
  en: "Watchtower",
  de: "Wachturm",
  fr: "Tour de guet",
  es: "Atalaya",
  pt: "Torre de vigia",
  tr: "Gözcü Kulesi",
  ru: "Сторожевая башня",
  zh: "瞭望塔"
};

  const lang = localStorage.getItem("language") || "en";
  const lang_Cancel = langCancel[lang] || "Cancel";
  const lang_Wall = langWall[lang] || "Wall";
  const lang_Wall2 = langWall2[lang] || "Wall";
  const lang_Watchtower = langWatchtower[lang] || "Watchtower";
  const lang_BuildingCapacity = langBuildingCapacity[lang] || "Building Capacity";
  const lang_Spy = langSpy[lang] || "Spy";
  const lang_Level = langLevel[lang] || "Level: ";
  const lang_BTitle = langBTitle[lang] || "Train troops to strengthen your army!";
  const lang_DefenseBonus = langDefenseBonus[lang] || "Defense Bonus: ";
  
  document.getElementById("building_capacity_text").innerText = lang_BuildingCapacity;
  document.getElementById("defense_bonus_text").innerText = lang_DefenseBonus;
  document.getElementById("title_lang").innerText = lang_Wall;
  document.getElementById("lang_build_title").innerText = lang_BTitle;
  document.getElementById("wall_lang").innerText = lang_Wall2;
  document.getElementById("watchtower_lang").innerText = lang_Watchtower;
  document.getElementById("lang_level1").innerText = lang_Level;
  document.getElementById("lang_level2").innerText = lang_Level;
  document.getElementById("lang_level3").innerText = lang_Level;
  document.getElementById("lang_level4").innerText = lang_Level;
  document.getElementById("lang_cancel1").innerText = lang_Cancel;
  document.getElementById("lang_cancel2").innerText = lang_Cancel;
  document.getElementById("lang_cancel3").innerText = lang_Cancel;
  
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
			document.getElementById("wall_level").innerText = data.wall_lvl;
			document.getElementById("watchtower_level").innerText = data.watchtower_lvl;
			document.getElementById("watchtower_amount").innerText = data.watchtower;
			document.getElementById("watchtower_pg_diamond").innerText = data.watchtower_p_a;
			
			if (data.watchtower != null) {	
			 let costDiamond = 0;
			 let costGold = 1000;
			 let costFood = 1500;
			 let costWood = 2500;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 let totalCurrent = data.watchtower;
             let capasites_max = totalCurrent >= 50 ? 0 : Math.min(maxProduce, 50 - totalCurrent);
			 
			 document.getElementById("watchtower_max").innerText = Math.floor(capasites_max);
			}
			
			if (data.wall_lvl < 20) {
			document.getElementById("wall_next_level").innerText = data.wall_lvl + 1;
			} else {
			    document.getElementById("wall_next_level").innerText = "Max";
			}
			if (data.watchtower_lvl < 20) {
			document.getElementById("watchtower_next_level").innerText = data.watchtower_lvl + 1;
			} else{
			    document.getElementById("watchtower_next_level").innerText = "Max";
			}
			
			if (data.wall_up == 'on' || data.watchtower_up == 'on') {
				
				if (data.wall_up == 'off') {
				document.getElementById("wall_main1").style.display = "none";
				document.getElementById("wall_main2").style.display = "none";
				document.getElementById("wall_main3").style.display = "flex";
				} else {
                      document.getElementById("wall_main1").style.display = "none";
                      document.getElementById("wall_main2").style.display = "flex";
                      document.getElementById("wall_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.wall_up_time;

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

                    document.getElementById("wall_textarea").value = remaining;
                }
				
				if (data.watchtower_up == 'off') {
				document.getElementById("watchtower_main1").style.display = "none";
				document.getElementById("watchtower_main2").style.display = "none";
				document.getElementById("watchtower_main3").style.display = "flex";
				document.getElementById("watchtower_u_buttons").style.display = "none";
				document.getElementById("watchtower_p_buttons").style.display = "none";
				} else {
                      document.getElementById("watchtower_main1").style.display = "none";
                      document.getElementById("watchtower_main2").style.display = "flex";
                      document.getElementById("watchtower_main3").style.display = "none";
					  document.getElementById("watchtower_u_buttons").style.display = "flex";
					  document.getElementById("watchtower_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.watchtower_up_time;

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

                    document.getElementById("watchtower_u_textarea").value = remaining;
                }
				
			} else if (data.watchtower_p == 'on') {
			
				document.getElementById("wall_main1").style.display = "none";
				document.getElementById("wall_main2").style.display = "none";
				document.getElementById("wall_main3").style.display = "flex";
				
				if (data.watchtower_p == 'off') {
				document.getElementById("watchtower_main1").style.display = "none";
				document.getElementById("watchtower_main2").style.display = "none";
				document.getElementById("watchtower_main3").style.display = "flex";
				document.getElementById("watchtower_u_buttons").style.display = "none";
				document.getElementById("watchtower_p_buttons").style.display = "none";
				} else {
                      document.getElementById("watchtower_main1").style.display = "none";
                      document.getElementById("watchtower_main2").style.display = "flex";
                      document.getElementById("watchtower_main3").style.display = "none";
					  document.getElementById("watchtower_u_buttons").style.display = "none";
					  document.getElementById("watchtower_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.watchtower_p_time;

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

                    document.getElementById("watchtower_p_textarea").value = "x" + data.watchtower_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("wall_main1").style.display = "flex";
				    document.getElementById("wall_main2").style.display = "none";
				    document.getElementById("wall_main3").style.display = "none";
					document.getElementById("watchtower_main1").style.display = "flex";
				    document.getElementById("watchtower_main2").style.display = "none";
				    document.getElementById("watchtower_main3").style.display = "none";
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
			document.getElementById("wall_level").innerText = data.wall_lvl;
			document.getElementById("watchtower_level").innerText = data.watchtower_lvl;
			document.getElementById("watchtower_amount").innerText = data.watchtower;
			document.getElementById("watchtower_pg_diamond").innerText = data.watchtower_p_a;
			
			if (data.watchtower != null) {	
			 let costDiamond = 0;
			 let costGold = 1000;
			 let costFood = 1500;
			 let costWood = 2500;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 let totalCurrent = data.watchtower;
             let capasites_max = totalCurrent >= 50 ? 0 : Math.min(maxProduce, 50 - totalCurrent);
			 
			 document.getElementById("watchtower_max").innerText = Math.floor(capasites_max);
			}
			
			if (data.wall_lvl < 20) {
			document.getElementById("wall_next_level").innerText = data.wall_lvl + 1;
			} else {
			    document.getElementById("wall_next_level").innerText = "Max";
			}
			if (data.watchtower_lvl < 20) {
			document.getElementById("watchtower_next_level").innerText = data.watchtower_lvl + 1;
			} else{
			    document.getElementById("watchtower_next_level").innerText = "Max";
			}
			
			if (data.wall_up == 'on' || data.watchtower_up == 'on') {
				
				if (data.wall_up == 'off') {
				document.getElementById("wall_main1").style.display = "none";
				document.getElementById("wall_main2").style.display = "none";
				document.getElementById("wall_main3").style.display = "flex";
				} else {
                      document.getElementById("wall_main1").style.display = "none";
                      document.getElementById("wall_main2").style.display = "flex";
                      document.getElementById("wall_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.wall_up_time;

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

                    document.getElementById("wall_textarea").value = remaining;
                }
				
				if (data.watchtower_up == 'off') {
				document.getElementById("watchtower_main1").style.display = "none";
				document.getElementById("watchtower_main2").style.display = "none";
				document.getElementById("watchtower_main3").style.display = "flex";
				document.getElementById("watchtower_u_buttons").style.display = "none";
				document.getElementById("watchtower_p_buttons").style.display = "none";
				} else {
                      document.getElementById("watchtower_main1").style.display = "none";
                      document.getElementById("watchtower_main2").style.display = "flex";
                      document.getElementById("watchtower_main3").style.display = "none";
					  document.getElementById("watchtower_u_buttons").style.display = "flex";
					  document.getElementById("watchtower_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.watchtower_up_time;

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

                    document.getElementById("watchtower_u_textarea").value = remaining;
                }
				
			} else if (data.watchtower_p == 'on') {
			
				document.getElementById("wall_main1").style.display = "none";
				document.getElementById("wall_main2").style.display = "none";
				document.getElementById("wall_main3").style.display = "flex";
				
				if (data.watchtower_p == 'off') {
				document.getElementById("watchtower_main1").style.display = "none";
				document.getElementById("watchtower_main2").style.display = "none";
				document.getElementById("watchtower_main3").style.display = "flex";
				document.getElementById("watchtower_u_buttons").style.display = "none";
				document.getElementById("watchtower_p_buttons").style.display = "none";
				} else {
                      document.getElementById("watchtower_main1").style.display = "none";
                      document.getElementById("watchtower_main2").style.display = "flex";
                      document.getElementById("watchtower_main3").style.display = "none";
					  document.getElementById("watchtower_u_buttons").style.display = "none";
					  document.getElementById("watchtower_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.watchtower_p_time;

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

                    document.getElementById("watchtower_p_textarea").value = "x" + data.watchtower_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("wall_main1").style.display = "flex";
				    document.getElementById("wall_main2").style.display = "none";
				    document.getElementById("wall_main3").style.display = "none";
					document.getElementById("watchtower_main1").style.display = "flex";
				    document.getElementById("watchtower_main2").style.display = "none";
				    document.getElementById("watchtower_main3").style.display = "none";
			}
			
		    document.getElementById("defense_bonus").innerText = ((data.castle_lvl * 2) + (data.wall_lvl * 2) + ((1 + 0.1 * data.watchtower_lvl) * data.watchtower)) * (1 + data.masonry_lvl * 0.01);
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
	
}, 1000);