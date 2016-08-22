"use strict";
var AsyncStorage =require('react-native').AsyncStorage
var _=require('lodash')

const userKey = 'user';
class AuthService {
  getAuthInfo(cb){
    AsyncStorage.multiGet([userKey],(err,val)=>{
      if(err){
        return cb(err)
      }
      if(!val){
        return cb()
      }
      var zippedObj=_.zipObject(val);

      var authInfo={user:zippedObj[userKey]}

      return cb(null,authInfo)

    })
  }
  login(creds,cb){
    var formBody = [];
    for (var property in creds) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(creds[property]);
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
      if(response.status>=200 && response.status <300){
        return response
      }
      throw{
        badCredentials:response.status==401,
        unknownError:response.status!=401
      }
    })
    .then((response)=>{
      return response
    })
    .then((response)=>{
      console.log(response._bodyText)
      AsyncStorage.multiSet([
        [userKey,response._bodyText]
        ],(err)=> {
          if(err){
            throw err;
          }
          return cb({success:true})
        })
    })
    .catch((err)=>{
      return cb(err)
    })
  }
}

module.exports=new AuthService