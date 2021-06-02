const express = require('express'); // importa express
const app = express();
const server = require('http').Server(app) // importa socket.io
const io = require('socket.io')(server, {
    options: {
        cors: '*' //Habilita todos os CORS
    }
});

const port = 3000; //porta do socket io (definida no front)

io.on('connection', (socket) => {
    socket.on('join', (data) => { //caso um novo utilizador se conecte
        const roomName = data.roomName; // hash da sala
        socket.join(roomName); // novo utilizador -> vai para sala
        socket.to(roomName).broadcast.emit('new-user', data); // Informa todos os utilizadores já presentes de todos os utilizadores

        socket.on('disconnect', () => { // caso um utilizador se disconecte
            socket.to(roomName).broadcast.emit('bye-user', data);
        });
    });
});

server.listen(port, () => { //o servidor ouve na porta 3000 
    console.log(`Server corre na porta: ${port}`)
});