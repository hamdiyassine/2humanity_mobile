const authActons = {
  LOGIN_REQUEST : 'LOGIN_REQUEST',
  LOGIN_SUCCESS : 'LOGIN_SUCCESS',
  LOGIN_ERROR   : 'LOGIN_ERROR',
  LOGOUT        : 'LOGOUT',
  
  INIT_AUTH     : 'INIT_AUTH',
  INIT_AUTH_SUCCESS : 'INIT_AUTH_SUCCESS',
  INIT_AUTH_ERROR   : 'INIT_AUTH_ERROR',
  initAuth: ()=>({ type: authActons.INIT_AUTH}),

  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_DETAILS_SUCCESS: 'GET_USER_DETAILS_SUCCESS',
  GET_USER_DETAILS_ERROR: 'GET_USER_DETAILS_ERROR',

  // FB_OAUTH        : 'FB_OAUTH',
  // FB_OAUTH_SUCCESS: 'FB_OAUTH_SUCCESS',

  login: (payload) => ({ type: authActons.LOGIN_REQUEST, payload }),
  getUserDetails: (payload) => ({type: authActons.GET_USER_DETAILS, payload}),

  // fbOauth: (payload) => ({ type: authActons.FB_OAUTH, payload }),
  
  logout: () => ({ type: authActons.LOGOUT, }),
};
export default authActons;
