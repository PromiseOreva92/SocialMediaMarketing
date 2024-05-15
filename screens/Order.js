import React, { useEffect, useState,useContext } from 'react';
import { View, useWindowDimensions, Text, FlatList,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import { CartEmptyLogo,
         CartEmptyLogoContainer, 
         NotificationBox, 
         NotificationText, 
         OrderButton, 
         OrderButtonText,
         Colors,
         Nav,
         NavTitle,
         ServiceView,
         ServiceViewLogoBox,
         OrderNameBox,
         OrderName,
         OrderQuantity,
         MenuLine
        } from '../components/styles';

import axios from 'axios';
import {Octicons,Ionicons} from '@expo/vector-icons';

import { BASE_URL } from "@env";
import { UserContext } from '../components/UserContext';

const {secondary} = Colors;
const Order = ({navigation}) => {
const handleItemClick = (service_name,category_name,price,link,quantity,remain,status,created_at) => {
        // Handle the click event for the specific item
        navigation.navigate('OrderDetailsScreen',{
                service:service_name,
                category:category_name,
                price:price,
                link:link,
                quantity:quantity,
                category_id:remain,
                status:status,
                created_at:created_at}
                )
      };
const renderItem = ({ item,icon = "history",service }) => (
        <TouchableOpacity onPress={() => handleItemClick(item.service_name,item.category_name,item.price,item.link,item.quantity,item.remain,item.status,item.created_at)}>
              <View style={{ paddingVertical: 5,paddingHorizontal: 5, }}>
                  <ServiceView>
                    
                        <ServiceViewLogoBox>
                            <Octicons name={icon} size={20} color={secondary}/>
                        </ServiceViewLogoBox>
  
                        <OrderNameBox>
                            <OrderName>
                              {item.service_name}
                            </OrderName>
                            <OrderName>
                              Link: {item.link}
                            </OrderName>
                            <OrderQuantity>
                                Quantity: {item.quantity}
                            </OrderQuantity>
                        </OrderNameBox>
  
                        
                  </ServiceView>
              </View>
              <MenuLine/>
        </TouchableOpacity>
);


const renderCancelledItem = ({ item,icon = "close-circle",service }) => (
        <TouchableOpacity onPress={() => handleItemClick(item.service_name,item.category_name,item.price,item.link,item.quantity,item.remain,item.status,item.created_at)}>
              <View style={{ paddingVertical: 5,paddingHorizontal: 5, }}>
                  <ServiceView>
                    
                        <ServiceViewLogoBox>
                            <Ionicons name={icon} size={20} color={secondary}/>
                        </ServiceViewLogoBox>
  
                        <OrderNameBox>
                            <OrderName>
                              {item.service_name}
                            </OrderName>
                            <OrderName>
                              Link: {item.link}
                            </OrderName>
                            <OrderQuantity>
                                Quantity: {item.quantity}
                            </OrderQuantity>
                        </OrderNameBox>
  
                        
                  </ServiceView>
              </View>
              <MenuLine/>
        </TouchableOpacity>
);

const renderCompletedItem = ({ item,icon = "check-circle",service }) => (
        <TouchableOpacity onPress={() => handleItemClick(item.service_name,item.category_name,item.price,item.link,item.quantity,item.remain,item.status,item.created_at)}>
              <View style={{ paddingVertical: 5,paddingHorizontal: 5, }}>
                  <ServiceView>
                    
                        <ServiceViewLogoBox>
                            <Octicons name={icon} size={20} color={secondary}/>
                        </ServiceViewLogoBox>
  
                        <OrderNameBox>
                            <OrderName>
                              {item.service_name}
                            </OrderName>
                            <OrderName>
                              Link: {item.link}
                            </OrderName>
                            <OrderQuantity>
                                Quantity: {item.quantity}
                            </OrderQuantity>
                        </OrderNameBox>
  
                        
                  </ServiceView>
              </View>
              <MenuLine/>
        </TouchableOpacity>
);

const MyOrders = () => {

        const { userCredentials, setUserCredentials } = useContext(UserContext);
        
        useEffect(() => {
                const values = {
                  some_filter: userCredentials.userData.details.id,
                };
                let val = values.some_filter;
                  axios.get(`${BASE_URL}/api/all_orders/${val}`)
                    .then((response) => {
                        setAllOrder(response.data);
                      console.log(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching items:', error);
                    });
                }, 
        []);


        const [all_orders, setAllOrder] = useState([]);


        if (all_orders.length == 0) {

                return (
                        <View>
                                <CartEmptyLogoContainer>
                                        <CartEmptyLogo source={require('./../assets/empty-cart.png')}/>
                                </CartEmptyLogoContainer>
                                <NotificationBox>
                                        <NotificationText>
                                                You have No Completed Order
                                        </NotificationText>
                                </NotificationBox>
                                <OrderButton>
                                        <OrderButtonText>Place a New Order</OrderButtonText>
                                </OrderButton>
                        </View>
                        );
                } else {

                        return (
                        <View>
                                <FlatList
                                data={all_orders}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                />
                       </View>
                        );     
                }

};

const PendingOrders = () => {
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        const [pending_orders, setPendingOrder] = useState([]);

        useEffect(() => {
                const values = {
                  some_filter: userCredentials.userData.details.id,
                };
                let val = values.some_filter;
                  axios.get(`${BASE_URL}/api/pending_orders/${val}`)
                    .then((response) => {
                        setPendingOrder(response.data);
                      console.log(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching items:', error);
                    });
                }, 
              []);
        
      

                if (pending_orders.length == 0) {

                return (
                        <View>
                                <CartEmptyLogoContainer>
                                        <CartEmptyLogo source={require('./../assets/empty-cart.png')}/>
                                </CartEmptyLogoContainer>
                                <NotificationBox>
                                        <NotificationText>
                                                You have No Completed Order
                                        </NotificationText>
                                </NotificationBox>
                                <OrderButton onPress={() =>navigation.navigate('ServiceStack')}>
                                        <OrderButtonText>Place a New Order</OrderButtonText>
                                </OrderButton>
                        </View>
                        );
                } else {

                        return (
                        <View>
                                <FlatList
                                data={pending_orders}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                />
                       </View>
                        );     
                }

                


};



const ProcessingOrders = () => {
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        const [processed_orders, setProcessedOrder] = useState([]);

        useEffect(() => {
                const values = {
                  some_filter: userCredentials.userData.details.id,
                };
                // console.log(values.some_filter);

                let val = values.some_filter;
                  axios.get(`${BASE_URL}/api/processed_orders/${val}`)
                    .then((response) => {
                        setProcessedOrder(response.data);
                      console.log(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching items:', error);
                    });
                }, 
              []);
        
      

                if (processed_orders.length == 0) {

                return (
                        <View>
                                <CartEmptyLogoContainer>
                                        <CartEmptyLogo source={require('./../assets/empty-cart.png')}/>
                                </CartEmptyLogoContainer>
                                <NotificationBox>
                                        <NotificationText>
                                                You have No Completed Order
                                        </NotificationText>
                                </NotificationBox>
                                <OrderButton onPress={() =>navigation.navigate('ServiceStack')}>
                                        <OrderButtonText>Place a New Order</OrderButtonText>
                                </OrderButton>
                        </View>
                        );
                } else {

                        return (
                        <View>
                                <FlatList
                                data={processed_orders}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                />
                       </View>
                        );     
                }
}


const CompletedOrders = () => {
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        const [completed_orders, setCompletedOrder] = useState([]);

        useEffect(() => {
                const values = {
                  some_filter: userCredentials.userData.details.id,
                };
                
                let val = values.some_filter;
                  axios.get(`${BASE_URL}/api/completed_orders/${val}`)
                    .then((response) => {
                        setCompletedOrder(response.data);
                      console.log(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching items:', error);
                    });
                }, 
              []);
        
      

                if (completed_orders.length == 0) {

                return (
                        <View>
                                <CartEmptyLogoContainer>
                                        <CartEmptyLogo source={require('./../assets/empty-cart.png')}/>
                                </CartEmptyLogoContainer>
                                <NotificationBox>
                                        <NotificationText>
                                                You have No Completed Order
                                        </NotificationText>
                                </NotificationBox>
                                <OrderButton onPress={() =>navigation.navigate('ServiceStack')}>
                                        <OrderButtonText>Place a New Order</OrderButtonText>
                                </OrderButton>
                        </View>
                        );
                } else {

                        return (
                        <View>
                                <FlatList
                                data={completed_orders}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderCompletedItem}
                                />
                       </View>
                        );     
                }
}



const CancelledOrders = () => {
        const { userCredentials, setUserCredentials } = useContext(UserContext);
        const [cancelled_orders, setCancelledOrder] = useState([]);


        useEffect(() => {
                const values = {
                  some_filter: userCredentials.userData.details.id,
                };
                
                let val = values.some_filter;
                  axios.get(`${BASE_URL}/api/cancelled_orders/${val}`)
                    .then((response) => {
                        setCancelledOrder(response.data);
                      console.log(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching items:', error);
                    });
                }, 
              []);
        
      

                if (cancelled_orders.length == 0) {

                return (
                        <View>
                                <CartEmptyLogoContainer>
                                        <CartEmptyLogo source={require('./../assets/empty-cart.png')}/>
                                </CartEmptyLogoContainer>
                                <NotificationBox>
                                        <NotificationText>
                                                You have No Cancelled Order
                                        </NotificationText>
                                </NotificationBox>
                                <OrderButton onPress={() =>navigation.navigate('ServiceStack')}>
                                        <OrderButtonText>Place a New Order</OrderButtonText>
                                </OrderButton>
                        </View>
                        );
                } else {

                        return (
                        <View>
                                <FlatList
                                data={cancelled_orders}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderCancelledItem}
                                />
                       </View>
                        );     
                }      
};

const renderScene = SceneMap({
  all: MyOrders,
  pending: PendingOrders,
  processing: ProcessingOrders,
  completed: CompletedOrders,
  cancelled: CancelledOrders,
});






  
  const [processed_orders, setProcessedOrder] = useState([]);
  
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pending', title: 'Pending' },
    { key: 'processing', title: 'Processed' },
    { key: 'completed', title: 'Completed' },
    { key: 'cancelled', title: 'Cancelled' },
  ]);

  const renderTabBar = props => (

        <TabBar
          {...props}

          indicatorStyle={{ backgroundColor: 'black',fontSize:6, }}
          style={{ fontSize:10}}

          renderLabel={({ route, focused, color }) => (
                <Text style={{ color, margin: 5,fontSize:14,fontWeight:'bold' }}>
                  {route.title} 
                </Text>
              )}
        />
      )

  return (

        
        <View style={{flex: 1}}>
                <StatusBar  style='dark'/>
                <Nav>
                        <NavTitle>My Orders</NavTitle>
                </Nav>
                <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{backgroundColor:'white'}}
                />
        </View>

  );
}

export default Order;