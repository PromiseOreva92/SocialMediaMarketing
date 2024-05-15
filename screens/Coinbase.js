import React, { useState,useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View,Text, Button, ActivityIndicator } from 'react-native';

import axios from 'axios';
const Coinbase = ({navigation,route})=>{

    // try {
    //     const response = await fetch(`https://api.commerce.coinbase.com/charges/${orderCode}`, {
    //       method: 'GET',
    //       headers: {
    //         'X-CC-Api-Key': apiKey,
    //       },
    //     });
    
    //     if (response.ok) {
    //       // Process the response if the order is valid
    //     } else {
    //       // Handle invalid order code or other errors
    //       console.error('Invalid order code or other error:', response.status);
    //     }
    //   } catch (error) {
    //     // Handle network or other errors
    //     console.error('Error:', error);
    //   }
    // // const coinbasePaymentUrl = 'https://commerce.coinbase.com/charges/c0c436ac-7206-43c6-80f2-66e895ae8b6b';
    // // const handleWebViewNavigation = (event) => {
    // //     const { url } = event;
        
    // //     // Check the URL for success or error patterns and take action accordingly.
    // //     if (url.includes('payment-success')) {
    // //       // Payment was successful
    // //       // You can navigate to a "Thank You" page or perform further actions.
    // //     } else if (url.includes('payment-failed')) {
    // //       // Payment failed
    // //       // Handle the error, show a message, or allow the user to try again.
    // //     }
    // //   };
    
//     const [orderCode, setOrderCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [paymentSuccess, setPaymentSuccess] = useState(false);
  
//     const apiKey = 'c0c436ac-7206-43c6-80f2-66e895ae8b6b'; // Replace with your actual API key
  
//     const createOrder = async () => {
//         try {
//           setLoading(true);

//     const orderData = {
//         name: 'Sample Product',
//         description: 'Description of the product',
//         local_price: {
//           amount: route.params.formData,
//           currency: 'USD',
//         },
//       };

//       console.log(apiKey)
//       const response = await axios.post('https://api.commerce.coinbase.com/charges', orderData, {
//         headers: {
//           'X-CC-Api-Key': apiKey,
//         },
//       });

//       if (response.status === 201) {
//         const { code } = response.data;
//         setOrderCode(code);
//       } else {
//         console.error('Error creating order:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       // Process the payment or order fulfillment here

//       // Set paymentSuccess to true upon successful payment
//       setPaymentSuccess(true);
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     } finally {
//       setLoading(false);
//     }
//   };




    // return <WebView source={{ uri: coinbasePaymentUrl }} />;

    // return (
    //     <View style={{marginTop:100}}>
    //       {loading ? (
    //         <ActivityIndicator />
    //       ) : orderCode ? (
    //         <Button title="Pay" onPress={handlePayment} disabled={paymentSuccess} />
    //       ) : (
    //         <Button title="Create Order" onPress={createOrder} />
    //       )}
    //     </View>
    //   );



    useEffect(() => {
        createCharge();
      }, []);


      const createCharge = async () => {

        const apiKey = 'c0c436ac-7206-43c6-80f2-66e895ae8b6b';
        const endpoint = 'https://api.commerce.coinbase.com/charges';
        const apiVersion = '2018-03-22';

        const requestData = {
            // Include your request data here in the same format as in 'data.json'
            // For example:
            name: 'Sample Product',
            description: 'Description of the product',
            pricing_type:"no_price",
            amount: route.params.formData,
            
          };
          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CC-Api-Key': apiKey,
                'X-CC-Version': apiVersion,
              },
              body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const responseData = await response.json();
                // Handle the response data here
                console.log('Charge created:', responseData);
              } else {
                // Handle errors
                console.error('Error creating charge:', response.status);
              }
            }
             catch (error) {
              // Handle network or other errors
              console.error('Error:', error);
            }
          
      };

      return (
        <Text>Done</Text>
      );

}

export default Coinbase;