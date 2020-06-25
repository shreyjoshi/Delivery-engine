import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,TextInput,Button,Card, ListItem,ScrollView, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import CardLayout from '../components/CardLayout';
import TabBarIcon from '../components/TabBarIcon';
import * as Location from 'expo-location';
import Accordian from '../components/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import {SearchBar} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';
import { setProductList,setInventoryList} from '../redux/appRedux'




export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeSelector,setActiveSelector]  = useState(null);
  const [search,setSearchState] = useState('');
  const [token,setToken] = useState(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [orderList,setOrderList] = useState(null);
  const [stringProd,setStringProd] = useState('');


  const users = [
   {
      name: 'brynn',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
   },
  ]
  const onChangeText =function(key, value) {
    this.setState({
      [key]: value,
    });
  }
  useEffect(() => {
    console.log("state.inventory",state.inventory);
    console.log("state.userInfo",state.userInfo);
      console.log("abc");
      console.log("token",token);
      setToken({token});
      fetch("https://www.grocyshop.in/api/v1/order/getAllOrders",{
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + state.userInfo.token,
            "Access-Control-Allow-Origin": "http://localhost:5000",
        }})
        .then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
            }).then((response)=>{
            console.log("response in  order Tab",response);
            let orderList = {};
            for(var  i =0;i<response.length;i++){
                console.log("here 123",response[i]["retailerId"]);
                if(response[i]["retailerId"] != "RET_000001"){
                    
                    continue;
                    }
                    console.log("here 1234");
                var statusLevel = response[i]["status"];
                var curr_status = "INITIATED";
                for(var status_index = 0;status_index<statusLevel.length;status_index++ ){
                    curr_status = statusLevel[status_index]["status"];
                }
                if(orderList[curr_status]==undefined){
                    orderList[curr_status] = [];
                    }

                    orderList[curr_status].push(response[i]);
                    console.log("here");
                    console.log("orderListbefore",orderList);

                    // if(i == response.length-1){
                        console.log("orderList",orderList);
                        setStringProd(JSON.stringify(orderList));
                        // setOrderList(orderList);
                        var finalList = [];
                        for(var key in orderList){
                            var temp = {};
                            temp["status"]  = key;
                            var val = orderList[key];
                            temp["orders"] = val;
                            finalList.push(temp);
                        }
                        console.log("finalList",finalList);
                        setOrderList(finalList);
                        // orderList.map((l, i) => (
                        //     console.log("l",l,"i",i)
                        //     ))
                    // }

                }
            
            
            }).catch((e)=>{(console.log(e))})
      setInterval(function(){
        fetch("https://www.grocyshop.in/api/v1/order/getAllOrders",{
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + state.userInfo.token,
            "Access-Control-Allow-Origin": "http://localhost:5000",
        }})
        .then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
            }).then((response)=>{
            console.log("response in  order Tab",response);
            let orderList = {};
            for(var  i =0;i<response.length;i++){
                console.log("here 123",response[i]["retailerId"]);
                if(response[i]["retailerId"] != "RET_000001"){
                    
                    continue;
                    }
                    console.log("here 1234");
                var statusLevel = response[i]["status"];
                var curr_status = "INITIATED";
                for(var status_index = 0;status_index<statusLevel.length;status_index++ ){
                    curr_status = statusLevel[status_index]["status"];
                }
                if(orderList[curr_status]==undefined){
                    orderList[curr_status] = [];
                    }

                    orderList[curr_status].push(response[i]);
                    console.log("here");
                    console.log("orderListbefore",orderList);

                    // if(i == response.length-1){
                        console.log("orderList",orderList);
                        setStringProd(JSON.stringify(orderList));
                        // setOrderList(orderList);
                        var finalList = [];
                        for(var key in orderList){
                            var temp = {};
                            temp["status"]  = key;
                            var val = orderList[key];
                            temp["orders"] = val;
                            finalList.push(temp);
                        }
                        console.log("finalList",finalList);
                        setOrderList(finalList);
                        // orderList.map((l, i) => (
                        //     console.log("l",l,"i",i)
                        //     ))
                    // }

                }
            
            
            }).catch((e)=>{(console.log(e))})
            console.log("hitting again");
    },300000)


    console.log('mounted',token);
  
  }, []);

  const updateSearch = search => {
    console.log("e.target.value",search)
    setSearchState({ search });
  };
  // const addNote =  note =>

  const signIn = function() {
    // const { username, password } = this.state;
    // this.setState({userName:this.state.username});
    dispatch(addnote(1))

    console.log("this.props.navigation"+props.navigation.navigate("Dashboard"));//navigation.navigate("Dashboard"))
    // Auth.signIn(username, password)
    //   .then(user => {
    //     this.setState({ user });
    //     console.log('successful sign in!');
    //   })
    //   .catch(err => console.log('error signing in!: ', err));
  }

  // useEffect(() => {
  //   // console.log("notes"+JSON.stringify(state));
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //     }
  //
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <SearchBar
        platform = "android" 
        placeholder="Type Here..."
        onChangeText={setSearchState}
        value={search}
      />
    {orderList && orderList.length && orderList.map((l, i) => (
      <Accordian 
                title = {l.status}
                data = {l.data}
                itemsList = {l.orders}
                typeOrders = {true}
                key = {i}
                keyValue = {i.toString()}
      />
      ))
      }

    </ScrollView>
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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  //   alignItems:'center',
  //   padding: 16,
  // },
});
