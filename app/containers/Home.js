
import React from 'react';
import {View,Text,StyleSheet,FlatList,RefreshControl,Modal,Alert,Pressable,Dimensions} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import PostCard from '../components/PostCard';
import { ScrollView } from 'react-native-gesture-handler';
import {Container,Card,UserImg,UserInfo,Interaction,InteractionWrapper,InteractionText, UserName,PostImg, UserInfoText,PostTime,PostText, Divider} from '../styles/FeedStyles';
import AddPostScreen from './AddPostScreen';
import {connect} from 'react-redux';
 class Home extends React.Component{

  constructor(props){
    super(props);
    this.hideModal = this.hideModal.bind(this);

    this.state={
      Posts:[],
      refreshing:false,
      modalVisible: false,
      
    }
  }
   componentDidMount(){
    this.getData();
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetch("http://192.168.1.8:5050/posts/getAll", { 
      method: "GET", 
    })
   
    .then(response => response.json())
   .then((json)=>this.setState({Posts:json}))
   .then(() => {
    this.setState({refreshing: false});
  })
   .catch(error => alert("Error " + error))

  }
  getData= ()=>{
     fetch("http://192.168.1.8:5050/posts/getAll", {
   method: "GET",
 })
   .then(response => response.json())
   .then((json)=>this.setState({Posts:json}))

    .catch(error => alert("Error " + error))
 }

 hideModal=()=>{
  this.setModalVisible(false);
 }
  render(){
    const { modalVisible } = this.state;

  return (
    <ScrollView>
    <ScrollView
    contentContainerStyle={{flex:1}} 

    refreshControl={
      <RefreshControl
        
        refreshing={this.state.refreshing}
        onRefresh={()=>this._onRefresh()}
        
      />
    }
    >

  <View style={{justifyContent:'flex-end'}}>
    <IconButton icon='refresh' size={20} color='#1b59a2'onPress={()=>this._onRefresh()}/>
       <Card >

<Text style={{color:'grey',padding:15,textAlign:'center'}}>Want to share something?</Text>
<Button   style={{width:120,alignSelf:'center'}} labelStyle={{fontSize:12}} icon="plus" mode="contained" onPress={()=> this.setModalVisible(true)} color="rgba(231,76,60,1)">
    Add a post
  </Button>
       </Card>
       </View>
       </ScrollView>

     <FlatList 
     
     data={this.state.Posts}
     renderItem={({item})=>
     <PostCard allPosts={this.state.Posts} content={item.content} image={item.media} user={item.postedBy} date={item.createdAt} id={item._id}/>}
    keyExtractor={item=>item.id}
    showsVerticalScrollIndicator={false}
/>
{console.log("POSTS ARE "+this.props.Posts)
}
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          
          }}
        >
<View style={styles.modalView}>  

<AddPostScreen />
</View>

              <Button style={{alignSelf:'center',textAlign:'center'}} textStyle={{fontSize:5}} labelStyle={{fontSize:10}} icon="close" mode="contained" onPress={() => this.setModalVisible(!modalVisible)} color="rgba(231,76,60,1)">Close</Button>
                   </Modal>

    </ScrollView>
    
  )
}
}
const styles = StyleSheet.create({
  
  modalView: {

    margin: 20,
    borderRadius: 20,
    //  padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:Dimensions.get('window').height*0.75


  },

 
  buttonClose: {
    backgroundColor: "#000",
    width:100,
    borderRadius:20,
    alignSelf:'center',
    margin:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  scrollView: {
    flex: 1,
  },
 
});
const MapStateToProps=(state)=>{
  return{
    Posts:state.Post_Reducer.Posts
  }
}

export default connect(MapStateToProps)(Home);
