import React, { Component } from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/auth/actions';

import {StyleSheet, View,KeyboardAvoidingView, Text, TextInput, ActivityIndicator, Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { userSrv } from '../services/api';
class SigninPage extends Component{
  constructor(props){
    super(props);

    this.state={  
      username: "",
      pass:""
    }    
    
    this.input = {}
  }
  
  login = ()=>{ 
    if(!this.state.loading && this.state.username!='' && this.state.pass!='')
    this.props.login({username: this.state.username, password: this.state.pass});
  } 

  goToSignup = ()=>{
    const { navigate } = this.props.navigation;
    navigate("Signup", {})
  }

  changeUsername=(txt)=> this.setState({username: txt}); 
  changePass=(txt)    => this.setState({pass: txt});
  onSubmitEditing = (field)=>()=> this.input[field].focus()

  componentDidUpdate(){
    if(this.props.connected){
      console.log("++++++++==============+++++++>", this.props.connected);
      console.log({user_type:this.props.user_type, token:this.props.token, user:this.props.user});
      // this.props.getUserDetails({user_type:this.props.user_type, token:this.props.token, user:this.props.user});
      this.props.navigation.navigate('SignedIn');
    }
  }
  render(){
    return(
  <View style={ styles.container } >
    <Image source={require('../assets/imgs/bg1.jpg')}  style={{
      flex:1,width:'100%',height:'100%'
    }}/> 

    <View style={ styles.loginForm }>

      <View style={{alignItems: 'center', justifyContent: 'center'}} >
      <KeyboardAvoidingView style={styles.searchSection} behavior="padding" enabled >
        <Ionicons style={styles.searchIcon} name="ios-mail" size={20} color="#ddd"/>
        <TextInput style={styles.input} value={this.state.username}
          onSubmitEditing = {this.onSubmitEditing('pass')}
          placeholder="Email" onChangeText={this.changeUsername} returnKeyType='next' autoCorrect={false}
          underlineColorAndroid="transparent"
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.searchSection}behavior="padding" enabled>
        <Ionicons style={styles.searchIcon} name="md-lock" size={20} color="#ddd"/>
        <TextInput style={styles.input} secureTextEntry={true} value={this.state.pass}
          placeholder="Mot de passe" onChangeText={this.changePass} returnKeyType='done' autoCorrect={false}
          ref={input=>this.input['pass'] = input} 
          underlineColorAndroid="transparent"
        />
      </KeyboardAvoidingView>
    </View>

    <View onTouchEnd={this.login} style={{padding: 10, borderRadius: 3, marginBottom:10, backgroundColor: '#1b59a2',
      flexDirection:"row", marginTop:30,alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 20}} >
        {(this.props.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#fff" /> }
        <Text style={{color: '#fff', textAlign: 'center'}}>SE CONNECTER</Text>
    </View>
    <View onTouchEnd={this.goToSignup} style={{padding: 10, borderRadius: 3, marginBottom:-50,
      flexDirection:"row", marginTop:20,alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 20}} >
        {(this.props.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#1b59a2" /> }
        <Text style={{color: '#1b59a2', textAlign: 'center', fontSize:18,fontWeight:'bold'}}>S'INSCRIRE</Text>
    </View>

    <View style={{padding: 10, borderRadius: 3, marginBottom:2,
      flexDirection:"row",marginTop:120 , alignItems: 'center', justifyContent: 'center', marginRight: 5, marginLeft: 70}} >
        {(this.props.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#1b59a2" /> }
        <Text style={{color: '#fff', textAlign: 'center', fontSize:18}}>Continuer en tant qu'invité</Text>
    </View>
      
    </View>
  
    

  </View>
  );
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
//alignItems: 'center',
// justifyContent: 'center'
},

loginForm : {
  position: 'absolute',
  marginTop:70,
  top: 50,
  bottom: 0,
  left: 0,
  right: 0,
  paddingTop:75,
  alignItems: 'center',
  justifyContent: 'center'
},

searchSection: {
flex: 1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#fff',
borderRadius: 5,
marginBottom: 20,
marginRight: 30,
marginLeft: 70,
borderWidth: 1,
maxHeight:50,
borderColor: '#312566',
},
searchIcon: { padding: 5 },
input: {
flex: 1,
paddingTop: 5,
paddingRight: 5,
paddingBottom: 5,
paddingLeft: 0,
backgroundColor: '#fff',
color: '#424242',
borderRadius: 5
},

divider:{
height: 1,
backgroundColor: "#aaa",
margin: 20,
},
or:{
textAlign: 'center',
backgroundColor: '#fff',
width: 40, 
marginTop: -30,
marginBottom: 10,
alignSelf: 'center'
}
});

//convert PART of state in STORE to the component PROPS
function mapStateToProps(state) {
const { loading, connected } = state.Auth.toJS();

return {
loading, connected,

token: state.Auth.get('token'), 
user: state.Auth.get('user'),
user_type: state.Auth.get('user_type'),
};
}

const {login, getUserDetails} = authActions;
//SECOND var is actions to connected to the component PROPS
export default connect(mapStateToProps, {
login, getUserDetails
})(SigninPage);