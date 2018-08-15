const express =  require ('express')
const user = require('../../module/user')
const db = require('../../module/DB')
const mysql = require('mysql')
const router = express.Router()


router.post('/',(req,res,next)=>{
    var getuser = {
        username : req.body.username,
        password : req.body.password
       }

    var query = "SELECT user.*,provider.* FROM user left join provider on (user.providerid = provider.providerId) WHERE ??=? AND ??=?"

    var table = ["username",getuser.username,"password",getuser.password]

    query = mysql.format(query,table)
    console.log(query)
    db.query(query,(err,rows)=>{
        try {
            
            if(rows.length != 0){
                var data = {
                    userId : rows[0].userId,
                    username : rows[0].username,
                    password : rows[0].password,
                    role : rows[0].role,
                    personId : rows[0].personId,
                    providerId:rows[0].providerId,
                    provider_nome:rows[0].Provider_nome,
                    servicos:rows[0].servicos,
                    length:rows.length              
                }
                res.status(200).json({
                    data
                })
            }
            else{
                res.json({
                    data:rows
                   
                })
                
            }
            
        } catch (error) {
            
            res.status(500).json({
                error:err
            })
        }
    })
   
})

module.exports = router;