import React,{useContext, useEffect,useState,useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import {
  PanResponder,
  View,
} from 'react-native';
import{
    Colors
 } from './../components/styles';
// Screens
import OrderStack from './OrderStack';
import WalletStack from './WalletStack';
import ProfileMenu from './ProfileMenu';
import HomeStack from './HomeStack';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screen names
const homeName = "Home";
const profileName = "Profile";
const orderName = "Order";
const walletName = "Wallet";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainContainer = ()=>{

  const {userCredentials,setUserCredentials}  = useContext(UserContext);


  const logout = () =>{
    AsyncStorage.removeItem('user')
    .then(()=>{
        setUserCredentials(null)
    })
    .catch((error)=>{console.log(error)})
  }

  
        //auto logout
        const [show, setShow] = useState(false);
        const timerRef = useRef(null);

        const logout_time = 60000
      
        const _panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => {
            resetTimer();
            return true;
          },
          onMoveShouldSetPanResponder: () => true,
          onStartShouldSetPanResponderCapture: () => {
            resetTimer();
            console.log("touched me!!!")
            return false;
          },
          onMoveShouldSetPanResponderCapture: () => false,
          onPanResponderTerminationRequest: () => true,
          onShouldBlockNativeResponder: () => false,
        });
      
        useEffect(() => {
          timerRef.current = setTimeout(() => setShow(true), logout_time);
      
          return () => {
            clearTimeout(timerRef.current);
          };
        }, []);
      
        const resetTimer = () => {
          clearTimeout(timerRef.current);
          if (show) setShow(false);
          timerRef.current = setTimeout(() => setShow(true), logout_time);
        };


    return (
      <View style={{ flex: 1 }} {..._panResponder.panHandlers}>
        {show ? logout(): null}
        <NavigationContainer independent={true}>
            <Tab.Navigator      
              id="MainTab"            
              initialRouteName={homeName}
              screenOptions={({ route }) => ({
                  tabBarActiveTintColor: Colors.secondary,
                  tabBarInactiveTintColor: 'grey',
                  tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                  tabBarStyle: { padding: 8, height: 60},
                  headerShown: false,

                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === homeName) {
                      iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === orderName) {
                      iconName = focused ? 'list' : 'list-outline';

                    } else if (rn === walletName) {
                      iconName = focused ? 'wallet' : 'wallet-outline';
                    
                    } else if (rn === profileName) {
                      iconName = focused ? 'person' : 'person-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
            })}
          >     
            <Tab.Screen name={homeName} component={HomeStack} />
            <Tab.Screen name={orderName} component={OrderStack} />
            <Tab.Screen name={walletName} component={WalletStack} />
            <Tab.Screen name={profileName} component={ProfileMenu} />
          </Tab.Navigator>

      
        </NavigationContainer>
      </View>
        
        
    );
}


export default MainContainer;