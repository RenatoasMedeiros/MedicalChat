const express = require('express'); // importa express
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {  // importa socket.io
    options: {
        cors: '*' //Habilita todos os CORS
    }
});

const port = 3000; //porta do socket io (definida no front)

io.on('connection', (socket) => {
    socket.on('join', (data) => { //caso um novo utilizador se conecte
        const NomeSala = data.NomeSala; // hash da sala
        socket.join(NomeSala); // novo utilizador -> vai para sala
        socket.to(NomeSala).broadcast.emit('new-user', data); // Informa todos os utilizadores já presentes de um novo utilizadore

        socket.on('disconnect', () => { // caso um utilizador se disconecte
            socket.to(NomeSala).broadcast.emit('bye-user', data);// Informa todos os utilizadores já presentes que um utilizadores saiu
        });
    });
});

server.listen(port, () => { //o servidor ouve na porta 3000 
    console.log(`Server corre na porta: ${port}`);
});