import React,{useState} from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import { AddImage, InputField, InputWrapper,ImageWrapper } from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import {Ionicons,MaterialCommunityIcons,FontAwesome} from "@expo/vector-icons";
import { Button, Snackbar } from 'react-native-paper';
 import * as ImagePicker from 'expo-image-picker';
// import { ImagePicker, Permissions } from 'expo';
import {add_post,delete_post} from '../redux/posts/actionCreators';
import {useSelector,useDispatch,connect} from 'react-redux';
import Home from './Home';
import PostCard from '../components/PostCard';
import RNPickerSelect from 'react-native-picker-select';

class AddPostScreen extends React.Component{

    constructor (props){
        super(props);
        const { dispatch } = props;
        this.state={
            image:null,
            content:"",
            visible:false,
            newPost:[],
            Posts:[],
            category:''

        }
    }
   
    async componentDidMount(){
      
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                  alert('Sorry, we need camera roll permissions to make this work!');
                }
              }
        
    }
    sendData= ()=>{
      this.createPost()
       fetch("http://192.168.1.8:5050/posts/create", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: 'title',
        content: this.state.content,
        media:this.state.image,
        category:this.state.category
      })
    })
      .then(response => response.json())
      
      .then(response => {
        console.log(response)
      })
      .catch(error => alert("Error " + error))

    this.IsVisible();
    }
    createPost=()=>{
      var obj={'content':this.state.content,'image':this.state.image}
     this.setState({
       newPost:obj
     })
 this.props.add(this.state.newPost)
 
   }
    ///////////////////////////

  
     pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result.uri.replace("file:///","file:/"));
        const blob = await result.uri.replace("file:///","file:/");

        if (!result.cancelled) {
            this.setState({
                image:blob
            })
        }
      };
      TakePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({
                image:result.uri
            })
        }
      };
    IsVisible(){
        this.setState({
            visible:true
        })
      console.log('this is the image'+this.state.image);
    }
     onDismissSnackBar = () => 

     {this.setState({visible:false})};

render(){
    return(
        <View style={styles.container}>
          <InputWrapper style={{padding:10}}>
          {this.state.image!=null? 
          <AddImage  source={{uri:this.state.image}} />:null
          }
        <InputField
        placeholder="What's on your mind ? "
        multiline
        numberOfLines={4}
        // onChangeText={(value)=>dispatch(add_content(value)),
        //     console.log(content)

        // }
        onChangeText={(value)=>this.setState({content:value})}
        value={this.state.content}
        />
        {console.log(this.state.content)}
        {/* onPress={()=>(value)=>dispatch(add_content(value)), */}
        {/* <PostCard content={this.state.content}/> */}
        <RNPickerSelect

onValueChange={(value) => this.setState({category:value})}
items={[
    { label: 'Food', value: 'Food' },
    { label: 'Clothes', value: 'Clothes' },
    { label: 'Blood donation', value: 'Blood donation' },
    { label: 'Educational', value: 'Educational' },
    { label: 'Environment', value: 'Environment' },
    { label: 'Other', value: 'Other' },



]}
value={this.state.category}
placeholder={{label:'Select category', value:this.state.category==''?'Select a cateory': this.state.category}}
/>
          <Button  style={{marginTop:20,width:102,alignSelf:'center',borderColor:'#1b59a2',borderWidth:1}}  mode="outlined"  onPress={()=>this.sendData()} color="#1b59a2">
            Post
         </Button>
         
          </InputWrapper>
          <ActionButton  buttonColor="rgba(231,76,60,1)" >

              <ActionButton.Item
              buttonColor="#9b59b6"
              title='Take a photo'
              onPress={()=>this.TakePhoto()}
              >
              {/* <Ionicons name="camera-outline" size={24} color="black" />   */}
              <MaterialCommunityIcons name="camera-outline" size={18} color="white" />
              </ActionButton.Item>

              <ActionButton.Item
              buttonColor="#3498db"
              title='Choose a photo'
              onPress={()=>this.pickImage()}>

                  <FontAwesome name="photo" size={18} color="white" />


              </ActionButton.Item>

          </ActionButton>
          <Snackbar
        visible={this.state.visible}
        onDismiss={()=>this.onDismissSnackBar()}
        action={{
          label: 'Good',
          onPress: () => {
            console.log('everything is good')
          },
        }}>
        Post added
      </Snackbar>

        </View>
    )

}
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    }
})
const mapStateToProps=(state)=>{
  return{
    Posts:state.Post_Reducer.Posts
  }

}
const MapDispatchToProps=(dispatch)=>{
  return {
    add:(post)=>dispatch(add_post(post))
  }

}

// const MapDispatchToProps=(state)=>{
//   return {
//     delete:(id)=>dispatch(delete_post(id))
//   }

// }
export default connect(mapStateToProps,MapDispatchToProps)(AddPostScreen);