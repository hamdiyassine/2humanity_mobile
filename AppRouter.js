import React from 'react';
import {createSwitchNavigator , createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator ,createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'

import {Header, Icon , View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//https://oblador.github.io/react-native-vector-icons/
//https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c

import HomePage           from "./app/containers/Home";
// import JobOffersPage  from "./app/containers/JobOffers"; 
import SigninPage     from "./app/containers/Signin";
import SignupPage     from "./app/containers/Signup";


const Menu = createDrawerNavigator(
  {
    "Home": { screen: HomePage },
  },
  {
    drawerWidth: 300,
    drawerPosition: 'left',
    initialRouteName: 'Home',
  }
)


// const MenuContainer = () => {
//   let pressMenu
//   let IconComponent = Ionicons;
//   return(
//     <React.Fragment>
//       <Header
//         backgroundColor="gray"
//         leftComponent={
//           <IconComponent name="md-menu" size={25} color="#1b59a2" onPress={() => {
//             pressMenu.dispatch(DrawerActions.toggleDrawer())
//           }} />
//         }
//       />
      
//       <Menu
//          ref={navigatorRef => { pressMenu = navigatorRef}}
//       />
//     </React.Fragment>
//   )
// }

export const SignedOut = createStackNavigator(
 
  {
    Signup: { screen: SignupPage},
    Login: { screen: SigninPage},
    
  },
  {headerMode: 'none',}
)

const HomeStack = createStackNavigator(
  { 
    Home: { screen: HomePage},

  }, 
  { 
    //headerMode: 'none',
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Accueil',
      headerTintColor: '#fff',
      headerStyle: { 
        backgroundColor: '#1b59a2',
      },
    }
  }
);



//const NotifIconWithBadge = (props) => <IconWithBadge {...props} badgeCount={0} />;  
export const SignedIn = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    // navigationOptions: ({navigation}) => ({
    //   header: HeaderMain,
    // }),
  },
  Contact: {screen: HomeStack},
  Menu: {screen: HomeStack}, 
 // Users: UsersStack
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;

      switch (routeName) {
        case 'Home': iconName = 'md-home'; break;
     //   case 'Users': iconName = 'ios-people'; break;
         case 'Contact': iconName = 'md-calendar'; 
       //   IconComponent = NotifIconWithBadge;   
        break; 
        case 'Menu': iconName = 'md-menu'; break;
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {activeTintColor: '#1b59a2', inactiveTintColor: 'gray', 
    showLabel: false,
    style: {	borderTopWidth: 0, elevation: 15 }
  }
})


export const createRootNavigator = (connected=false) => {
  return createSwitchNavigator({Menu, SignedIn,SignedOut},
    {
      initialRouteName:  'SignedIn' 
    }  
  )
} 
