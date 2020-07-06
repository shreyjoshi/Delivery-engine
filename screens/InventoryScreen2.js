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
import { setProductList} from '../redux/appRedux'



export default function App() {
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
      console.log("in inventory2");
    let stateProductList = state.products;
    let stateInventoryList = state.inventory;
    var response = [];
    for(var key in stateProductList){
        var catItemList = stateProductList[key];
        console.log("catItemList",catItemList);
        console.log("stateInventoryList",stateInventoryList,"stateInventoryList.length",stateInventoryList.length);
        for(var j=0;j<catItemList.length;j++){
            for(var i = 0;i<stateInventoryList.length;i++){
                console.log('catItemList[j]["id"]',catItemList[j]["id"]);
                console.log('stateInventoryList[i]["product_id"]',stateInventoryList[i]["product_id"]);
                if(stateInventoryList[i]["product_id"] == catItemList[j]["id"]){
                    console.log("in if 1");
                    if(stateInventoryList[i]["retailer_id"] == state.userInfo.userId){
                        console.log("in if 2");
                        var temp_product = catItemList[j];
                        temp_product["added"] = true;
                        temp_product["inventory_obj"] = stateInventoryList[i];
                        response.push(temp_product);
                        break;
                    }
                }
                    
            }
        }
    }
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
    // console.log("tempList",tempList);

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
