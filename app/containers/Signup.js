import React, { Component , useState, useEffect } from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/auth/actions';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet, View, Text, TextInput, ActivityIndicator, ScrollView,
  CheckBox, ToastAndroid, ImageBackground, Image, TouchableHighlight, Pressable
} from 'react-native';

//import ImagePicker from 'react-native-image-picker'

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome'; 
import MdCom from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageUpload from './ImageUpload';
//import ImageUpload from './ImageUpload';
// import MdIcon from 'react-native-vector-icons/MaterialIcons'

//const [image, setImage] = useState(null);



class SignupPage extends Component{

  constructor(props) {
    super(props);
    //this.state = { color: null };
}
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
    checked2: false,
    pressStatus1: false,
    pressStatus2: false,
    pressStatus3: false,
    pressStatus4: false,
    pressStatus5: false,
    pressStatus6: false,
    pressStatus7: false,
    pressStatus8: false,
    pressStatus9: false,
    pressStatus10: false,
    pressStatus11: false,
    image: null,
    category:'',
    name: '',
    email: '',
    phone: '',
    pass: '',
    repass: '',
    address: '',
    type:'volunteer',
  }

  // _onHideUnderlay(pressStatus2){
  //   this.setState({ pressStatus2: true });
  // }
  // _onShowUnderlay(){
  //   this.setState({ pressStatus2: true });
  // }

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
          image: this.state.image,
          email: this.state.email,
          name: this.state.name,
          password: this.state.pass,
          phone: "216" + this.state.phone ,
          address: this.state.address,
          type: this.state.type,
          category: this.state.category
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
  changeTerms=(checked) => this.setState({checked});
  changeType=() => { if (checked) this.setState({type : "association"})};
  changeCheck=(checked2) => this.setState({checked2})
  changeAvatar=(txt) => this.setState({image : txt})
  // toggleTerms=(checked)=>{console.log('checked', checked); this.setState((prev)=>({terms: !prev.terms}))};


  // componentWillReceiveProps(nextProps){
    
  // }

  

  

  render(){

    const {checked } = this.state
    const {checked2 } = this.state
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

          {!checked && <View style={{...styles.searchSection, borderWidth: 0}}>
            <CheckBox value={this.state.checked2} onValueChange={this.changeCheck}  tintColors={{ true: "#1b59a2"}} />
            <Text style={styles.input}> Choisissez un avatar </Text>
          </View> }

          {/* <ImageUpload></ImageUpload> */}
          {checked2 && !checked && <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        
                       

                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922566.png')
                                  this.setState({pressStatus1 : true,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus1 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                          <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922566.png'}} style={styles.image} resizeMode="cover"></Image>

                        </TouchableHighlight>
                        


                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922506.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : true,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus2 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922506.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>



                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922524.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : true,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus3 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922524.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>


                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922686.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : true,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus4 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922686.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>


                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://img-premium.flaticon.com/png/512/2922/2922572.png?token=exp=1622136308~hmac=e532b9dc89e2ab525fe5da7a05cd46bf')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : true,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus5 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922572.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>

                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922511.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : true,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus6 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922511.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>

                        
                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922580.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : true,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus7 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922580.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>

                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922580.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : true,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus8 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922649.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>

                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922761.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : true,
                                    pressStatus10 : false,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus9 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922761.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>


                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922591.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : true,
                                    pressStatus11 : false,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus10 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922591.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>

                        <TouchableHighlight
                                onPress={()=>{
                                  this.changeAvatar('https://image.flaticon.com/icons/png/512/2922/2922712.png')
                                  this.setState({pressStatus1 : false,
                                    pressStatus2 : false,
                                    pressStatus3 : false,
                                    pressStatus4 : false,
                                    pressStatus5 : false,
                                    pressStatus6 : false,
                                    pressStatus7 : false,
                                    pressStatus8 : false,
                                    pressStatus9 : false,
                                    pressStatus10 : false,
                                    pressStatus11 : true,
                                  })
                                }}
                                underlayColor={"#1b59a2"}
                                activeOpacity={1}
                                style={this.state.pressStatus11 ? styles.mediaImageContainerPressed : styles.mediaImageContainer}
                                //onHideUnderlay={styles.mediaImageContainerPressed}
                                //onShowUnderlay={styles.mediaImageContainerPressed}
                        >
                            <Image source={{ uri :'https://image.flaticon.com/icons/png/512/2922/2922712.png'}} style={styles.image} resizeMode="cover"></Image>
                        </TouchableHighlight>
                    </ScrollView>
                    
          </View>}

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

          

          {checked && <RNPickerSelect style={styles.category}
          
          onValueChange={(value) => this.setState({category:value})}
          items={[
            { label: 'Food', value: 'Food' },
            { label: 'Clothes', value: 'Clothes' },
            { label: 'Blood donation', value: 'Blood donation' },
            { label: 'Educational', value: 'Educational' },
            { label: 'Other', value: 'Other'},
          ]}
          pickerProps={{ style: { 
            height: 70,
            width:290,
            overflow: 'hidden',
            marginHorizontal:40,
           
        
            borderRadius:23,
          }}}
          value={this.state.category}
          placeholder={{label:'Selectionnez une categorie', value:this.state.category==''?'Selectionnez une categorie': this.state.category}}
          />
          
            
        }
          


          
        </View>
        
        {/* <View style={{marginLeft: 20, marginRight: 20}}>
          <Button loading={true} loadingRight={true} color='#1589b7' style={{padding: 10, fontWeight: 'normal'}} title="SE CONNECTER"/>
        </View> */}
        
        <View onTouchEnd={this.signup} style={{
      
          alignItems:"center",
          justifyContent:"center",
        marginTop:15,
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
  mediaImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
},
mediaImageContainerPressed: {
  width: 100,
  height: 100,
  borderRadius: 12,
  borderColor:"#1b59a2",
  borderWidth:6,
  overflow: "hidden",
  marginHorizontal: 10
},

category: {
 
  //alignItems:"center",
  marginHorizontal:30,
  borderWidth:2,
  borderColor:'#1b59a2',
  borderRadius:23,
  marginTop:15,
  width:290,
  height:40,
  //paddingHorizontal:10,
  //paddingVertical:2,
  
  
},

  searchSection: {
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
    justifyContent: "center",
    borderWidth: 0,
    borderRadius:20,
    backgroundColor:"white",
  },
  // view:{
  //   //   flex: 1,
  //   // flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginHorizontal:55,
  //   alignItems:"center",
  //   justifyContent:"center",
  //   marginTop:16,
  // },
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