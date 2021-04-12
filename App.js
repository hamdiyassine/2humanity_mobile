import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import { createAppContainer } from 'react-navigation';

import { Provider } from 'react-redux';
import store from "./app/redux/store";
import { createRootNavigator } from "./AppRouter";


export default class App extends Component{ 
  state={ 
    connected: false,
    checkedConnected: false,

  }
  componentDidMount(){
    this.loadInitState();

}

  loadInitState = async ()=>{
    const user = await AsyncStorage.getItem('user');
    if(user!=null && user!='') this.setState({connected: true, checkedConnected: true});
    else this.setState({connected: false, checkedConnected: true})
  }
  render() {
    const {connected, checkedConnected}=this.state;
    if(!checkedConnected) return null;

    const AppContainer = createAppContainer(createRootNavigator(connected));
    return (<Provider store={store}><AppContainer /></Provider>);
  }
}
