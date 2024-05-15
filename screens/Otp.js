import {useRef,useEffect} from 'react';
import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Keyboard,ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Toast from "react-native-root-toast";
import{
    StyledContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledButton,
    ButtonText,
    LogoContainer,
    ExtraView,
    TextLink,
    TextLinkContent,
    Line,
    Colors } from './../components/styles';

import { BASE_URL } from "@env";
import axios from 'axios';
export const OTPInputSection = styled.View`
    justify-content:center;
    align-items:center;
    margin-vertical:30px;
`;

export const OTPInput = styled.View`
    border:2px solid ${Colors.secondary};
    min-width:15%;
    border-radius:5px;
    padding:12px;
`;


// container
export const OTPInputText = styled.Text`
        font-size:18px;
        font-weight:bold;
        text-align:center;
        color:${Colors.secondary};
`;




export const HiddenTextInput = styled.TextInput`
    position:absolute;
    width:1px;
    height:1px;
    opacity:0;
`;

export const OTPInputContainer = styled.Pressable`
    width:70%;
    flex-direction:row;
    justify-content:space-around;

`;

export const OTPInputFocused= styled(OTPInput)`
    border-color: ${Colors.secondary};
    background-color:rgba(1,100,204,0.5);
    color:#ffffff;
`;


const Otp = ({route,navigation}) => {
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading state
    const MAX_CODE_LENGTH = 4;
    const handleButtonPress =  ()=>{
        if (code.length < 4) {
           alert("Please Enter a complete OTP code") 
        } else {
            setLoading(true); 
            const values = {
                'email': route.params.email,
                'otp': code
              };
            axios.post(`${BASE_URL}/api/otp_check`,values)
            .then(response=>{
                if (response.data.status) {
                    
                    navigation.navigate('ChangePassword',{email:route.params.email})
                } else {
                   Toast.show(response.data.messages,{duration: Toast.durations.LONG,})
                   setLoading(false); 

                }
            })
            .catch(error=>{
                Toast.show("Please Check your connection",{duration: Toast.durations.LONG,})
                console.log('Error:',error)
                setLoading(false); 
            })
        }
          
    }
    return (
        <StyledContainer>
            <StatusBar  style='dark'/>
            <Pressable onPress={Keyboard.dismiss}>
                    <LogoContainer>
                        <PageLogo resizeMode="cover" source={require('./../assets/logo.png')} />
                        <PageTitle>Verify If its You</PageTitle>
                        <SubTitle>Enter the OTP received in your email</SubTitle>
                    </LogoContainer>

                    <OTPInputField
                        setPinReady={setPinReady}
                        code={code}
                        setCode={setCode}
                        maxLength={MAX_CODE_LENGTH} 
                        value={code}
                    />



                    <StyledButton onPress={loading ? null : handleButtonPress}
                    style={{
                        backgroundColor:!pinReady ? Colors.lightSecondary : Colors.secondary,
                    }}>
                                {
                                    loading? 
                                    ( <ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText>Confirm</ButtonText>)
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




            </Pressable>
        </StyledContainer>
    );
};




const OTPInputField = ({setPinReady,code, setCode, maxLength})=>{
    const codeDigitsArray = new Array(maxLength).fill(0);
    //ref for text input
    const textInputRef = useRef(null);

    const [inputContainerIsFocused,setInputContainerIsFocused] = useState(false);


    const handleOnBlur = ()=>{
        setInputContainerIsFocused(false);
    };

    const handleOnPress = ()=>{
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    };

    const handleInputChange = (text) => {
        setCode(text);
      };


    useEffect(()=>{
        setPinReady(code.length === maxLength)
        return () => setPinReady(false);
    }, [code]);


    const toCodeDigitInput = (_value, index)=>{
        const emptyInputChar = " ";
        const digit = code[index] || emptyInputChar;

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength-1; 
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const StyledOTPInput = inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;
        return(
            <StyledOTPInput key={index}>
                <OTPInputText>{digit}</OTPInputText>
            </StyledOTPInput>
        );

    };


 
    return (
        <OTPInputSection>
            <OTPInputContainer onPress={handleOnPress}>
                    {codeDigitsArray.map(toCodeDigitInput)}
            </OTPInputContainer>
            <HiddenTextInput
                value={code}
                onChangeText={handleInputChange}
                maxLength={maxLength}
                keyboardType="number-pad"
                returnKeyType="done"
                textContentType="oneTimeCode"
                ref={textInputRef}
                onBlur={handleOnBlur}
            />
        </OTPInputSection>
    );
};


export default Otp;