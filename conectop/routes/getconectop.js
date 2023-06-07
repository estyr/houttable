//console.log("in conectop")
var express = require('express');
var router = express.Router();
var config = require('../../config.json')
var ws_url = config.serviceurltest;
var soap = require('soap');
//var log = require('../conectoplogger/logger').log


//var donationlog = require('../conectoplogger/donationlogger ').log
//var donationlog = require('../nedarimlogger/donationlogger ').log
const fs = require('fs');
/*function createdonationid(lastid,callbake)
  {
    if(!lastid){
      lastid="0"
    }
    console.log("last id"+lastid)
    var now = new Date()
    var newid=parseInt(lastid)+1
    console.log("new id"+newid)
    if(newid>9999999&!fs.existsSync('./nedarimplus/nedarimlogger/logsnedarim/donation/0000001'+(now.getMonth() + 1).toString().padStart(2, 0)+now.getFullYear()+'.xml'))
    newid="1"
    newid=newid.toString();
    while (newid.length < 7) newid = "0" + newid;
    var newid =newid+ (now.getMonth() + 1).toString().padStart(2, 0)+now.getFullYear() ;
    console.log(newid)
    callbake(newid)
  }*/
router.all('/', function(req, res, next) {
//console.log(log.info +"sssssssssssss")
var resultcrm=0;
//log.info(req.body)
//log.info(JSON.stringify(req.body))

    var xmltocrm=req.body.xml
            //donationlog.info(xmltocrm,req.body.donationid,false)
           // console.log(log.info)
           // log.info('|xml before send to crm xmlstr|'+xmltocrm);   
             console.log("after")
              soap.createClient(ws_url, function(err, client) {
                 if (err) { console.log(err); 
                 
                 //  donationlog.info(xmltocrm,req.body.donationid,true)
                 // log.info('|xml after send to crm error xmlstr: |'  +xmltocrm+'|   err:   |'+err); 
                 }
                 client.SetDonationWWithStringAnswer( {
                   myXml: xmltocrm,}, function(err, result) {
                    
                     if (err) {  console.log("err ", err);
                  //  donationlog.info(xmltocrm,req.body.donationid,true)
                  // log.info('|xml after send to to crm error xmlstr: |'+xmltocrm+'|   err   |'+err); 
                  }
                     console.log(result.SetDonationWWithStringAnswerResult)
                     if(result.SetDonationWWithStringAnswerResult=="OK"){
                       res.send({
                        crmresult: result.SetDonationWWithStringAnswerResult
                       });
                     // log.info('|xml after send to to crm OK xmlstr: |'+xmltocrm + '|crm resualt:|'+result.SetDonationWWithStringAnswerResult);
                     }
                     else{
                     

                      ///
                      res.send({
                        crmresult: result.SetDonationWWithStringAnswerResult
                       });
                      ////
                    //  log.info('|xml after send to to crm error xmlstr: |'+xmltocrm+'|   err   |'+err);
                      //  donationlog.info(xmltocrm,req.body.donationid,true)
                     }
                    // log.info('|xml after send to to crm error xmlstr: |'+xmltocrm);
                   });
               })


        })
module.exports = router;