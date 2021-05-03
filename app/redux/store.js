//npm install redux redux-saga react-redux
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";
import {Post_Reducer} from './posts/reducer'
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers,
    Post_Reducer:Post_Reducer


    // router: routerReducer
  }), 
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export default store; 