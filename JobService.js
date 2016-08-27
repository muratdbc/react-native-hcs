"use strict";
var authService= require('./AuthService')
class JobService {
  acceptJob(key,cb){
    authService.getAuthInfo((err,authInfo)=>{
    var formBody = [];
    var jobAcceptForm = {
      acceptJob: true
    }
    for (var property in jobAcceptForm) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(jobAcceptForm[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:9000/job/'+key+'/accept?token='+authInfo.user, {
      method: 'PUT',
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
      return cb({success:true})
    })
    .catch((err)=>{
      return cb(err)
    })
    })
  }
}
module.exports=new JobService