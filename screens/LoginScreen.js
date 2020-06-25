import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View,Image,AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote ,addCategory,addUserToken} from '../redux/appRedux'
import { startAsync } from 'expo/build/AR';

// import { Auth } from 'aws-amplify';
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
    // const { username, password } = this.state;
    // this.setState({userName:this.state.username});
    // dispatch(addCategory(1))
    // props.navigation.navigate('Root')
    console.log("props.app_state1",JSON.stringify(state));

    var reqObj = {};
    reqObj.username = "test";
    reqObj.password = "test";
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
          dispatch(addUserToken(response))
          dispatch(deletenote(1));
          // console.log("props.app_state",JSON.stringify(state.userInfo));
          // const state1 = useSelector(state => state)
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
        {/* <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder="confirmation Code"
        />
        <View style= {styles.inputButton}>
        <Button style
          title="Confirm Sign In"
          onPress={() => signIn()}
        />
        </View> */}

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
