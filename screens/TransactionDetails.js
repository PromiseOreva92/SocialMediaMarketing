import React, {  } from 'react';
import { View } from 'react-native';
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
    MenuLine,
 } from './../components/styles';
 import { StatusBar } from 'expo-status-bar';
 const {secondary} = Colors;


 const TransactionDetails = ({navigation,route}) =>{
    
    
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
                <NavTitle>Transaction Details</NavTitle>
            </Nav>
            <DetailsContainer>
            <DetailsCard>
                <DetailBox>
                        <Subject>
                            Amount:
                        </Subject>
                        <DetailsAmount>
                        {route.params.trx_type}{'\u20A6'}{Number(route.params.amount).toLocaleString("en-US",
                                {style: 'decimal', minimumFractionDigits: 2,maximumFractionDigits: 2,})
                            }
                        </DetailsAmount>
                </DetailBox>
                <DetailBox>
                            
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

                </DetailsCard>
                <DetailsCard>
                    <DetailBox>
                            <Subject>
                                Details:
                            </Subject>
                            <Details>
                                {route.params.details}
                            </Details>
                    </DetailBox>
                    <MenuLine/>
                    <DetailBox>
                            <Subject>
                                Remark:
                            </Subject>
                            <Details>
                                {route.params.remark}
                            </Details>
                    </DetailBox>
                </DetailsCard>
            </DetailsContainer>
            
            
        </View>
    );
 }

 export default TransactionDetails;