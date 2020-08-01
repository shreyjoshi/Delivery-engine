import React, { useState, useEffect } from 'react';
import { Text, View,Button,TouchableOpacity,LayoutAnimation, StyleSheet,ScrollView,
        FlatList,Image,Switch,TextInput, Platform, UIManager } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SearchBar} from 'react-native-elements';

const Separator = () => (
    <View style={styles.separator} />
  );

export default function App(props){
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState('');
    const [userDetails, setUserDetails] = useState('');
    const [activeOrder, setActiveOrder] = useState('');
    const [pickupStatus, setPickupStatus] = useState('');
    const [expanded, setExpanded] = useState(false);
    var order = {   
    "orderId": "O_000004",
    "retailerId": "RET_000001",
    "customerId": "s@s.com",
    "totalCartValue": 11000.00,
    "address": "xxxxxx",
    "deliveryBoy": "d@d.com",
    "deliveryNote": "deliver at door",
    "paymentStatus": "COD",
    "pickUpAddress": "High Court",
    "orderList": [
        {
            "itemNum": 18,
            "inventoryId": "IVT000001",
            "quantity": 2,
            "discountCode": "",
            "discountPercentage": 0.00,
            "totalItemValue": 11000.00,
            "order": "O_000004"
        }
    ],
    "status": [
        {
            "id": 19,
            "orderId": "O_000004",
            "retailerId": "RET_000001",
            "customerId": "s@s.com",
            "eventTimestamp": 1592132402000,
            "updatedTimeStamp": 1592132402000,
            "status": "INITIATED"
        },
        {
            "id": 21,
            "orderId": "O_000004",
            "retailerId": "RET_000001",
            "customerId": "s@s.com",
            "eventTimestamp": 1592132780000,
            "updatedTimeStamp": 1592132780000,
            "status": "ACCEPTED"
        },
        {
            "id": 22,
            "orderId": "O_000004",
            "retailerId": "RET_000001",
            "customerId": "s@s.com",
            "eventTimestamp": 1592132780000,
            "updatedTimeStamp": 1592132780000,
            "status": "ASSIGNED"
        }
    ]
    }
    useEffect(() => {
        setUserDetails(state.userDetails);
        setActiveOrder(order)
        setPickupStatus(true)
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    const getCurrentLocation = () => {
        alert(activeOrder)
        setActiveOrder(order)
        console.log("fetching current location");
     };

    const toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded( !expanded)
        console.log(expanded)
      }
  
    const updateItemOfOrder = (itemNum) => {
        alert(itemNum+" Not Available");
    }
    const renderItem = ({ item }) => (
        
        <View style={styles.item}>
          <Text style={styles.title}>{item.itemNum}</Text>
          <Text style={styles.title}>{item.inventoryId}</Text>
          <Button 
            title="Not Available"
            onPress={() => updateItemOfOrder(item.itemNum)}
          />
        </View>
    );
    
    const NoOrder = () => (
        <View style={styles.container}>
            <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
            <Text style={{color:'red',fontWeight:"400"}}> Check Network or No active order Available</Text>
        </View>
    );
    
    const HaveOrder = () => (
        <View>
            <Text>Order Id : {activeOrder.orderId}</Text>
            {pickupStatus ? 
                <>
                    <Text>Drop address : {activeOrder.address}</Text>
                    {activeOrder.paymentStatus == "COD" ? 
                        <>
                            <Button title="Record Payment" onPress ={()=> recordPayment()} />
                        </>
                        :
                        <>
                            <Button title="Delivered" onPress ={()=> updateStatus()} />
                        </>
                    }
                </>
                :
                <>
                    <Text>PickUp address : {activeOrder.pickUpAddress}</Text>
                    <View>
                    <TouchableOpacity onPress={()=>toggleExpand()} >
                        <Text>Record Pickup</Text>
                    </TouchableOpacity>
                    <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
                        <FlatList
                            data={activeOrder.orderList}
                            renderItem={renderItem}
                            keyExtractor={item => ""+item.itemNum}
                        />
                       
                    </View>
                    <Button title="confirm" onPress={() => updateStatus()}/>
                    </View>
                </>
            }
           

        </View>
    );
    return(
        <SafeAreaView>
            <View style ={{flex: 2 ,flexDirection: 'column',justifyContent: 'space-between', alignItems:'flex-start', alignSelf:'stretch'}}>
                <Text>Current Location:</Text>
                <Separator/>
                <View style ={{flex: 1 ,flexDirection: 'row',justifyContent: 'space-between', alignItems:'center', alignSelf:'stretch'}}>
                    
                    <Text>{userDetails.currentLatitude}</Text>
                    <Button
                        title="Refresh"
                        onPress={getCurrentLocation}
                    />
                </View>
            </View>
                
            {activeOrder == undefined ? <NoOrder/> : <HaveOrder/> }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:null,
        
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fafafa',

      },
      scrollView: {
        width:'100%',
    
        backgroundColor: '#fff',
        marginHorizontal: 20,
      },
      contentContainer: {
        paddingTop: 15,
      },
      optionIconContainer: {
        marginRight: 12,
      },
      option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
      },
      lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      paragraph: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
      },
      input: {
        height: 50,
    
        width:500,
        margin: 10,
      },
      inputButton: {
        height: 50,
        width:'55%',
        margin: 10,
      },
      image:{
        height: 100,
        resizeMode:'contain',
        width:500,
        margin: 7,
      },
    
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
});