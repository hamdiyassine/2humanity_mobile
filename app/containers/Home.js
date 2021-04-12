import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ActivityIndicator} from 'react-native';
import HeaderMain from '../components/HeaderMain';
import authActions from '../redux/auth/actions';

import {StyleSheet, View, Text ,Button ,ScrollView, RefreshControl } from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 20;
};

class HomePage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      searchTxt:'',
      offset: 0,
      showAccMdl: false,

      user: null,
      token: '',
      expoPushToken : '',
      notification: {},
    }
  } 

  static navigationOptions =  ({ navigation }) => {
    const {params = {}} = navigation.state;

    return HeaderMain(navigation, params.changeSearch, 
      params.toggleAccMdl
    );
  } 
  

  render(){
    let {navigation} = this.props;
    return(
    <View style={styles.container}>
      <Text style={{ margin: 70}}>Hello !! </Text>
    </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

//convert PART of state in STORE to the component PROPS
function mapStateToProps(state) {
  //const { posts, countPosts, loading, refreshing } = state.Posts.toJS();

  return {
    token: state.Auth.get('token'),
    user: state.Auth.get('user'),
    user_type: state.Auth.get('user_type'),
  }; 
}

const {initAuth} = authActions;
//SECOND var is actions to connected to the component PROPS
export default connect(mapStateToProps, {
  initAuth
})(HomePage);