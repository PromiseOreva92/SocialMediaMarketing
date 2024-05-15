import React,{useState} from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import{ 
        PaystackBanner,
        PaystackLogo,
        PaystackLogoContainer,
        PaystackInfo,
        BankBanner,
        BankInfo,
        BankAccountDetails,
        BankAccount,
        CopyButton,
        CopyButtonText,
        Line,
        Colors,
        Nav,
        BackButton,
        NavTitle

} from './../components/styles';
import {Octicons} from '@expo/vector-icons';
import Toast from "react-native-root-toast";


const {secondary} = Colors;


const Funding = ({navigation})=>{
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('9880684051');
        Toast.show("Account Number Copied to Clipboard",{duration: Toast.durations.SHORT,})

      };
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
      };
    return (
        <View>
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
                       <PaystackBanner onPress={() => navigation.navigate('PaystackScreen')}>

                            <PaystackLogoContainer>
                                <PaystackLogo source={require('./../assets/paystack1.png')}/>
                            </PaystackLogoContainer>
                            <PaystackInfo>
                                Click To make Your Payment through Paystack
                            </PaystackInfo>
                            <PaystackInfo>
                                Takes just few minutes to verify
                            </PaystackInfo>
                        
                        </PaystackBanner> 

                        <BankBanner>
                            <BankInfo>
                                Manual Transfer takes 2 hours to Confirm. 
                            </BankInfo>
                            <BankInfo>
                                Please Contact our Admin once transfer has been made
                            </BankInfo>
                            <Line/>
                            <BankAccountDetails>
                                <BankAccount>
                                    Bank Name: Paystack-Titan
                                </BankAccount>
                                <BankAccount>
                                    Account Name: liftnaija/lift Naija Manual Payment
                                </BankAccount>
                                <BankAccount>
                                   Account Number: 9880684051
                                </BankAccount>
                            </BankAccountDetails>
                            <CopyButton onPress={copyToClipboard}>
                                <CopyButtonText>
                                    Copy
                                </CopyButtonText>
                                
                            </CopyButton>
                        </BankBanner>
        </View>
    );
}

export default Funding;

