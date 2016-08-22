"use strict";
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      showProgress:false
    }
  }
  render() {
    return (
        <View style={styles.container}>
        <Image style={styles.logo}
        source={require('image!rentlever_logo_iphone')} />
        <TextInput
        onChangeText={(text)=>this.setState({username:text})}
        style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
        onChangeText={(text)=>this.setState({password:text})}
        style={styles.input} placeholder="Password"
        secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight
        onPress={this.onLoginPressed.bind(this)}
        style={styles.button}>
        <Text style={styles.buttonText}>
        Log in
        </Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}>
        </ActivityIndicator>
        </View>

      )
  }
  onLoginPressed(){
    console.log("Attempting to log in with username "+ this.state.username)
    this.setState({showProgress:true})
    var details = {
      email: this.state.username,
      password: this.state.password
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody)

    fetch('http://localhost:9000/users/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response)=>{
      console.log(response.status)
      return response.json
    })
    .then((results)=>{
      console.log(results)
      this.setState({showProgress:false})
    })
  }
}
var styles=StyleSheet.create({
  container:{
    backgroundColor: '#F5FCFF',
    flex:1,
    paddingTop:80,
    alignItems:'center',
    padding:10
  },
  logo:{
      width:150,
      height:75,
      marginBottom:50
  },
  heading:{
    fontSize:30,
    marginTop:30
  },
  input:{
    height:50,
    marginTop:10,
    padding:4,
    fontSize:18,
    borderWidth:1,
    borderColor:'#48bbec'
  },
  button:{
    height:50,
    backgroundColor:'#48bbec',
    alignSelf:'stretch',
    marginTop:10,
    justifyContent:'center'
  },
  buttonText:{
    fontSize:22,
    color:'#FFF',
    alignSelf:'center'
  },
  loader:{
    marginTop:20
  }
})
module.exports= Login;