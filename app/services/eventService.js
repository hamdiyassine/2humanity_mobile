import config from '../config';

export function getEvents(offset=0, limit=4, token='', query='') {
  return new Promise(resolve => {
    // const q = (query=='')?'':"&query="+query;

    fetch(config.apiUrl+"/events/list", {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' }
    }).then(resp=>{ 
      console.log("///////////",resp);
      
      // if(!resp.ok) resolve({status: false, data: resp, countAll: 0});

      // resolve({status: true, data: (resp._bodyText && resp._bodyText!="") ? JSON.parse(resp._bodyText) : null,  countAll: getCount(resp.headers) });
    }).catch(e=>{ 
      resolve({status: false, data: e, countAll: 0}); 
    }); 
  }); 
}

export function getEvent(eventId, token='', query='') {
  return new Promise(resolve => {
    const q = (query=='')?'':"&query="+query;

    fetch(config.apiUrl+"/events/"+eventId, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': token }
    }).then(resp=>{ 
      if(!resp.ok) resolve({status: false, data: resp, countAll: 0});

      resolve({status: true, data: (resp._bodyText && resp._bodyText!="") ? JSON.parse(resp._bodyText) : null,  countAll: getCount(resp.headers) });
    }).catch(e=>{ 
      resolve({status: false, data: e, countAll: 0}); 
    }); 
  }); 
}

export function participate(eventId, token='') {
  return new Promise(resolve => {
    fetch(config.apiUrl+"/events/"+eventId+"/participate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token }
    }).then(resp=>{
      console.log("participates", resp) 
      if(!resp.ok) resolve({status: false, data: resp, countAll: 0});

      resolve({status: true, data: (resp._bodyText && resp._bodyText!="") ? JSON.parse(resp._bodyText) : null,  countAll: getCount(resp.headers) });
    }).catch(e=>{ 
      resolve({status: false, data: e, countAll: 0}); 
    }); 
  }); 
}


function getCount(respHeaders){ 
    if(!respHeaders) return 0;
    return Number(respHeaders.map['api-list-count']) || 0;
  }
