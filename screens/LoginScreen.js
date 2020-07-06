import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View,Image,AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote ,addCategory,addUserToken,addUserName} from '../redux/appRedux'

export default function Login(props) {
  const dispatch = useDispatch()
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');

  const onChangeText =function(key, value) {
    if(key =="username")
      setUserName(value);
    else if(key == "password")
      setPassword(value);
  }
  const state = useSelector(state => state)

  // const addNote =  note =>

  useEffect (() =>{
    if(state.userInfo.token && state.userInfo.token!='')
      {
        async () => {
          try {
            await AsyncStorage.setItem('token',state.userInfo.token );
            props.navigation.navigate('Root');

          } catch (error) {
            // Error saving data
          }
        };
      }
  })

  const signIn = function() {
    console.log("props.app_state1",JSON.stringify(state));
    if(userName==undefined || userName == '' || password == undefined || password == '' ){
      alert("Enter Valid Username/Password");
      return;
    }
    var reqObj = {};
    reqObj.username = "test";
    reqObj.password = "test";
    props.navigation.navigate('Root');
    fetch("https://www.grocyshop.in/authenticate",{
      method: "POST",
      body:JSON.stringify(reqObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:5000",
      }})
      .then((response)=>{
        if(!response.ok) throw new Error(response.status);
        else return response.json();
        }).then((response)=>{
          console.log("response",response);
          dispatch(addUserName(userName))
          dispatch(addUserToken(response))
          dispatch(deletenote(1));
          console.log("props.app_state",JSON.stringify(state));
               AsyncStorage.setItem('token',response.token );
              props.navigation.navigate('Root');
  
          

        }).catch((e)=>{(console.log(e))})
           console.log("this.props.navigation",props.navigation);
  }
  
    return (
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
        
        <TextInput
          onChangeText={value => onChangeText('username', value)}
          style={styles.input}
          placeholder="username"
          value = {userName}
        />
        <TextInput
          onChangeText={value => onChangeText('password', value)}
          style={styles.input}
          value = {password}
          secureTextEntry={true}
          placeholder="password"
        />
        <View style= {styles.inputButton}>
        <Button style={styles.inputButton} title="Sign In" onPress={signIn} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingLeft:50,
    width:500,
    margin: 10,
  },
  inputButton: {
    height: 50,
    width:400,
    margin: 10,
  },
  image:{
    height: 100,
    resizeMode:'contain',
    width:500,
    margin: 7,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    padding: 16,
  },
});
