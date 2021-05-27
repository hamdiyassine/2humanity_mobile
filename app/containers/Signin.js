import React, { Component } from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/auth/actions';
import MdCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View,KeyboardAvoidingView, Text, TextInput, ActivityIndicator, ImageBackground, ScrollView} from 'react-native';

// import { userSrv } from '../services/api';
class SigninPage extends Component{
  constructor(props){
    super(props);

  this.state={  
  username: "", pass:""
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

  goToHome = ()=>{
    const { navigate } = this.props.navigation;
    navigate("Home", {})
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
      <ImageBackground source={require('../assets/imgs/bg4.jpg')} style={styles.image}>
  <ScrollView  >
  <View style={styles.container} >
        <Text style={{
          fontSize:30,
          color:"#1b59a2",
          alignSelf:"center",
          marginTop:10,
        }} >
          Connexion</Text>
  <View style={{alignItems: 'center', justifyContent: 'center'}} >
    <KeyboardAvoidingView style={styles.searchSection} behavior="padding" enabled >
    <MdCom style={styles.searchIcon} name="email-outline" size={20} color="#ddd"/>
      <TextInput style={styles.input} value={this.state.username}
        onSubmitEditing = {this.onSubmitEditing('pass')}
        placeholder="Email" onChangeText={this.changeUsername} returnKeyType='next' autoCorrect={false}
        underlineColorAndroid="transparent"
      />
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={styles.searchSection}behavior="padding" enabled>
    <MdCom style={styles.searchIcon} name="lock-outline" size={20} color="#ddd"/>
      <TextInput style={styles.input} secureTextEntry={true} value={this.state.pass}
        placeholder="Mot de passe" onChangeText={this.changePass} returnKeyType='done' autoCorrect={false}
        ref={input=>this.input['pass'] = input} 
        underlineColorAndroid="transparent"
      />
    </KeyboardAvoidingView>
  </View>

  <View onTouchEnd={this.login} style={{
      
      alignItems:"center",
      justifyContent:"center",
      marginTop:13,
      backgroundColor:"#1b59a2",
      paddingVertical:10,
      marginHorizontal:30,
      borderRadius:23,
    }} >
      {(this.props.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#fff" /> }
      <Text style={{color: '#fff', textAlign: 'center'}}>SE CONNECTER</Text>
  </View>
  <View onTouchEnd={this.goToSignup} style={{padding: 10, borderRadius: 3,  backgroundColor: 'transparent', marginBottom: 20,
          flexDirection:"row", alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 20}} >
      {(this.props.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#1b59a2" /> }
      <Text style={{color: '#1b59a2', textAlign: 'center'}}>S'INSCRIRE</Text>
  </View>

  <View onTouchEnd={this.goToHome} style={{padding: 10, borderRadius: 3,  backgroundColor: 'transparent', marginBottom: 20,
          flexDirection:"row", alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 20}} >
      {(this.props.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#1b59a2" /> }
      <Text style={{color: '#1b59a2', textAlign: 'center',fontWeight:'bold'}}>Continuer en tant qu'invité</Text>
  </View>
    </View>
  </ScrollView>
  </ImageBackground>
  );
}
}

const styles = StyleSheet.create({
  container: {
   // paddingTop:10,
    marginHorizontal:20,
   marginVertical:250,
    flexDirection: "column",  
    //height:10,
    borderWidth: 0,
    borderRadius:20,
    backgroundColor:"white",
  },

searchSection: {
// flex: 1,
// flexDirection: 'row',
// justifyContent: 'center',
// alignItems: 'center',
// backgroundColor: '#fff',
// borderRadius: 3,
// marginBottom: 20,
// marginRight: 20,
// marginLeft: 20,
// borderWidth: 1,
// borderColor: '#312566',
    flexDirection: "row",
    flex: 1, 
    alignItems:"center",
    marginHorizontal:30,
    borderWidth:2,
    marginTop:15,
     //marginBottom:10,
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:23,
    borderColor:'#1b59a2',
},
searchIcon: { padding: 5 },
input: {
flex: 1,
paddingTop: 5,
paddingRight: 5,
paddingBottom: 5,
paddingLeft: 0,
backgroundColor: 'transparent',
color: '#424242',
borderRadius: 3
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
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
});

//convert PART of state in STORE to the component PROPS
function mapStateToProps(state) {
const { loading, connected } = state.Auth.toJS();

return {
loading, connected,

token: state.Auth.get('token'), 
user: state.Auth.get('user'),
user_type: state.Auth.get('user_type'),
childrens:state.Auth.get('childrens'),
class:state.Auth.get('class')
};
}

const {login, getUserDetails} = authActions;
//SECOND var is actions to connected to the component PROPS
export default connect(mapStateToProps, {
login, getUserDetails
})(SigninPage);