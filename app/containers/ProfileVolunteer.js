import React, { useState } from "react";
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ToastAndroid,
  
} from "react-native";
//import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MdCom from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  TouchableRipple,Button
} from 'react-native-paper';

const UserProfileScreen2 = () => {
  
  //const [data, setData] = React.useState(null);

  

  const [shouldShowPosts, setShouldShowPosts] = useState(true);
 
  const [clicked, setClicked] = useState(true);
  const onPressHandler = () => {
    setClicked(!clicked)
    setClicked2(true)
  }

  const [address, changeAddress] = useState(null);
  const [nom, changeName] = useState(null);
  const [tel, changePhone] = useState(null);
  const [email, changeEmail] = useState(null);
  const [password, changePassword] = useState(null);
  const [password2, changePassword2] = useState(null);
  const [password3, changePassword3] = useState(null);

  
  
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  
  
  //==================

  const [volunteerName, setVolunteerName] = useState(null);
  const [volunteerAddress, setVolunteerAddress] = useState(null);
  const [volunteerEmail, setVolunteerEmail] = useState(null);
  const [volunteerPhone, setVolunteerPhone] = useState(null);
  const [volunteerPassword, setVolunteerPassword] = useState(null);
  
  
  const id="606745d5f2f72552140d5743" //id of the logged in user
  const ip="0.0.0.0" //ip adrs of the server 
  
  React.useEffect(() => {
    fetch(`http://${ip}:5050/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVolunteerEmail(data.email)
        setVolunteerAddress(data.addresse)
        setVolunteerPassword(data.pass)
        setVolunteerPhone(data.mobile)
        setVolunteerName(data.name)

      })
      .catch(err => {
				ToastAndroid.show(err.message, ToastAndroid.SHORT);
			})
   
      .catch(err => {
				ToastAndroid.show(err.message, ToastAndroid.SHORT);
			});

      
  }, [])
  
  

 
  
  const [clicked2, setClicked2] = useState(false);
  
  const deleteUser = () =>{
    Alert.alert('Warning','Êtes-vous sûr de vouloir supprimer votre compte ?',[
        {
          text:'Annuler',
          onPress:()=> console.warn('Cancel Pressed!')
        },
        {
          text:'Oui',
          onPress:()=> {console.warn('OK Pressed!')
          fetch(`http://${ip}:5050/users/${id}`, { method: 'DELETE' })}
          //redirection vers le screen du login
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.warn('Alert dismissed!')
      })
    
  }

  const onSubmitEdit = () => {
    
    
      if(showPasswordInput)
      { 
        if(password3==null){
        ToastAndroid.showWithGravity(
          "Entrez votre mot de passe s'il vous plaît",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        )
        }
        else{

          if(volunteerPassword===password3){

            if(address!=null){
              fetch(`http://${ip}:5050/users/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({
              addresse: address
              }),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())
              .then(json => console.log(json))
              setVolunteerAddress(address)
            }

            if(email!=null){
              
              fetch(`http://${ip}:5050/users/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({
              email: email
              }),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())
              .then(json => console.log(json))
              setVolunteerEmail(email)
            
            }


            if(nom!=null){
              fetch(`http://${ip}:5050/users/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({
              name: nom
              }),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())
              .then(json => console.log(json))
              setVolunteerName(nom)
            }
            if(tel!=null){
              fetch(`http://${ip}:5050/users/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({
              mobile: tel
              }),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())
              .then(json => console.log(json))
              setVolunteerPhone(tel)
            }
           if(password!=null)
            { if (password===password2){
              fetch(`http://${ip}:5050/users/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({
              pass: password
              }),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())
              .then(json => console.log(json))
              setVolunteerPassword(password)

            }
              else Alert.alert('Warning','Confirmation du mot de passe incorrecte.')
            }
              
            setClicked2(false)
            setClicked(true)
        }
        else{
          setClicked2(false)
          Alert.alert('Warning','Mot de Passe Incorrecte')
          setClicked(true)
        }

        }
        }
      else{
        setClicked2(false)
        ToastAndroid.showWithGravity(
          "Aucun changement n'a été effectué",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        )
        setClicked(true)
      }
    
    
  }
  return (
    <SafeAreaView style={styles.container}>

            {clicked2?
            <ScrollView  >
            <View style={styles.container2} >
                  <Text style={{
                    fontSize:40,
                    color:"#1b59a2",
                    alignSelf:"center",
                    marginTop:10,
                  }} >
                    Modifier votre profil</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}} >


            <KeyboardAvoidingView style={styles.searchSection} behavior="padding" enabled >
              <MdCom style={styles.searchIcon} name="account" size={20} color="#ddd"/>
                <TextInput style={styles.input} 
                  defaultValue={volunteerName}
                  onChangeText={changeName}
                  onEndEditing={() => setShowPasswordInput(true)}
                  placeholder="Nom"  returnKeyType='next' autoCorrect={false}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView>

              <KeyboardAvoidingView style={styles.searchSection} behavior="padding" enabled >
              <MdCom style={styles.searchIcon} name="email-outline" size={20} color="#ddd"/>
                <TextInput style={styles.input} 
                  defaultValue={volunteerEmail}
                  onChangeText={changeEmail}
                  onEndEditing={() => setShowPasswordInput(true)}
                  placeholder="Email"  returnKeyType='next' autoCorrect={false}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView>

              <KeyboardAvoidingView style={styles.searchSection} behavior="padding" enabled >
              <MdCom style={styles.searchIcon} name="phone" size={20} color="#ddd"/>
                <TextInput style={styles.input} 
                  defaultValue={volunteerPhone}
                  onChangeText={changePhone}
                  onEndEditing={() => setShowPasswordInput(true)}
                  placeholder="Telephone"  returnKeyType='next' autoCorrect={false}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView>

              <KeyboardAvoidingView style={styles.searchSection} behavior="padding" enabled >
              <MdCom style={styles.searchIcon} name="map-marker" size={20} color="#ddd"/>
                <TextInput style={styles.input} 
                  defaultValue={volunteerAddress}
                  onChangeText={changeAddress}
                  onEndEditing={() => setShowPasswordInput(true)}
                  placeholder="Adresse"  returnKeyType='next' autoCorrect={false}
                  underlineColorAndroid="transparent"
                  
                />
              </KeyboardAvoidingView>

              {showPasswordInput? <KeyboardAvoidingView style={styles.searchSection}behavior="padding" enabled>
              <MdCom style={styles.searchIcon} name="lock-outline" size={20} color="#ddd"/>
                <TextInput style={styles.input} secureTextEntry={true} 
                  placeholder="ancien mot de passe" returnKeyType='done' autoCorrect={false}
                  onChangeText={changePassword3}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView> : null}

              <KeyboardAvoidingView style={styles.searchSection}behavior="padding" enabled>
              <MdCom style={styles.searchIcon} name="lock-outline" size={20} color="#ddd"/>
                <TextInput style={styles.input} secureTextEntry={true} 
                  placeholder="Nouveau mot de passe" returnKeyType='done' autoCorrect={false}
                  onChangeText={changePassword}
                  onEndEditing={() => {setShowPasswordInput(true)
                  setShowPasswordConfirmation(true)
                  }}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView>

              {showPasswordConfirmation? <KeyboardAvoidingView style={styles.searchSection}behavior="padding" enabled>
              <MdCom style={styles.searchIcon} name="lock-outline" size={20} color="#ddd"/>
                <TextInput style={styles.input} secureTextEntry={true} 
                  placeholder="Confirmez votre nouveau mot de passe" returnKeyType='done' autoCorrect={false}
                  onChangeText={changePassword2}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView> : null}

              <View style={{flexDirection:'row', marginTop:7}} >

                          <Button onPress={onSubmitEdit}
                          color="#1589b7" mode="outlined" style={{marginVertical:10, borderRadius:30, marginRight:45}}>
                                  Submit
                          </Button>

                          

                          <Button onPress={() =>{
                            setClicked2(false)
                            setClicked(true)
                            setShowPasswordInput(false)
                            setShowPasswordConfirmation(false)
                          }} color="#1589b7" mode="outlined" style={{marginVertical:10, borderRadius:30}}>
                                  Cancel
                          </Button>
              </View>

              <Button onPress={deleteUser}color="red" mode="outlined" style={{marginVertical:10, borderRadius:30}}>
                                  Supprimez votre compte
              </Button>

            </View>
          
            
            
              </View>
            </ScrollView>
            :null}
            {clicked? <ScrollView showsVerticalScrollIndicator={false}>
                

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require('../assets/imgs/user.png')} style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36, marginBottom:10 }]}>{volunteerName}</Text>
                    <View style={styles.row}>
                      <Icon name="map-marker-radius" color="#777777" size={20}/>
                      <Text style={{color:"#777777", marginLeft: 10}}>{volunteerAddress}</Text>
                    </View>

                    <View style={styles.row}>
                      <Icon name="phone" color="#777777" size={20}/>
                      <Text style={{color:"#777777", marginLeft: 10}}>+216 {volunteerPhone}</Text>
                    </View>

                    <View style={styles.row}>
                      <Icon name="email" color="#777777" size={20}/>
                      <Text style={{color:"#777777", marginLeft: 10}}>{volunteerEmail}</Text>
                    </View>


                <TouchableRipple onPress={onPressHandler}>
                      <Button color="#1589b7" mode="contained" style={{marginVertical:10}}>
                      Modifier votre profil
                      </Button>
                </TouchableRipple>

                </View>

                

                <View style={styles.statsContainer}>
                    
                    {/* Posts */}
                    <View style={styles.statsBox}
                    onStartShouldSetResponder={() => {
                      setShouldShowPosts(true)
                      setShouldShowEvents(false)
                      
                    }}
                    >
                        <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
                        <Text style={[styles.text, styles.subText]}>Publications</Text>
                    </View>

                    
                </View>

               {shouldShowPosts? ( <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/imgs/post.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/imgs/post.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/imgs/post.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    
                </View>): null}

     
                
            </ScrollView>:null}
        </SafeAreaView>
  );
};

export default UserProfileScreen2;

const styles = StyleSheet.create({
  container2: {
    // paddingTop:10,
     marginHorizontal:20,
    marginVertical:110,
     flexDirection: "column",  
     //height:10,
     borderWidth: 0,
     borderRadius:20,
     backgroundColor:"white",
   },
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  userName:{
    marginVertical:19,
    fontSize:13,
    color: "#16425b"
  },
  rowFollower:{
    flexDirection: 'row',

  },

  btn3:{
    marginHorizontal:30,
    marginVertical:10,
  },

  btnf:{
      marginVertical:10,
      marginLeft:120,
      
  },

  profileImageSmall:{
    width: 50,
      height: 50,
      borderRadius: 100,
      overflow: "hidden",
      marginVertical:1,
      marginHorizontal:16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  text: {
      // fontFamily: "HelveticaNeue",
      color: "#52575D",
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 2,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      overflow: "hidden",
      marginTop:30,
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
 
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 1
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 20
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 20,
      marginBottom: 1,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
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
});