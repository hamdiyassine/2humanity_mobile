import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, View,Text,AsyncStorage, ScrollView, Image, ActivityIndicator, Dimensions,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderMain from '../components/HeaderMain';
//import {userSrv} from '../services/api'
//import AccMdl from '../components/AccMdl';
import authActions from '../redux/auth/actions';

class OptionsPage extends Component{ 
  constructor(props) {
    super(props);

    this.state = {
      searchTxt:'',
      loading: false,
      accounts: [],
      nbAcc: 4,
      displayMore: false,
      showAccMdl: false,
    }
  }
  
  changeSearch = (txt) => this.setState({searchTxt: txt});
  toggleAccMdl = ()=> this.setState((prev)=>({showAccMdl: !prev.showAccMdl}))

  // static navigationOptions =  ({ navigation }) => {
  //   const {params = {}} = navigation.state;

  //   return HeaderMain(navigation, params.changeSearch, 
  //     params.toggleAccMdl
  //   );   
  // }

  componentDidMount(){
    this.props.navigation.setParams({toggleAccMdl: this.toggleAccMdl,
      changeSearch: this.changeSearch
    });

    // const nbAcc = Math.floor((Dimensions.get('window').width-40)/70);

    if(this.props.user!=null){
      // console.log("this.props.token", this.props.token)
    //  this.setState({loading: true});
    //   userSrv.getUserDetails(this.props.token,this.props.user_type).then((ret)=>{
    //   //  console.log('getUserDetails', ret)
    //     this.setState({loading: false});
    //     // if(ret.status){
    //     //   const data = ret.data; 
    //     //   // const id = JSON.parse(this.props.user).id;
    //     //   // console.log('this.props.user.id', id);
    //     //   // const indx = data.map(function(acc) {return acc.id; }).indexOf(id);
          
    //     //   // if(indx>-1 && data[0] && data[indx]) [data[0], data[indx]] = [ret.data[indx], ret.data[0]];
    //     //   // this.setState({
    //     //   //   accounts: data,
    //     //   //   nbAcc: (nbAcc>=data.length) ? nbAcc : nbAcc-1,
    //     //   //   displayMore: (nbAcc<data.length)
    //     //   // })
    //     // }

    //   })

      if(this.props.user!=null){
        const {setParams} = this.props.navigation;
        setParams({user: (typeof this.props.user=='string') ? JSON.parse(this.props.user) : this.props.user})
      }
    } 
  }

