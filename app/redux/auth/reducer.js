import { Map } from 'immutable';
import actions from '../auth/actions';

let initState = new Map({
  token: '',
  user_type: '',
  user: null,
  connected: false,
  loading: false,
});

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.INIT_AUTH_SUCCESS:
      // return state.set('token', action.token).set('user', action.user_type)
      // case actions.INIT_AUTH_ERROR:
      // return state;  
       
//console.log("holaa id", action.user);

      const connected = (action.user && action.token && action.user_type && action.token != '' && action.user_type != '')
      return state.set('token', action.token).set('user_type', action.user_type).set('user',action.user).set('class',action.user.class).set('childrens',action.user.childrens)
      .set('id',action.user.id).set('name',action.user.name).set('last_name',action.user.last_name)
        .set('connected', connected) 
  
    case actions.LOGIN_REQUEST:
      return state.set('loading', true); 
    case actions.LOGIN_SUCCESS:
      //console.log("userType", action.user_type);
    
      return state.set('token', action.token).set('user_type', action.user_type)
        //.set('user', action.user_type)
        .set('connected', true).set('loading', false);
    case actions.LOGIN_ERROR:
     // console.log('LOGIN_ERROR', actions)
      return state.set('loading', false).set('connected', false)

//------------------------------->Get User Details
    case actions.GET_USER_DETAILS:
 //   console.log("REDUCER =========++> GET_USER_DETAILS");
      
      return state.set('loading', true);
    case actions.GET_USER_DETAILS_SUCCESS:
      return state.set('user', action.user).set('loading', false);

    case actions.GET_USER_DETAILS_ERROR:
     // console.log('Get user error', actions)
      return state.set('loading', false);

    case actions.LOGOUT:
      // console.log('initState.merge(gettoken())', initState.merge(gettoken()))
      return initState;
    default:
      return state;
  }
}
