import { View, FlatList,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Octicons} from '@expo/vector-icons';

import { BASE_URL } from "@env";
import { 
  ServiceView,
  ServiceViewLogoBox,
  ServiceNameBox,
  ServiceName,
  ServiceMinimum,
  ServicePriceText,
  Colors,
  Nav,
  BackButton,
  NavTitle,
  NotificationBox,
  NotificationText,
  CartEmptyLogo,
  CartEmptyLogoContainer,
  ServiceEmptyNotice
 } from '../components/styles';
 import { StatusBar } from 'expo-status-bar';

 const {secondary} = Colors;

const ServiceList = ({route,navigation})=>{


    const [items, setItems] = useState([]);

    useEffect(() => {
    
    

      const values = {
        some_filter: route.params.serviceName,
      };
      let val = values.some_filter;
      console.log("val: "+val)
        axios.get(`${BASE_URL}/api/services/${val}`)
          .then((response) => {
            setItems(response.data);
            console.log(items.length);
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
      }, []);

    const handleItemClick = (itemTitle,itemMin,itemPrice,serviceId,categoryId,apiProviderId,apiServiceId) => {
      // Handle the click event for the specific item
      navigation.navigate('PurchaseScreen',{title:itemTitle,min:itemMin,price:itemPrice,service_id:serviceId,category_id:categoryId,api_provider_id:apiProviderId,api_service_id:apiServiceId})
    };
    const renderItem = ({ item,icon = "check-circle" }) => (
      <TouchableOpacity onPress={() => handleItemClick(item.name,item.min,item.price_per_k,item.id,item.category_id,item.api_provider_id,item.api_service_id)}>
            <View style={{ padding: 10 }}>
                <ServiceView>
                  
                      <ServiceViewLogoBox>
                          {/* <ServiceViewLogo source={''}/> */}
                          <Octicons name={icon} size={20} color={secondary}/>
                      </ServiceViewLogoBox>

                      <ServiceNameBox>
                          <ServiceName>
                            {item.name}
                          </ServiceName>
                          <ServicePriceText>
                          {'\u20A6'}{item.price_per_k}
                          </ServicePriceText>
                          <ServiceMinimum>
                              Minimum {item.min}
                          </ServiceMinimum>
                      </ServiceNameBox>

                      
                </ServiceView>
            </View>
      </TouchableOpacity>
    );


    if (items.length == 0) {
        return(
          <View style={{backgroundColor:'white',flex: 1}}>
              <StatusBar  style='dark'/> 
              <Nav>
                  <BackButton onPress={() => navigation.goBack()}>
                    <Octicons
                        name="arrow-left"
                        size={24} // Adjust the size as needed
                        color={secondary} // Adjust the color as needed
                      />
                  </BackButton>
                  <NavTitle>{route.params.serviceName} Services</NavTitle>
              </Nav>
              <ServiceEmptyNotice>
                <CartEmptyLogoContainer>
                          <CartEmptyLogo source={require('./../assets/empty-list.png')}/>
                  </CartEmptyLogoContainer>
                  <NotificationBox>
                          <NotificationText>
                                  Unavailable
                          </NotificationText>
                  </NotificationBox>
              </ServiceEmptyNotice>
                  
              
          </View>
        );    
    } else {
        return(
          <View style={{backgroundColor:'white'}}>
              <StatusBar  style='dark'/> 
              <Nav>
                  <BackButton onPress={() => navigation.goBack()}>
                    <Octicons
                        name="arrow-left"
                        size={24} // Adjust the size as needed
                        color={secondary} // Adjust the color as needed
                      />
                  </BackButton>
                  <NavTitle>{route.params.serviceName} Services</NavTitle>
              </Nav>

              <FlatList
                  data={items}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                />
          </View>
      );
    }
    
};


export default ServiceList;