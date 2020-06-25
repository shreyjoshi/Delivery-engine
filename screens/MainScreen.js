import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,TextInput,Button,Card, ListItem,ScrollView, AsyncStorage,Image } from 'react-native';
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


const list = [
  { 
    title: 'Non Veg Biryanis', 
    data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    itemsList :[
      {  id:1,
         name: 'itemOne',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "42mins"
      },
      {  id:2,
         name: 'itemSecond',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "45mins",
       },
     ]
  },
  { 
    title: 'Pizzas',
    data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.',
    itemsList:[
      {  id:1,
         name: 'itemOne',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "42mins"
      },
      {  id:2,
         name: 'itemSecond',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "45mins",
       },
     ]
  },
  { 
   title: 'Drinks',
   data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.',
   itemsList:[
    {  id:1,
       name: 'itemOne',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
       deliveryTime: "42mins"
    },
    {  id:2,
       name: 'itemSecond',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
       deliveryTime: "45mins",
     },
   ]
  },
  { 
    title: 'Deserts',
    data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    itemsList:[
      {  id:1,
         name: 'itemOne',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "42mins"
      },
      {  id:2,
         name: 'itemSecond',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "45mins",
       },
     ]
  },
];


export default function App(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeSelector,setActiveSelector]  = useState(null);
  const [search,setSearchState] = useState('');
  const [token,setToken] = useState(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [productsList,setProductsList] = useState(null);
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
    // if(state.userInfo== undefined ||state.userInfo.token==undefined|| state.userInfo.token==''){
    //   console.log("here");
    //   props.navigation.navigation("Log");
    // }
    console.log("state.userInfo",state.userInfo);
      console.log("abc");
      console.log("token",token);
      setToken({token});
      fetch("https://www.grocyshop.in/api/v1/product/getAllProduct",{
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
          console.log("response",response);
          var temp  = {};
          var productsList = [];

          for(var i = 0;i<response.length;i++){
            var category = response[i]["category"];
            if(temp[category] == undefined || temp[category].length==0)
              {
                temp[response[i]["category"]]=[];
              }
              console.log("-->i");
              console.log(response[i]);
              temp[category].push(response[i]);
              console.log('temp[response[i]["category"]]');
              console.log(temp[category]);
              if(i==response.length-1){
                // temp = JSON.parse(temp);
                console.log("temp123",JSON.stringify(temp));
                for (var key in temp) {
                  // if(temp.hasOwnProperty(key)){
                  console.log("key1",key,temp[key]);
                    var val = temp[key];
                    console.log("key",key);
                    console.log("var",val);
                    var temp_var = {};
                    temp_var.category  = key;
                    temp_var.itemsList = val
                    productsList.push(temp_var);
                  // }
      
                }
                console.log("productsList",productsList);
                setProductsList(productsList);
                var stringTemp = JSON.stringify(productsList);
                setStringProd(stringTemp);
                console.log(stringProd);
              }
            }
          
          dispatch(setProductList(temp));
          console.log(temp);
          var productsList = [];
        
        }).catch((e)=>{(console.log(e))})


        fetch("https://www.grocyshop.in/api/v1/retailer/getAllInventory",{
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
              console.log("in inventory response",response)
              dispatch(setInventoryList(response));
            }).catch((e)=>{(console.log(e))})


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
    {/* <Text>:->{stringProd}</Text> */}
    {(productsList==undefined || productsList.length<1) && 
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
      <Text style={{color:'red',fontWeight:"400"}}> Check Network or No Item Available</Text>
      </View>
    }
    {productsList && productsList.length && productsList.map((l, i) => (
      <Accordian 
                title = {l.category}
                data = {l.data}
                itemsList = {l.itemsList}
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
