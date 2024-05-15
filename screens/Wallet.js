import React, { useEffect, useState,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import Toast from "react-native-root-toast";
import { View, FlatList,TouchableOpacity,ScrollView,RefreshControl,StyleSheet } from 'react-native';
import axios from 'axios';
import {Octicons,Ionicons} from '@expo/vector-icons';
import { BASE_URL } from "@env";
import{ 
        PageContainer,
        Summary,
        Balance,
        BalanceLabel,
        ButtonContainer,
        AddNaira,
        OtherCurrency,
        BtnText,
        NotificationBox,
        NotificationText,
        CartEmptyLogo,
        CartEmptyLogoContainer,
        ServiceView,
         ServiceViewLogoBox,
         OrderNameBox,
         OrderName,
         OrderQuantity,
         MenuLine,
         Colors,
         Offset


} from './../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {secondary} = Colors;
import { UserContext } from '../components/UserContext';
const Wallet = ({navigation})=>{

        const [refreshing, setRefreshing] = React.useState(false);
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        const [transactions, setTransactions] = useState([]);
        const message = ()=>{
                Toast.show("Feature Unavailable..Coming Soon",{duration: Toast.durations.SHORT,})
        }
        useEffect(() => {
                const values = {
                  some_filter: userCredentials.userData.details.id,
                };
                let val = values.some_filter;
                  axios.get(`${BASE_URL}/api/transactions/${val}`)
                    .then((response) => {
                        setTransactions(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching items:', error);
                    });
                }, 
        []);

        const refreshCredentials =(credentials) =>{
                AsyncStorage.setItem('user',JSON.stringify(credentials))
                .then(()=>{
                setUserCredentials(credentials)
                })
                .catch((error)=>{console.log(error)})
        }

        const onRefresh = React.useCallback(() => {
                setRefreshing(true);
                axios.get(`${BASE_URL}/api/fetch_user/${userCredentials.userData.details.id}`)
                .then(response =>{

                        const userDetails = response.data.user;
                        const userSettings = response.data.setting;
                        const userData = {
                            'details': userDetails,
                            'settings':userSettings,
                        } 

                        refreshCredentials({userData})                                               
                })
                .catch(error=>{
                        console.log('Error:',error)
                    })
                setTimeout(() => {
                  setRefreshing(false);
                }, 2000);
        }, []);
        let balance;
        if(userCredentials !== null){
               balance =  userCredentials.userData.details.balance
        }else{
                balance = "0.00"
        }

        const handleItemClick = (amount,trx_type,details,remark,created_at) => {
                // Handle the click event for the specific item
                navigation.navigate('TransactionDetailsScreen',{
                        amount:amount,
                        trx_type:trx_type,
                        details:details,
                        remark:remark,
                        created_at:created_at}
                        )
              };
        const renderItem = ({ item,icon = "history",service }) => (
                <TouchableOpacity onPress={() => handleItemClick(item.amount,item.trx_type,item.details,item.remark,item.created_at)}>
                      <View style={{ paddingVertical: 5,paddingHorizontal: 5, }}>
                          <ServiceView>
                            
                                <ServiceViewLogoBox>
                                    <Octicons name={icon} size={20} color={secondary}/>
                                </ServiceViewLogoBox>
          
                                <OrderNameBox>
                                    <OrderName>
                                    Amount : {item.trx_type}{'\u20A6'}{Number(item.amount).toLocaleString("en-US",
                                {style: 'decimal', minimumFractionDigits: 2,maximumFractionDigits: 2,})}
                                    </OrderName>
                                    <OrderName>
                                      Item: {item.details}
                                    </OrderName>
                                    <OrderName>
                                      Remark: {item.remark}
                                    </OrderName>
                                    <OrderQuantity>
                                        Transaction Date: {new Date(item.created_at).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                        })
                                                }
                                    </OrderQuantity>
                                </OrderNameBox>
          
                                
                          </ServiceView>
                      </View>
                      <MenuLine/>
                </TouchableOpacity>
        );


        if (transactions.length == 0) {
                return (
                       


                        <PageContainer>
                                <StatusBar  style='dark'/>
                                <Summary>
                                        <BalanceLabel>Your Wallet Balance</BalanceLabel>
                                        <Balance>
                                        {'\u20A6'}{Number(balance).toLocaleString("en-US",
                                        {style: 'decimal', minimumFractionDigits: 2,maximumFractionDigits: 2,})
                                        }
                                        </Balance> 
                                        <ButtonContainer>
                                                <AddNaira onPress={() =>navigation.navigate('FundingScreen')}>
                                                        <BtnText>
                                                                Fund with Naira {'\u20A6'}
                                                        </BtnText>
                                                </AddNaira>
                                                <OtherCurrency onPress={message}>
                                                        <BtnText>
                                                                Fund with Crypto
                                                                <Ionicons name="logo-bitcoin" size={18} color="white"/>
                                                        </BtnText>
                                                </OtherCurrency>
                                        </ButtonContainer>
                        
                                </Summary>
                                <Offset/>
                                <CartEmptyLogoContainer>
                                        <CartEmptyLogo source={require('./../assets/people.png')}/>
                                </CartEmptyLogoContainer>
                                <NotificationBox>
                                        <NotificationText>
                                                You have no recent transaction
                                        </NotificationText>
                                </NotificationBox>
                        </PageContainer>


                    );                
        } else {
                return (


                     


                        <PageContainer>
                                <StatusBar  style='dark'/>
                                <Summary>
                                        <BalanceLabel>Your Wallet Balance</BalanceLabel>
                                        <Balance>
                                        {'\u20A6'}{Number(balance).toLocaleString("en-US",
                                        {style: 'decimal', minimumFractionDigits: 2,maximumFractionDigits: 2,})
                                        }
                                        </Balance> 
                                        <ButtonContainer>
                                                <AddNaira onPress={() =>navigation.navigate('FundingScreen')}>
                                                        <BtnText>
                                                                Fund with Naira {'\u20A6'}
                                                        </BtnText>
                                                </AddNaira>
                                                <OtherCurrency onPress={message}>
                                                        <BtnText>
                                                                Fund with Crypto
                                                                <Ionicons name="logo-bitcoin" size={18} color="white"/>
                                                        </BtnText>
                                                </OtherCurrency>
                                        </ButtonContainer>
                        
                                </Summary>
                                <Offset/>       
                                <FlatList
                                data={transactions}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                      }
                                />
                       </PageContainer>


                        );   
        }


}
const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        scrollView: {
          flex: 1,
          backgroundColor: 'pink',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
export default Wallet;