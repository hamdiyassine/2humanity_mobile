import {AsyncStorage} from 'react-native';
import { call, all, takeEvery, put, fork } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
// import { clearToken } from '../../helpers/utility';
import actions from './actions';
import axios from 'axios'
//import { userSrv } from "../../services/api";

const loginWithEmailPasswordAsync = async (email, pass) => {
  //console.log("loginWithEmailPasswordAsync : ",email,password);
  
  return await axios.post("http://192.168.1.12:5050/users/login", { email, pass })
    .then(resp => {
      //console.log("resp : ",resp);
      return resp
    })
    .catch(error => { return (error && error.response) ? error.response : error })
}


export function* loginRequest(props) {
  yield takeEvery("LOGIN_REQUEST", function* (action) {
    try {
      
      console.log('/////// LOGIN_REQUEST : ' , action.payload.username , action.payload.password)
      
       const email = action.payload.username ;
       const pass  = action.payload.password ;

       const connect = yield call(loginWithEmailPasswordAsync, email, pass);

       console.log('LOGIN RESP', connect);
       if (connect && connect.status == 200) {
  
        yield put({
              type: actions.LOGIN_SUCCESS, 
              token: connect.data.user.token, 
              user_type: connect.data.user.type,
            });

      } else {
        //history.push('/');
       yield put({type: actions.LOGIN_ERROR, message: 'login error'}); 
      }



    } catch (e) {
      yield put({type: actions.LOGIN_ERROR, message: e.message});
    }
  });
}

export function* initAuth(props) {
  yield takeEvery("INIT_AUTH", function* (action) {
    try {
      const data = yield AsyncStorage.multiGet(['token', 'user_type','user'])

      yield put({ 
        type: actions.INIT_AUTH_SUCCESS, 
        token: data[0][1], 
        user_type: JSON.parse(data[1][1]),
       user: JSON.parse(data[2][1]),

      });
    } catch (e) {
      yield put({type: actions.INIT_AUTH_ERROR, message: e.message});
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield AsyncStorage.setItem('token', payload.token);
    yield AsyncStorage.setItem('user_type', JSON.stringify(payload.user_type));
  });
} 

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {
    yield AsyncStorage.multiRemove(['token', 'user_type', 'user']);
  });
}
 
export function* getUserDetailsResp(props) {
  yield takeEvery("GET_USER_DETAILS", function* (action) { 
    try { 
   //   console.log("===========++++++++> PARAMS", action.token, action.user_type);
      
      const getUserDetailsResp = yield call(userSrv.getUserDetails, action.token, action.user_type)
      //console.log('***getUserDetails==', getUserDetailsResp);



      if(getUserDetailsResp.status){
        yield put({
          type: actions.GET_USER_DETAILS_SUCCESS, 
          user: getUserDetailsResp.data.data
          
        });
      }
      else yield put({type: actions.GET_USER_DETAILS_ERROR, error: getUserDetailsResp.error});

    } catch (e) {
      yield put({type: actions.GET_USER_DETAILS_ERROR, error: e});
    }
  });
}

export function* userDetailsSuccess() {
  yield takeEvery(actions.GET_USER_DETAILS_SUCCESS, function*(payload) {
    yield AsyncStorage.setItem('user', JSON.stringify(payload.user));
  });
}


export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    // clearToken();
    // yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(initAuth),

    fork(getUserDetailsResp),
    fork(userDetailsSuccess)
  ]);
}
