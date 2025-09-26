 const HandyStorage = require('handy-storage');
// const { WebSocketServer } = require('ws');

const storage = new HandyStorage({
  beautify: true
});

 storage.connect('./salas.json');
// //const [salas, setSalas] = React.useState(null)
 var idSessao = storage.idSessao ? storage.idSessao: 0
 var salas = storage.salas ? storage.salas : []

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const cors = require('cors');

app.use(cors({ origin: '*' }));

const server = http.createServer(app);

const io = new Server(server, { 
  handlerPreFlyghtRequest: (req, res) => {
    const header={'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type , Authorization'};
    res.writeHead(200, header);
    res.end();
  }
}
);

// const io = new Server(server, {
    
// });
const players = {}; // Objeto para armazenar informações dos jogadores
const gameState = {}; // Objeto para armazenar o estado atual do jogo

io.on('connection', (socket) => {
socket.setMaxListeners(999999)

    socket.on('playerMovement', (movementData) => {
       let data = JSON.parse(movementData)
       socket.broadcast.emit('playerMoved', data);
    });

    socket.on('player', (data) => {
        const msg = JSON.parse(data);
    
        if (temRegistro(players, msg.player, msg.idPlayer) || temRegistro(players, getMultplayerName(msg.player), msg.idPlayer)) {
         console.log("player ja registrado", msg)
        return;
       }

        players[msg.idPlayer] = {
            idPlayer: msg.idPlayer,
            player: msg.player,
            idSessao: msg.idSessao
      }
      io.emit('currentPlayers', players);
        console.log("player registrado com sucesso", msg)
    });

    socket.on('message', (data) => {
      
      const msg = JSON.parse(data);
       
      io.emit('message', msg);
    });
    
    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
        delete players[socket.id];
        delete players["MultPlayer"+socket.id];
        // Informar outros clientes sobre o jogador desconectado
        io.emit('playerDisconnected', socket.id);
    });

    socket.on('newSala', (data) => {
          const json = JSON.parse(data)
            let sala =  {"id": idSessao, "name": json.name+idSessao.toString()}
            salas.push(sala)
            storage.setState({
                  salas: salas,
                  idSessao: idSessao
                })
          io.emit("sala", sala)
          idSessao++
    });
});

server.listen(3001, () => {
    console.log('Servidor de jogo escutando na porta 3001');
});

  function temRegistro(players, value, idPlayer) {
   let retorno = false
    Object.keys(players).forEach(key => {
        if (players[key].player === value && idPlayer === key) {
           retorno = true
        }
    });

    return retorno
  }
  function getMultplayerName(player) {
  let retorno = "";   
      switch(player) {
          case("mainPlayer"): {
                retorno = "multPlayerNina"
                break;
          } 

          case("mainPlayerTeff"):{ 
            retorno = "multPlayerTeff"
            break;
          }

          case("mainPlayerSnow"):{
            retorno = "multPlayerSnow"
            break;
          } 

          case ("mainPlayerDark"):{
            retorno = "multPlayerDark"
            break;
          }
      }

    return retorno;
}

