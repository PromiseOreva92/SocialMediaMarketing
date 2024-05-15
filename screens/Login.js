import React,{useState,useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import{
    StyledContainer,
    InnerContainer, 
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    LogoContainer,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
 } from './../components/styles';
 import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
 import {Octicons,Ionicons} from '@expo/vector-icons';

import {View,ActivityIndicator,SafeAreaView,TouchableHighlight,Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from "@env";
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/UserContext';
import Toast from "react-native-root-toast";

import * as LocalAuthentication from 'expo-local-authentication';
const deviceName = Device.deviceName;
const {brand,darkLight} = Colors;

const Login = ({ navigation }) => {

    

    const [isBiometricsSupported,setIsBiometricSupported] = useState(false);
    const [ biometricStatus, setBiometricStatus ] = useState("")
    const [ biometricEmail, setBiometricEmail ] = useState("")
    const [ biometricPassword, setBiometricPassword ] = useState("")
    const saveForBiometrics = (email,password)=>{

        AsyncStorage.setItem('email',email)
        .then(()=>{
            console.log("setting biometric email: "+ email)
            setBiometricEmail(email)
            })
            .catch((error)=>{console.log(error)})

        AsyncStorage.setItem('password',password)
        .then(()=>{
            console.log("setting biometric password: "+ password)
            setBiometricPassword(password)
            })
            .catch((error)=>{console.log(error)})
        
    }

    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('biometric_status');
          if (value !== null) {
            setBiometricStatus(value);
            // Toast.show("biometrics: "+value,{duration: Toast.durations.LONG,})
          } else {
            console.log('No data found.');
            // Toast.show('No biometric found.',{duration: Toast.durations.LONG,})
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };

      const retrieveEmail = async () => {
        try {
          const value = await AsyncStorage.getItem('email');
          if (value !== null) {
            setBiometricEmail(value);
            // Toast.show("Email: "+value,{duration: Toast.durations.LONG,})
          } else {
            console.log('No Email found.');
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };

      const retrievePassword = async () => {
        try {
          const value = await AsyncStorage.getItem('password');
          if (value !== null) {
            setBiometricPassword(value);
            console.log("Password: "+value)
            // Toast.show("Password: "+value,{duration: Toast.durations.LONG,})
          } else {
            console.log('No Password found.');
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };

    useEffect(()=>{
        (async ()=>{
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);  
            
            // if(biometricStatus == "1"){
            //     handleBiometricAuth()
            // }
        })();
    });

    


    const handleBiometricAuth = async()=>{
        // check if biometric fingerprint or facial recognition is available
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        if(biometricStatus == "1"){
            if (!isBiometricAvailable) {
                Alert.alert('Message', 'Biometric Auth cannot be done on this device', [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
            }else{
                    let supportedBiometrics
                    if (isBiometricAvailable) {
                        //check if there is fingerprint scanner or facial rec
                    supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()   
                    }
                    // check if finger print is enrolled or face
                    const savedBiometrics = await LocalAuthentication.isEnrolledAsync() 
                    if (!savedBiometrics) {
                        Alert.alert('Message', 'Biometric Record not found', [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]);
                    }
                    else{
                        const biometricAuth = await LocalAuthentication.authenticateAsync({
                            promptMessage: 'Login LiftNaija with Biometrics',
                            cancelLabel: 'Cancel',
                            disableDeviceFallback: true,
                        })
                        console.log(biometricAuth.success)
                        if (biometricAuth.success) {
                            retrieveEmail()
                            retrievePassword()
                            
                           values = {
                            "email": biometricEmail,
                            "password": biometricPassword,
                            "deviceName":deviceName
                           }
                           console.log(values)
                           axios.post(`${BASE_URL}/api/login`,values)
                            .then(response=>{
                                if (response.data.status) {
                                    const userToken = response.data.token;
                                    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                                    const userDetails = response.data.user;
                                    const userSettings = response.data.setting;
                                    const userData = {
                                        'details': userDetails,
                                        'settings':userSettings,
                                    }
                                    setLoading(false);
                                    saveForBiometrics(values.email,values.password) 
                                    persistLogin({userData},"message","status")
                                } else {
                                setErrorMsg("Please Check Your Internet");
                                Toast.show("Please Check Your Internet",{duration: Toast.durations.LONG,})
                                setLoading(false); 

                                }
                            })
                            .catch(error=>{
                                setErrorMsg("Please Check your connection");
                                Toast.show("Please Check your connection",{duration: Toast.durations.LONG,})
                                console.log('Error:',error)
                                setLoading(false); 
                            }) 
                        }else{
                            console.log("no values")
                            Toast.show("no values",{duration: Toast.durations.LONG,})  
                        }
                    } 
            
            }
        }else{
            Alert.alert('Biometrics not Active', 'Login and go to settings to Activate', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]); 
        }

        
    }


    console.log("in login")
    retrieveData()
    retrieveEmail()
    retrievePassword()




    const [errorMsg, setErrorMsg] = useState("");
    const [userToken,setToken] = useState();
    const [hidePassword, setHidePassword] = useState(true);    
    const [loading, setLoading] = useState(false); // State to track loading state

    // credentials  context  
    const {userCredentials,setUserCredentials}  = useContext(UserContext);

    const persistLogin = (credentials,message,status)=>{
        AsyncStorage.setItem('user',JSON.stringify(credentials))
        .then(()=>{
            setUserCredentials(credentials)
        })
        .catch((error)=>{console.log(error)})
    }


    
    const  auth_user = async (values)=>{
        values.deviceName = deviceName;
        setLoading(true); 

        if(!values.email) {
            setErrorMsg("Please fill in your Email")
            Toast.show("Please fill in your Email",{duration: Toast.durations.LONG,})
            setLoading(false); 

        }
        if(!values.password) {
            setErrorMsg("Please fill in your password")
            Toast.show("Please fill in your password",{duration: Toast.durations.LONG,})
        }else{ 
            axios.post(`${BASE_URL}/api/login`,values)
            .then(response=>{
                if (response.data.status) {
                    const userToken = response.data.token;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                    const userDetails = response.data.user;
                    const userSettings = response.data.setting;
                    const userData = {
                        'details': userDetails,
                        'settings':userSettings,
                    }
                    setLoading(false);
                    saveForBiometrics(values.email,values.password) 
                    persistLogin({userData},"message","status")
                } else {
                   setErrorMsg(response.data.message.password);
                   Toast.show(response.data.message.password,{duration: Toast.durations.LONG,})
                   setLoading(false); 

                }
            })
            .catch(error=>{
                setErrorMsg("Please Check your connection");
                Toast.show("Please Check your connection",{duration: Toast.durations.LONG,})
                console.log('Error:',error)
                setLoading(false); 
            })
        }    
    }



    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar  style='dark'/>
            <InnerContainer>
                    <LogoContainer>
                        <PageLogo resizeMode="cover" source={require('./../assets/logo.png')} />
                    </LogoContainer>
                    
                    <PageTitle>Sign In</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik initialValues={{email:'',password:''}}
                        onSubmit={auth_user}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label="Email/Username" 
                                icon="mail" 
                                placeholder="Give us your email" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />

                            <MyTextInput 
                                label="Password" 
                                icon="lock" 
                                placeholder="* * * * * * *" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                hidePassword = {hidePassword}
                                setHidePassword ={setHidePassword}
                                isPassword={true}
                            />

                            <ExtraView>
                                <ExtraText onPress={() => navigation.navigate('RecoverPassword')}>Forgot Password? </ExtraText>
                                
                            </ExtraView>
                            
                            <StyledButton onPress={loading ? null : handleSubmit}>
                                {
                                    loading? 
                                    ( <ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText>Login</ButtonText>)
                                }                               
                            </StyledButton>

                            <StyledButton onPress={handleBiometricAuth}>
                                    <ButtonText>SIGNIN WITH BIOMETRICS</ButtonText>
                            </StyledButton>

                            <ExtraView>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                    <TextLinkContent>
                                    Don't have an account? Signup
                                    </TextLinkContent>
                                </TextLink>
                            </ExtraView>                            
                            <Line/>
                            

                            <MsgBox>
                                {errorMsg}
                            </MsgBox>

                            

                        </StyledFormArea>)}
                    
                    </Formik>
            </InnerContainer> 
        </StyledContainer>
        </KeyboardAvoidingWrapper>

    );
} 


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={20} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            { isPassword && (
            <RightIcon onPress={()=>setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword?'md-eye-off':'md-eye'} size={20} color={darkLight}/>
            </RightIcon>
            )}
        </View>
    )
}



export default Login;

