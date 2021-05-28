import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,
  Dimensions, ActivityIndicator
} from 'react-native'; 
 
import Ionicons from 'react-native-vector-icons/Ionicons';
// import resolveAssetSource from 'resolveAssetSource';

import HTMLView from 'react-native-htmlview';

// import Icon from 'react-native-vector-icons/FontAwesome'; 
import MdCom from 'react-native-vector-icons/MaterialCommunityIcons';
// import MdIcon from 'react-native-vector-icons/MaterialIcons'

// const monthes = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const monthes = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUN", "JUI", "AOU", "SEP", "OCT", "NOV", "DÉC"];
import Moment from 'moment';

export default class Event extends Component{
  constructor(props) {
    super(props);

    this.state = {
      imgHeight: 50,
      loading: false,
    }
  } 


  componentDidMount() { 
    const screenWidth = Dimensions.get('window').width;

    if(this.props.event.avatar && this.props.event.avatar.web_path!=''){
      Image.getSize(this.props.event.avatar.web_path, (width, height) => {
        const imageHeight = height / (width / (screenWidth-20));
        this.setState({imgHeight: imageHeight});
      })
    }else{ 
      const img = require('../assets/imgs/ev.jpg');
      let source = Image.resolveAssetSource(img);
      const imageHeight = source.height / (source.width / (screenWidth-40));
      this.setState({imgHeight: imageHeight});
    }
  } 

  participate =()=>{
    if(!this.state.loading)
    this.props.participate(this.props.event.id, this.props.indx)
  } 
  
  render(){
    const { event, token } = this.props;
    const date = Moment(event.date_begin); 

    return( 
      <View style={styles.wrap}> 
        <TouchableOpacity
         onPress={()=>this.props.navigation.navigate('EventDetail', {
          event, token
        })}
          > 
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
              <Text style={styles.day}> {date.format('D') || 1} </Text>
            </View>

            <View style={styles.titleDesc}>
              <Text style={styles.name}>{event.title}</Text>
              <HTMLView value={event.description}/>
            </View>
          </View>
        </TouchableOpacity>

        {/* <View style={{padding: 5}}>
          <View style={styles.divider}></View>

          <TouchableOpacity onPress={this.participate} style={styles.btn}>
            {(this.props.loading == this.props.indx) &&
              <ActivityIndicator size="small" style={styles.check} color="#fff" />
            }
            {this.props.loading != this.props.indx && 
              <Ionicons style={{paddingRight: 5}} name={event.is_participated? "ios-star":"ios-star-outline"} color={event.is_participated?"#fba930":"#fff"} size={20}/>
            }
            <Text style={{color: "#fff", textAlign: "center", fontSize: 17}} >
              {event.is_participated? "Participé":"Participer"}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#eadbe6',

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
    borderRadius: 2
  },

});