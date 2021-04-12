import {AsyncStorage} from 'react-native';
import { call, all, takeEvery, put, fork } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
// import { clearToken } from '../../helpers/utility';
import actions from './actions';

//import { userSrv } from "../../services/api";

export function* loginRequest(props) {
  yield takeEvery("LOGIN_REQUEST", function* (action) {
    try {
      yield put({
        type: actions.LOGIN_SUCCESS, 
        token: "00", 
        user_type: "user",
      });
      //const loginResp = yield call("http://51.91.99.118:5000/users/login", action.payload.username, action.payload.password)
     // console.log('LOGIN RESP', loginResp)

      // if(loginResp.status ){
      //   yield put({
      //     type: actions.LOGIN_SUCCESS, 
      //     token: loginResp.data.data.session_id, 
      //     user_type: loginResp.data.data.user_type,
      //   });

      //   yield put({
      //     type: actions.GET_USER_DETAILS, 
      //     token: loginResp.data.data.session_id, 
      //     user_type: loginResp.data.data.user_type,
      //   });

      // }
      // else yield put({type: actions.LOGIN_ERROR, message: JSON.parse(loginResp.data._bodyText).message}); 

    } catch (e) {
      yield put({type: actions.LOGIN_ERROR, message: e.message});
    }
  });
}

export function* initAuth(props) {
  yield takeEvery("INIT_AUTH", function* (action) {
    try {
      const data = yield AsyncStorage.multiGet(['token', 'user_type','user'])

      //=================+++++> a verifier
//console.log('========++++++++++> data',data);
// console.log("======================>data", {
//   token: data[0][1], 
//   user_type: data[1][1],
//   user: data[2][1],

// });

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
