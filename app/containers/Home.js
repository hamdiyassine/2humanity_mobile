import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ActivityIndicator} from 'react-native';
import HeaderMain from '../components/HeaderMain';
import authActions from '../redux/auth/actions';
import Post from '../components/Post';


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

  likePost = ()=>{
    console.log("hello");
    
  }
  

  render(){
    let {navigation} = this.props;
    const post =  {
      title : "publication test",
      content : "description de la publication",
      author:{
        name:"yassine"
      },
      datetime : new Date(),
      images : [],
      like_count : 5

    }
    return(
    <View style={styles.container}>
      <Post post={post} 
        likePost={this.likePost} navigation={this.props.navigation} 
      />
    </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
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