import Login from './Login';
import Signup from './Signup';
import Kyc from './Kyc';
import Otp from './Otp';
import ChangePassword from './ChangePassword';
import MainContainer from './MainContainer';
import RecoverPassword from './RecoverPassword';
import { UserContext } from './../components/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View,Text } from 'react-native';
import { useContext } from 'react';


const Stack = createStackNavigator();

export default function MainStack() {
  const { userCredentials, setUserCredentials } = useContext(UserContext);

  console.log("in main stack")
 
    return (
          <NavigationContainer>
            <Stack.Navigator
                id="Outer"
                initialRouteName="Login"
                screenOptions={{
                  headerShown: false,
                }}>


                  {(userCredentials !== null) ?(
                    //if user profile is complete go to main container else go to kyc
                      (userCredentials.userData.details.profile_complete == 1)?
                      <Stack.Screen name="MainContainer" component={MainContainer} />:
                      <Stack.Screen name="Kyc" component={Kyc} />
                  ):(
                    <>
                    
                      <Stack.Screen name="Login" component={Login} />
                      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
                      <Stack.Screen name="Otp" component={Otp} />
                      <Stack.Screen name="ChangePassword" component={ChangePassword} />
                      <Stack.Screen name="Signup" component={Signup} />
                    </>
                    
                  )}


                  
                  
                  
                  
            </Stack.Navigator>
          </NavigationContainer>


    );
  }