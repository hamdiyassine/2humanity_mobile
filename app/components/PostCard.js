import React from 'react';
import {View,Text,StyleSheet, Alert} from 'react-native';
import {Container,Card,UserImg,UserInfo,Interaction,InteractionWrapper,InteractionText, UserName,PostImg, UserInfoText,PostTime,PostText, Divider} from '../styles/FeedStyles';
import {Ionicons,Fontisto,MaterialCommunityIcons} from "@expo/vector-icons";
import { Button,IconButton,TextInput as TextInp } from 'react-native-paper';
import { Dimensions,TextInput,FlatList} from 'react-native';
import { Item } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class PostCard extends React.Component  {
    constructor(props){
      super(props);
      this.state={
        viewed:false,
        comments:0,
        id:null,
        content:this.props.content,
        toUpdate:false,
        Allcomments:[],
        newComment:''
      }
    }
     changeState(){
       this.setState({
         viewed:!this.state.viewed
       })
       console.log(this.state.viewed)
     }

     componentDidMount(){
      this.getData(this.props.id);
     }

     getData= (post_id)=>{
      fetch(`http://192.168.43.182:5050/comments/${post_id}`, {
        method: "GET",
      })
        .then(response => response.json())
        .then((json)=>this.setState({Allcomments:json}))
    
        .catch(error => alert("Error " + error))
      }

     sendData= (post_id)=>{
       fetch(`http://192.168.43.182:5050/comments/${post_id}`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: this.state.newComment,
        user : this.props.user_id
      })
    })
      .then(response => response.json())
      
      .then(response => {
        console.log(response)
      })
      .catch(error => alert("Error " + error))

    }

     addComment(){
       
       this.setState({
         comments:this.state.comments+1,
        Allcomments:[...this.state.Allcomments,this.state.newComment]
       },()=>{
         this.sendData(this.props.id)
       })
    
     }
     
     deletePost(id){
      fetch("http://192.168.1.8:5050/posts/deletePost/"+id, {
      
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         _id:id
        })
      })
        .then(response => response.json())
        .then(response => {
          console.log("post deleted")
        })
        .then(Alert.alert('Post deleted successfully'))
        .catch(error => alert("Error " + error))
 
     }
     updatePost(id){
       this.setState({toUpdate:!this.state.toUpdate})
      fetch("http://192.168.1.8:5050/posts/update/"+id, {
      
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         content:this.state.content,
         _id:id
        })
      })
        .then(response => response.json())
        
        // .then(Alert.alert('Post update successfully'))
        .catch(error => alert("Error " + error))
 
     }
     UpdateContent(value){
      this.setState({
        // toUpdate:!this.state.toUpdate,
        content:value
      })
     
     }

     removeCommentRequest(post_id ,comment_id ){
        fetch(`http://192.168.43.182:5050/comments/${post_id}/${comment_id}`, {
        
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
          _id:id
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log("comment deleted")
        })
        .then(Alert.alert('comment deleted successfully'))
        .catch(error => alert("Error " + error))
     }
    
     removeComment(e){
      var array = this.state.Allcomments.filter(function(item) {
        return item !== e
      });
      this.setState({
        Allcomments: array
      },()=>{
        this.removeCommentRequest(this.props.id,e.id)
      })
    }
    
    render(){
        return (
            <Container style={{marginLeft:-12}}>
              
     <Card>
       

       <UserInfo>
         <UserImg
          source={{uri:'https://img.freepik.com/photos-gratuite/portrait-joyeuse-jolie-jeune-femme-manches-longues-debout-bras-croises-souriant_295783-39.jpg?size=626&ext=jpg&ga=GA1.2.2026981598.1617321600'}}/>
         <View style={{flexDirection:'row',width:Dimensions.get('window').width}}>

      <UserInfoText>    
      {/* UNCOMMENT THIS WHEN EVERYTHING IS READY <UserName>{this.props.user}</UserName> */}
      <UserName>Safa Deldoul</UserName>

      <PostTime>{this.props.date}</PostTime>

      </UserInfoText>
      <View style={{marginLeft:Dimensions.get('window').width*0.15,flexDirection:'row'}}>
      <IconButton
    icon="circle-edit-outline"
    color='rgba(231,76,60,1)'
    size={20}
    onPress={()=>this.updatePost(this.props.id)}
      />
      <IconButton
    icon="delete-outline"
    color='rgba(231,76,60,1)'
    size={20}
    onPress={()=>this.deletePost(this.props.id)}
      />
      </View>
            </View>

       </UserInfo>
      {
       !this.state.toUpdate?
        <PostText>{this.state.content}</PostText>
        :
         <View>
           <TextInp  autoFocus underlineColor='#1b59a2' selectionColor='#1b59a2' style={{backgroundColor:'white', marginLeft:15,marginRight:15}} onChangeText={value=>this.setState({content:value})}  value={this.state.content}/>
           <View style={{width:'50%',alignSelf:'center',marginTop:5,marginBottom:5}}>
             <Button   onPress={()=>  this.updatePost(this.props.id)} labelStyle={{color:'#1b59a2'}} color='#1b59a2' >Save</Button>
             </View>
           </View>
         }

       <PostImg source= {{uri:this.props.image}} />
        <View style={{alignSelf:'flex-end',marginTop:8}}>
        <Text style={{color:'#989898',fontSize:12}}>{this.state.comments} Comments </Text>
        </View>
       <Divider/>
      
       <InteractionWrapper>
       <View style={{flexDirection:'row'}}>
       <TextInput  onChangeText={(value)=>this.setState({newComment:value})} multiline style={{marginLeft:18,marginBottom:20,width:Dimensions.get('window').width*0.55}} multiline  placeholder='Add a comment'/> 
   <View style={{marginLeft:Dimensions.get('window').width*0.10}}>
         <Button mode="contained" onPress={()=>{this.state.newComment?this.addComment():Alert.alert('please type something')}} color="#1b59a2">Add</Button></View> 
   
     

       </View> 
    
       </InteractionWrapper>
       {this.state.Allcomments.length>0 && <FlatList 
   data={this.state.Allcomments}
   renderItem={({item})=>
   <View style={{backgroundColor:'#F5F5F5', margin:10, height:50, borderRadius:25,padding:10,flexDirection:'row',display: 'flex',justifyContent:'flex-end'}}>
     <Text style={{marginLeft:4,flex:1}}>{item}</Text>
     <View style={{justifyContent:'flex-end'}}>
     <Button size={12} onPress={()=>{this.removeComment(item)}} color='#1b59a2' >x</Button>
     </View>
     </View>}
         keyExtractor={item=>item.id}

   />}
</Card>
    </Container>
        )
    }
}

// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     add_post

//    }, dispatch)
// );
// export default connect(mapStateToProps,mapDispatchToProps)(PostCard);
export default PostCard;