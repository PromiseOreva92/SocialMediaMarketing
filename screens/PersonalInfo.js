import React,{ useState,useContext } from "react";
import { Text, View } from 'react-native';
import {Formik} from 'formik';
import {Octicons,Ionicons} from '@expo/vector-icons';
import{
    StyledContainer,
    InnerContainer, 
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftPersonalIcon,
    RightIcon,
    PersonalButton,
    ButtonText,
    LogoContainer,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    PersonalTextInput,
    Nav,
    BackButton,
    NavTitle
 } from './../components/styles';
 import { UserContext } from '../components/UserContext';
 import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
 import Toast from "react-native-root-toast";
 import axios from 'axios';
 import { BASE_URL } from "@env";
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { StatusBar } from 'expo-status-bar';




 const {brand,secondary} = Colors;
const PersonalInfo = ({route,navigation}) =>{
    const { userCredentials, setUserCredentials } = useContext(UserContext);
    const [myfirstname, setFirstname] = useState(userCredentials.userData.details.firstname);
    const [mylastname, setLastname] = useState(userCredentials.userData.details.lastname);
    const [mymobile, setMobile] = useState(userCredentials.userData.details.mobile);
    const [myemail, setEmail] = useState(userCredentials.userData.details.email);
    const [myId, setId] = useState(userCredentials.userData.details.id);
    

    const [refreshing, setRefreshing] = React.useState(false);
        
    const refreshCredentials =(credentials) =>{
            AsyncStorage.setItem('user',JSON.stringify(credentials))
            .then(()=>{
            console.log("setting userCredentials")
            setUserCredentials(credentials)
            })
            .catch((error)=>{console.log(error)})
    }

    const  personal_info = (values)=>{
        console.log(values)

        if(!values.firstname) {
            Toast.show("Please fill in your Firstname",{duration: Toast.durations.LONG,})
        }
        else if(!values.lastname) {
            Toast.show("Please fill in your Lastname",{duration: Toast.durations.LONG,})
        }else if(!values.email) {
            Toast.show("Please fill in your Email",{duration: Toast.durations.LONG,})
        }else if(!values.mobile) {
            Toast.show("Please fill in your Mobile Number",{duration: Toast.durations.LONG,})
        }
        else{
            axios.post(`${BASE_URL}/api/profile_update`,values)
            .then(response=>{
                if (response.data.status) {
                    const userDetails = response.data.user;
                        const userSettings = response.data.setting;
                        const userData = {
                            'details': userDetails,
                            'settings':userSettings,
                        } 
                    refreshCredentials({userData})
                }


            })
            .catch(error=>{
                console.log('Error:',error)
            })
        }  
        
        
    }
    return (
        <KeyboardAvoidingWrapper>
            <View style={{ flex:1, alignItems:'center' }}>
            <StatusBar  style='dark'/>
            <Nav>
                <BackButton onPress={() => navigation.goBack()}>
                  <Octicons
                      name="arrow-left"
                      size={24} // Adjust the size as needed
                      color={secondary} // Adjust the color as needed
                    />
                </BackButton>
                <NavTitle>Bio Data</NavTitle>
            </Nav>
                    <LogoContainer>
                        <PageLogo resizeMode="cover" source={require('./../assets/user.png')} />
                    </LogoContainer>
                    <Formik initialValues={{ firstname: myfirstname,lastname: mylastname,email: myemail,mobile: mymobile,id:myId}} onSubmit={personal_info}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea style={{marginTop:20,paddingHorizontal:20}}>
                            <MyTextInput 
                                icon="person" 
                                name="firstname"
                                placeholder="First Name" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                value={values.firstname}
                            />

                            <MyTextInput 
                                label="Lastname" 
                                icon="person" 
                                name="lastname"
                                placeholder="First Name" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                value={values.lastname}
                            />
                            <MyTextInput 
                                label="Email Address" 
                                icon="mail" 
                                name="email"
                                placeholder="andy@gmail.com" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput 
                                label="Phone" 
                                name="mobile"
                                icon="device-mobile" 
                                placeholder="08056789097" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('mobile')}
                                value={values.mobile}
                                keyboardType="phone-pad"
                            />


                            <PersonalButton onPress={handleSubmit}>
                                 <ButtonText>Update</ButtonText>
                            </PersonalButton>


                        </StyledFormArea>)}
                    
                    </Formik>
            </View>            
        </KeyboardAvoidingWrapper>


    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return (
        <View>
            <LeftPersonalIcon>
                <Octicons name={icon} size={15} color={brand}/>
            </LeftPersonalIcon>
            <PersonalTextInput {...props}/>
        </View>
    )
}

export default PersonalInfo;