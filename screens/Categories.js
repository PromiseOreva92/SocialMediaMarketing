import { View, FlatList,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Octicons} from '@expo/vector-icons';

import { BASE_URL } from "@env";
import { 
  CategoryName,
  CategoryViewLogoBox,
  CategoryView,
  CategoryNameBox,
  Colors,
  Nav,
  BackButton,
  NavTitle,
  MenuLine,
 } from '../components/styles';
 const {secondary} = Colors;

const Categories = ({route,navigation})=>{
    const { serviceName } = route.params.serviceName;
    // const { image,setImage } = useState([]);
    
    const [items, setItems] = useState([]);


    useEffect(() => {
    //   setImage(route.params.image);
      const values = {
        some_filter: route.params.serviceName,
      };
      let val = values.some_filter;
        axios.get(`${BASE_URL}/api/categories/${val}`)
          .then((response) => {
            setItems(response.data);
            // console.log(response.data)
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
      }, []);

    const handleItemClick = (itemTitle,itemId) => {
      // Handle the click event for the specific item
      navigation.navigate('ServiceListScreen',{title:itemTitle,id:itemId})
    };
    const renderItem = ({ item,icon = "check-circle" }) => (
      <TouchableOpacity onPress={() => handleItemClick(item.name,item.id)}>
            <View style={{ padding: 10 }}>
                <CategoryView>
                  
                      <CategoryViewLogoBox>
                          <Octicons name={icon} size={20} color={secondary}/>
                      </CategoryViewLogoBox>

                      <CategoryNameBox>
                          <CategoryName>
                            {item.name}
                          </CategoryName>
                      </CategoryNameBox>
                     
                </CategoryView>
                 
            </View>
      </TouchableOpacity>
    );


    return(
        <View>
            <Nav>
                <BackButton onPress={() => navigation.goBack()}>
                  <Octicons
                      name="arrow-left"
                      size={24} // Adjust the size as needed
                      color={secondary} // Adjust the color as needed
                    />
                </BackButton>
                <NavTitle>{route.params.serviceName} Categories</NavTitle>
            </Nav>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
              />
        </View>
    );
};


export default Categories;