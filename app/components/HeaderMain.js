import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {AsyncStorage, StyleSheet, View, TextInput, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function HeaderMain(nav, changeSearch, toggleAccMdl=null, showUser=true){
  logOut = ()=>{
    AsyncStorage.multiRemove(['session_id', 'user']).then(()=>{
      nav.navigate('SignedOut'); 
    })
  }
  
  return {
    title: nav.state.routeName,
    headerTitle: 
    <View style={styles.searchSection}>
        {/* <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#ddd"/> */}
        <Icon style={styles.searchIcon} name="search" size={17} color="#ddd"/>
        <TextInput style={styles.input} placeholder="Rechercher" 
        //   onChangeText={changeSearch}
          underlineColorAndroid="transparent"
        />
    </View>,
    headerRight: (
      <Icon 
        //onPress={()=>toggleAccMdl()} 
        name="bell-o" color='black' size={20} style={{marginRight: 20}}/>
    ), 

    headerLeft: (showUser) && ( 
      <View style={styles.wrapImgUser}>
        {nav.state.params && nav.state.params.imageurl ?
          <Image source={{uri: (nav.state.params.imageurl)}} style={styles.imgUser} />:
<Image source={require('../assets/imgs/profile.png')} style={styles.imgUser} />        }
      </View>
    ),
 
    headerStyle: {
      backgroundColor: '#1b59a2',
    }, 
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    }, 
  };
}

const styles = StyleSheet.create({
  wrapImgUser: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff', 
    overflow: 'hidden',
    marginLeft: 10, 
  },
  imgUser: {
    width: 30, height: 30,
  },

  searchSection: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 3
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
    borderRadius: 3
  },
});