  goAccount = (acc) => {
    this.props.navigation.navigate('Profile', {
      user: this.props.user,
      token: this.props.token,
      user_type: this.props.user_type,
      account: acc
    })
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.user!=null && this.props.user==null){
      const {setParams} = this.props.navigation;
      setParams({user: (typeof nextProp.user=='string') ? JSON.parse(nextProp.user) : nextProp.user})
    }
  }

  logOut = () => {
    AsyncStorage.multiRemove(['token', 'user_type', 'user']).then(() => {
      this.props.logout()

      this.props.navigation.navigate('SigninPage', {
        user_type:   this.props.user_type,
        token:  this.props.token
    })
  })}
  render(){ 

    return(
      <ScrollView>
        {(this.state.loading) && <ActivityIndicator size="large" color="#1b59a2" /> }
        
        <View style={styles.wrap_users}>
        
                <View  style={styles.halfContainer}
                // onTouchEnd={() => this.goAccount(this.props.user)}
                >
                  <View style={styles.wrapUser}>
                    <View style={styles.wrapImgUser}> 
 
                     <Image source={require('../assets/imgs/conan.jpg')} style={styles.imgUser} />

                    </View>
                    {/* <Text style={styles.userTitle} >{this.props.user.first_name} {this.props.user.last_name}</Text> */}
                        <Text style={styles.userTitle} >Hamdi Yassine</Text>
                  </View>
 
                </View>
               
            

          {/* *** MORE *** */}
          {this.state.displayMore && <View onTouchEnd={this.toggleAccMdl} style={{margin: 15}}>
            <Ionicons name="ios-add-circle-outline" color={"#1b59a2"} size={50}/>
          </View>} 
        </View>

        <View style={{...styles.service,borderTopWidth: 1,borderTopColor: '#ddd'}}
         onTouchEnd={()=>this.props.navigation.navigate('Profile', {
          // user:   this.props.user,
          token:  this.props.token
        })} >
          <AntDesign name="user" color={"#ddd"} size={25}/>
          <View style={styles.srvDescWrap}>
            <Text style={styles.srvTitle} >Profile</Text>
          </View>
        </View> 

        <View style={styles.service}
         onTouchEnd={()=>this.props.navigation.navigate('Home', {
            // user:   this.props.user,
            token:  this.props.token
          })} >
           <AntDesign name="home" color={"#ddd"} size={25}/>
          <View style={styles.srvDescWrap}>
            <Text style={styles.srvTitle} >Accueil</Text>
          </View>
        </View>

        

        <View style={styles.service} 
         onTouchEnd={()=>this.props.navigation.navigate('Événements', {
          // user:   this.props.user,
          token:  this.props.token
        })} >
          {/* <AntDesign name="Menu" color={"#1b59a2"} size={25}/> */}
          <Ionicons name="ios-menu" color={"#ddd"} size={25}/>
          <View style={styles.srvDescWrap}>
            <Text style={styles.srvTitle} >Activités</Text>
          </View>
        </View> 

        

        <View style={styles.service} 
         onTouchEnd={()=>this.props.navigation.navigate('Événements', {
          // user:   this.props.user,
          token:  this.props.token
        })} >
          <AntDesign name="calendar" color={"#ddd"} size={25}/>
          <View style={styles.srvDescWrap}>
            <Text style={styles.srvTitle} >Mes Evènements</Text>
          </View>
        </View> 

        <View style={{...styles.service,marginTop:120}} onTouchEnd={this.logOut}  >
        {/* <AntDesign name="Info" color={"#1b59a2"} size={25}/> */}
        <Ionicons name="ios-help-circle" color={"#1b59a2"} size={25}/>
          <View style={styles.srvDescWrap}>
            <Text style={styles.srvTitle} >A propos</Text>
          </View>
        </View> 


        <View style={styles.service}  onTouchEnd={this.logOut}  >
          <Entypo name="log-out" color={"#1b59a2"} size={25}/>
          <View style={styles.srvDescWrap}>
            <Text style={styles.srvTitle} >Déconnexion</Text>
          </View>
        </View>

        {/* <AccMdl token={this.props.token} navigation={this.props.navigation} visible={this.state.showAccMdl} close={this.toggleAccMdl}/> */}
      </ScrollView>
    ); 
  }
}

const styles = StyleSheet.create({
  wrap_users:{
    paddingTop:50,
    padding: 10, 
    marginBottom:30,
    flex: 1, flexDirection: 'row', flexWrap: 'wrap',
    // display : 'flex'
  },
  wrapUser : {
      width:500,
      paddingLeft: 20,
  },
  wrapImgUser: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#1b59a2', 
    overflow: 'hidden',
    
    width: 70, height: 70, 
    margin: 5
  },
  imgUser: {
    width: 70, height: 70,
  }, 
  userTitle:{
    width: 370, 
    //marginTop:-50,
    //textAlign: 'center',
    // fontWeight: '500',
    fontSize: 25,
    fontWeight:'bold'
  },
  service:{
    marginRight: 10,
    marginLeft: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 10, 
    // borderTopWidth: 1,
    // borderTopColor: '#ddd'
  },
  imgSrv: {
    width: 40, height: 47, marginRight: 5,
  }, 
  srvDescWrap:{ 
    flex: 1,
    maxHeight: 59,
    overflow: 'hidden',
    paddingRight: 10,
    paddingLeft: 10,
  },
  srvTitle:{ fontSize: 17, color: '#424242' },
}); 

//convert PART of state in STORE to the component PROPS
function mapStateToProps(state) {
 // const { loading } = state.Posts.toJS();
  

  return {
    loading:false,
    token: state.Auth.get('token'),
    user_type: state.Auth.get('user_type'),
    user: state.Auth.get('user'), 
  };
}

// const {initAuth} = authActions;
const { logout } = authActions;
//SECOND var is actions to connected to the component PROPS
export default connect(mapStateToProps, {
  // getPosts,
  // initAuth
  logout
})(OptionsPage);