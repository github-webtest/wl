function save() {
	
   const langTasks = {    
   en: "Tasks",
   de: "Aufgaben",
   fr: "Tâches",
   es: "Tareas",
   pt: "Tarefas",
   tr: "Görevler",
   ru: "Задачи",
   zh: "任务",
   };
   
   const langTasks2 = {    
   en: "Tasks: ",
   de: "Aufgaben: ",
   fr: "Tâches: ",
   es: "Tareas: ",
   pt: "Tarefas: ",
   tr: "Görevler: ",
   ru: "Задачи: ",
   zh: "任务: ",
   };
   
   const langHelpme = {     
   en: "Help me", 
   de: "Hilf mir",
   fr: "Aide-moi",
   es: "Ayúdame",
   pt: "Ajuda-me",
   tr: "Bana yardım et",
   ru: "Помоги мне",
   zh: "帮我",
   };
   
   const langReward = {      
  en: "Reward: ",
  de: "Belohnung: ",
  fr: "Récompense: ",
  es: "Recompensa: ",
  pt: "Recompensa: ",
  tr: "Ödül: ",
  ru: "Награда: ",
  zh: "奖励：",
};

  const lang = localStorage.getItem("language") || "en";
  const lang_Tasks = langTasks[lang] || "Tasks";
  const lang_Reward = langReward[lang] || "Reward: ";
  const lang_Helpme = langHelpme[lang] || "Help me";
  const lang_Tasks2 = langTasks2[lang] || "Tasks: ";
  
  
  document.getElementById("title_lang").innerText = lang_Tasks;
  document.getElementById("tasks_lang").innerText = lang_Tasks2;
  document.getElementById("reward_lang").innerText = lang_Reward;
  document.getElementById("helpme_lang").innerText = lang_Helpme;
  
}