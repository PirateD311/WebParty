/**
 * Created by Administrator on 2015/11/21 0021.
 */

var express = require('express'),
    qs = require('querystring');

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Handle getImage");
});
router.post('/',function(req,res,next){
    console.log("Received a post request=[%s]",JSON.stringify(req.body));
    if(req.body.user_id!=""){
        handleDB(req.body.user_id,function(err,data){
            if(err)
                res.json({"code":2,"info":err});
            else{
                console.log(data[0].image_src);

                res.json({"code":1,"data":data});
            }
        });
    }else{

    }
});

function handleDB(user_id,callback){

    var conn = require('../database/connectDatabase').connectDatabase();
    var sql="select * from user_images where user_id = ?";
    conn.query(sql,user_id,function(err,res){
        callback(err,res);
    });
}

module.exports = router;