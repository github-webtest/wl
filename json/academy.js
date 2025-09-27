async function save() {
  
  const langAcademy = {  
  en: "Academy", 
  de: "Akademie",
  fr: "Académie",
  es: "Academia",
  pt: "Academia",
  tr: "Akademi",
  ru: "Академия",
  zh: "学院",
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
  en: "Do scientific research and upgrade your technology!",  
  de: "Führe wissenschaftliche Forschung durch und verbessere deine Technologie!",  
  fr: "Menez des recherches scientifiques et améliorez votre technologie !",  
  es: "Realiza investigaciones científicas y mejora tu tecnología.",  
  pt: "Realize pesquisas científicas e aprimore sua tecnologia!",  
  tr: "Bilimsel araştırma yap ve teknolojini geliştir!",  
  ru: "Проводите научные исследования и улучшайте свои технологии!",  
  zh: "进行科学研究并升级你的科技！",  
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

  const lang = localStorage.getItem("language") || "en";
  const lang_Cancel = langCancel[lang] || "Cancel";
  const lang_Academy = langAcademy[lang] || "Academy";
  const lang_BuildingCapacity = langBuildingCapacity[lang] || "Building Capacity";
  const lang_Spy = langSpy[lang] || "Spy";
  const lang_Level = langLevel[lang] || "Level: ";
  const lang_BTitle = langBTitle[lang] || "Train troops to strengthen your army!";
  const lang_DefenseBonus = langDefenseBonus[lang] || "Defense Bonus: ";
  
  document.getElementById("title_lang").innerText = lang_Academy;
  document.getElementById("lang_build_title").innerText = lang_BTitle;
  document.getElementById("farming_lang").innerText = lang_Farming;
  document.getElementById("lumbering_lang").innerText = lang_Lumbering;
  document.getElementById("blacksmithing_lang").innerText = lang_Blacksmithing;
  document.getElementById("mining_lang").innerText = lang_Mining;
  document.getElementById("riding_lang").innerText = lang_Riding;
  document.getElementById("geometry_lang").innerText = lang_Geometry;
  document.getElementById("cartography_lang").innerText = lang_Cartography;
  document.getElementById("spying_lang").innerText = lang_Spying;
  document.getElementById("masonry_lang").innerText = lang_Masonry;
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
  document.getElementById("lang_level15").innerText = lang_Level;
  document.getElementById("lang_level16").innerText = lang_Level;
  document.getElementById("lang_level17").innerText = lang_Level;
  document.getElementById("lang_level18").innerText = lang_Level;
  document.getElementById("lang_cancel1").innerText = lang_Cancel;
  document.getElementById("lang_cancel2").innerText = lang_Cancel;
  document.getElementById("lang_cancel3").innerText = lang_Cancel;
  document.getElementById("lang_cancel4").innerText = lang_Cancel;
  document.getElementById("lang_cancel5").innerText = lang_Cancel;
  document.getElementById("lang_cancel6").innerText = lang_Cancel;
  document.getElementById("lang_cancel7").innerText = lang_Cancel;
  document.getElementById("lang_cancel8").innerText = lang_Cancel;
  document.getElementById("lang_cancel9").innerText = lang_Cancel;
  
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
			document.getElementById("farming_level").innerText = data.farming_lvl;
			document.getElementById("lumbering_level").innerText = data.lumbering_lvl;
			document.getElementById("mining_level").innerText = data.mining_lvl;
			document.getElementById("blacksmithing_level").innerText = data.blacksmithing_lvl;
			document.getElementById("riding_level").innerText = data.riding_lvl;
			document.getElementById("geometry_level").innerText = data.geometry_lvl;
			document.getElementById("cartography_level").innerText = data.cartography_lvl;
			document.getElementById("spying_level").innerText = data.spying_lvl;
			document.getElementById("masonry_level").innerText = data.masonry_lvl;
			
			if (data.farming_lvl < 20) {
			document.getElementById("farming_next_level").innerText = data.farming_lvl + 1;
			} else {
			    document.getElementById("farming_next_level").innerText = "Max";
			}
			if (data.lumbering_lvl < 20) {
			document.getElementById("lumbering_next_level").innerText = data.lumbering_lvl + 1;
			} else{
			    document.getElementById("lumbering_next_level").innerText = "Max";
			}
			if (data.mining_lvl < 20) {
			document.getElementById("mining_next_level").innerText = data.mining_lvl + 1;
			} else {
			    document.getElementById("mining_next_level").innerText = "Max";
			}
			if (data.blacksmithing_lvl < 20) {
			document.getElementById("blacksmithing_next_level").innerText = data.blacksmithing_lvl + 1;
			} else {
			    document.getElementById("blacksmithing_next_level").innerText = "Max";
			}
			if (data.riding_lvl < 20) {
			document.getElementById("riding_next_level").innerText = data.riding_lvl + 1;
			} else {
				document.getElementById("riding_next_level").innerText = "Max";
			}
			if (data.geometry_lvl < 20) {
				document.getElementById("geometry_next_level").innerText = data.geometry_lvl + 1;
			} else {
				document.getElementById("geometry_next_level").innerText = "Max";
			}
			if (data.cartography_lvl < 20) {
				document.getElementById("cartography_next_level").innerText = data.cartography_lvl + 1;
			} else {
				document.getElementById("cartography_next_level").innerText = "Max";
			}
			if (data.spying_lvl < 20) {
				document.getElementById("spying_next_level").innerText = data.spying_lvl + 1;
			} else {
				document.getElementById("spying_next_level").innerText = "Max";
			}
			if (data.masonry_lvl < 20) {
				document.getElementById("masonry_next_level").innerText = data.masonry_lvl + 1;
			} else {
				document.getElementById("masonry_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 1500) {
				document.getElementById("blacksmithing_img").style.backgroundImage = "url('images/blacksmithing.png')";
				document.getElementById("blacksmithing_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("riding_img").style.backgroundImage = "url('images/riding.png')";
				document.getElementById("riding_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("geometry_img").style.backgroundImage = "url('images/geometry.png')";
				document.getElementById("geometry_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				
				document.getElementById("blacksmithing_top_2").style.display = "flex";
				document.getElementById("riding_top_2").style.display = "flex";
				document.getElementById("geometry_top_2").style.display = "flex";
				
				if (data.age_points >= 2500) {
					document.getElementById("cartography_img").style.backgroundImage = "url('images/cartography.png')";
				    document.getElementById("cartography_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				    document.getElementById("spying_img").style.backgroundImage = "url('images/spying.png')";
				    document.getElementById("spying_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				    document.getElementById("masonry_img").style.backgroundImage = "url('images/masonry.png')";
				    document.getElementById("masonry_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
					
					document.getElementById("cartography_top_2").style.display = "flex";
				    document.getElementById("spying_top_2").style.display = "flex";
				    document.getElementById("masonry_top_2").style.display = "flex";
				}
				
			}
			
			if (data.farming_up == 'on' || data.lumbering_up == 'on' || data.mining_up == 'on' || data.blacksmithing_up == 'on' || data.riding_up == 'on' || data.geometry_up == 'on' || data.cartography_up == 'on' || data.spying_up == 'on' || data.masonry_up == 'on') {
				
				if (data.farming_up == 'off') {
				document.getElementById("farming_main1").style.display = "none";
				document.getElementById("farming_main2").style.display = "none";
				document.getElementById("farming_main3").style.display = "flex";
				} else {
                      document.getElementById("farming_main1").style.display = "none";
                      document.getElementById("farming_main2").style.display = "flex";
                      document.getElementById("farming_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.farming_up_time;

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

                    document.getElementById("farming_textarea").value = remaining;
                }
				
				if (data.lumbering_up == 'off') {
				document.getElementById("lumbering_main1").style.display = "none";
				document.getElementById("lumbering_main2").style.display = "none";
				document.getElementById("lumbering_main3").style.display = "flex";
				} else {
                      document.getElementById("lumbering_main1").style.display = "none";
                      document.getElementById("lumbering_main2").style.display = "flex";
                      document.getElementById("lumbering_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.lumbering_up_time;

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

                    document.getElementById("lumbering_textarea").value = remaining;
                }
				
				if (data.mining_up == 'off') {
				document.getElementById("mining_main1").style.display = "none";
				document.getElementById("mining_main2").style.display = "none";
				document.getElementById("mining_main3").style.display = "flex";
				} else {
                      document.getElementById("mining_main1").style.display = "none";
                      document.getElementById("mining_main2").style.display = "flex";
                      document.getElementById("mining_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.mining_up_time;

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

                    document.getElementById("mining_textarea").value = remaining;
                }
				
				if (data.blacksmithing_up == 'off') {
				document.getElementById("blacksmithing_main1").style.display = "none";
				document.getElementById("blacksmithing_main2").style.display = "none";
				document.getElementById("blacksmithing_main3").style.display = "flex";
				} else {
                      document.getElementById("blacksmithing_main1").style.display = "none";
                      document.getElementById("blacksmithing_main2").style.display = "flex";
                      document.getElementById("blacksmithing_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.blacksmithing_up_time;

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

                    document.getElementById("blacksmithing_textarea").value = remaining;
                }
				
				if (data.riding_up == 'off') {
				document.getElementById("riding_main1").style.display = "none";
				document.getElementById("riding_main2").style.display = "none";
				document.getElementById("riding_main3").style.display = "flex";
				} else {
                      document.getElementById("riding_main1").style.display = "none";
                      document.getElementById("riding_main2").style.display = "flex";
                      document.getElementById("riding_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.riding_up_time;

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

                    document.getElementById("riding_textarea").value = remaining;
                }
				
				if (data.geometry_up == 'off') {
				document.getElementById("geometry_main1").style.display = "none";
				document.getElementById("geometry_main2").style.display = "none";
				document.getElementById("geometry_main3").style.display = "flex";
				} else {
                      document.getElementById("geometry_main1").style.display = "none";
                      document.getElementById("geometry_main2").style.display = "flex";
                      document.getElementById("geometry_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.geometry_up_time;

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

                    document.getElementById("geometry_textarea").value = remaining;
                }
				
				if (data.cartography_up == 'off') {
				document.getElementById("cartography_main1").style.display = "none";
				document.getElementById("cartography_main2").style.display = "none";
				document.getElementById("cartography_main3").style.display = "flex";
				} else {
                      document.getElementById("cartography_main1").style.display = "none";
                      document.getElementById("cartography_main2").style.display = "flex";
                      document.getElementById("cartography_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cartography_up_time;

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

                    document.getElementById("cartography_textarea").value = remaining;
                }
				
				if (data.spying_up == 'off') {
				document.getElementById("spying_main1").style.display = "none";
				document.getElementById("spying_main2").style.display = "none";
				document.getElementById("spying_main3").style.display = "flex";
				} else {
                      document.getElementById("spying_main1").style.display = "none";
                      document.getElementById("spying_main2").style.display = "flex";
                      document.getElementById("spying_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spying_up_time;

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

                    document.getElementById("spying_textarea").value = remaining;
                }
				
				if (data.masonry_up == 'off') {
				document.getElementById("masonry_main1").style.display = "none";
				document.getElementById("masonry_main2").style.display = "none";
				document.getElementById("masonry_main3").style.display = "flex";
				} else {
                      document.getElementById("masonry_main1").style.display = "none";
                      document.getElementById("masonry_main2").style.display = "flex";
                      document.getElementById("masonry_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.masonry_up_time;

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

                    document.getElementById("masonry_textarea").value = remaining;
                }
				
			} else {
					document.getElementById("farming_main1").style.display = "flex";
				    document.getElementById("farming_main2").style.display = "none";
				    document.getElementById("farming_main3").style.display = "none";
					document.getElementById("lumbering_main1").style.display = "flex";
				    document.getElementById("lumbering_main2").style.display = "none";
				    document.getElementById("lumbering_main3").style.display = "none";
					document.getElementById("mining_main1").style.display = "flex";
				    document.getElementById("mining_main2").style.display = "none";
				    document.getElementById("mining_main3").style.display = "none";
					document.getElementById("blacksmithing_main1").style.display = "flex";
				    document.getElementById("blacksmithing_main2").style.display = "none";
				    document.getElementById("blacksmithing_main3").style.display = "none";
					document.getElementById("riding_main1").style.display = "flex";
				    document.getElementById("riding_main2").style.display = "none";
				    document.getElementById("riding_main3").style.display = "none";
					document.getElementById("geometry_main1").style.display = "flex";
				    document.getElementById("geometry_main2").style.display = "none";
				    document.getElementById("geometry_main3").style.display = "none";
					document.getElementById("cartography_main1").style.display = "flex";
				    document.getElementById("cartography_main2").style.display = "none";
				    document.getElementById("cartography_main3").style.display = "none";
					document.getElementById("spying_main1").style.display = "flex";
				    document.getElementById("spying_main2").style.display = "none";
				    document.getElementById("spying_main3").style.display = "none";
					document.getElementById("masonry_main1").style.display = "flex";
				    document.getElementById("masonry_main2").style.display = "none";
				    document.getElementById("masonry_main3").style.display = "none";
			}
			
        }
    } catch (err) {
        console.error("Error:" + err);
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
			document.getElementById("farming_level").innerText = data.farming_lvl;
			document.getElementById("lumbering_level").innerText = data.lumbering_lvl;
			document.getElementById("mining_level").innerText = data.mining_lvl;
			document.getElementById("blacksmithing_level").innerText = data.blacksmithing_lvl;
			document.getElementById("riding_level").innerText = data.riding_lvl;
			document.getElementById("geometry_level").innerText = data.geometry_lvl;
			document.getElementById("cartography_level").innerText = data.cartography_lvl;
			document.getElementById("spying_level").innerText = data.spying_lvl;
			document.getElementById("masonry_level").innerText = data.masonry_lvl;
			
			if (data.farming_lvl < 20) {
			document.getElementById("farming_next_level").innerText = data.farming_lvl + 1;
			} else {
			    document.getElementById("farming_next_level").innerText = "Max";
			}
			if (data.lumbering_lvl < 20) {
			document.getElementById("lumbering_next_level").innerText = data.lumbering_lvl + 1;
			} else{
			    document.getElementById("lumbering_next_level").innerText = "Max";
			}
			if (data.mining_lvl < 20) {
			document.getElementById("mining_next_level").innerText = data.mining_lvl + 1;
			} else {
			    document.getElementById("mining_next_level").innerText = "Max";
			}
			if (data.blacksmithing_lvl < 20) {
			document.getElementById("blacksmithing_next_level").innerText = data.blacksmithing_lvl + 1;
			} else {
			    document.getElementById("blacksmithing_next_level").innerText = "Max";
			}
			if (data.riding_lvl < 20) {
			document.getElementById("riding_next_level").innerText = data.riding_lvl + 1;
			} else {
				document.getElementById("riding_next_level").innerText = "Max";
			}
			if (data.geometry_lvl < 20) {
				document.getElementById("geometry_next_level").innerText = data.geometry_lvl + 1;
			} else {
				document.getElementById("geometry_next_level").innerText = "Max";
			}
			if (data.cartography_lvl < 20) {
				document.getElementById("cartography_next_level").innerText = data.cartography_lvl + 1;
			} else {
				document.getElementById("cartography_next_level").innerText = "Max";
			}
			if (data.spying_lvl < 20) {
				document.getElementById("spying_next_level").innerText = data.spying_lvl + 1;
			} else {
				document.getElementById("spying_next_level").innerText = "Max";
			}
			if (data.masonry_lvl < 20) {
				document.getElementById("masonry_next_level").innerText = data.masonry_lvl + 1;
			} else {
				document.getElementById("masonry_next_level").innerText = "Max";
			}
			
			if (data.age_points >= 1500) {
				document.getElementById("blacksmithing_img").style.backgroundImage = "url('images/blacksmithing.png')";
				document.getElementById("blacksmithing_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("riding_img").style.backgroundImage = "url('images/riding.png')";
				document.getElementById("riding_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				document.getElementById("geometry_img").style.backgroundImage = "url('images/geometry.png')";
				document.getElementById("geometry_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				
				document.getElementById("blacksmithing_top_2").style.display = "flex";
				document.getElementById("riding_top_2").style.display = "flex";
				document.getElementById("geometry_top_2").style.display = "flex";
				
				if (data.age_points >= 2500) {
					document.getElementById("cartography_img").style.backgroundImage = "url('images/cartography.png')";
				    document.getElementById("cartography_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				    document.getElementById("spying_img").style.backgroundImage = "url('images/spying.png')";
				    document.getElementById("spying_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
				    document.getElementById("masonry_img").style.backgroundImage = "url('images/masonry.png')";
				    document.getElementById("masonry_warning_icon").style.backgroundImage = "url('images/warning_icon.png')";
					
					document.getElementById("cartography_top_2").style.display = "flex";
				    document.getElementById("spying_top_2").style.display = "flex";
				    document.getElementById("masonry_top_2").style.display = "flex";
				}
				
			}
			
			if (data.farming_up == 'on' || data.lumbering_up == 'on' || data.mining_up == 'on' || data.blacksmithing_up == 'on' || data.riding_up == 'on' || data.geometry_up == 'on' || data.cartography_up == 'on' || data.spying_up == 'on' || data.masonry_up == 'on') {
				
				if (data.farming_up == 'off') {
				document.getElementById("farming_main1").style.display = "none";
				document.getElementById("farming_main2").style.display = "none";
				document.getElementById("farming_main3").style.display = "flex";
				} else {
                      document.getElementById("farming_main1").style.display = "none";
                      document.getElementById("farming_main2").style.display = "flex";
                      document.getElementById("farming_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.farming_up_time;

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

                    document.getElementById("farming_textarea").value = remaining;
                }
				
				if (data.lumbering_up == 'off') {
				document.getElementById("lumbering_main1").style.display = "none";
				document.getElementById("lumbering_main2").style.display = "none";
				document.getElementById("lumbering_main3").style.display = "flex";
				} else {
                      document.getElementById("lumbering_main1").style.display = "none";
                      document.getElementById("lumbering_main2").style.display = "flex";
                      document.getElementById("lumbering_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.lumbering_up_time;

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

                    document.getElementById("lumbering_textarea").value = remaining;
                }
				
				if (data.mining_up == 'off') {
				document.getElementById("mining_main1").style.display = "none";
				document.getElementById("mining_main2").style.display = "none";
				document.getElementById("mining_main3").style.display = "flex";
				} else {
                      document.getElementById("mining_main1").style.display = "none";
                      document.getElementById("mining_main2").style.display = "flex";
                      document.getElementById("mining_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.mining_up_time;

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

                    document.getElementById("mining_textarea").value = remaining;
                }
				
				if (data.blacksmithing_up == 'off') {
				document.getElementById("blacksmithing_main1").style.display = "none";
				document.getElementById("blacksmithing_main2").style.display = "none";
				document.getElementById("blacksmithing_main3").style.display = "flex";
				} else {
                      document.getElementById("blacksmithing_main1").style.display = "none";
                      document.getElementById("blacksmithing_main2").style.display = "flex";
                      document.getElementById("blacksmithing_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.blacksmithing_up_time;

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

                    document.getElementById("blacksmithing_textarea").value = remaining;
                }
				
				if (data.riding_up == 'off') {
				document.getElementById("riding_main1").style.display = "none";
				document.getElementById("riding_main2").style.display = "none";
				document.getElementById("riding_main3").style.display = "flex";
				} else {
                      document.getElementById("riding_main1").style.display = "none";
                      document.getElementById("riding_main2").style.display = "flex";
                      document.getElementById("riding_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.riding_up_time;

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

                    document.getElementById("riding_textarea").value = remaining;
                }
				
				if (data.geometry_up == 'off') {
				document.getElementById("geometry_main1").style.display = "none";
				document.getElementById("geometry_main2").style.display = "none";
				document.getElementById("geometry_main3").style.display = "flex";
				} else {
                      document.getElementById("geometry_main1").style.display = "none";
                      document.getElementById("geometry_main2").style.display = "flex";
                      document.getElementById("geometry_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.geometry_up_time;

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

                    document.getElementById("geometry_textarea").value = remaining;
                }
				
				if (data.cartography_up == 'off') {
				document.getElementById("cartography_main1").style.display = "none";
				document.getElementById("cartography_main2").style.display = "none";
				document.getElementById("cartography_main3").style.display = "flex";
				} else {
                      document.getElementById("cartography_main1").style.display = "none";
                      document.getElementById("cartography_main2").style.display = "flex";
                      document.getElementById("cartography_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.cartography_up_time;

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

                    document.getElementById("cartography_textarea").value = remaining;
                }
				
				if (data.spying_up == 'off') {
				document.getElementById("spying_main1").style.display = "none";
				document.getElementById("spying_main2").style.display = "none";
				document.getElementById("spying_main3").style.display = "flex";
				} else {
                      document.getElementById("spying_main1").style.display = "none";
                      document.getElementById("spying_main2").style.display = "flex";
                      document.getElementById("spying_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.spying_up_time;

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

                    document.getElementById("spying_textarea").value = remaining;
                }
				
				if (data.masonry_up == 'off') {
				document.getElementById("masonry_main1").style.display = "none";
				document.getElementById("masonry_main2").style.display = "none";
				document.getElementById("masonry_main3").style.display = "flex";
				} else {
                      document.getElementById("masonry_main1").style.display = "none";
                      document.getElementById("masonry_main2").style.display = "flex";
                      document.getElementById("masonry_main3").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.masonry_up_time;

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

                    document.getElementById("masonry_textarea").value = remaining;
                }
				
			} else {
					document.getElementById("farming_main1").style.display = "flex";
				    document.getElementById("farming_main2").style.display = "none";
				    document.getElementById("farming_main3").style.display = "none";
					document.getElementById("lumbering_main1").style.display = "flex";
				    document.getElementById("lumbering_main2").style.display = "none";
				    document.getElementById("lumbering_main3").style.display = "none";
					document.getElementById("mining_main1").style.display = "flex";
				    document.getElementById("mining_main2").style.display = "none";
				    document.getElementById("mining_main3").style.display = "none";
					document.getElementById("blacksmithing_main1").style.display = "flex";
				    document.getElementById("blacksmithing_main2").style.display = "none";
				    document.getElementById("blacksmithing_main3").style.display = "none";
					document.getElementById("riding_main1").style.display = "flex";
				    document.getElementById("riding_main2").style.display = "none";
				    document.getElementById("riding_main3").style.display = "none";
					document.getElementById("geometry_main1").style.display = "flex";
				    document.getElementById("geometry_main2").style.display = "none";
				    document.getElementById("geometry_main3").style.display = "none";
					document.getElementById("cartography_main1").style.display = "flex";
				    document.getElementById("cartography_main2").style.display = "none";
				    document.getElementById("cartography_main3").style.display = "none";
					document.getElementById("spying_main1").style.display = "flex";
				    document.getElementById("spying_main2").style.display = "none";
				    document.getElementById("spying_main3").style.display = "none";
					document.getElementById("masonry_main1").style.display = "flex";
				    document.getElementById("masonry_main2").style.display = "none";
				    document.getElementById("masonry_main3").style.display = "none";
			}
			
        }
    } catch (err) {
        console.error("Error:" + err);
    }
}, 1000);