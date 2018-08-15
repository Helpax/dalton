const DB = require('./module/DB')
const express  = require('express')
const app = express()
const morgan = require('morgan')
const bodyparser = require('body-parser')

const workerRoutes = require('./api/routes/worker')
const providerRoutes = require('./api/routes/provider')
const userRoutes = require('./api/routes/user')
const notificatioRoutes = require('./api/routes/notification')




app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

 app.use((req,res,next)=>{
    //
    res.header('Access-control-Allow-Origin','*');
    res.header('Access-control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,PATCH')
        return res.status(200).json({})
    }
    next();
 })

// rotas da API
app.use('/worker',workerRoutes);
app.use('/login',userRoutes)
app.use('/provider',providerRoutes)
app.use('/notificatio',notificatioRoutes)

//error handling
app.use((req,res,next)=>{
    const err = new Error('NOT found')
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.json({
        err:{
            "messag": "err.messag"
        }
    });
    console.log(err)
});

module.exports = app;