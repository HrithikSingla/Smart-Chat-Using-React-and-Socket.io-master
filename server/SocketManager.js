const io = require('./server.js').io
const bodyParser = require('body-parser')

let connectedUsers = []

module.exports = function(socket){
	console.log("Socket ID : " + socket.id)
	socket.on("user_connected", (user)=>{
		connectedUsers.push(user)
		socket.user = user
		io.emit('user_connected', connectedUsers)
	})

	socket.on("send_message",function(data){
		io.emit("receive_message", data)
	})

	socket.on('logout',(connecteduser)=>{
		const len = connectedUsers.length
		for(i=0;i < len;i++){
		    if(connectedUsers[i].name === connecteduser.user){
		        connectedUsers.splice(connectedUsers.indexOf(connectedUsers[i]),1)
		    }
		}
		io.emit('user_connected',connectedUsers)
	})

	socket.on('room',function(room){
		socket.join(room)
	})


	socket.on('private_message',function(data){
		const len = connectedUsers.length
		const chat_type = "private"
		for(i=0;i<len;i++){
			if(connectedUsers[i].name === data.receiver){
				io.to(connectedUsers[i].socketID).emit("receive_message",data,chat_type)
			}
			if(connectedUsers[i].name === data.sender){
				io.to(connectedUsers[i].socketID).emit("receive_message",data)
			}
		}
	})
}
