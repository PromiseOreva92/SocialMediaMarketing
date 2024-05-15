import React,{useContext,useEffect} from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import { BASE_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
const Pay = ({ route,navigation }) => {
  const { balance } = route.params;
  const { userCredentials, setUserCredentials } = useContext(UserContext);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar  style='dark'/> 
      <Paystack  
        paystackKey="pk_test_1a0a4c6deb6a0d4eb4a34e21dc82d7a450a271dc"
        billingName={userCredentials.userData.details.firstname+ " "+userCredentials.userData.details.lastname}
        amount={route.params.formData}
        billingEmail={userCredentials.userData.details.email}
        billingMobile={userCredentials.userData.details.mobile}
        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
        activityIndicatorColor="blue"
        onCancel={() => navigation.goBack()}
        onSuccess={(res) => {

            const values = {
              user_id: userCredentials.userData.details.id,
              amount:route.params.formData
            };
            
              axios.post(`${BASE_URL}/api/paystack_topup`,values)
                .then((response) => {
                  if(response.data.status){
                    const userDetails = response.data.user;
                    const userSettings = response.data.setting;
                    const userData = {
                      'details': userDetails,
                      'settings':userSettings,
                    }
                    console.log("response: "+userData);
                  }

                    

                    navigation.goBack();
                })
                .catch((error) => {
                  console.error('Error fetching items:', error);
                  navigation.goBack();
                });

          
        }}
        autoStart={true}
      />
    </View>
  );
}

export default Pay;