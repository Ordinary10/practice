var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var controllers = require('./controller/controller');
//文件上传
var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});
app.use(multer({dest:"./uploads"}).array("file"));
//静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//post请求体处理中间件
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods','*');
    next();
});
//存储上传的文件
app.post('/file/upload',function(req,res){
    fs.readFile(req.files[0].path, function(err, data) {
        if(err) {
            console.log(new Error(err))
            res.json({
                status: 0,
                errorInfo: '文件读取失败'
            })
            return
        }
        fs.writeFile('./public/images/'+req.files[0].originalname,data,function(err){
            if(err){
                console.log(new Error(err))
                res.json({
                    status: 0,
                    errorInfo: '文件写入失败'
                })
                return
            }
            res.json({
                status: 1,
                imgUrl: 'http://localhost:9696/images/'+req.files[0].originalname
            })
            let count = 0;
            for(var i=0;i<req.files.length;i++){
                fs.unlink(req.files[i].path,function(err,data){
                    if(err){
                        console.log(new Error(err))
                        return
                    }
                    count++
                    console.log('uploads文件删除数目：'+count)
                })
            }
            res.send()
        })
    })
});
//站点访问返回默认网页
app.get('/', function (req, res) {
    fs.readFile('./public/html/index.html',function(err,data){
        if(err){
            res.end('出错啦！！！')
            return
        }
        res.end(data)
    })
 });
//模拟数据返回接口
app.post('/testData',function(req,res){
    fs.readFile('./public/json/test.json',function(err, data){
        if(err) {
            console.log(new Error(err))
            res.json({
                status: 0,
                errorCode: 1,
                errorInfo: new Error(err),
                data: []
            })
            return
        }
        var json1 = JSON.parse(JSON.stringify(data))
        var buffer1 = new Buffer(json1)
        var json2 = JSON.parse(buffer1.toString())
        res.json({
            status: 1,
            errorCode: 0,
            errorInfo: null,
            data: json2
        })
    })
});
//测试接口
app.get('/getUserInfo',function(req,res){controllers.getUserInfo(req,res)})
//端口号9696
var server = app.listen(9696, function () {
  console.log("应用实例，访问地址为 http://127.0.0.1:9696");
});
