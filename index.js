var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var port = 3000

io.on('connect',(Socket)=>{
    console.log('Se Conectou')
    Socket.on('welcome',()=>{
        console.log('Entrou No Chat')

    })
    Socket.on('msg',(user)=>{
          
        io.emit('update',({user:user.user,msg:user.msg}))
    })
   
})


app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
http.listen(port,()=>{
    console.log('running on port:'+port)
})