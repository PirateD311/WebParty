/**
 * Created by Administrator on 2015/11/21 0021.
 */
var express = require("express");
var router=express.Router();

SUCCESS={"code":1,"info":"Wellcome:"};
ERROR_2={"code":2,"info":"用户不存在"};
ERROR_3={"code":3,"info":"用户密码错误"};
ERROR_4={"code":4,"info":"数据库异常"};
router.post('/',function(req,res,next){
    handleLogin(req,function(data){
        res.json(data);
    });
});

function handleLogin(req,callback){
    var conn = require('../database/connectDatabase').connectDatabase();
    var sql="select * from user_signinfo where user_nickname = ?";
    conn.query(sql,req.body.nickname,function(err,res){
        if(err)
            callback(err);
        else{
            if(res.length==0)
                callback(ERROR_2);
            else{
                console.log(res);
                if(req.body.password==res[0].user_password)
                {
                    SUCCESS.info="Welcome:"+(req.body.nickname);
                    callback(SUCCESS);
                }
                else
                    callback(ERROR_3);
            }
        }
    });

}

module.exports=router;