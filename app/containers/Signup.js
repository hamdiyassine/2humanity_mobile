import React, { Component } from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/auth/actions';

import {StyleSheet, View, Text, TextInput, ActivityIndicator, ScrollView,
  CheckBox, ToastAndroid, ImageBackground
} from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome'; 
import MdCom from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageUpload from './ImageUpload';
// import MdIcon from 'react-native-vector-icons/MaterialIcons'


class SignupPage extends Component{
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Inscription gratuite", headerTitle: "Inscription gratuite",
      headerStyle: { backgroundColor: '#1b59a2'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  }

  state={
    loading: false,
    checked: false,

    name: '',
    email: '',
    phone: '',
    pass: '',
    repass: '',
    address: '',
  }

  signup = ()=>{ 
    if(!this.state.loading){
      const msg = this.checkData();
      if(msg != '') ToastAndroid.showWithGravity(
        msg, ToastAndroid.LONG, ToastAndroid.BOTTOM,
      )
      else{
        this.setState({loading: true});
        userSrv.signup({
         // birthdate: "",
          email: this.state.email,
          name: this.state.name,
          password: this.state.pass,
          phone: "216" + this.state.phone ,
          address: this.state.address
        }).then(ret=>{
          this.setState({loading: false});
          console.log('RET SIGNUP', ret);
          // if(ret.status){
          //  this.props.navigation.navigate('SignedIn');
          //   const events = this.state.events;
          //   events[indx]['is_participated']= true;
          //   this.setState({events});
          // } 

          // RET :
          // token: ""
          // user: {id: "8c051694-1501-42f0-8a70-fc6b39cc3228", username: "name", email: "email@test.com",…}
          // email: "email@test.com"
          // id: "8c051694-1501-42f0-8a70-fc6b39cc3228"
          // profile: {id: "9deecf1f-d011-45ad-81ea-8c78e9a6975c", first_name: "test", last_name: "test2", sexe: "",…}
          // roles: ["ROLE_USER"]
          // username: "name"
        })
      }
    }
    
    // if(!this.state.loading && this.state.username!='' && this.state.pass!='')
    // this.props.login({username: this.state.username, password: this.state.pass});
  }

  checkData=()=>{
    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(this.state.name=='') return "Le nom d'utilisateur est obligatoire";
    else if(this.state.lastName=='') return 'Le nom est obligatoire';
    else if((this.state.phone=='')||(this.state.phone.length!=8)) return "Numéro de téléphone invalide";
    else if (this.state.checked){
    if(this.state.email=='') return "L'email est obligatoire";
    else if((!reg.test(this.state.email))&&(this.state.email!='')) return "email invalide";
    else if(this.state.pass=='') return "Le mot de passe est obligatoire";
    else if(this.state.repass!=this.state.pass) return "Mot de passe non confirmé";
   }
     return ''
  }

  goToSignin = ()=>{
    const { navigate } = this.props.navigation;
    navigate("Login", {})
  }

  changeName=(txt) => this.setState({name: txt}); 
  changeEmail=(txt)     => this.setState({email:    txt}); 
  changePhone=(txt)     => this.setState({phone: txt}); 
  changePass=(txt)      => this.setState({pass:     txt});
  changeRepass=(txt)    => this.setState({repass:   txt});
  changeAddress=(txt)    => this.setState({address:   txt});
  changeTerms=(checked) => this.setState({checked})
  // toggleTerms=(checked)=>{console.log('checked', checked); this.setState((prev)=>({terms: !prev.terms}))};


  // componentWillReceiveProps(nextProps){
    
