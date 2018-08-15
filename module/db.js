const express = require('express')
const mysql = require('mysql');
const db_name = ``
const db = mysql.createConnection({
  host     : '31.220.105.185',
  user     : 'mozcoach_dalton',
  password : 'Elpidio33',
  database : 'mozcoach_node',
  multipleStatements: true
});

db.connect((err)=>{
    if(!err){
        console.log('connected')
    }else{
        console.log(err)
        console.log('erro na conexao')
    }
})
//
module.exports = db;