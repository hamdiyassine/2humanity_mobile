export default {
  apiUrl:'http://localhost:5050',
  //direction: 'rtl'
};


const language = 'frensh'

const timeToFr=(timeStr)=>{
  timeStr = timeStr.replace('a few seconds ago',  'il ya quelques secondes');
  timeStr = timeStr.replace('a minute ago',       "Il ya une minute");
  timeStr = timeStr.replace('minutes ago',        "minutes");
  timeStr = timeStr.replace('an hour ago',        "il y a une heure");
  timeStr = timeStr.replace('hours ago',          "heures");
  timeStr = timeStr.replace('a day ago',          "il y a un jour");
  timeStr = timeStr.replace('days ago',           "jours");
  timeStr = timeStr.replace('a month ago',        "il y a un mois");
  timeStr = timeStr.replace('months ago',         "mois");
  timeStr = timeStr.replace('a year ago',         "il y a un an");
  
  return timeStr.replace('years ago',          "années");
}




export {
  language ,
  //firebaseConfig,
  timeToFr
};
