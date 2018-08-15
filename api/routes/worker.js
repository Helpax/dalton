const db = require('../../module/DB')
const mysql = require('mysql')
const express = require('express');
const router = express.Router();


// GET request
router.get('/',(req,res,next)=>{

    var query = ` SELECT ??,??,??,?? Produto, ??,??,??,?? provedor,?? 
                    FROM ?? ??
                    Left join ?? ?? on (?? = ??) 
                    inner join ?? ?? on (?? = ??) 
                    Left join ?? ?? on (?? = ??)
                    Left join ?? ?? on (?? = ??) 
                    Left Join ?? ?? on (?? = ??)
                    `
    var table = [
                    "p.nome" ,
                    "p.apelido" ,
                    "p.sexo",
                    "i.Descricao",
                    "ri.Quantidade",
                    "ri.Nota",
                    "ri.Descricao",
                    "pr.Provider_nome" , 
                    "u.role",
                    "cliente", 
                    "c","person", 
                    "p","p.personId",
                    "c.personId",
                    "recived_itens", 
                    "ri","c.ClientId" , 
                    "ri.clienteId","itens", 
                    "i","i.itenId" , 
                    "ri.itenId","provider", 
                    "pr","pr.providerId", 
                    "c.providerId",
                    "user" ,"u",
                    "u.userId",
                    "ri.userId"
                ]
    
    query = mysql.format(query,table)

    console.log(query)
    db.query(query,(err,rows,fields)=>{
        if(!err)
        {
            res.status(200).json({
                data:rows
            })
        }
        else{
           
           //throw err
           res.status(500).json({
               error:err
           })
        }

    })
});

// POST request
router.post('/',(req,res)=>{
    var worker = {
        nome : req.body.nome,
        apelido : req.body.apelido,
        sexo : req.body.sexo,
        iten : req.body.iten,
        descricao:req.body.descricao,
        quantidade : req.body.quantidade,
        notas : req.body.notas,
        user: req.body.user,
        provedor:req.body.provedor
    }

    var query = `   SET @nome = ?;
                    SET @apelido = ?;
                    SET @sexo =?;
                    SET @iten = ?;
                    SET @descricao=?;
                    SET @quantidade = ?;
                    SET @notas = ?;
                    SET @user=?; 
                    SET @provedor = ?;
                    CALL insert_worker(@nome,@apelido,@sexo,@iten,@descricao,@quantidade,@notas,@user,@provedor);`
    var values = [worker.nome, worker.apelido,worker.sexo,worker.iten,worker.descricao,worker.quantidade,worker.notas,worker.user,worker.provedor]
    
    query = mysql.format(query,values)

    console.log(query)

    db.query(query,(err,rows,fields)=>{
        if(!err){
            res.send('Inserted');
        }else{           
            res.status(500).json({
            error:"error da base"
        })
        console.log(err)
        }
    })
});

// GET Search
router.get('/:username',(req,res,next)=>{
 
    let username = req.params.username

    var query = ` SELECT ??,??,??,?? Produto, ??,??,??,?? provedor,?? 
                    FROM ?? ??
                    Left join ?? ?? on (?? = ??) 
                    inner join ?? ?? on (?? = ??) 
                    Left join ?? ?? on (?? = ??)
                    Left join ?? ?? on (?? = ??) 
                    Left Join ?? ?? on (?? = ??)
                    WHERE ?? = ?
                    `
    
                    var table = [
                        "p.nome" ,
                        "p.apelido" ,
                        "p.sexo",
                        "i.Descricao",
                        "ri.Quantidade",
                        "ri.Nota",
                        "ri.Descricao",
                        "pr.Provider_nome" , 
                        "u.role",
                        "cliente", 
                        "c","person", 
                        "p","p.personId",
                        "c.personId",
                        "recived_itens", 
                        "ri","c.ClientId" , 
                        "ri.clienteId","itens", 
                        "i","i.itenId" , 
                        "ri.itenId","provider", 
                        "pr","pr.providerId", 
                        "c.providerId",
                        "user" ,"u",
                        "u.userId",
                        "ri.userId",
                        "username",
                        username
                    ]

    query = mysql.format(query,table)
    console.log(query)
    db.query(query,(err,rows)=>{
        if(!err){
                res.status(200).json({
                    data:rows
                })
        }else{
            throw err
        }
    })
});





// DELETE 
router.delete('/:workerId',(req,res,next)=>{
    let id = req.params.workerId
    var query = '?? FROM ?? WHERE ?? = ?'

    var table = ["DELETE","WORKER","workerId",id]
    
    query = mysql.format(query,table)

    db.query(query,(err,rows,fields)=>{
        if(!err){
            res.send('apagado com sucesso')
        }
        else{
            throw err
        }
    }) 
});


// PUT (actualizar)
router.put('/',(req,res)=>{
   const workerId = req.body.workerId;
   const nome = req.body.nome;
   const apelido = req.body.apelido;
   //const job = req.body.job;
   var query = `?? ?? ?? inner join ?? ?? on (?? = ??) SET ?? = ?, ?? = ? WHERE ?? = ?`

   var table = ['UPDATE',"Person",'p',"worker",'w','w.personId', 'p.personId',"p.nome",nome,'p.apelido',apelido,'w.workerId',workerId]
   
   query = mysql.format(query,table)

   db.query(query,(err,rows,fields)=>{
       if(!err){
           res.send('UPDATED')
       }else{
           throw err
       }
   })
});

module.exports = router;