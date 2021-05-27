import React, { Component } from 'react';
import {StyleSheet, View, Image, Alert, Dimensions, 
  TouchableOpacity, TextInput, ScrollView, Text, ToastAndroid, ActivityIndicator 
} from 'react-native';
import postActions from '../redux/posts/actions';
import { connect } from 'react-redux';
import authActions from '../redux/auth/actions';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome'; 
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
// import ImagePicker from 'react-native-image-picker';
import { Button } from 'react-native-paper';
class AddEventPage extends Component{
  static navigationOptions =  ({ navigation }) => { 
    // const {params = {}} = navigation.state;

    return {
      title: "Créer un évènnement ", headerTitle: "Créer un évènnement",
      headerStyle: { backgroundColor: '#1b59a2'}, 
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    //   headerRight: (
    //     <Text onPress={navigation.getParam('addPost')} style={{...styles.post,marginLeft:-10}}>Poster</Text>
    //   ), 
    }; 
  }

  componentDidMount() {
    //this.props.navigation.setParams({ addPost: this.addPost });
    this.getPermissionAsync();
    this.setState({imgWidth: (Dimensions.get('window').width) -10}) 
  }

  getPermissionAsync = async () => {
    console.log('======>',Constants.platform.ios);
    console.log('======================V',await Permissions.askAsync(Permissions.CAMERA_ROLL));
    
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    } 

  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,  

      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1  
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      // console.log(result.uri);

    }
  };


  addEvent = ()=>{ 
    // if(!this.state.loading && (this.state.title!='' && this.state.content!='')){
    //   this.setState({loading: true});
    //           // const acc = this.props.navigation.getParam("acc", {});   
    //   //  const token = this.props.token;
    //   const data = {   
    //     name: this.state.title,
    //     desc: this.state.content,
    //     cover:this.state.image, 
    //   }   
    //   fetch("http://192.168.1.8:5050/events", {
        
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },

    //     body: JSON.stringify(data)
    //   })
    //     .then(response => response.json())
        
    //     .then(response => {
    //       console.log(response)
    //     })
    //     .catch(error => alert("Error " + error))
    //   } 
    this.props.navigation.navigate('Events')
  }

  state = {
    loading: false,
    content: '',
    title:'',
    image:null,
    image_ids: [],
    imgWidth: 100,
  }

  choosePhoto = ()=>{ 
    ImagePicker.launchImageLibrary({}, resp=>{
      if(resp.uri) this.setState(prevState=>({image_ids: [...prevState.image_ids, resp]}))
    })
  }
  changeContent = (content) => this.setState({content});
  changeTitle = (title) => this.setState({title});
  rmImg=(i)=>{
    const image_ids = this.state.image;
    image_ids.splice(i, 1);
    this.setState({image_ids})
  }

  render(){
    const { navigation } = this.props;
    const user = navigation.getParam('user', {
      profile: {name: '', last_name: ''}
    });
    // console.log("user", user, navigation.getParam('token',''));
    let { image } = this.state;
    return( 


      <ScrollView>
        {(this.state.loading) && <ActivityIndicator size="large" color="#1b59a2" style={styles.loading} /> } 

        {/* { user.profile &&   */}
          {!image && <View style={styles.wrapUser}>       
           
           <View style={styles.info}>
                <Text style={styles.imgInput} >Sélect event cover </Text>
            </View>
              
            <TouchableOpacity>
            <Ionicons onPress={this._pickImage} name={'ios-images'} color={"#1b59a2"} size={40} style={styles.more} />
            </TouchableOpacity>

          </View>}

          {image && <View style={styles.imgs}>
            <View>
              <Image  source={{uri: image}} style={[styles.imgPost, {width: this.state.imgWidth}]} />
            </View>
            <View style={{position:'absolute',top:10,right:15,zIndex:10}} 
              >
              <Ionicons name="ios-remove-circle-outline"  onPress={()=>{this.setState({image:null})}}  color="rgba(231,76,60,1)" size={25}/>
            </View>

          
        </View>}



    <View style={styles.searchSection}>
    <TextInput  autoFocus={true} style={styles.input} value={this.state.title}
        placeholder="Titre de l'évènnement " onChangeText={this.changeTitle}
        underlineColorAndroid="transparent"

    />
    </View> 

    <View style={styles.searchSection}>
    <TextInput  autoFocus={true} multiline={true} numberOfLines={3} style={styles.input} value={this.state.content}
        placeholder="c'est quoi votre évènnement ?"  onChangeText={this.changeContent} underlineColorAndroid="transparent"

    />
    </View>

    <View style={styles.searchSection}>
    <TextInput  autoFocus={true} multiline={true} numberOfLines={5} style={styles.input} value={this.state.content}
        placeholder="quelle est le programme de votre évènnement ?"  onChangeText={this.changeContent} underlineColorAndroid="transparent"

    />
    </View>
    <View style={{...styles.searchSection,display:'flex',paddingBottom: 0}}>
        <View  style={{display:'flex',marginLeft:-10,paddingBottom: 20}} >
            <Ionicons name="ios-map" size={18} color="gray" style={{marginTop : 20}}/>
            <TextInput  autoFocus={true} style={{...styles.input,marginLeft:25, marginTop:-25}} value={this.state.title}
            placeholder="ajouter emplacement " 
            underlineColorAndroid="transparent"
            />
        </View>

        <View style={{borderLeftWidth: 1,  borderLeftColor: '#ddd',paddingBottom: 20 , display:'flex',paddingLeft:25,height:'100%'}}>
            <Ionicons name="ios-calendar" size={18} color="gray" style={{marginTop : 20}}/>
            <TextInput  autoFocus={true} style={{...styles.input,marginLeft:25,marginTop:-25}} value={this.state.title}
            placeholder="ajouter un date " 
            underlineColorAndroid="transparent"
            />
        </View>
    </View>

        
        

        <Button  style={{marginTop:50,width:120,alignSelf:'center',borderColor:'#1b59a2',borderWidth:1}}  mode="outlined"  onPress={()=>this.addEvent()} color="#1b59a2">
            Poster
         </Button>

      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  post:{
    marginRight: 5,
    color: "#fff", 
    fontSize: 18
  },
  imgInput : {
    color:'gray',
    fontSize: 12,
    margin : 20,
  },

  loading: {
    position: 'absolute',
    marginTop: 10,
    alignSelf: 'center',
    zIndex: 9999
  },
  input: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 3
  },

  wrapUser: {
    flexDirection:'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10 ,
    paddingLeft : 20,
    paddingRight : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  wrapImgUser: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eadbe6', 
    overflow: 'hidden',
    width: 57, height: 57,
    marginRight: 5,
  },
  imgUser: {
    width: 55, height: 55,
  },
  info: {
    flex: 1,
    minHeight: 30,
  },
  name:{
    fontWeight: 'bold',
    color: '#626262',
    fontSize: 17
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    //borderRadius: 3,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
    //borderWidth: 1,
    //borderColor: '#1b59a2',
  },
  desc:{
    maxHeight: 18,
    overflow: 'hidden',
    fontSize: 12
  },
  time:{
    color: '#a2a2a2'
  },
  more: { paddingLeft: 5, paddingRight: 5 },


  // input:{
  //   alignSelf: 'center',
  //   width:300, height:40,
  //   marginTop: 10,
  //   borderTopWidth: 1,
  //   borderBottomWidth: 1,
  //   borderColor: "#bbb"
  // },
  imgs:{
    flex: 1, flexDirection: 'row', flexWrap: 'wrap',
  },
  imgWrap:{

  },
  imgPost:{
    height: 120,
    marginTop: 2,
    marginRight: 5,
    marginLeft:5,
    marginBottom: 10
  },
  trash:{
    width: 33,
    height: 33,
    // paddingTop: 3,
    // marginTop: -3,
    backgroundColor: "#00000059",
    borderRadius: 50,
    position: 'absolute',
    zIndex: 9999,
    alignSelf: "flex-end",
  }
});
//convert PART of state in STORE to the component PROPS
function mapStateToProps(state) {
//   const { posts, countPosts, loading, refreshing } = state.Posts.toJS();

  return {
    state
  }; 
}

// const {getPosts, refreshPosts, clearPosts, likePost, getPostComments, deleteComment,
//   addComment
// } = postActions;
const {initAuth} = authActions;
//SECOND var is actions to connected to the component PROPS
export default connect(mapStateToProps, {
//   getPosts, refreshPosts, clearPosts, likePost, getPostComments, deleteComment, addComment,
//   initAuth
})(AddEventPage);