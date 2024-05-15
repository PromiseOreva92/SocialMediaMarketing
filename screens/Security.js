import * as React from 'react';
import { useState,useContext } from 'react';
import { Text, View, Switch } from 'react-native';
import { 
        Card, 
        Nav,
        BackButton,
        NavTitle,
        MenuItem,
        MenuText,
        MenuLine,
        Colors,

} from "./../components/styles";
const {brand,secondary} = Colors;
import { useNavigation } from '@react-navigation/native';
import {Octicons,Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from "@env";
import Toast from "react-native-root-toast";





const Security = ({navigation})=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const { userCredentials, setUserCredentials } = useContext(UserContext);

    let user_id, biometrics
    if (userCredentials !== null) {
        user_id = userCredentials.userData.details.id;
        biometrics = userCredentials.userData.settings.biometrics;
        
    }
    const [ biometricStatus, setBiometricStatus ] = useState(biometrics)
    const saveForBiometrics = (status)=>{            
        AsyncStorage.setItem('biometric_status',status)

        .then(()=>{
            console.log("setting biometric status: "+ status)
                setBiometricStatus(status)
                })
                .catch((error)=>{console.log(error)})   

        values = {
                "status":status,
                "user_id": user_id
                }

                console.log(values)
        
        axios.post(`${BASE_URL}/api/biometric_status`,values)
                .then(response=>{
                    if (response.data.status) {
                        Toast.show("Biometric Status has been Updated",{duration: Toast.durations.LONG,})
                    } else {
                       Toast.show("Could not Update biometric status",{duration: Toast.durations.LONG,})

                    }
    
                })
                .catch(error=>{
                    console.log('Error m:',error)
                })
    } 
    
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    console.log("bio status: "+biometricStatus)
    if (!isEnabled) {
        console.log(isEnabled); // Set your desired value here
        saveForBiometrics("1")
        
      } else {
        console.log(isEnabled); // Reset the custom value when the switch is toggled off
        saveForBiometrics("0")
      }
  };
    return (
            <View style={{ flex:1, alignItems:'center',paddingHorizontal:20 }}>
                <StatusBar  style='dark'/>
                <Nav>
                        <BackButton onPress={() => navigation.goBack()}>
                        <Octicons
                        name="arrow-left"
                        size={24} // Adjust the size as needed
                        color={secondary} // Adjust the color as needed
                        />
                        </BackButton>
                        <NavTitle>Security</NavTitle>
                </Nav>

                <Card>
                        <MenuItem>
                                <MenuText onPress={() =>navigation.navigate('ResetPasswordScreen')}>Reset Password</MenuText>
                        </MenuItem>
                        <MenuLine/>
                        <MenuItem>
                                <MenuText style={{ lineHeight: 100 }}>Biometrics</MenuText>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={biometricStatus == "1"? true:false}
                                />
                        </MenuItem>

                </Card>

            </View>
    );
}
export default Security;