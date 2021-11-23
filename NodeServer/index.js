//Node Server which will handle socket io connections
const io=require('socket.io')(8000)

//stores the names of all the users
const users={};

io.on('connection' , socket=>{
    socket.on('new-user-joined', name=>{
        console.log("user joined", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})