import React from 'react';
import {Text,View,ScrollView,FlatList,Image,Dimensions} from 'react-native'
export default class TopUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            topUsers:[]
        }
    }
    componentDidMount(){
        this.getTopUsers();
      }
    getTopUsers=async()=>{
        await fetch("http://192.168.1.8:5050/users/AllPoints", { 
            method: "GET", 
          })
          .then(response => response.json())
   .then((json)=>this.setState({topUsers:json}))
   
   .catch(error => alert("Error " + error))
     
    }
render(){
    return(
     <ScrollView>
         <View style={{backgroundColor:'#f5f5f5'}}>
             
        <FlatList
         data={this.state.topUsers}
         renderItem={({item,index})=>(
             <View style={{flexDirection:'row',padding:10,margin:20,borderRadius:12,elevation:1,backgroundColor:'white'}}>
                    <View style={{flexDirection:"column"}}> 

                 <Image  style={{borderRadius:50,backgroundColor:'grey',width:Dimensions.get('window').width*0.25,height:100,mode:'contained'}} source={{uri:"https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"}} /> 
                 </View>
            {/* change to item.avatar */}
             
            <View style={{flexDirection: "column", marginTop:20,marginLeft:5}}>
             <Text style={{fontWeight:'bold'}} >{item.name}</Text>
             <Text style={{marginTop:5, color:item.type=='association'?'rgba(231,76,60,1)':'green'}}>{item.type}</Text>
             
             </View>
             <View style={{marginLeft:55,alignSelf:'center'}}>
             {index==0?  <Image style={{width:50,height:50}} source={{uri:'https://image.flaticon.com/icons/png/512/1657/1657088.png'}}/> : null}
             </View>
             </View>
           
        )}
           
    keyExtractor={item=>item._id}
        showsVerticalScrollIndicator={false}
        
        />
        </View>
        </ScrollView>
    )
}
}