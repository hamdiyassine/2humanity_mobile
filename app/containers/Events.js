import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, View, ActivityIndicator, 
  TouchableOpacity, TextInput, ScrollView , Text
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Card } from '../styles/FeedStyles';
import {eventSrv} from '../services/api';
import Event from '../components/EventCmp';
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 20;
};

export default class EventsPage extends Component{
  static navigationOptions =  ({ navigation }) => { 
    const {params = {}} = navigation.state;

    return {
      title: "Événements", headerTitle: "Événements",
      headerStyle: { backgroundColor: '#1b59a2'}, 
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }; 
  }

  state = {
    loading: false,
    events: [{
        title : "My event",
        description : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio ",
        program : 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
        place : 'sousse ',
        date_begin : new Date() , 
        date_end : new Date(),
        id:0
      }],
    countAll: 0,
    offset: 0,
    limit: 4,
    token:'jkbcdjncndsncnlsckn',
    user: null,

    showSearch: false,
    searchTxt: '',
    loadFollow: -1
  }


  changeSearch=(txt)=>this.setState({searchTxt: txt})

  componentDidMount(){
    this.setState({loading: true});
    this.getData();

    AsyncStorage.multiGet(['token', 'user']).then(data=>{
      const token = data[0][1], user= data[1][1];

      this.setState({token, user});
       
      if(!token || token=='') this.setState({loading: false});
    //   else eventSrv.getEvents(0, 4, token).then(ret=>{
    //     if(ret.status) this.setState({events: ret.data, countAll: ret.countAll});
    //     this.setState({loading: false}); 
    //   })
    })
  } 

  getData= ()=>{
    fetch("http://192.168.43.182:5050/events/list", {
    method: "GET",
    })
    .then(response => response.json())
    .then((json)=>{
        console.log("//// events : ",json);
        //this.setState({events:json})
        
    })

    .catch(error => alert("Error " + error))
}
  
  getEvents = (offset=0)=>{
    // const lengthEstabs = this.state.events.length;
    // const countAll = this.state.countAll;

    eventSrv.getEvents().then(ret=>{
        console.log('get events', ret);
        
      //   if(ret.status) this.setState({
      //     events: [...this.state.events, ...ret.data], 
      //     offset,
      //     countAll: ret.countAll
      //   });
      //   this.setState({loading: false});
    })

    // if(!this.state.loading && lengthEstabs<=countAll){
    //   if(lengthEstabs>0 && countAll>0 && countAll==lengthEstabs) return;
    //   else{
    //     this.setState({loading: true});

    //     eventSrv.getEvents().then(ret=>{
    //       console.log('get events', ret);
          
    //     //   if(ret.status) this.setState({
    //     //     events: [...this.state.events, ...ret.data], 
    //     //     offset,
    //     //     countAll: ret.countAll
    //     //   });
    //     //   this.setState({loading: false});
    //     })
    //   }
    // }
  }

  participate = (id, indx)=>{
    this.setState({loadFollow: indx});

    // eventSrv.participate(id, this.state.token).then(ret=>{
    //   if(ret.status){
    //     const events = this.state.events;
    //     events[indx]['is_participated']= true;
    //     this.setState({events});
    //   } 

    //   this.setState({loadFollow: -1}); 
    // })
  }
  
  render(){
    return(
      <View style={styles.container}>
        <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) this.getEvents(this.state.offset+4);
          }}
          scrollEventThrottle={400}
        >
        <View style={{margin:5,marginRight:-180}}>
            

            <Button   style={{width:150,borderRadius:3,alignSelf:'center'}} labelStyle={{fontSize:12}} icon="plus" mode="contained"
              onPress={()=>this.props.navigation.navigate('AddEvent', {})}
             color="rgba(231,76,60,1)" >
             Add new Event 
            </Button>
            
       </View>

          
          {this.state.events.map((event, indx) => (
            <Event event={event} token={this.state.token} 
                // participate={this.participate}
                indx={indx} loading={this.state.loadFollow}
                navigation={this.props.navigation} key={event.id}/>
          ))} 

          {/* {(this.state.loading) && <ActivityIndicator size="large" color="#1b59a2" /> } */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2edf1'
  },
  searchSection: {
    flex: 1,
    margin: 10,
    marginBottom: 5,
    minHeight: 40,
    maxHeight: 40,
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