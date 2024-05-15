import React,{useState,useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {Formik} from 'formik';
import{
    StyledContainer,
    InnerContainer, 
    PageLogo,
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
    ExtraView,
    TextLink,
    TextLinkContent,
    DropdownButton,
    DropdownItem,
    DropdownList,
    DropdownText,
    KycTitle
 } from './../components/styles';

 //icons

 import {Octicons,Ionicons} from '@expo/vector-icons';

import {View,ScrollView,ActivityIndicator} from 'react-native';
import { BASE_URL } from "@env";
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import * as Device from 'expo-device';
import Toast from "react-native-root-toast";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/UserContext';

const {brand,darkLight} = Colors;
const deviceName = Device.deviceName;

const Kyc = () => {
    const [errorMessage, setErrorMessage] = useState();
    const { userCredentials, setUserCredentials } = useContext(UserContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(false); // State to track loading state

    if(userCredentials !== null){
        user_id =  userCredentials.userData.details.id
    }
    else{
            user_id = "1"
    }
        
    const refreshCredentials =(credentials) =>{
            AsyncStorage.setItem('user',JSON.stringify(credentials))
            .then(()=>{
            setUserCredentials(credentials)
            })
            .catch((error)=>{console.log(error)})
    }
    const logout = () =>{
        AsyncStorage.removeItem('user')
        .then(()=>{
            setUserCredentials(null)
        })
        .catch((error)=>{console.log(error)})
    }
    const  update_account = (values)=>{
        if(!values.firstname){
            Toast.show("Please fill in your Firstname",{duration: Toast.durations.LONG,})
        }else if(!values.lastname) {
            Toast.show("Please fill in your Lastname",{duration: Toast.durations.LONG,})
        }
        else if(!values.zip) {
            Toast.show("Please fill in your Zip",{duration: Toast.durations.LONG,})
        }else if(!values.address) {
            Toast.show("Please fill in your Address",{duration: Toast.durations.LONG,})
        }
        else if(!values.state) {
            Toast.show("Please fill in your State",{duration: Toast.durations.LONG,})            
        }
        else if(!values.city) {
            Toast.show("Please fill in your City",{duration: Toast.durations.LONG,})            
        }
        else{
            setLoading(true); 
            axios.post(`${BASE_URL}/api/kyc`,values)
            .then(response=>{
                if (response.data.status) {
                    const userDetails = response.data.user;
                        const userSettings = response.data.setting;
                        const userData = {
                            'details': userDetails,
                            'settings':userSettings,
                        } 
                    refreshCredentials({userData})
                    setLoading(false); 
                    Toast.show("Profile updated Successfully",{duration: Toast.durations.LONG,})

                } else {
                   setErrorMsg(response.data.messages);
                   setLoading(false); 
                }

            })
            .catch(error=>{
                console.log('Error:',error)
                setErrorMsg("An error occurred");
                setLoading(false); 
            })
        }    
    }
    const [hidePassword, setHidePassword] = useState(true);    
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar  style='dark'/>
                <InnerContainer>
                    <LogoContainer>
                        <PageLogo resizeMode="cover" source={require('./../assets/user.png')} />
                    </LogoContainer>
                        
                        <KycTitle>Please Update Your Profile First</KycTitle>
                        <Formik initialValues={{firstname:'',lastname:'',address:'',city:'',state:'',zip:'',id:user_id}}
                            onSubmit={update_account}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errorMsg}) => (
                            <StyledFormArea>
                               
                               <MsgBox>
                                    {errorMessage}
                                </MsgBox>


                                <MyTextInput 
                                    label="Firstname" 
                                    name="firstname"
                                    icon="person" 
                                    placeholder="Give us Your First name" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                                />

                                <MyTextInput 
                                    label="Lastname" 
                                    name="lastname"
                                    icon="person" 
                                    placeholder="Give us Your Last name" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                />
                                <MyTextInput 
                                    label="Zip Code" 
                                    name="zip"
                                    icon="location" 
                                    placeholder="Zip Code Here" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('zip')}
                                    onBlur={handleBlur('zip')}
                                    value={values.zip}
                                    keyboardType="number-pad"
                                />
                                <MyTextInput 
                                    label="Address"
                                    name="address" 
                                    icon="location" 
                                    placeholder="Enter Your Address" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                />

                                <MyTextInput 
                                    label="City" 
                                    icon="location" 
                                    name="city"
                                    placeholder="Enter Your City Name" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                    value={values.city}
                                />
                                <MyTextInput 
                                    label="State/Division" 
                                    name="state"
                                    icon="location" 
                                    placeholder="Enter Your State/Division" 
                                    placeholderTextColor={brand}
                                    onChangeText={handleChange('state')}
                                    onBlur={handleBlur('state')}
                                    value={values.state}
                                />

                                <StyledButton onPress={loading ? null : handleSubmit}>
                                {
                                    loading? 
                                    (<ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText>Continue</ButtonText>)
                                }                               
                                </StyledButton>

                                <ExtraView>
                                <TextLink onPress={logout}>
                                    <TextLinkContent>
                                        Back to Login
                                    </TextLinkContent>
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
export default Kyc;

// ["ascii-capable","ascii-capable-number-pad","decimal-pad","default","email-address","name-phone-pad","number-pad","numbers-and-punctuation","numeric","phone-pad","twitter","url","visible-password","web-search"]