import React,{useState,useContext} from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Toast from "react-native-root-toast";
import {Formik} from 'formik';
import axios from 'axios';
import { BASE_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import {Octicons} from '@expo/vector-icons';
import{
    StyledFormArea,
    LeftPersonalIcon,
    PersonalButton,
    ButtonText,
    Colors,
    PersonalTextInput,
    PurchaseTitle,
    Nav,
    BackButton,
    NavTitle,
    UrlMsg,
    QtyMsg,
    StyledButton,
 } from './../components/styles';
 import { UserContext } from '../components/UserContext';

 const {brand,darkLight,secondary} = Colors;

function deleteLastDigit(val) {
            // Convert the number to a string, remove the last character, and convert it back to a number
            return Number(val.slice(0, -1));
  }
const PurchaseService = ({ navigation,route }) =>{
    const { userCredentials, setUserCredentials } = useContext(UserContext);
    const [loading, setLoading] = useState(false); // State to track loading state
    const [amount, setAmount] = useState('');
    const [urlError, setUrlError] = useState('');
    const [qtyError, setQtyError] = useState('');
    const [qty, setQuantity] = useState('');
    const [web_link, setWebLink] = useState('');
    const [purchaseData,setPurchase] = useState([]);


    const handleKeyPress = (event) => {
        const key = event.nativeEvent.key;
        const isNumber = !isNaN(key); 

        if (isNumber) {
            val = qty+event.nativeEvent.key;
            setAmount(val * (route.params.price/1000))
          } else {
                    if (event.nativeEvent.key === 'Backspace') {
                        const result = deleteLastDigit(qty);
                        setAmount(result * (route.params.price/1000))

                    }
          }
      };


      const purchase_service = ()=>{
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        setLoading(true); 
        if (web_link =="") {
            setUrlError("Please Give us your web link")
            Toast.show("Please Give us your web link", {
                duration: Toast.durations.SHORT,
              });
              setLoading(false); 

        } else if(!urlPattern.test(web_link)){
            setUrlError("Link must start with...https://")
            Toast.show("Your web link is not correct", {
                duration: Toast.durations.LONG,
              });

              setLoading(false); 
            
        }
         else if(qty < route.params.min){
            setQtyError("Quantity must not be less than "+route.params.min)
            Toast.show("Quantity must not be less than "+route.params.min, {
                duration: Toast.durations.LONG,
              }); 
              setLoading(false);     
        }

        else{
            const val = {
                user_id : userCredentials.userData.details.id,
                category_id: route.params.category_id,
                service_id: route.params.service_id,
                api_service_id: route.params.api_service_id,
                link:web_link,
                api_provider_id: route.params.api_provider_id,
                quantity:qty,
                remain:qty,
                price:route.params.price,                
            }

            axios.post(`${BASE_URL}/api/place_order`,val)
            .then(response=>{
                if (response.data.status) {
                    Toast.show(response.data.message, {
                        duration: Toast.durations.LONG,
                    }); 
                    setLoading(false); 
                } else {
                    Toast.show(response.data.message, {
                        duration: Toast.durations.LONG,
                    }); 
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
            <View style={{ alignItems:'center'}}>
                    <StatusBar  style='dark'/>
                    <Nav>
                        <BackButton onPress={() => navigation.goBack()}>
                        <Octicons
                        name="arrow-left"
                        size={24} // Adjust the size as needed
                        color={secondary} // Adjust the color as needed
                        />
                        </BackButton>
                        <NavTitle>All Services</NavTitle>
                </Nav>
                    <PurchaseTitle>{route.params.title}</PurchaseTitle>
                    <Text style={{color:brand}}>Price/1000 units: {'\u20A6'}{route.params.price}</Text>
                    <Formik initialValues={{link:web_link,quantity:qty}}
                        onSubmit={purchase_service}

                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea style={{marginTop:20,paddingHorizontal:20}}>

                            <UrlMsg>
                                {urlError}
                            </UrlMsg>
                            <MyTextInput 
                                label="Link" 
                                icon="link-external" 
                                placeholder="Enter Your Url: (https:sample-url.com)" 
                                placeholderTextColor={brand}
                                onChangeText={text => setWebLink(text)}
                                onBlur={handleBlur('link')}
                                value={web_link}
                                keyboardType="url"
                            />

                            <QtyMsg>
                                {qtyError}
                            </QtyMsg>
                            <MyTextInput 
                                label="Quantity" 
                                icon="note" 
                                placeholder="Enter the Quantity you need" 
                                placeholderTextColor={brand}
                                onChangeText={text => setQuantity(text)}
                                onBlur={handleBlur('quantity')}
                                onKeyPress={handleKeyPress}
                                value={qty}
                                keyboardType="decimal-pad"
                            />

                            <Text style={{color:brand}}>Min:{route.params.min}</Text>


                            


                            <PersonalButton onPress={loading ? null : handleSubmit}>
                                {
                                    loading? 
                                    ( <ActivityIndicator size="small" color="#ffffff" />)
                                    :
                                    (<ButtonText onPress={handleSubmit}>Purchase: {'\u20A6'}{amount}</ButtonText>)
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
        </View>
    )
}

export default PurchaseService;