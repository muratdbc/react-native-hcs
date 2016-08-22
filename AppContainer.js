"use strict";
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

var Jobs=require('./Jobs')

class AppContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      selectedTab:'jobs'
    }
  }
  render() {
    return(
        <TabBarIOS style={styles.container}>
          <TabBarIOS.Item
            title='Jobs'
            selected={this.state.selectedTab=='jobs'}
            icon={require('image!schedule')}
            onPress={()=>this.setState({selectedTab: 'jobs'})}
            >
            <Jobs/>
            </TabBarIOS.Item>
            <TabBarIOS.Item
            title='Search'
            selected={this.state.selectedTab=='search'}
            icon={require('image!schedule')}
            onPress={()=>this.setState({selectedTab: 'search'})}
            >
            <Text style={styles.welcome}>
              Tab 2
            </Text>
            </TabBarIOS.Item>
        </TabBarIOS>
        )
  }
}
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
});

module.exports=AppContainer