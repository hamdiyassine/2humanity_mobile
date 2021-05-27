
import React from 'react';
import {View,Text,StyleSheet,FlatList,RefreshControl,Modal,Alert,Pressable,Dimensions,Image} from 'react-native';
import { Button, IconButton,Searchbar } from 'react-native-paper';
import PostCard from '../components/PostCard';
import { ScrollView } from 'react-native-gesture-handler';
import {Container,Card,UserImg,UserInfo,Interaction,InteractionWrapper,InteractionText, UserName,PostImg, UserInfoText,PostTime,PostText, Divider} from '../styles/FeedStyles';
import AddPostScreen from './AddPostScreen';
import {connect} from 'react-redux';
import store from '../redux/store';

 class Home extends React.Component{

  constructor(props){
    super(props);
    this.hideModal = this.hideModal.bind(this);

    this.state={
      Posts:[],
      refreshing:false,
      modalVisible: false,
      searchQuery:'',
      filteredPosts:[]
    }
  }
   componentDidMount(){
    this.getData();
  }
   onChangeSearch = (query) => {this.setState({searchQuery:query})};

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
   .then((json)=>this.setState({filteredPosts:json}))

    .then(console.log("POSTS ARE "+this.state.Posts))
  
    .catch(error => alert("Error " + error))
 }
 searchData= (text)=>{
   if(text!=null) {
     var newData= this.state.Posts.filter(item=>{
console.log("new data"+newData)
     return item.content.toUpperCase()===text.toUpperCase();
     }
    
     );
    //  this.setState({filteredPosts:newData, searchQuery:text});
    this.setState({searchQuery:text});
    console.log("new data"+newData)
    if( newData.length > 0 ){
      this.setState({Posts : newData, searchQuery:text})
      }else{
      this.setState({Posts : this.state.Posts,searchQuery:text })
      }
   }
   else {
     this.setState({searchQuery:text,Posts:this.state.filteredPosts});

   }
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
      {    console.log("userrrrsss"+this.props.id)
}
  <View style={{flexDirection:"row"}}>
  <IconButton icon='refresh' size={20} color='#1b59a2'onPress={()=>this._onRefresh()}/>

  <Searchbar
      placeholder="Search"
      onChangeText={(value)=>this.searchData(value)}
      value={this.state.searchQuery}
      style={{width:Dimensions.get('window').width*0.85,marginTop:10}}
      // clearButtonMode="unless-editing"
      onIconPress={()=>console.log('pressed')}
      clear={()=>console.log('pressed')}
      // {()=>this.setState({searchQuery:'',Posts:this.state.filteredPosts})}
    />
    </View>
  <View style={{justifyContent:'flex-end'}}>
  
       <Card >

<Text style={{color:'grey',padding:15,textAlign:'center'}}>Want to share something?</Text>
<Button   style={{width:120,alignSelf:'center'}} labelStyle={{fontSize:12}} icon="plus" mode="contained" onPress={()=> this.setModalVisible(true)} color="rgba(231,76,60,1)">
    Add a post
  </Button>
       </Card>
       </View>
       </ScrollView>
       {console.log("Posts are "+this.state.Posts)}
{Object.keys(this.state.Posts).length == 0?
<View style={{flex:1,display:'flex',justifyContent: 'center',alignItems: 'center',marginTop:Dimensions.get('window').width*0.4}}>
  <Image style={{width:200,height:200}} source={require('../assets/imgs/empty2.png')} />
 <Text style={{color:'rgb(117,117,114)'}}>Oups!..no posts found</Text>
 </View>
:

     <FlatList  
     data={this.state.Posts}
     renderItem={({item})=>
     <PostCard allPosts={this.state.Posts} content={item.content} image={item.media} user={item.postedBy} date={item.createdAt} id={item._id}/>}
      keyExtractor={item=>item.id}
    showsVerticalScrollIndicator={false}
/>
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
    Posts:state.Post_Reducer.Posts,
    // token: state.Auth.get('token'),
    // user_type: state.Auth.get('user_type'),
    //  user: state.Auth.get('user'), 
    //  id:state.Auth.get('id')
  }
}

export default connect(MapStateToProps)(Home);
