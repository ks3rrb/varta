const io = require('socket.io')({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  const users = {};
  

  io.on('connection', socket => {
    socket.on('new-user-joined', name => {
      console.log("New user joined:", name)
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });
  




    socket.on('send', message => {
        
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
  
  socket.on('disconnect', () => {
        
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });

});


  io.listen(8000);
  