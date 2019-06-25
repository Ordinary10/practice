//随机方法
function number(){
    return Math.round(Math.random()*100)
}
//数据库连接配置
const mysqls = require('mysql')
const connection = mysqls.createConnection({     
    host     : 'localhost',       
    user     : 'root',              
    password : '123456789',       
    port: '3306',                   
    database: 'lzq_table' 
  }); 
connection.connect()
class Mysql{
    constructor(){
        this.id = `mysql${number()}[${new Date().getTime()}]`
    }
    //查询用户表(uid,account,mobile)
    getUserInfo(data,callback){
        var sql = `select * from lzq_user where id = ${data} or name = ${data}`
        connection.query(sql,function(err,res){
            if(err) {
                console.log('[SELECT ERROR] - ',err.message);
                callback(err)
                return
            }
            callback(res)
        })
    }
}

module.exports = Mysql