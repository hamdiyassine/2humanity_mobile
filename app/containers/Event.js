import React, { Component } from 'react';
import {StyleSheet, View, Text, Linking, Dimensions, TouchableOpacity, 
  Image, ScrollView, ActivityIndicator
} from 'react-native';
// import resolveAssetSource from 'resolveAssetSource'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

// import {eventSrv} from '../services/api';
import HTMLView from 'react-native-htmlview';

import Moment from 'moment';
const monthes = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUN", "JUI", "AOU", "SEP", "OCT", "NOV", "DÉC"];

export default class EventPage extends Component{
  static navigationOptions =  ({ navigation }) => {
    // const {params = {}} = navigation.state;

    return {
      title: "Evennement", headerTitle: "Evennement",
      headerStyle: { backgroundColor: '#1b59a2'}, 
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      // headerRight: (
      //   <Icon onPress={()=>params.toggleSearch()} name="filter" color='#fff' size={25} style={{marginRight: 18}}/>
      // ),
    }; 
  }

  constructor(props) {
    super(props);

    this.state = {
      imgHeight: 50,
      event: null,
      participated: true,
      loading: false,
      screenWidth: 200,
      userImgHeight: 50
    }
  } 
  componentDidMount(){
    const event = this.props.navigation.getParam('event');
    // const token = this.props.navigation.getParam('token');

    this.setState({participated: event.is_participated});
    // this.getEvent(event.id, token);

    const screenWidth = Dimensions.get('window').width;

    if(event.avatar && event.avatar.web_path!='')
    Image.getSize(event.avatar.web_path, (width, height) => {
      // const scaleFactor = width / screenWidth
      const imageHeight = height / (width / (screenWidth-40)); //(scaleFactor-40)
      this.setState({imgHeight: imageHeight});
    })
    else{ 
      const img = require('../assets/imgs/ev.jpg');
      let source = Image.resolveAssetSource(img);
      const imageHeight = source.height / (source.width / (screenWidth-40));
      this.setState({imgHeight: imageHeight});
    }

    const imgUser = require('../assets/imgs/user.png');
    let sourceUser = Image.resolveAssetSource(imgUser);
    const userImgHeight = sourceUser.height / (sourceUser.width / (screenWidth / 2));
    this.setState({screenWidth, userImgHeight});
  }
  
  openLink = (link) => { 
    Linking.canOpenURL(link).then(supported => {
      if (supported)  Linking.openURL(link);
    });
  }; 
  
  getEvent=(eventId, token)=>{
    // eventSrv.getEvent(eventId, token).then(ret=>{
    //   if(ret.status) this.setState({
    //     event: ret.data, 
    //     participated: ret.data.is_participated
    //   });
    //   console.log('state.event', this.state.event)
    // })
  } 

  participate=(id)=>{
    // if(!this.state.participated){
    //   this.setState({loading: true});

    //   eventSrv.participate(id, this.props.navigation.getParam('token')).then(ret=>{
    //     if(ret.status){
    //       this.setState({participated: true});
    //     } 

    //     this.setState({loading: false}); 
    //   })
    // }
  }

