import React from "react";
import {Text,View,ScrollView,StyleSheet,Image,Dimensions,ImageBackground,TouchableOpacity,FlatList} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {connect} from 'react-redux';
 class RecommendedScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={

        //     events:[
        //     { name: 'TURQUOISE', code: '#1abc9c' },
        //     { name: 'EMERALD', code: '#2ecc71' },
        //     { name: 'PETER RIVER', code: '#3498db' },
        //     { name: 'AMETHYST', code: '#9b59b6' },
        //     { name: 'WET ASPHALT', code: '#34495e' },
        //     { name: 'GREEN SEA', code: '#16a085' },
        //     { name: 'NEPHRITIS', code: '#27ae60' },
        //     { name: 'BELIZE HOLE', code: '#2980b9' },
          
        // ],
        AllEvents:[],
        associations:[]

        }
    }
    getAssociations=async ()=>{
      await fetch("http://192.168.1.8:5050/users/Recommend/60a5c165fad92f59f02c49f5", { //change id to this.props.id !! 
    method: "GET",
    header:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
  }
  })
    .then(response => response.json())
    .then((json)=>this.setState({associations:json}))
     .catch(error => alert("Error " + error))
  }
    getEvents=async ()=>{
      await fetch("http://192.168.1.8:5050/events/Recommended/60a5bb7c7421785dd0b8a88d", { //change id to this.props.id !! 
    method: "GET",
    header:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
  }
  })
    .then(response => response.json())
    .then((json)=>this.setState({Events:json}))
     .catch(error => alert("Error " + error))
  }
  getEventById=async(id)=>{
    await fetch("http://192.168.1.8:5050/events/get-one/"+id, {  
    method: "GET",
    header:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
  }
  })
    .then(response => response.json())
    .then((json)=>this.setState({Events:json}))
     .catch(error => alert("Error " + error))
  }
 
  componentDidMount(){
    this.getEvents();
    this.getAssociations()
  }
    render(){
        return(
        <ScrollView>
          <View style={{alignContent:'center',height:Dimensions.get('window').height*0.3,marginTop:-50}}>
            <Image source={require('../assets/imgs/illustration.png')} style={{alignSelf:'center',width:Dimensions.get('window').width*0.5,height:Dimensions.get('window').height*0.5,resizeMode:'center'}}/>
          </View>
            <View style={{alignItems:'center'}}>
            <Text style={{color:'black',flex:1,marginTop:'20%',fontSize:20, fontWeight:'bold'}}>  Recommended For You  </Text>
            </View>
         
      <Container style={{margin:20}} >
        <Header hasTabs style={{backgroundColor:'white'}} />
        <Tabs >
        <Tab activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{color:'#1b59a2'}} tabStyle={{backgroundColor:'white'}} heading="Events">
        <FlatGrid
       itemDimension={130}
     data={this.state.Events}
      
       style={styles.gridView} 
       // staticDimension={300} 
      // fixed 
     spacing={10} 
     renderItem={({ item }) => ( 
       <TouchableOpacity onPress={()=>this.getEventById(item._id)}> 
       <ImageBackground opacity={0.7} source={{ uri: item.cover }} style={[styles.itemContainer]}> 
       {/* , { backgroundColor: item.code }  */}
       
 <View style={{backgroundColor:'white',opacity:0.9,height:40}}> 
           <Text style={styles.itemName} >{item.name}</Text>
           {/* <Text style={styles.itemName} >{item.category}</Text> 
           <Text style={styles.itemCode}>{item.code}</Text> 
           <Text style={styles.itemCode}>{item.category}</Text>  */}

           </View> 
         </ImageBackground>
         </TouchableOpacity> 
     )} 
     />   
    </Tab>
          <Tab activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{color:'#1b59a2'}} tabStyle={{backgroundColor:'white'}} heading="Associations">

          <FlatGrid
      itemDimension={130}
      data={this.state.associations}
      
      style={styles.gridView}
      // staticDimension={300} 
       // fixed 
      spacing={10}
      renderItem={({ item }) => (
        <View>
        <ImageBackground opacity={0.7} source={{ uri: 'https://www.pagerduty.com/wp-content/uploads/2019/06/industry-non-Profit-icon.png' }} style={[styles.itemContainer]}>
          
         
         <View style={{backgroundColor:'white',opacity:0.9,height:50}}>
          <Text style={styles.itemName} >{item.name}</Text>
          <Text style={{marginLeft:5}} >{item.addresse}</Text>

          </View>
        </ImageBackground>
        </View>
        
      )}
    />
   
     </Tab>
        </Tabs>
      </Container>

     
  
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      // padding: 10,
      height: 200,
      backgroundColor:'black',
      // borderColor:'black',
      borderWidth:0.2,
      elevation:2,
      
    },
    itemName: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
      margin:5
    },
    // itemCode: {
    //   fontWeight: '600',
    //   fontSize: 12,
    //   color: 'black',
    // },
  });
  const MapStateToProps=(state)=>{
    return{
    
       id:state.Auth.get('id')
    }
  }
  export default connect(MapStateToProps)(RecommendedScreen);
