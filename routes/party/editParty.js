/**
 * Created by Administrator on 2015/12/2 0002.
 */
/**
 * Created by Administrator on 2015/11/25 0025.
 */
var express = require('express');

var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var m_input=["PartyName","PartyDescription","PartyLocale","PartyDate","PartyAverCost"];
    if(G_fn_checkInput(req,m_input)){
        console.log("doing insert");
        var sql="update party_info set attend_record(party_id,participant_name,participant_phone) values (?,?,?)";
        var values=[req.body.party_id,req.body.participant_name,req.body.participant_phone];
        G_fn_DB_insert(sql,values,function(ret){
            console.log(JSON.stringify(ret));
            res.json(ret);
        });
    }else{
        console.log("Check Input failed");
        res.json(RET_ERROR_INPUTWRONG);
    }

});


module.exports = router;

