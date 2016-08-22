/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

var Login=require('./Login');
var AppContainer=require('./AppContainer');
var AuthService=require('./AuthService');

var HCS =React.createClass({

  componentDidMount:function(){
      AuthService.getAuthInfo((err,authInfo)=>{
        console.log(authInfo)
        this.setState({
          checkingAuth:false,
          isLoggedIn: authInfo != null
        })
      });
  },

  render: function(){
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loader}>
        </ActivityIndicator>
        </View>
        )

    }
    if(this.state.isLoggedIn){
      return(
        <AppContainer/>
        )
    }else{
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  },
  onLogin:function() {
    this.setState({isLoggedIn:true});
  },
  getInitialState:function(){
    return {
      isLoggedIn:false,
      checkingAuth:true
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HCS', () => HCS);
