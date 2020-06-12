const http = require('http')
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generatelocationMessage } = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom} = require('./utils/users')

const port = process.env.PORT || 3000 //add it to config
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath));
const welcomeMsg = 'Welcome!';

//server (emit) -> client (receive) 
// client (emit) -> server (receive) 

io.on('connection', (socket)=>{
  console.log('new web socket connetion');
  // //send to specific
  // socket.emit('message', generateMessage('Welcome!'))
  // //send to all but the specific
  // socket.broadcast.emit('message', generateMessage('A new user joined'))

  socket.on('join', (options, callback)=>{
    const {error, user} = addUser({id: socket.id, ...options })
    if (error){
      return callback(error)
    }

    socket.join(user.room);
    socket.emit('message', generateMessage('Admin',`Welcome ${user.username}!`))
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined!`));
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    callback();

    // emits to all in specidif room io.to.emit
    // specific room to all but the specific socket.broadcast.to.emit
  })

  socket.on('sendMessage', (message, callback)=>{
    const user = getUser(socket.id)
    const filter = new Filter();
    if (filter.isProfane(message)){      
      return callback('Profanity is not allowed')
    }
    //send to all
//    io.emit('message', generateMessage(message));
    io.to(user.room).emit('message', generateMessage(user.username,message));
    callback();
  })


  socket.on('sendLocation', (coords, callback)=>{
    const user = getUser(socket.id)

    //send to all
    io.to(user.room).emit('locationMessage', 
    generatelocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
    callback();
  })

//the specific is disctonnected so do not need broadcast
socket.on('disconnect', ()=>{
  const user = removeUser(socket.id);
  if (user){
    io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left`))
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
  }
})

})

server.listen(port, () => {
  console.log('Server is up on port ' + port);

})