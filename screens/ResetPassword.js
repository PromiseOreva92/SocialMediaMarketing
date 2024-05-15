import React,{useState,useContext} from 'react';
import { View,ActivityIndicator } from 'react-native';
import {Formik} from 'formik';
import {Octicons,Ionicons} from '@expo/vector-icons';
import{
    RightPersonalIcon,
    StyledFormArea,
    LeftPersonalIcon,
    PersonalButton,
    ButtonText,
    Colors,
    Nav,
        BackButton,
        NavTitle,
    PersonalTextInput
 } from './../components/styles';
 import Toast from "react-native-root-toast";
 import axios from 'axios';
 import { BASE_URL } from "@env";
 import { UserContext } from '../components/UserContext';
 import { StatusBar } from 'expo-status-bar';
 const {brand,secondary,darkLight} = Colors;


const ResetPassword = ({ navigation }) =>{

    const { userCredentials, setUserCredentials } = useContext(UserContext);
    const [hidePassword, setHidePassword] = useState(true);
    const [hideNPassword, setHideNPassword] = useState(true);  
    const [hideCPassword, setHideCPassword] = useState(true);
    const [loading, setLoading] = useState(false); // State to track loading state 

    if(userCredentials !== null){
            user_id =  userCredentials.userData.details.id
    }else{
            user_id = "1"
    }
    const refreshCredentials =(credentials) =>{
        AsyncStorage.setItem('user',JSON.stringify(credentials))
        .then(()=>{
        setUserCredentials(credentials)
        })
        .catch((error)=>{console.log(error)})
    }
    const resetpassword = (values) =>{
        if(!values.password) {
            Toast.show("Please fill in your Password",{duration: Toast.durations.LONG,})
        }
        else if(!values.newpassword) {
            Toast.show("Please fill in New Password Field",{duration: Toast.durations.LONG,})
        }else if(!values.confirmpassword) {
            Toast.show("Please fill in Confirm Password Field",{duration: Toast.durations.LONG,})
        }else if(values.newpassword !== values.confirmpassword) {
            Toast.show("Password Mismatch",{duration: Toast.durations.LONG,})
        }
        else{
            // console.log(values)
            setLoading(true); 
            axios.post(`${BASE_URL}/api/reset_password`,values)
            .then(response=>{
                console.log(response.data)
                if (response.data.status) {
                    const userDetails = response.data.user;
                        const userSettings = response.data.setting;
                        const userData = {
                            'details': userDetails,
                            'settings':userSettings,
                        } 

                        console.log("user: "+{userData})
                    setLoading(false); 
                    refreshCredentials({userData})

                }
                else {
                    console.log("message error: "+response.data.messages);
                    Toast.show(response.data.messages,{duration: Toast.durations.LONG,})
                    setLoading(false); 
                }

            })
            .catch(error=>{
                console.log('Error:',error)
                Toast.show("an Error Occured",{duration: Toast.durations.LONG,})
                setLoading(false); 
            })
        }



    }
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
                        <NavTitle>Change Password</NavTitle>
                </Nav>
                    
                    <Formik initialValues={{password:'',newpassword:'',confirmpassword:'',id:user_id}}
                        onSubmit={resetpassword}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea style={{marginTop:20,}}>
                            <MyTextInput 
                                label="Password" 
                                icon="lock" 
                                name ="password"
                                placeholder="Password" 
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
                                label="New Password" 
                                icon="lock" 
                                name ="newpassword"
                                placeholder="New Password" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('newpassword')}
                                onBlur={handleBlur('newpassword')}
                                value={values.newpassword}
                                secureTextEntry={hideNPassword}
                                hidePassword = {hideNPassword}
                                setHidePassword ={setHideNPassword}
                                isPassword={true}
                            />
                            <MyTextInput 
                                label="Confirm Password" 
                                icon="lock" 
                                name ="confirmpassword"
                                placeholder="Confirm Password" 
                                placeholderTextColor={brand}
                                onChangeText={handleChange('confirmpassword')}
                                onBlur={handleBlur('confirmpassword')}
                                value={values.confirmpassword}
                                secureTextEntry={hideCPassword}
                                hidePassword = {hideCPassword}
                                setHidePassword ={setHideCPassword}
                                isPassword={true}
                            />

                            <PersonalButton onPress={loading ? null : handleSubmit}>
                                {
                                    loading? 
                                    ( <ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText>Continue</ButtonText>)
                                }                               
                            </PersonalButton>


                        </StyledFormArea>)}
                    
                    </Formik>
            </View>

    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return (
        <View>
            <LeftPersonalIcon>
                <Octicons name={icon} size={15} color={brand}/>
            </LeftPersonalIcon>
            <PersonalTextInput {...props}/>
            { isPassword && (
            <RightPersonalIcon onPress={()=>setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword?'md-eye-off':'md-eye'} size={20} color={darkLight}/>
            </RightPersonalIcon>
            )}
            
        </View>
    )
}

export default ResetPassword;