import React,{useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { 
        Card, 
        ProfileCardContainer, 
        ProfileCardLogoContainer,
        ProfileCardBioContainer,
        ProfileCardFullName,
        ProfileCardEmail,
        Photo,
        MenuItem,
        MenuText,
        MenuLine,
        Logout,
        LogoutText,

} from "./../components/styles";
import{
        Colors,
        Nav,
        NavTitle
     } from './../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/UserContext';
const {brand,darkLight,secondary} = Colors;






const Profile = ({navigation})=>{
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        console.log("In profile")
        const logout = () =>{
                AsyncStorage.removeItem('user')
                .then(()=>{
                    setUserCredentials(null)
                })
                .catch((error)=>{console.log(error)})
            }
    return (
            <View style={{ flex:1, alignItems:'center',paddingHorizontal:20 }}>
                <StatusBar  style='dark'/>
                    <Nav>
                            
                            <NavTitle>My Profile</NavTitle>
                    </Nav>  
                                  
                <Card>
                        <ProfileCardContainer>
                                <ProfileCardLogoContainer> 
                                        <Photo source={require('./../assets/user.png')}/>
                               </ProfileCardLogoContainer>
                               <ProfileCardBioContainer>
                                        <ProfileCardFullName>
                                                {
                                                        (userCredentials !== null)?
                                                        (userCredentials.userData.details.firstname):("")
                                                
                                                }
                                        </ProfileCardFullName>
                                        <ProfileCardEmail>
                                                {
                                                        (userCredentials !== null)?
                                                        (userCredentials.userData.details.email):("")
                                                }
                                        </ProfileCardEmail>
                               </ProfileCardBioContainer>

                        </ProfileCardContainer>  

                        <MenuLine/>

                        <MenuItem>
                                <MenuText onPress={() =>navigation.navigate('PersonalInfoScreen')}>Edit Profile</MenuText>
                        </MenuItem>
                </Card>

                <Card>
                        <MenuItem>
                                <MenuText>Personal Information</MenuText>
                        </MenuItem>
                        <MenuLine/>

                        <MenuItem>
                                <MenuText  onPress={() =>navigation.navigate('SecurityScreen')}>Account Security</MenuText>
                        </MenuItem>
                        <MenuLine/>   

                        <MenuItem>
                                <MenuText onPress={() =>navigation.navigate('SettingsScreen')}>App Setting</MenuText>
                        </MenuItem>
                </Card>

                <Card>
                        <MenuItem>
                                <MenuText>Dark Mode</MenuText>
                        </MenuItem>
                        <MenuLine/>

                        <MenuItem>
                                <MenuText>Refer and Earn</MenuText>
                        </MenuItem>
                        <MenuLine/>   

                        <MenuItem>
                                <MenuText>Help Center</MenuText>
                        </MenuItem>
                </Card>

                <Card style={{padding:5}}>
                        <Logout onPress={logout}>
                                <LogoutText>Sign Out</LogoutText>
                        </Logout>
                </Card>
            </View>
    );
}
export default Profile;