  // }
  render(){
    const {checked } = this.state
    return(
      <ImageBackground source={require('../assets/imgs/bg4.jpg')} style={styles.image}>
      <ScrollView>
      {/* <View style={{alignItems: 'center', justifyContent: 'center'}} >
        <Image source={require('../assets/imgs/logo2.png')}  style={{
          width: 200, height: 150,
          marginTop: 50, marginBottom: 50
        }}/> 
      </View> */}
      <View style={styles.container} >

        <Text style={{
          fontSize:40,
          color:"#1b59a2",
          alignSelf:"center"
        }} >
          Inscription</Text>
        
        <View style={{...styles.searchSection, borderWidth: 0}}>
            <CheckBox value={this.state.checked} onValueChange={this.changeTerms}  tintColors={{ true: "#1b59a2"}} />
            <Text style={styles.input}> Nous sommes une association </Text>
          </View> 

        <View style={{alignItems: 'center', justifyContent: 'center'}} >
          
          <View style={styles.searchSection}>
            <MdCom style={styles.searchIcon} name="account" size={20} color="#ddd"/>
            <TextInput style={styles.input} value={this.state.lastName}
              placeholder="Nom" onChangeText={this.changeName}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.searchSection}>
            <MdCom style={styles.searchIcon} name="phone" size={20} color="#ddd"/>
            <TextInput type="number" style={styles.input} value={this.state.phone}
              placeholder="Téléphone" onChangeText={this.changePhone}
              underlineColorAndroid="transparent" keyboardType = 'numeric'
            />
          </View>

          {checked && <View style={styles.searchSection}>
            <MdCom style={styles.searchIcon} name="email-outline" size={20} color="#ddd"/>
            <TextInput style={styles.input} value={this.state.email}
              placeholder="Email" onChangeText={this.changeEmail}
              underlineColorAndroid="transparent" autoCompleteType="email"
            />
          </View>}

          {checked && <View style={styles.searchSection}>
            <MdCom style={styles.searchIcon} name="map-marker" size={20} color="#ddd"/>
            <TextInput style={styles.input}  value={this.state.address}
              placeholder="Address" onChangeText={this.changeAddress} 
              underlineColorAndroid="transparent"
            />
          </View>}
          
          {checked && <View style={styles.searchSection}>
            <MdCom style={styles.searchIcon} name="lock-outline" size={20} color="#ddd"/>
            <TextInput style={styles.input} secureTextEntry={true} value={this.state.pass}
              placeholder="Mot de passe" onChangeText={this.changePass} 
              underlineColorAndroid="transparent"
            />
          </View>}

          {checked && <View style={styles.searchSection}>
            <MdCom style={styles.searchIcon} name="lock-outline" size={20} color="#ddd"/>
            <TextInput style={styles.input} secureTextEntry={true} value={this.state.repass}
              placeholder="Confirmer le mot de passe" onChangeText={this.changeRepass} 
              underlineColorAndroid="transparent"
            />
          </View>}

          

          {/* <ImageUpload style={styles.searchSection}/> */}
          <ImageUpload></ImageUpload>


          
        </View>
        
        {/* <View style={{marginLeft: 20, marginRight: 20}}>
          <Button loading={true} loadingRight={true} color='#1589b7' style={{padding: 10, fontWeight: 'normal'}} title="SE CONNECTER"/>
        </View> */}
        
        <View onTouchEnd={this.signup} style={{
      
          alignItems:"center",
          justifyContent:"center",
        // marginTop:1,
          backgroundColor:"#1b59a2",
          paddingVertical:10,
          marginHorizontal:30,
          borderRadius:23,
        }}
        >
          {/* <TouchableOpacity onPress={this.login} style={{justifyContent: 'center', alignItems: 'center'}} > */}
            {(this.state.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#fff" /> }
            <Text style={{
              color: '#fff',
              textAlign: 'center'
              }}>S'INSCRIRE</Text>
          {/* </TouchableOpacity>  */}
        </View>
        <View onTouchEnd={this.goToSignin} style={{padding: 10, borderRadius: 3,  backgroundColor: 'transparent', marginBottom: 20,
          flexDirection:"row", alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 20}}
        >
          {/* <TouchableOpacity onPress={this.login} style={{justifyContent: 'center', alignItems: 'center'}} > */}
            {(this.state.loading) && <ActivityIndicator style={{paddingRight: 5}} size="small" color="#1b59a2" /> }
            <Text style={{color: '#1b59a2', textAlign: 'center', }}>SE CONNECTER</Text>
          {/* </TouchableOpacity>  */}
        </View>


      </View>
      
     
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   // justifyContent: 'center'
  // },

  searchSection: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    // borderRadius:  30,
    // marginBottom: 20,
    // marginRight: 20,
    // marginLeft: 20,
    // borderWidth: 2,
    // borderColor: '#1b59a2',
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
    paddingLeft: 1,
    backgroundColor: 'transparent',
    color: '#424242',
    borderRadius: 3
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    paddingTop:10,
    marginHorizontal:20,
   marginVertical:100,
    flexDirection: "column",  
    //height:10,
    borderWidth: 0,
    borderRadius:20,
    backgroundColor:"white",
  },
});

//convert PART of state in STORE to the component PROPS
function mapStateToProps(state) {
  const { loading, connected } = state.Auth.toJS();

  return {
    loading, connected
  };
}

const {login} = authActions;
//SECOND var is actions to connected to the component PROPS
export default connect(mapStateToProps, {
  login
})(SignupPage);