const express = require('express')
const app = express()
const port = process.env.PORT || 3232
const server = app.listen(port, console.log('Connected to port 3232'))
const bodyParser = require('body-parser')

const User = require('./User.js')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var io = require('socket.io')(server)
module.exports.io = io

app.post('/server/userdetails',(req,res)=>{
    User.getUsernameByUsername(req.body.username,(error,user)=>{
        if(user != ""){
            console.log(user)
            return res.status(200).json({isSignUpSucessful:false})
        }
        else{
            const data = new User.database({
                username:req.body.username,
                password:req.body.password
            }).save(()=>{
                return res.status(200).json({isSignUpSucessful:true})
            })
        }
    })
})

app.post('/server/logindetails',(req,res)=>{
    User.getLoginDetails(req.body.username, req.body.password,(error,user)=>{
        if(user!=""){
            return res.status(200).json({isLoginSuccessfull:true})
        }
        else{
            return res.status(200).json({isLoginSuccessfull:false})
        }
    })
})

const SocketManager = require('./SocketManager')
io.on('connection', SocketManager)
