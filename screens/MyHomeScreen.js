import React, { useState, useEffect } from 'react';
import { Text, View,Button,TouchableOpacity,LayoutAnimation, StyleSheet,ScrollView,
        FlatList,Image,Switch,TextInput, Platform, UIManager } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SearchBar} from 'react-native-elements';
import * as Location from 'expo-location';
import { setUserDetail} from '../redux/appRedux'

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
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
        console.log("userDetails "+state.userDetails)

        if(state.userDetails.activeOrder !== undefined && state.userDetails.activeOrder !== null){
            fetch("https://www.grocyshop.in/api/v1/order/getOrder/"+state.userDetails.activeOrder,{
                method:"GET",
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': 'Bearer ' + state.userInfo.token,
                    "Access-Control-Allow-Origin": "http://localhost:5000",
                }
                }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
                }).then((response)=>{
                console.log("active orders"+JSON.stringify(response));
                setPickupStatus(false);
                setActiveOrder(response);
                console.log("active "+response);
                for(var i=0; i< response.status.length; i++){
                    if(response.status[i].status == 'PICKED'){
                        console.log("status number "+i+" at id "+response.status[i].id);
                        setPickupStatus(true);
                    }
                    
                }
                }).catch((e) => {
                console.log(e);
            })
        }
        //setActiveOrder(order)
        
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    const getCurrentLocation = () => {
        console.log("fetching current location");
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
            );
          } else {
            (async () => {
              let { status } = await Location.requestPermissionsAsync();
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
              }
              console.log("getting location from google!");
              let location = await Location.getCurrentPositionAsync({});
              setLocation(location);
              console.log("location --> "+JSON.stringify(location))
              console.log("old user location --> "+JSON.stringify(userDetails))
              if(userDetails.currentLatitude !== location.coords.latitude 
                    || userDetails.currentLongitude !== location.coords.longitude){
                        userDetails.currentLatitude = location.coords.latitude;
                        userDetails.currentLongitude = location.coords.longitude;
                console.log("Updated location details --> "+JSON.stringify(userDetails)); 
                fetch("https://www.grocyshop.in/api/v1/delivery/addDeliveryBoy",{
                    method:"POST",
                    body:JSON.stringify(userDetails),
                    headers:{
                      "Content-type": "application/json; charset=UTF-8",
                      'Authorization': 'Bearer ' + state.userInfo.token,
                      "Access-Control-Allow-Origin": "http://localhost:5000",
                    }
                  }).then((response)=>{
                    if(!response.ok) throw new Error(response.status);
                    else return response.json();
                  }).then((response)=>{
                    console.log("delivery person"+JSON.stringify(response));
                    console.log("response.firstNme"+ response.firstNme)
                    setIsEnabled(previousState => response.active)
                    setUserDetails(response);
                    dispatch(setUserDetail(response));
                   
                  }).catch((e) => {
                    console.log(e);
                  })
                dispatch(setUserDetail(userDetails));     
              }
            })();
          };
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
          {/* <Button 
            title="Not Available"
            onPress={() => updateItemOfOrder(item.itemNum)}
          /> */}
        </View>
    );
    const updateStatus = (status) => {
        //to update the status
        //!!!!!HAVE to CHANGE API
        var reqBody ={
            "orderId": activeOrder.orderId,
            "retailerId": activeOrder.retailerId,
            "customerId": activeOrder.customerId,
            "status": status
        };
        fetch("https://www.grocyshop.in/api/v1/order/newStatus",{
            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + state.userInfo.token,
                "Access-Control-Allow-Origin": "http://localhost:5000",
            }
            }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
            }).then((response)=>{
            console.log("delivery person"+JSON.stringify(response));
            setPickupStatus(false)
            setActiveOrder(response)
            for(var i=0; i< response.status.length; i++){
                if(response.status[i].status == 'PICKED'){
                    console.log("status number "+i+" at id "+response.status[i].id);
                    setPickupStatus(true);
                }
                
            }
            }).catch((e) => {
            console.log(e);
        });
        
    }

    const recordPayment = () =>{
      updateStatus("DELIVERED");
    }
    const NoOrder = () => (
        <View style={styles.container}>
            <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
            <Text style={{color:'red',fontWeight:"400"}}> Check Network or No active order Available</Text>
        </View>
    );
    
    const HaveOrder = () => (
        <View style={{height: 200, marginTop:200}}>
            <Text>Order Id : {activeOrder.orderId}</Text>
            {pickupStatus ? 
                <>
                    <Text>Drop address : {activeOrder.address}</Text>
                    {activeOrder.paymentStatus !== "COD" ? 
                        <>
                            <Text>Amount to be collected - {activeOrder.totalCartValue}</Text>
                            <Button title="Record Payment" onPress ={()=> recordPayment()} />
                        </>
                        :
                        <>
                            <Button title="Delivered" onPress ={()=> updateStatus("DELIVERED")} />
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
                        <Button title="confirm" onPress={() => updateStatus("PICKED")}/>
                    </View>
                    
                    </View>
                </>
            }
           

        </View>
    );
    return(
        <SafeAreaView>
            <View style ={{marginTop:50, flex: 1 ,flexDirection: 'column',justifyContent: 'space-between', alignItems:'flex-start', alignSelf:'stretch'}}>
                <Text>Current Location:</Text>
                <Separator/>
                <View style ={{marginTop:60,flex:1 ,flexDirection: 'row',justifyContent:'space-between', alignItems:'center'}}>
                    
                    <Text style={{padding:30}}>{userDetails.currentLatitude}</Text>
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