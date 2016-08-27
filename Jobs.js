"use strict";
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

var moment=require('moment')
var PushPayload=require('./PushPayload.js')

class Jobs extends Component{
  constructor(props){
    super(props)
    var ds=new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 != r2
    })
    this.state={
      dataSource:ds,
      showProgress:true
    }
  }
  componentDidMount(){
    this.fetchJobs();
  }
  fetchJobs(){
    require('./AuthService').getAuthInfo((err,authInfo)=>{
      console.log(authInfo)
      var url="http://localhost:9000/maintenance-jobs?token="+authInfo.user
      fetch(url)
      .then((response)=>response.json())
      .then((responseData)=>{
        var upcomingJobsList=
            responseData.filter((job)=>
              job.jobDate>moment().format("YYYY-MM-DD")
            )
        console.log(upcomingJobsList)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(upcomingJobsList),
          showProgress:false
        })
      })
    })

  }
  pressRow(rowData){
    this.props.navigator.push({
      title: 'Job Details Page',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }
  renderRow(rowData){
    return (
      <TouchableHighlight
        onPress={()=>this.pressRow(rowData)}
        underlayColor='#ddd'>
        <View style={{
          flex:1,
          flexDirection:'row',
          padding:15,
          alignItems:'center',
          borderColor: '#D7D7D6',
          borderBottomWidth:1
        }}>
        <View style={{paddingLeft:0}}>
          <Text style={{paddingBottom:5,fontSize:16}}>
          Job Date/Time: {moment(rowData.jobDate+" "+rowData.jobTime).format('MMM-DD-YYYY hh:mm a')}
          </Text>
          <Text style={{fontSize:16}}>
          Rental Address : {rowData.rental.address1}
          </Text>
          <Text style={{}}></Text>
          </View>
        </View>
        </TouchableHighlight>
      )

  }
  render() {
    if(this.state.showProgress){
      return(
        <View style={{flex:1,justifyContent:'center'}}>
          <ActivityIndicator
            animating={true}
            size="large"/>
        </View>
        )
    }
    return(
      <View style={{flex:1,paddingTop:60,justifyContent:'flex-start'}}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)} />
      </View>
        )
  }
}


module.exports=Jobs