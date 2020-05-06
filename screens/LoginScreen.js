import React from 'react';
import { TextInput, Button, StyleSheet, Text, View,Image } from 'react-native';

// import { Auth } from 'aws-amplify';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    confirmationCode: '',
    user: {},
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  signIn() {
    const { username, password } = this.state;
    // Auth.signIn(username, password)
    //   .then(user => {
    //     this.setState({ user });
    //     console.log('successful sign in!');
    //   })
    //   .catch(err => console.log('error signing in!: ', err));
  }
  confirmSignIn() {
    // Auth.confirmSignIn(this.state.user, this.state.confirmationCode)
    //   .then(() => {
    //     console.log('successful confirm sign in!');
    //     this.props.screenProps.authenticate(true);
    //   })
    //   .catch(err => console.log('error confirming signing in!: ', err));
  }
  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://upload.wikimedia.org/wikipedia/commons/5/55/Emart_Logo.svg'}} />
        <TextInput
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder="username"
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder="password"
        />
        <View style= {styles.inputButton}>
        <Button style={styles.inputButton} title="Sign In" onPress={this.signIn.bind(this)} />
        <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder="confirmation Code"
        />
        <Button style
          title="Confirm Sign In"
          onPress={this.confirmSignIn.bind(this)}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingLeft:500,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
});
