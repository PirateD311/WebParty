/**
 * Created by Administrator on 2015/11/23 0023.
 */
/**
 * Created by Administrator on 2015/11/21 0021.
 */
var express = require("express");
var router=express.Router();

SUCCESS={"code":1,"info":"CreateSuccess!"};
ERROR_2={"code":2,"info":"Input Error"};
ERROR_3={"code":3,"info":"用户密码错误"};
ERROR_4={"code":4,"info":"数据库异常"};
router.post('/',function(req,res,next){
    var input_m=["PartyName","PartyDescription","PartyLocale","PartyDate","PartyAverCost"];
    console.log("创建聚会");
    if(checkInput(req,input_m)==1){
        handleCreateParty(req,function(ret){
            console.log(JSON.stringify(ret));
            res.json(ret);
        });
    }else{
        console.log("输入参数有误");
        res.json(ERROR_2);
    }
});
function checkInput(req,pamers){

    console.log("checkInput::");
    if(pamers instanceof Array){
        for(var i in pamers){
            console.log("check pamer i = [%d],input is[%s]",i,req.body[pamers[i]]);
            if(!req.body[pamers[i]]){
                console.log("[%s]not exist",pamers[i]);
                return -1;
            }
        }
        return 1;
    }else{
        console.log("Not a Array");
        return 1;
    }
};


function handleCreateParty(req,callback){
    var conn = require('../database/connectDatabase').connectDatabase();
    var sql="insert into party_info(party_name,party_description,party_locale,party_date,party_avercost) values (?,?,?,?,?)";
    var data=[req.body.PartyName,req.body.PartyDescription,req.body.PartyLocale,req.body.PartyDate,req.body.PartyAverCost];
    console.log(data);
    conn.query(sql,data,function(err,res){
        if(err)
            callback(err);
        else{
            if(res.length==0)
                callback(ERROR_2);
            else{
                SUCCESS.data=req.body;
                callback(SUCCESS);
            }
        }
    });

}

module.exports=router;