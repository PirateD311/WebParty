/**
 * Created by Administrator on 2015/12/5 0005.
 */
var express=require("express");
var router=express.Router();

router.post('/',function(req,res,next){
    console.log("DisAttend Party ...");
    var m_input=["party_id","name"];
    if(G_fn_checkInput(req,m_input)){
        var sql_obj={"table":"attend_record",
            "sql":"delete from attend_record where party_id = ? and participant_name = ? ",
            "key":"party_id","key_value":req.party_id,"values":[req.party_id,req.participant_name]};
        G_fn_DBp_delete(sql_obj,function(ret){
            res.json(ret);
        })
    }else
        res.json(RET_ERROR_INPUTWRONG);

});

module.exports=router;