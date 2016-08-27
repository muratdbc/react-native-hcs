"use strict";
var AsyncStorage =require('react-native').AsyncStorage
var _=require('lodash')

const userKey = 'user';
class AuthService {
  getAuthInfo(cb){
    AsyncStorage.getItem(userKey,(err,val)=>{
      if(err){
        return cb(err)
      }
      if(!val){
        return cb()
      }
      console.log(val)

      var authInfo={user:val}


      return cb(null,authInfo)

    })
  }
  login(creds,cb){
    console.log(creds)
    var formBody = [];
    for (var property in creds) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(creds[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:9000/users/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response)=>{
      if(response.status>=200 && response.status <300){
        return response.json()
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
      console.log(response.accessToken)
      AsyncStorage.setItem(userKey,response.accessToken
        ,(err)=> {
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