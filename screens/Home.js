import React,{ useContext, useState, useEffect, useRef  } from 'react';
import { ScrollView,RefreshControl,StyleSheet,PanResponder, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Toast from "react-native-root-toast";
import {Ionicons} from '@expo/vector-icons';
import { BASE_URL } from "@env";
import{ 
        PageContainer,
        Header,
        GreetingText,
        Greeting,
        Summary,
        Colors,
        Balance,
        BalanceLabel,
        ButtonContainer,
        AddNaira,
        OtherCurrency,
        BtnText,
        SocialTitle,
        SocialContainer,
        SocialLogo,
        SocialLabel,
        SocialTag,
        SocialTagText,
        SocialWriter,
        SocialLine,
        SocialLogoContainer,
        SeeOthers,
        SeeOthersText,
        Offset


} from './../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/UserContext';
const Home = ({navigation})=>{
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        const [refreshing, setRefreshing] = React.useState(false);
        const refreshCredentials =(credentials) =>{
                AsyncStorage.setItem('user',JSON.stringify(credentials))
                .then(()=>{
                setUserCredentials(credentials)
                })
                .catch((error)=>{console.log(error)})
        }

        // on swipe refresh
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
                        Toast.show("Error",{duration: Toast.durations.LONG,})
                    })
                setTimeout(() => {
                  setRefreshing(false);
                }, 2000);
        }, []);

        let balance;
        if(userCredentials !== null){
               balance =  userCredentials.userData.details.balance
               firstname =  userCredentials.userData.details.firstname

        }else{
                balance = "0.00"
                firstname = "Anonymous"
        }
       
        

        const currentTime = new Date();
        const hours = currentTime.getHours();
        let greeting;

        // Determine the greeting based on the time of day
        if (hours < 12) {
          greeting = 'Good morning '+ firstname;
        } else if (hours < 17) {
          greeting = 'Good afternoon '+ firstname;
        } else {
          greeting = 'Good evening '+ firstname;
        }

        const message = ()=>{
                Toast.show("Feature Unavailable..Coming Soon",{duration: Toast.durations.LONG,})
        }









    return (
        

        <ScrollView
                
                contentContainerStyle={styles.scrollView}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <PageContainer>     

                        <StatusBar  style='dark'/>        
                        <Summary style = {styles.summary}>
                                <Header>
                                        <Greeting>
                                                <GreetingText>
                                                        {greeting}
                                                </GreetingText>
                                        </Greeting>
                                </Header>
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

                        

                        <SocialTitle>
                                Increase Your Followers
                                
                        </SocialTitle>

                        <SocialContainer onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Facebook',image:'./../assets/facebook.png'})}>
                                <SocialLogoContainer>
                                   <SocialLogo source={require('./../assets/facebook.png')}/>
                                </SocialLogoContainer>
                                
                                <SocialLabel>
                                        <SocialTag>
                                                <SocialTagText>
                                                Facebook
                                                </SocialTagText> 
                                        </SocialTag>
                                        <SocialWriter>Increase your followers in facebook</SocialWriter>
                                </SocialLabel>
                        </SocialContainer>
                        <SocialLine/>

                        <SocialContainer  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Instagram',image:'./../assets/instagram.png'})}>
                                <SocialLogoContainer>
                                   <SocialLogo source={require('./../assets/instagram.png')}/>
                                </SocialLogoContainer>
                                
                                <SocialLabel>
                                        <SocialTag>
                                                <SocialTagText>
                                                Instagram
                                                </SocialTagText> 
                                        </SocialTag>
                                        <SocialWriter>Increase your followers in Instagram</SocialWriter>
                                </SocialLabel>
                        </SocialContainer>
                        <SocialLine/>

                        <SocialContainer  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'X Twitter',image:'./../assets/x-twitter.png'})}>
                                <SocialLogoContainer>
                                   <SocialLogo source={require('./../assets/x-twitter.png')}/>
                                </SocialLogoContainer>
                                
                                <SocialLabel>
                                        <SocialTag>
                                                <SocialTagText>
                                                Twitter
                                                </SocialTagText> 
                                        </SocialTag>
                                        <SocialWriter>Increase your followers in Twitter</SocialWriter>
                                </SocialLabel>
                        </SocialContainer>
                        <SocialLine/>

                        <SocialContainer  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Tiktok',image:'./../assets/tik-tok.png'})}>
                                <SocialLogoContainer>
                                   <SocialLogo source={require('./../assets/tik-tok.png')}/>
                                </SocialLogoContainer>
                                
                                <SocialLabel>
                                        <SocialTag>
                                                <SocialTagText>
                                                Tik-Tok
                                                </SocialTagText> 
                                        </SocialTag>
                                        <SocialWriter>Increase your followers on Tik-Tok</SocialWriter>
                                </SocialLabel>
                        </SocialContainer>
                        <SocialLine/>

                        <SocialContainer onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Telegram',image:'./../assets/telegram.png'})}>
                                <SocialLogoContainer>
                                   <SocialLogo source={require('./../assets/telegram.png')}/>
                                </SocialLogoContainer>
                                
                                <SocialLabel>
                                        <SocialTag>
                                                <SocialTagText>
                                                Telegram
                                                </SocialTagText> 
                                        </SocialTag>
                                        <SocialWriter>Increase your followers in Telegram</SocialWriter>
                                </SocialLabel>
                        </SocialContainer>
                        <SocialLine/>

                        <SeeOthers onPress={() =>navigation.navigate('ServiceStack')}>
                                <SeeOthersText>See All</SeeOthersText>
                        </SeeOthers>
                        

                        
        </PageContainer>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        scrollView: {
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },

        summary:{
                // Shadow properties for iOS
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,

                // Elevation property for Android
                elevation: 80,
        }
      });
export default Home;

