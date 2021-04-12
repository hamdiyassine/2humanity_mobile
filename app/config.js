export default {
 // apiUrl: "http://api.odesco.net/api/",
  // apiUrl:"http://51.255.195.189/odesco_api/web/app_dev.php/api/"
  apiUrl:"http://137.74.197.248:8069/api/",
  db:'universityDB'
  // regExp : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
};

const serializePost = (obj)=>{
  var str = []; 
  for(var p in obj)
  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

// const language = 'english';
// const firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   databaseURL: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
// };

// const googleConfig = {
//   apiKey: 'AIzaSyCZZN8HVpiYNpWRIDsy3cWM4JFAogKMUY8', //
// };

export {
  serializePost,
};
