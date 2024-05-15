import React,{useState,useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {Formik} from 'formik';
import Toast from "react-native-root-toast";

import{
    StyledContainer,
    InnerContainer, 
    PageLogo,
    PageTitle,
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
    TextLink,
    TextLinkContent,
    DropdownButton,
    DropdownItem,
    DropdownList,
    DropdownText
 } from './../components/styles';

 //icons

 import {Octicons,Ionicons} from '@expo/vector-icons';

import {View,ScrollView,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@env";
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import * as Device from 'expo-device';
import { UserContext } from '../components/UserContext';
const {brand,darkLight} = Colors;
const deviceName = Device.deviceName;

const Signup = ({navigation}) => {
    const [errorMessage,setError] = useState("");
    const [loading, setLoading] = useState(false); // State to track loading state

    const {userCredentials,setUserCredentials}  = useContext(UserContext);

    const [ biometricStatus, setBiometricStatus ] = useState("")
    const [ biometricEmail, setBiometricEmail ] = useState("")
    const [ biometricPassword, setBiometricPassword ] = useState("")


    const saveForBiometrics = (email,password,status)=>{

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

            
        AsyncStorage.setItem('biometric_status',status)
        .then(()=>{
            console.log("setting biometric status: "+ status)
                setBiometricStatus(status)
                })
                .catch((error)=>{console.log(error)})
        
    }

    const persistLogin = (credentials,message,status)=>{
        AsyncStorage.setItem('user',JSON.stringify(credentials))
        .then(()=>{
            setUserCredentials(credentials)
        })
        .catch((error)=>{console.log(error)})
    }

    const  register_user = (values)=>{
        values.country = selectedCountryCode;
        values.deviceName = deviceName;
        console.log(values)
        if(!values.username){
            Toast.show("Please fill in your Username",{duration: Toast.durations.LONG,})
        }else if(!values.email) {
            Toast.show("Please fill in your Email",{duration: Toast.durations.LONG,})
        }
        else if(!values.phone) {
            Toast.show("Please fill in your Phone Number",{duration: Toast.durations.LONG,})

        }else if(!values.password) {
            Toast.show("Password not set",{duration: Toast.durations.LONG,})

        }else if(values.password !== values.confirmpassword) {
            Toast.show("Please Confirm Your Password",{duration: Toast.durations.LONG,})

        }else{
            setLoading(true); 
            axios.post(`${BASE_URL}/api/register`,values)
            .then(response=>{
                if (response.data.status) {
                    setLoading(false); 
                    setErrorMsg("Successful. Please verify your email")
                    saveForBiometrics(values.email,values.password,"0")
                    Toast.show("Successful. Please verify your email",{duration: Toast.durations.LONG,})
                } else {
                   setLoading(false); 
                   setErrorMsg("The Email You chose has been registered")
                   Toast.show("The Email You chose has been registered",{duration: Toast.durations.LONG,})

                }

            })
            .catch(error=>{
                console.log('Error m:',error)
                setLoading(false); 
            })
        }    
    }
    const [hidePassword, setHidePassword] = useState(true);    

    const options = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'Niger',
    'South Africa',
    'United Kingdom',
    ];
    
    const option_codes = [
        'NG',
        'GH',
        'KE',
        'NE',
        'ZA',
        'UK',
        ];
  const [selectedCountry, setSelectedCountry] = useState(options[0]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(option_codes[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
    const handleSelect = (selectedOption,selectedIndex) => {
        setSelectedCountry(selectedOption)
        setSelectedCountryCode(option_codes[selectedIndex]) 
        setIsOpen(false);
    };
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar  style='dark'/>
                <InnerContainer>
                        <LogoContainer>
                            <PageLogo resizeMode="cover" source={require('./../assets/logo.png')} />
                        </LogoContainer>
                        
                        <PageTitle>Create Account</PageTitle>
                        <Formik initialValues={{username:'',firstname:'',phone:'',email:'',phone:'',country:selectedCountry,password:'',deviceName:'',}}
                            onSubmit={register_user}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errorMsg}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label="Username" 
                                    icon="person" 
                                    placeholder="Your Preffered Username" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />

                                
                                <MyTextInput 
                                    label="Email Address" 
                                    icon="mail" 
                                    placeholder="Your Email Address" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                

                                <MyTextInput 
                                    label="Phone Number" 
                                    icon="device-mobile" 
                                    placeholder=" e.g +23480345678" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('email')}
                                    value={values.phone}
                                    keyboardType="phone-pad"
                                />

                                <StyledDropdown 
                                    label="Country" 
                                    icon="location" 
                                    options={options} 
                                    onSelect={handleSelect}
                                    selectedCountry={selectedCountry}
                                    selectedCountryCode={selectedCountryCode}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    placeholderTextColor={brand}
                                    value={values.country}
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

                                

                                <MyTextInput 
                                    label="Confirm Password" 
                                    icon="lock" 
                                    placeholder="* * * * * * *" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('confirmpassword')}
                                    onBlur={handleBlur('confirmpassword')}
                                    value={values.confirmpassword}
                                    secureTextEntry={hidePassword}
                                    hidePassword = {hidePassword}
                                    setHidePassword ={setHidePassword}
                                    isPassword={true}
                                />

                                <MsgBox>
                                    {errorMsg}
                                </MsgBox>

                                <StyledButton onPress={loading ? null : handleSubmit}>
                                {
                                    loading? 
                                    ( <ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText>Create Account</ButtonText>)
                                }                               
                                </StyledButton>
                                <Line/>
                                <ExtraView>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent>Already have an account? Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>

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

const StyledDropdown = ({ label, icon, options, onSelect,selectedCountry,setSelectedCountry,selectedCountryCode,isOpen, setIsOpen, ...props }) => {
  
    return (
      <View>
        <LeftIcon>
                <Octicons name={icon} size={20} color={brand}/>
        </LeftIcon>

        <StyledInputLabel>{label}</StyledInputLabel>
        <DropdownButton onPress={() => setIsOpen(!isOpen)}>
          <DropdownText>{selectedCountry}</DropdownText>
        </DropdownButton>
        {isOpen && (
            
                <DropdownList>
                    <ScrollView style={{flexGrow: 1}}>
                    {options.map((option, index) => (
                    <DropdownItem key={index} onPress={() => onSelect(option,index)}>
                        <DropdownText>{option}</DropdownText>
                    </DropdownItem>
                    ))}
                    </ScrollView>
                </DropdownList>
            
          
        )}
      </View>
    );
  };
export default Signup;

// ["ascii-capable","ascii-capable-number-pad","decimal-pad","default","email-address","name-phone-pad","number-pad","numbers-and-punctuation","numeric","phone-pad","twitter","url","visible-password","web-search"]