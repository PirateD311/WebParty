/**
 * Created by Administrator on 2015/11/15.
 */
var express = require('express'),
    fs = require("fs");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
    console.log("receive a post req");
    var formidable = require("formidable");
    var util = require("util")
    var form = new formidable.IncomingForm();
    form.encoding="utf-8";
    form.keepExtensions=true;
    form.uploadDir="public/";
    form.parse(req,function(err, fields, files){
        if(err){
            res.locals.error=err;
        }
        var extName="";
        console.log("Form files length is[%d]",files.length);
        console.log("file is [%s]",JSON.stringify(files));
        console.log("Files type is [%s]",files.file1.type);
        switch(files.file1.type){
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
            case 'image/gif':
                console.log("File is .gif");
                extName = 'gif';
                break;
            default:
                console.log("Error file type");
                res.end("文件类型不支持");
                return;
        }
        var avatarName = "images/NodeImage_"+parseInt(100000*Math.random()) + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        console.log("new path is [%s],src is [%s]",newPath,avatarName);
        fs.renameSync(files.file1.path, newPath);  //重命名
        handleDB(avatarName);
        res.json({"code":1,"image_src":avatarName});
    });
});

function handleDB(image_src){
    var conn = require('../database/connectDatabase').connectDatabase();
    var sqlStatements={"insertImage":"insert into user_images(user_id,image_src) value(?,?)"};

    conn.query(sqlStatements.insertImage,[1,image_src],function(err,res){
        if(err){
            console.log("Insert fail,image src is[%s]",image_src);
        }
    });
}
module.exports = router;
