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
    var errorCtrl=<View/>;
    if(!this.state.success && this.state.badCredentials){
      errorCtrl=<Text style={styles.error}>
      The email and password you entered do NOT match.
      </Text>
    }
    if(!this.state.success && this.state.unknownError){
      errorCtrl=<Text style={styles.error}>
      Something went wrong! please try again later.
      </Text>
    }
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
        {errorCtrl}
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
    var authService= require('./AuthService')
    authService.login(details,(results)=>{
      this.setState(Object.assign({
        showProgress:false
      },results));
      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
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
  },
  error:{
    color:'red',
    marginTop:10
  }
})
module.exports= Login;