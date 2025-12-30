const HandyStorage = require('handy-storage');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

/* ===============================
   STORAGE
================================ */
const storage = new HandyStorage({ beautify: true });
storage.connect('./salas.json');

let idSessao = storage.idSessao || 0;
let salas = storage.salas || [];

/* ===============================
   EXPRESS
================================ */
const app = express();

app.use(cors({
  origin: "https://animal-ride.netlify.app",
  methods: ["GET", "POST"]
}));

app.get("/", (req, res) => {
  res.send("Servidor Animal Ride ONLINE 🚀");
});

/* ===============================
   HTTP + SOCKET.IO
================================ */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://animal-ride.netlify.app",
    methods: ["GET", "POST"]
  }
});

/* ===============================
   GAME STATE
================================ */
const players = {};
const gameState = {};

/* ===============================
   SOCKET EVENTS
================================ */
io.on('connection', (socket) => {
  console.log("Jogador conectado:", socket.id);

  socket.on('playerMovement', (movementData) => {
    const data = JSON.parse(movementData);
    socket.broadcast.emit('playerMoved', data);
  });

  socket.on('player', (data) => {
    const msg = JSON.parse(data);

    if (
      temRegistro(players, msg.player, msg.idPlayer) ||
      temRegistro(players, getMultplayerName(msg.player), msg.idPlayer)
    ) {
      console.log("Player já registrado:", msg);
      return;
    }

    players[msg.idPlayer] = {
      idPlayer: msg.idPlayer,
      player: msg.player,
      idSessao: msg.idSessao
    };

    io.emit('currentPlayers', players);
    console.log("Player registrado:", msg);
  });

  socket.on('message', (data) => {
    const msg = JSON.parse(data);
    io.emit('message', msg);
  });

  socket.on('newSala', (data) => {
    const json = JSON.parse(data);

    const sala = {
      id: idSessao,
      name: json.name + idSessao
    };

    salas.push(sala);

    storage.setState({
      salas: salas,
      idSessao: idSessao + 1
    });

    io.emit("sala", sala);
    idSessao++;
  });

  socket.on('disconnect', () => {
    console.log("Jogador desconectado:", socket.id);

    delete players[socket.id];
    delete players["MultPlayer" + socket.id];

    io.emit('playerDisconnected', socket.id);
  });
});

/* ===============================
   SERVER LISTEN (RENDER)
================================ */
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});

/* ===============================
   HELPERS
================================ */
function temRegistro(players, value, idPlayer) {
  let retorno = false;

  Object.keys(players).forEach(key => {
    if (players[key].player === value && idPlayer === key) {
      retorno = true;
    }
  });

  return retorno;
}

function getMultplayerName(player) {
  switch (player) {
    case "mainPlayer": return "multPlayerNina";
    case "mainPlayerTeff": return "multPlayerTeff";
    case "mainPlayerSnow": return "multPlayerSnow";
    case "mainPlayerDark": return "multPlayerDark";
    default: return "";
  }
}
