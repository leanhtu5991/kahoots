#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('mean-app:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var allRoom = [];
var playerConnect = {};
io.on('connection', (socket)=>{
  var currentRoom;
  socket.on("create-room", function(data){
    var playerInRoomNew = [];
    var playerInRoomRecent = [];
    if(allRoom.includes(data.gamePin)){
      socket.emit("server-send-room-create", "Name room exist");
    } else {
      socket.namePlayer = data.name;
      socket.room = data.gamePin;
      socket.join(data.gamePin);
      allRoom.push(data.gamePin);
      playerConnect[socket.id] = socket.namePlayer;
      //go out of room recent
      io.sockets.sockets[socket.id].leave(currentRoom);

      //send players of room before
      io.in(currentRoom).clients((err, clients) => {
        for(var i=0; i<clients.length; i++){
          playerInRoomRecent.push(playerConnect[clients[i]])
        }
        io.sockets.in(currentRoom).emit("server-send-list-player-join", {gamePin:data.gamePin, players: playerInRoomRecent});
      })

      //send plyers of new room
      io.in(data.gamePin).clients((err, clients) => {
        for(var i=0; i<clients.length; i++){
          playerInRoomNew.push(playerConnect[clients[i]])  
        }
        socket.emit("server-send-room-create", {gamePin:data.gamePin, players:playerInRoomNew});
        currentRoom = data.gamePin;
        io.sockets.in(data.gamePin).emit("server-send-list-player-join", {gamePin:data.gamePin, players: playerInRoomNew})
      });
    }
  })

  // If player join another room
  socket.on("join-room", function(data){
    var playerInRoomNew = [];
    var playerInRoomRecent = [];
    
    if(!allRoom.includes(data.gamePin)){
      socket.emit("server-send-room-create", "Name room not exist");
    } else {
      socket.namePlayer = data.name;
      socket.room = data.gamePin;
      socket.join(data.gamePin);
      playerConnect[socket.id] = socket.namePlayer;
      io.sockets.sockets[socket.id].leave(currentRoom);

     //go out of room recent
     io.sockets.sockets[socket.id].leave(currentRoom);
     
      //send players of room before
      io.in(currentRoom).clients((err, clients) => {
        for(var i=0; i<clients.length; i++){
          playerInRoomRecent.push(playerConnect[clients[i]])
        }
        io.sockets.in(currentRoom).emit("server-send-list-player-join", {gamePin:data.gamePin, players: playerInRoomRecent});
      })

      //send plyers of new room
      io.in(data.gamePin).clients((err, clients) => {
        for(var i=0; i<clients.length; i++){
          playerInRoomNew.push(playerConnect[clients[i]])  
        }
        socket.emit("server-send-room-create", {gamePin:data.gamePin, players:playerInRoomNew});
        currentRoom = data.gamePin;
        io.sockets.in(data.gamePin).emit("server-send-list-player-join", {gamePin:data.gamePin, players: playerInRoomNew})
      });
    }  
  })
  // if player start game
  socket.on('startGame', function () {
    io.sockets.in(currentRoom).emit("server-send-startGame", {startGame: true})
  })

  // get score and send to all player in room
  socket.on('sendScore', function (data) {
    io.sockets.in(data.gamePin).emit("getScore", data)
  })
  // if player disconnect
  socket.on('disconnect', function () {
    playerDel = socket.id;
    var playerInRoomRecent = [];
    io.in(currentRoom).clients((err, clients) => {
      for(var i=0; i<clients.length; i++){
        playerInRoomRecent.push(playerConnect[clients[i]]);
      }
      io.sockets.in(currentRoom).emit("server-send-list-player-join", {gamePin:currentRoom, players: playerInRoomRecent})
    });
    delete playerConnect[playerDel];
  });
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}