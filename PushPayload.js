"use strict";
import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native';

var moment=require('moment')
var jobService= require('./JobService')

class PushPayload extends Component{
  constructor(props){
    super(props)
    var ds=new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 != r2
    })
    this.state={
     dataSource: ds.cloneWithRows(props.pushEvent),
            pushEvent: props.pushEvent
    }
  }
  onAcceptPressed(){
    jobService.acceptJob(this.state.pushEvent.maintenanceJobKey,(results)=>{
      console.log(results)
      if(results.success){
        console.log(this.state.pushEvent.maintenanceJobKey)
        console.log(this.state.pushEvent.maintenanceJobStatusId)
        this.state.pushEvent.maintenanceJobStatusId=20;
        this.forceUpdate()
      }else{
        console.log("something went wrong")
      }
    })
  }
  onRejectPressed(){
    console.log(this.state.pushEvent.maintenanceJobKey)
  }
  onStartPressed(){

  }
  render(){
    var buttons;
    console.log(this.state.pushEvent.maintenanceJobStatusId)
    if(this.state.pushEvent.maintenanceJobStatusId==10){
      buttons= <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-around',paddingTop:80}}>
              <TouchableHighlight
              onPress={()=>this.onAcceptPressed()}
              style={styles.buttonAccept}>
              <Text style={styles.buttonText}>
              Accept
              </Text>
              </TouchableHighlight>
              <TouchableHighlight
              onPress={()=>this.onRejectPressed()}
              style={styles.buttonReject}>
              <Text style={styles.buttonText}>
              Reject
              </Text>
              </TouchableHighlight>
              </View>
    }else if(this.state.pushEvent.maintenanceJobStatusId==20){
      buttons= <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-around',paddingTop:80}}>
              <TouchableHighlight
              onPress={this.onStartPressed()}
              style={styles.buttonStart}>
              <Text style={styles.buttonText}>
              Start
              </Text>
              </TouchableHighlight>
              </View>
    }else{

    }
    return(
      <View>
      <View style={{flex:1,paddingTop:80,paddingLeft:10,justifyContent: 'flex-start'}}>
        <Text style={styles.jobDetails}>Job Key : {this.state.pushEvent.maintenanceJobKey}</Text>
        <Text style={styles.jobDetails}>Job Date/Time : {moment(this.state.pushEvent.jobDate).format("MMM-DD-YYYY hh:mm a")}</Text>
        <Text style={styles.jobDetails}>Rental Address : {this.state.pushEvent.rental.address1+" "+this.state.pushEvent.rental.address2
        +" "+this.state.pushEvent.rental.city+" "+this.state.pushEvent.rental.province+" "+this.state.pushEvent.rental.postalCode}</Text>
        <Text style={styles.jobDetails}>Rental WIFI : {this.state.pushEvent.rental.wifiNetworkName}</Text>
        <Text style={styles.jobDetails}>Rental WIFI Password : {this.state.pushEvent.rental.wifiNetworkPassword}</Text>
        <Text style={styles.jobDetails}>Job Status : {this.state.pushEvent.maintenanceJobStatus.label}</Text>
        <Text style={styles.jobDetails}>Job Type : {this.state.pushEvent.maintenanceJobType.maintenanceJobTypeLabel}</Text>
        </View>
        {buttons}
        </View>
      )
  }
}

var styles=StyleSheet.create({
  jobDetails:{
    paddingBottom:8,
    fontSize:18
  },
  buttonAccept:{
    height:50,
    width:150,
    backgroundColor:'green',
    alignSelf:'stretch',
    marginTop:10,
    justifyContent:'center'
  },
  buttonStart:{
    height:50,
    width:150,
    backgroundColor:'blue',
    alignSelf:'stretch',
    marginTop:10,
    justifyContent:'center'
  },
  buttonReject:{
    height:50,
    width:150,
    backgroundColor:'red',
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

module.exports=PushPayload