/**
 * Created by Administrator on 2015/11/14.
 */
var express = require('express'),
    qs = require('querystring');

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Handle Sign");
});
router.post('/', function(req, res, next) {
    console.log("Received a post request=[%s]",JSON.stringify(req.body));
    if(req.body.nickname!=""&&req.body.password!=""){
        var ret={"Code":0,"Info":""};
        handleSignUp(req,res,function(code,info){
            ret.Code=code;
            switch(ret.Code){
                case 1:ret.Info="New User Signup Success!Welcome!";break;
                case 2:ret.Info="Database Err";break;
                case 3:ret.Info="User ["+req.body.nickname+"] already exist.";break;
                    defaults:ret.Info="Other Err";
            }
            res.json(ret);
        });
    }else{
        res.send("wrong input");
    }
});
//处理用户注册的数据校验及数据库添加
//retCode{1:添加用户成功,2:数据库异常,3:用户已存在}
function handleSignUp(req,res,callback){
    var retCode=0;
    var SQLStatement={
        "select":"select * from user_signinfo where user_nickname = ?",
        "insert":"insert into user_signinfo(user_nickname,user_password) values (?,?)"
    };
    //检查用户是否已被注册
   var conn = require('../database/connectDatabase').connectDatabase();
    conn.query(SQLStatement.select,req.body.nickname,function(err,res1){
        if(err){
            console.log("Err is :"+err);
            retCode=2;
            callback(retCode,res1);
        }
        else{
            if(res1.length==0){
                //新增用户
                conn.query(SQLStatement.insert,[req.body.nickname,req.body.password],function(err,res2){
                    if(err){
                        console.log("Err is [%s]",err);
                        retCode=2;
                    }
                    else{
                        console.log("insert success.[%s]",JSON.stringify(res2));
                        retCode=1;
                    }
                    callback(retCode,res2);
                });
            }else{
                retCode=3;
                callback(retCode,res1);
            }
        }
    });
}
module.exports = router;
