// import * as React from 'react';
import React,{useState,useContext} from 'react';
import { View,ActivityIndicator } from 'react-native';
import {Octicons} from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import{
    StyledFormArea,
    LeftPersonalIcon,
    PersonalButton,
    ButtonText,
    Colors,
    PersonalTextInput,
    PaystackLogoContainer,
    PaystackLogo,
    Nav,
    BackButton,
    NavTitle
 } from './../components/styles';
 import { StatusBar } from 'expo-status-bar';
 import { UserContext } from '../components/UserContext';

 const {brand,darkLight,secondary} = Colors;


const PaystackForm = ({ navigation,icon="credit-card" }) =>{
    const { userCredentials, setUserCredentials } = useContext(UserContext);
    const [loading, setLoading] = useState(false); // State to track loading state
    const [formData, setFormData] = useState('');

      const toPaystack = async() => {
        setLoading(true);    
        if (formData == "") {
            Toast.show("Fill in all fields", {
                duration: Toast.durations.LONG,
              });
              setLoading(false); 
        } else {
            setLoading(false); 
            navigation.navigate('PayScreen', { formData });
        }
      };
    return (
            <View style={{ flex:1, alignItems:'center',paddingVertical:20 }}>
                    <StatusBar  style='dark'/> 
                    <Nav>
                            <BackButton onPress={() => navigation.goBack()}>
                            <Octicons
                            name="arrow-left"
                            size={24} // Adjust the size as needed
                            color={secondary} // Adjust the color as needed
                            />
                            </BackButton>
                            <NavTitle>Fund Your Wallet</NavTitle>
                    </Nav>
                    <PaystackLogoContainer>
                                <PaystackLogo source={require('./../assets/paystack1.png')}/>
                    </PaystackLogoContainer>


                        
                           
                                    <StyledFormArea style={{marginTop:20,paddingHorizontal:20}}>

                                        <MyTextInput 
                                            label="Amount" 
                                            icon="credit-card" 
                                            placeholder="Enter the amount" 
                                            placeholderTextColor={brand}
                                            onChangeText={text => setFormData(text)}
                                            value={formData}
                                            keyboardType="decimal-pad"
                                        />
                                        <PersonalButton onPress={loading ? null :toPaystack}>
                                            {
                                                loading? 
                                                (<ActivityIndicator size="small" color="#ffffff" />)
                                                :
                                                (<ButtonText>Proceed</ButtonText>)
                                            }
                                        </PersonalButton>
                                    </StyledFormArea>
                              
                    


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
        </View>
    )
}

export default PaystackForm;