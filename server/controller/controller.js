const Mysql = require('../mysql/mysql')
const mysql = new Mysql()
module.exports =  {
    //获取用户信息
    getUserInfo: function(req,res){
        var data = req.query.data
        if(!data){
            res.end('查询条件不能为空')
            return
        }
        mysql.getUserInfo(data,function(data){
            res.json(data)
            res.end()
        })
    }
}