import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUpload(){
    const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View>
      <View style={styles.view}>
          {image && <Image source={{ uri: image }} style={styles.img} />}
        </View>
        <View style={styles.btn}>
            <Text onPress={pickImage} style={{color:"white"}} > Choisissez un avatar</Text>
        </View>   
    </View>
  );
}

const styles = StyleSheet.create({
    img : {
        
        width: 90,
        height: 90,
        padding: 3,
        borderRadius: 80,
        //marginBottom: 19,
        marginTop:1,

    },
   
      view:{
           flex: 1,
         flexDirection: 'row',
        //marginHorizontal:55,
        alignItems:"center",
        justifyContent:"center",
        //marginTop:16,
      },
      btn:{
        alignItems:"center",
        //justifyContent:"center",

        backgroundColor:"#98c1d9",
        borderWidth:2,
        marginTop:15,
        //marginBottom:1,
       // paddingHorizontal:1,
       marginHorizontal:100,
        paddingVertical:10,
        borderRadius:23,
        borderColor:'#1b59a2',
      }
})