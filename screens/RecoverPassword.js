import React,{useState} from 'react';
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
 //icons

 import {Octicons,Ionicons} from '@expo/vector-icons';

import {View,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from "@env";
import * as Device from 'expo-device';




const deviceName = Device.deviceName;
const {brand,darkLight} = Colors;





const RecoverPassword = ({ navigation }) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false); // State to track loading state
    const [responseReceived, setResponseReceived] = useState(false); // State to track response status
    const  password_recover = async (values)=>{

        values.deviceName = deviceName;
        
        
        if(!values.email) {
            setErrorMsg("Email Field must not be empty")
        }
       else{
            setLoading(true);  
            axios.post(`${BASE_URL}/api/recovery`,values)
            .then(response=>{
                if (response.data.status) {
                    setLoading(false); 
                    console.log(response.data)
                    navigation.navigate('Otp',{email:response.data.email})
                } else {
                   setErrorMsg(response.data.messages);
                   console.log(response.data.messages);
                   setLoading(false); 
                }
            })
            .catch(error=>{
                console.log('Error:',error)
                setLoading(false); 
            })
        }    
    }
    return (
        <StyledContainer>
            <StatusBar  style='dark'/>
            <InnerContainer>
                    <LogoContainer>
                        <PageLogo resizeMode="cover" source={require('./../assets/logo.png')} />
                    </LogoContainer>
                    
                    <PageTitle>Password Recovery</PageTitle>
                    <SubTitle>Forgot Password?</SubTitle>
                    <Formik initialValues={{email:''}}
                        onSubmit={password_recover}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label="Email" 
                                icon="mail" 
                                placeholder="Account Email" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            
                            <StyledButton onPress={loading ? null : handleSubmit}>
                                {
                                    loading? 
                                    ( <ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText>Submit</ButtonText>)
                                }                               
                            </StyledButton>
                           
                            <ExtraView>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>
                                        Remembered password? Sign in
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



export default RecoverPassword;

