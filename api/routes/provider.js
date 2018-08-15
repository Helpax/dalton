const db = require('../../module/DB')
const mysql = require('mysql')
const express = require('express');
const router = express.Router();

// GET provider
router.get('/:provider',(req,res,next)=>{
 
    const provider = req.params.provider
    //const provider_name = 'SUPER CPI'
    // var query = 'select * from user where ?? = ?'


    
    var query =
    'SELECT p.nome ,p.apelido ,p.sexo,i.Descricao produto ,ri.Quantidade,ri.Nota,ri.Descricao,pr.Provider_nome provedor, u.role\
    FROM cliente c\
    left join person p on (p.personId = c.personId)\
    inner join recived_itens ri on (c.ClientId = ri.clienteId)\
    left join itens i on (i.itenId = ri.itenId)\
    left join provider pr on (pr.providerId = c.providerId)\
    left join user u on (u.userId = ri.userId)\
    where ?? = ?'
    
    var table = ['Provider_nome',provider]

    query = mysql.format(query,table)
    console.log(query)
    db.query(query,(err,rows)=>{
        if(!err){
        // var data = {
        //             nome : rows[0].nome,
        //             apelido : rows[0].apelido,
        //             sexo : rows[0].sexo,
        //             produto : rows[0].produto,
        //             Quantidade : rows[0].Quantidade,
        //             Nota :rows[0].Nota,
        //             Descricao : rows[0].Descricao,
        //             provedor:rows[0].provedor,
        //             role:rows[0].role
        //         }
                res.status(200).json({
                    data:rows
                })
        }else{
            throw err
        }
    })
});

module.exports = router;