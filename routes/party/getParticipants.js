/**
 * Created by Administrator on 2015/11/26 0026.
 */
/**
 * Created by Administrator on 2015/11/25 0025.
 */
var express = require('express');

var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var m_input=["party_id","participant_name","participant_phone"];
    if(G_fn_checkInput(req,"")){
        console.log("doing select");
        var max_condition=1;
        var index=1;
        var values="";
        for(var key in req.body){
            if(index>max_condition)
                break;
            values=key+"="+req.body[key];
            index++;
        }
        var sql="select * from attend_record where "+values;
        handleInsert(sql,"",function(ret){
            res.json(ret);
        });
        //var values=[req.body.party_id,req.body.participant_name,req.body.participant_phone];
        console.log(req.body);
    }
});
function handleInsert(sql,pamers,callback){
    var ERROR_2={"code":2,"info":""},
        SUCCESS={"code":1,"info":"","data":[]};
    var conn = require('../../database/connectDatabase').connectDatabase();
    conn.query(sql,pamers,function(err,res){
        if(err){
            ERROR_2.info=err;
            callback(ERROR_2);
        }
        SUCCESS.data=res;
        callback(SUCCESS);
    });
}

module.exports = router;
