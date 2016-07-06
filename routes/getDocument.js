/**
 * Created by Administrator on 2015/11/21 0021.
 */
var express=require("express");
var router=express.Router();

//var checkVistor=require('./DIY_Fun/Fun_ip_vistor');
var count=0;
var index=0;
var HtmlBox=new Array();
HtmlBox[0]="<div style='background-color: #00B7FF;'><img style='width: 100%' src='http://picm.photophoto.cn/061/039/021/0390210141.jpg'></div>";
HtmlBox[1]="<div style='background-color: #00B7FF;'><img style='width: 100%' src='http://h.hiphotos.baidu.com/image/pic/item/4ec2d5628535e5dd2820232370c6a7efce1b623a.jpg'></div>"
HtmlBox[2]="<div style='background-color: #00B7FF;'><img style='width: 100%' src='../images/NodeImage_98169.jpg'></div>"




router.get('/',function(req,res,next){
    console.log("Client ip is [%s]",G_fn_Ip_getClientIp(req));
    ip_vistor_visit(G_fn_Ip_getClientIp(req));
    count++;
    if(index==HtmlBox.length)
        index=0;
    res.json({"code":1,"html":HtmlBox[index++],"count":count});
});

function ip_vistor_visit(ClientIp){
    console.log("ip_vistor_visit");
    console.log(IP_VISTORS);

    if(IP_VISTORS[ClientIp]){
        console.log("[%s] is not a new vistor.",ClientIp);
    }else{
        console.log("[%s] is a new vistor.",ClientIp);
        IP_VISTORS[ClientIp]="Login";
        setTimeout(function(){
            delete IP_VISTORS[ClientIp];
            console.log("[%s] is LogOut.",ClientIp);
        },IP_VISTORS_TIMEOUT);
    }

}

module.exports=router;