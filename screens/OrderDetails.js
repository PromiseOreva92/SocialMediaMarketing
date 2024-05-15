import React, { useEffect, useState } from 'react';
import { View,ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Octicons} from '@expo/vector-icons';
import{
    Colors,
    Details,
    Subject,
    DetailBox,
    Nav,
    BackButton,
    NavTitle,
    DetailsCard,
    DetailsContainer,
    DetailsAmount,
    Status,
    MenuLine,
 } from './../components/styles';
 const {secondary} = Colors;


 const OrderDetails = ({navigation,route}) =>{

    const [status,setStatus] = useState('Pending');
    let val;
    useEffect(() => {
        if (route.params.status == 0) {
            val = "Pending"
        } else if(route.params.status == 1) {
            val = "Processing"
        }else if(route.params.status == 2) {
            val ='Completed'
        }else if(route.params.status == 3) {
            val = 'Cancelled'
        }

        setStatus(val)
      }, [route.params.status]);
    
    
    return(
        <View style={{flex:1}}>
            <StatusBar  style='dark'/>  
            <Nav>
                <BackButton onPress={() => navigation.goBack()}>
                  <Octicons
                      name="arrow-left"
                      size={24} // Adjust the size as needed
                      color={secondary} // Adjust the color as needed
                    />
                </BackButton>
                <NavTitle>Order in Details</NavTitle>
            </Nav>
            <ScrollView style={{flexGrow: 1}}>
                <DetailsContainer>
                    <DetailsCard>
                        <DetailBox>
                                <Subject>
                                    Amount Paid:
                                </Subject>
                                <DetailsAmount>
                                    {'\u20A6'}{Number(route.params.price * route.params.quantity).toLocaleString("en-US",
                                        {style: 'decimal', minimumFractionDigits: 2,maximumFractionDigits: 2,})
                                    }
                                </DetailsAmount>
                        </DetailBox>

                    </DetailsCard>
                    <DetailsCard>
                        <DetailBox>
                                <Subject>
                                    Service:
                                </Subject>
                                <Details>
                                    {route.params.service}
                                </Details>
                        </DetailBox>
                        <MenuLine/>
                        <DetailBox>
                                <Subject>
                                    Category:
                                </Subject>
                                <Details>
                                    {route.params.category}
                                </Details>
                        </DetailBox>
                    </DetailsCard>

                    <DetailsCard>
                        <DetailBox>
                                <Subject>
                                    Link:
                                </Subject>
                                <Details>
                                    {route.params.link}
                                </Details>
                        </DetailBox>
                        <MenuLine/>
                        <DetailBox>
                                <Subject>
                                    Quantity:
                                </Subject>
                                <Details>
                                    {route.params.quantity}
                                </Details>
                        </DetailBox>
                        <MenuLine/>
                        <DetailBox>
                                <Subject>
                                    Category:
                                </Subject>
                                <Details>
                                    {route.params.category}
                                </Details>
                        </DetailBox>
                        <MenuLine/>
                        <DetailBox>
                                <Subject>
                                    Date/Time:
                                </Subject>
                                <Details>
                                {new Date(route.params.created_at).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                            })
                                }
                                </Details>
                        </DetailBox>
                        <MenuLine/>
                        <DetailBox>
                                <Status>
                                    {status}
                                </Status>
                        </DetailBox>

                    </DetailsCard>
                </DetailsContainer>
            </ScrollView>

            
            
        </View>
    );
 }

 export default OrderDetails;