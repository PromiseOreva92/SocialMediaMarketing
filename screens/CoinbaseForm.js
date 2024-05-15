// import * as React from 'react';
import React,{useState} from 'react';
import { View } from 'react-native';
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
 import { useUser } from '../components/UserContext';

 const {brand,darkLight,secondary} = Colors;


const CoinbaseForm = ({ navigation,icon="credit-card" }) =>{
    const { user, login, logout } = useUser();
    const [formData, setFormData] = useState('');

      const toPaystack = () => {
            
        if (formData == "") {
            Toast.show("Fill in all fields", {
                duration: Toast.durations.LONG,
              });
        } else {
            // console.log(formData);
            navigation.navigate('CoinbaseScreen', { formData });
        }
      };
    return (
            <View style={{ flex:1, alignItems:'center',paddingVertical:20 }}>
                    <Nav>
                            <BackButton onPress={() => navigation.goBack()}>
                            <Octicons
                            name="arrow-left"
                            size={24} // Adjust the size as needed
                            color={secondary} // Adjust the color as needed
                            />
                            </BackButton>
                            <NavTitle>Fund Your Wallet with Coinbase</NavTitle>
                    </Nav>
                    <PaystackLogoContainer>
                                <PaystackLogo source={require('./../assets/coinbase.png')}/>
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
                                        <PersonalButton onPress={toPaystack}>
                                            <ButtonText>Proceed</ButtonText>
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

export default CoinbaseForm;