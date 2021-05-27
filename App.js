import React, {Component} from 'react';
import {AsyncStorage , LogBox } from 'react-native';

import { createAppContainer } from 'react-navigation';

import { Provider } from 'react-redux';
import store from "./app/redux/store";
import { createRootNavigator } from "./AppRouter";
import { Provider as PaperProvider } from 'react-native-paper';


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
    // console.disableYellowBox = true;
    // LogBox.ignoreAllLogs();
    const {connected, checkedConnected}=this.state;
    if(!checkedConnected) return null;

    const AppContainer = createAppContainer(createRootNavigator(connected));
    return (
    <Provider store={store}>
       <PaperProvider><AppContainer />
       </PaperProvider>
    </Provider>);
  }
}
