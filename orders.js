import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Linking from 'expo-linking';
class Orders extends Component {
    constructor(props){
        super(props)
        this.state = {
            ordersList:[]
        }
        this.openGps = this.openGps.bind(this);
        this.dialCall = this.dialCall.bind(this);
    }
   async componentDidMount(){
    return fetch('http://demo8360259.mockable.io/clients')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            ordersList: responseJson.orders,
          });
      })
      .catch(error => {
        console.error(error);
      });
   }
   dialCall(phone){
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    }
    else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };
  openGps(location){
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${location.lat},${location.long}`;
    Linking.openURL(url);
  }
   _renderItem = ({item,index}) => {
     return(
         <View style={styles.item}>
             <View>
             <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
             </View>
             <View style={styles.icons}>
             <Icon style={styles.icon} name="location-arrow" size={25} color="#900" onPress={() => this.openGps(item.location)}/>
             <Icon style={styles.icon} name="phone" size={25} color="#900" onPress={() => this.dialCall(item.phone)}/>
             </View>
         </View>
     )
   }
   render() {
       let {ordersList} = this.state
      return (

         <View style={styles.container}> 
            <FlatList
            data={ordersList}
            renderItem={this._renderItem}
            keyExtractor={(item,index)=>index.toString()}
            />
         </View>
      )
   }
}
export default Orders

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item :{
        padding:10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
      fontSize: 18,
    },
    address:{
        fontSize: 12, 
    },
    icons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon:{
        padding:5
    }
  });