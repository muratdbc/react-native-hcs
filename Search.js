"use strict";
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

var AsyncStorage =require('react-native').AsyncStorage

class Search extends Component{
  constructor(props){
    super(props)
  }
  onSignOutPressed(){
    var keys = 'user';
    AsyncStorage.removeItem(keys, (err) => {
      console.log(err)
        this.forceUpdate();
    });
  }
  render() {
    return(
      <View style={{flex:1,paddingTop:60,justifyContent:'flex-start'}}>
      <Text>Search</Text>
      <TouchableHighlight
              onPress={()=>this.onSignOutPressed()}
              style={styles.buttonSignout}>
              <Text style={styles.buttonText}>
              Sign Out
              </Text>
      </TouchableHighlight>
      </View>
        )
  }
}
var styles=StyleSheet.create({
  buttonSignout:{
    height:50,
    width:150,
    backgroundColor:'green',
    alignSelf:'stretch',
    marginTop:10,
    justifyContent:'center'
  },
  buttonText:{
    fontSize:22,
    color:'#FFF',
    alignSelf:'center'
  }
})


module.exports=Search