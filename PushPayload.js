"use strict";
import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
} from 'react-native';

var moment=require('moment')

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
  render(){
    return(
      <View style={{flex:1,paddingTop:80,justifyContent: 'flex-start',alignItems:'center'}}>
      <Text style={{paddingBottom:5}}>Job Date : {moment(this.state.pushEvent.jobDate).format("MMM DD YYYY")}</Text>
      <Text style={{paddingBottom:5}}>Job Time : {moment(this.state.pushEvent.jobDate+""+this.state.pushEvent.jobTime).format("hh:mm a")}</Text>
      <Text style={{paddingBottom:5}}>Rental Address : {this.state.pushEvent.rental.address1+" "+this.state.pushEvent.rental.address2
      +" "+this.state.pushEvent.rental.city+" "+this.state.pushEvent.rental.province+" "+this.state.pushEvent.rental.postalCode}</Text>
      <Text style={{paddingBottom:5}}>Company Name : {this.state.pushEvent.maintenanceCompany.maintenanceCompanyName}</Text>
      <Text style={{paddingBottom:5}}>Job Status : {this.state.pushEvent.maintenanceJobStatus.label}</Text>
      <Text style={{paddingBottom:5}}>Job Type : {this.state.pushEvent.maintenanceJobType.maintenanceJobTypeLabel}</Text>
      </View>
      )
  }
}

module.exports=PushPayload