  render(){
    const event = this.props.navigation.getParam('event');
    const date = Moment(event.date_begin); 
    

    return(
      <ScrollView>
      <View style={styles.wrap}> 
        <View> 
          {(event.avatar && event.avatar.web_path!='') ?
            <Image source={{uri: event.avatar.web_path}} 
              style={{...styles.imgEvent, height: this.state.imgHeight}} 
            />:
            <Image source={require('../assets/imgs/ev.jpg')} 
              style={{...styles.imgEvent, height: this.state.imgHeight}}
            />
          }
          <View style={styles.wrapDetails}>
            <View style={styles.wrapDate}>
              <Text style={styles.month}> {monthes[date.format('M')-1]} </Text>
              <Text style={styles.day}> {date.format('D')} </Text>
            </View>

            <View style={styles.titleDesc}>
              <Text style={styles.name}>{event.title}</Text>
              <Text style={styles.createdby}>{event.title}</Text>
            </View>

            <View style={{}} >
                <Ionicons style={{fontSize: 26 , margin:5}} name="ios-more" md="md-more"/>
            </View>
          </View>
        </View>

        <View style={{padding: 5}}>
          <View style={styles.divider}></View>
          <Text style={styles.nbParticipant} >16 participants</Text>
          <TouchableOpacity 
          onPress={()=>this.participate(event.id)} style={styles.btn}
          >
            {(this.state.loading) && 
              <ActivityIndicator size="small" style={styles.check} color="#fff" />
            }
            {!this.state.loading && 
              <Ionicons style={{paddingRight: 5}} name={this.state.participated? "ios-star":"ios-star-outline"} 
                color={this.state.participated?"#fba930":"#fff"} size={20}
              />
            }
            <Text style={{color: "#fff", textAlign: "center", fontSize: 17}} >
              {this.state.participated? "Participé":"Participer"}
            </Text>
          </TouchableOpacity>
        </View> 
      </View>

      {/* ******** INFO ********** */}

      <View >
        <View style={{...styles.wrapAttr,marginLeft : 20}}>
          <Ionicons style={styles.attrIcon} name="ios-clock" />
          <Text style={styles.attrTxt}>
            Début {date.format("DD-MM-YYYY HH:mm")}
          </Text>
        </View>

        <View style={{...styles.wrapAttr,marginLeft : 20}}>
          <Ionicons style={styles.attrIcon} name="ios-clock" />
          <Text style={styles.attrTxt}>
            Fin {"    "+Moment(event.date_end).format("DD-MM-YYYY HH:mm")}
          </Text>
        </View>

        <View style={{...styles.wrapAttr,marginLeft : 20}}>
          <Ionicons style={styles.attrIcon} name="ios-pin" />
          <Text style={styles.attrTxt}>{event.place}</Text>
        </View>
      </View>

      {/* programme */}
      {event.program!='' && <View>
        <View style={styles.section}>
          <Ionicons style={styles.sectionIcon} name="md-list" />
          <Text style={styles.sectionTxt}>Programmes</Text>
        </View>
        <View style={styles.wrap}>
          <HTMLView value={event.program} style={{padding: 5}} />
        </View>
      </View>}
      
      {/* DESCRIPTION */}
      <View style={styles.section}>
        <Ionicons style={styles.sectionIcon} name="md-rocket" />
        <Text style={styles.sectionTxt}>Déscription</Text>
      </View>
      <View style={styles.wrap}>
        <HTMLView value={event.description} style={{padding: 5}} />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    minHeight: 50,
    borderWidth: 1,
    borderColor: 'white',

    marginBottom: 5,
    marginTop: 5,
    marginRight: 8,
    marginLeft: 8,
    borderRadius: 3,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,  
    elevation: 2
  },
  
  section:{
    flexDirection:'row',
    marginTop: 15,
  },
  sectionIcon:{
    width: 24,
    marginLeft: 15,
    fontSize: 26
  }, 
  sectionTxt:{
    flex: 1,
    fontSize: 20,
  },

  wrapAttr:{
    flexDirection:'row',
    marginTop: 8,
    marginBottom: 8
  },
  attrIcon:{
    width: 20,
    marginLeft: 5,
    fontSize: 25
  }, 
  attrTxt:{
    flex: 1,
    fontSize: 16,
    marginLeft:10
  },
  
  imgEvent:{
    width:'100%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  wrapDetails:{
    flexDirection:'row',
    padding: 5,
  },
  wrapDate:{
    width: 60,
    alignItems: "center"
  },
  titleDesc:{
    flex: 1,
    height: 60,
    overflow: 'hidden'
  },
  name:{
    color: "#444",
    fontSize: 18,
    fontWeight: 'bold'
  }, 
  createdby:{
    color: "#aaa"
  },
  divider:{
    height: 1,
    backgroundColor: "#aaa",
    width: "100%",
    marginTop: 3,
    marginBottom: 3,
  }, 
  month:{
    color: "#f34636",
    fontSize: 18
  },
  day:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#22242d"
  },
  btn:{ 
    alignSelf: 'flex-end',
    // alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center', 

    backgroundColor: "#1b59a2",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    width: 130,
    marginTop: 3,
    borderRadius: 2,
    marginTop: -30,
  },
  nbParticipant : {
      margin : 5,
      fontSize: 18,
  }
});