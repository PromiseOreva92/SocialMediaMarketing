import * as React from 'react';
import {Octicons} from '@expo/vector-icons';
const {secondary} = Colors;
import{ 
        ServicePage,
        ServiceContainer,
        ServiceLogo,
        ServiceLogoBox,
        ServiceText,
        ServiceCard,
        Colors,
        Nav,
        BackButton,
        NavTitle


} from './../components/styles';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Services = ({navigation})=>{
    return (
        <ServicePage>
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
                        
                <ScrollView>
                        <ServiceContainer>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Facebook',image:'./../assets/facebook.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/facebook.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Facebook
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Twitter',image:'./../assets/x-twitter.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/x-twitter.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Twitter
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Instagram',image:'./../assets/instagram.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/instagram.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Instagram
                                        </ServiceText>
                                                
                                </ServiceCard>

               
                        </ServiceContainer>

                        <ServiceContainer>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Youtube',image:'./../assets/youtube.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/youtube.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Youtube
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Telegram',image:'./../assets/telegram.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/telegram.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Telegram
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Tiktok',image:'./../assets/tik-tok.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/tik-tok.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Tik tok
                                        </ServiceText>
                                                
                                </ServiceCard>
                        </ServiceContainer>

                        <ServiceContainer>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen', {serviceName:'LinkedIn',image:'./../assets/linkedin.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/linkedin.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Linkedin
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Discord',image:'./../assets/discord.png'}
                                )}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/discord.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Discord
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Snapchat',image:'./../assets/snapchat.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/snapchat.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                SnapChat
                                        </ServiceText>
                                                
                                </ServiceCard>
                        </ServiceContainer>

                        <ServiceContainer>
                        <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Spotify',image:'./../assets/spotify.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/spotify.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Spotify
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Threads',image:'./../assets/threads.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/threads.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Threads
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard  onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Twitch',image:'./../assets/twitch.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/twitch.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Twitch
                                        </ServiceText>
                                                
                                </ServiceCard>
                        </ServiceContainer>

                        <ServiceContainer>
                                <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Reviews',image:'./../assets/customer-review.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/customer-review.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Reviews
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Web Traffic',image:'./../assets/analysis.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/analysis.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Web Traffic
                                        </ServiceText>
                                                
                                </ServiceCard>
                                <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Apple Music',image:'./../assets/sound-wave.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/sound-wave.png')}/>
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Apple Music
                                        </ServiceText>
                                                
                                </ServiceCard>
                        </ServiceContainer>

                        <ServiceContainer>
                                <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Whatsapp',image:'./../assets/whatsapp.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/whatsapp.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                Whatsapp
                                        </ServiceText>
                                                
                                </ServiceCard>

                                <ServiceCard   onPress={() => navigation.navigate('ServiceListScreen',{serviceName:'Clubhouse',image:'./../assets/clubhouse.png'})}>
                                        <ServiceLogoBox style={{alignItems: 'center',}}>
                                                <ServiceLogo source={require('./../assets/clubhouse.png')}/>
       
                                        </ServiceLogoBox>  
            
                                        <ServiceText>
                                                CLubhouse
                                        </ServiceText>
                                                
                                </ServiceCard>
                              
                        </ServiceContainer>
                        

                </ScrollView>        

                        

                        
        </ServicePage>
    );
}

export default Services;

