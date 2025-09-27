async function save() {
  
  const langMarket = {  
  en: "Market",  
  de: "Markt",
  fr: "Marché",
  es: "Mercado",
  pt: "Mercado",
  tr: "Pazar",
  ru: "Рынок",
  zh: "市场",
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
	
	const langBuy = {       
    en: "Buy",
    de: "Kaufen",
    fr: "Acheter",
    es: "Comprar",
    pt: "Comprar",
    tr: "Satın Al",
    ru: "Купить",
    zh: "购买",
    };
	
	const langSell = {        
    en: "Sell",
    de: "Verkaufen",
    fr: "Vendre",
    es: "Vender",
    pt: "Vender",
    tr: "Sat",
    ru: "Продать",
    zh: "出售",
    };

  const lang = localStorage.getItem("language") || "en";
  const lang_Cancel = langCancel[lang] || "Cancel";
  const lang_Market = langMarket[lang] || "Market";
  const lang_BuildingCapacity = langBuildingCapacity[lang] || "Building Capacity";
  const lang_Spy = langSpy[lang] || "Spy";
  const lang_Level = langLevel[lang] || "Level: ";
  const lang_BTitle = langBTitle[lang] || "Train troops to strengthen your army!";
  const lang_DefenseBonus = langDefenseBonus[lang] || "Defense Bonus: ";
  const lang_Buy = langBuy[lang] || "Buy";
  const lang_Sell = langSell[lang] || "Sell";
  
  document.getElementById("trade_cart_lang").innerText = lang_TradeCart;
  document.getElementById("building_capacity_text").innerText = lang_BuildingCapacity;
  document.getElementById("title_lang").innerText = lang_Market;
  document.getElementById("lang_build_title").innerText = lang_BTitle;
  document.getElementById("lang_level1").innerText = lang_Level;
  document.getElementById("lang_level2").innerText = lang_Level;
  document.getElementById("lang_cancel1").innerText = lang_Cancel;
  document.getElementById("lang_cancel2").innerText = lang_Cancel;
  document.getElementById("buy_lang").innerText = lang_Buy;
  document.getElementById("sell_lang").innerText = lang_Sell;
  
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
			document.getElementById("trade_cart_level").innerText = data.trade_cart_lvl;
			document.getElementById("trade_cart_amount").innerText = data.trade_cart;
			document.getElementById("trade_cart_pg_diamond").innerText = data.trade_cart_p_a;
			
			if (data.trade_cart != null) {	
			 let costDiamond = 0;
			 let costGold = 1000;
			 let costFood = 0;
			 let costWood = 1000;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 let totalCurrent = data.trade_cart;
             let capasites_max = totalCurrent >= 5 ? 0 : Math.min(maxProduce, 5 - totalCurrent);
			 
			 document.getElementById("trade_cart_max").innerText = Math.floor(capasites_max);
			}
			
			if (data.trade_cart_lvl < 5) {
			document.getElementById("trade_cart_next_level").innerText = data.trade_cart_lvl + 1;
			} else {
			    document.getElementById("trade_cart_next_level").innerText = "Max";
			}
			
			if (data.trade_cart_up == 'on') {
				
				if (data.trade_cart_up == 'off') {
				document.getElementById("trade_cart_main1").style.display = "none";
				document.getElementById("trade_cart_main2").style.display = "none";
				document.getElementById("trade_cart_main3").style.display = "flex";
				document.getElementById("trade_cart_u_buttons").style.display = "none";
				document.getElementById("trade_cart_p_buttons").style.display = "none";
				} else {
                      document.getElementById("trade_cart_main1").style.display = "none";
                      document.getElementById("trade_cart_main2").style.display = "flex";
                      document.getElementById("trade_cart_main3").style.display = "none";
					  document.getElementById("trade_cart_u_buttons").style.display = "flex";
					  document.getElementById("trade_cart_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.trade_cart_up_time;

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

                    document.getElementById("trade_cart_u_textarea").value = remaining;
                }
				
			} else if (data.trade_cart_p == 'on') {
                if (data.trade_cart_p == 'off') {
				document.getElementById("trade_cart_main1").style.display = "none";
				document.getElementById("trade_cart_main2").style.display = "none";
				document.getElementById("trade_cart_main3").style.display = "flex";
				document.getElementById("trade_cart_u_buttons").style.display = "none";
				document.getElementById("trade_cart_p_buttons").style.display = "none";
				} else {
                      document.getElementById("trade_cart_main1").style.display = "none";
                      document.getElementById("trade_cart_main2").style.display = "flex";
                      document.getElementById("trade_cart_main3").style.display = "none";
					  document.getElementById("trade_cart_u_buttons").style.display = "none";
					  document.getElementById("trade_cart_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.trade_cart_p_time;

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

                    document.getElementById("trade_cart_p_textarea").value = "x" + data.trade_cart_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("trade_cart_main1").style.display = "flex";
				    document.getElementById("trade_cart_main2").style.display = "none";
				    document.getElementById("trade_cart_main3").style.display = "none";
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
			document.getElementById("trade_cart_level").innerText = data.trade_cart_lvl;
			document.getElementById("trade_cart_amount").innerText = data.trade_cart;
			document.getElementById("trade_cart_pg_diamond").innerText = data.trade_cart_p_a;
			
			if (data.trade_cart != null) {	
			 let costDiamond = 0;
			 let costGold = 1000;
			 let costFood = 0;
			 let costWood = 1000;
				
			 let maxDiamond = data.diamond / costDiamond;
             let maxGold = data.gold / costGold;
			 let maxFood = data.food / costFood;
			 let maxWood = data.wood / costWood;
			 if (Number(costDiamond) == 0) maxDiamond = Infinity;
			 if (Number(costGold) == 0) maxGold = Infinity;
			 if (Number(costFood) == 0) maxFood = Infinity;
			 if (Number(costWood) == 0) maxWood = Infinity;
			 let maxProduce = Math.min(maxDiamond, maxGold, maxFood, maxWood);
			 
			 let totalCurrent = data.trade_cart;
             let capasites_max = totalCurrent >= 5 ? 0 : Math.min(maxProduce, 5 - totalCurrent);
			 
			 document.getElementById("trade_cart_max").innerText = Math.floor(capasites_max);
			}
			
			if (data.trade_cart_lvl < 5) {
			document.getElementById("trade_cart_next_level").innerText = data.trade_cart_lvl + 1;
			} else {
			    document.getElementById("trade_cart_next_level").innerText = "Max";
			}
			
			if (data.trade_cart_up == 'on') {
				
				if (data.trade_cart_up == 'off') {
				document.getElementById("trade_cart_main1").style.display = "none";
				document.getElementById("trade_cart_main2").style.display = "none";
				document.getElementById("trade_cart_main3").style.display = "flex";
				document.getElementById("trade_cart_u_buttons").style.display = "none";
				document.getElementById("trade_cart_p_buttons").style.display = "none";
				} else {
                      document.getElementById("trade_cart_main1").style.display = "none";
                      document.getElementById("trade_cart_main2").style.display = "flex";
                      document.getElementById("trade_cart_main3").style.display = "none";
					  document.getElementById("trade_cart_u_buttons").style.display = "flex";
					  document.getElementById("trade_cart_p_buttons").style.display = "none";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.trade_cart_up_time;

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

                    document.getElementById("trade_cart_u_textarea").value = remaining;
                }
				
			} else if (data.trade_cart_p == 'on') {
                if (data.trade_cart_p == 'off') {
				document.getElementById("trade_cart_main1").style.display = "none";
				document.getElementById("trade_cart_main2").style.display = "none";
				document.getElementById("trade_cart_main3").style.display = "flex";
				document.getElementById("trade_cart_u_buttons").style.display = "none";
				document.getElementById("trade_cart_p_buttons").style.display = "none";
				} else {
                      document.getElementById("trade_cart_main1").style.display = "none";
                      document.getElementById("trade_cart_main2").style.display = "flex";
                      document.getElementById("trade_cart_main3").style.display = "none";
					  document.getElementById("trade_cart_u_buttons").style.display = "none";
					  document.getElementById("trade_cart_p_buttons").style.display = "flex";

                      const startTime = Number(sessionStorage.getItem("time"));
                      const endTime = data.trade_cart_p_time;

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

                    document.getElementById("trade_cart_p_textarea").value = "x" + data.trade_cart_p_a + "\n" + remaining;
                }
				
			} else {
					document.getElementById("trade_cart_main1").style.display = "flex";
				    document.getElementById("trade_cart_main2").style.display = "none";
				    document.getElementById("trade_cart_main3").style.display = "none";
			}
			
        }
    } catch (error) {
    console.error(error);
    showToast("Server error.");
    }
	
}, 1000);