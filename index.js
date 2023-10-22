var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var port = 3000
var userOnlineCount = 0

io.on('connect',(Socket)=>{
    console.log('\u001b[31m'+Socket.id+':\u001b[34m Se Conectou :\u001b[35m'+ Socket.request.headers['user-agent'])
    userOnlineCount++
    Socket.emit('usersCount',({userOnlineCount}))
    Socket.on('welcome',()=>{
        console.log('Entrou No Chat')

    })
    Socket.on('msg',(user)=>{
          
        io.emit('update',({user:user.user,msg:user.msg}))
    })
    Socket.on('disconnect',()=>{
        userOnlineCount--
        console.log(Socket.id+':  desconectou  '+ userOnlineCount)
    })
    console.log('\u001b[33mUsuarios \u001b[32monline: '+userOnlineCount+'\u001b[37m')
   
})


app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
http.listen(port,()=>{
    console.log('running on port:'+port)
})