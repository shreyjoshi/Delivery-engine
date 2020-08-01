import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,ScrollView,Image,Switch,TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SearchBar} from 'react-native-elements';
import { setUserDetail} from '../redux/appRedux'

export default function App(props) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState('');
  const [userDetails, setUserDetails] = useState(true);

  const toggleSwitch = (() => {
    var reqObj = {};
    reqObj.emailId = state.userInfo.userId;
    fetch("https://www.grocyshop.in/api/v1/delivery/updateDelivery",{
      method:"POST",
      body:JSON.stringify(reqObj),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + state.userInfo.token,
        "Access-Control-Allow-Origin": "http://localhost:5000",
      }
    }).then((response)=>{
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((response)=>{
      setIsEnabled(isEnabled => response.active)
    }).catch((e) => {
      console.log(e);
    })
  });
  
  const getUser =(() => {
    fetch("https://www.grocyshop.in/api/v1/delivery/getDeliveryPerson?id="+state.userInfo.userId,{
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
      console.log("delivery person"+JSON.stringify(response));
      console.log("response.firstNme"+ response.firstNme)
      setIsEnabled(previousState => response.active)
      setUserDetails(response);
      dispatch(setUserDetail(response));
     
    }).catch((e) => {
      console.log(e);
    })
  });

  const users =
   {
      name: 'brynn',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
   }

  useEffect(() => {
    console.log("state.userInfo",state.userInfo);
    getUser();
  }, []);
    return(
      <SafeAreaView style={styles.container}>

        <View style={{flex: 1 ,flexDirection: 'row',justifyContent: 'space-between', alignItems:'center', alignSelf:'stretch'}}>
          <Image style={styles.userImage} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}}></Image>
          <Text style={{color:'red',fontSize: 60,fontWeight: 'bold', marginRight:30}}> {userDetails.firstNme} </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', alignSelf:'stretch'}}>
          <Text style={{color:'red',fontSize:40, fontWeight: 'bold', marginLeft:4}}> DUTY </Text>
          <Switch
            value={isEnabled}
            trackColor={{false:'#767577', true:'#81b0ff'}}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={{marginRight:50}}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.field}>{userDetails.firstNme}</Text>
          <Text style={styles.field}>{userDetails.lastName}</Text>
          <Text style={styles.field}>{userDetails.mobileNo}</Text>
          <Text style={styles.field}>{userDetails.emailId}</Text>
          <Text style={styles.field}>{userDetails.identityProof}</Text>
          <Text style={styles.field}>{userDetails.verified}</Text>
        </ScrollView>
        
      <View >
        
      </View>  
  
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      width:'auto',
      
       justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: '#fafafa',
    },
    scrollView: {
      width:'100%',
      flex : 1,
      backgroundColor: '#fff',
      marginHorizontal: 20,
      paddingVertical: 15,
      height:1000
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
    userImage:{
      height: 80,
      resizeMode:'contain',
      width:80,
      marginLeft:10
    },
    field:{
      fontSize:30,
      fontWeight: 'bold',
      marginTop:50,
      paddingVertical: 15,
      padding:0,
      color:'red',
      alignItems:"center",
      alignSelf:"center"

    }
  });