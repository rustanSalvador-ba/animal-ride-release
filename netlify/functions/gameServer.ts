import express from 'express';
import serverless from 'serverless-http';
import { createServer } from 'http';
import { Server } from 'socket.io';
import HandyStorage from 'handy-storage';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const storage = new HandyStorage();
storage.connect('././salas.json');

let idSessao = 0;
let salas = [];

const players: Record<string, any> = {};

io.on('connection', (socket) => {
  socket.setMaxListeners(999999);

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
      console.log('player já registrado', msg);
      return;
    }

    players[msg.idPlayer] = {
      idPlayer: msg.idPlayer,
      player: msg.player,
      idSessao: msg.idSessao,
    };
    io.emit('currentPlayers', players);
    console.log('player registrado com sucesso', msg);
  });

  socket.on('message', (data) => {
    const msg = JSON.parse(data);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
    delete players[socket.id];
    delete players['MultPlayer' + socket.id];
    io.emit('playerDisconnected', socket.id);
  });

  socket.on('newSala', (data) => {
    const json = JSON.parse(data);
    const sala = { id: idSessao, name: json.name + idSessao.toString() };
    salas.push(sala);
    storage.setState({ salas, idSessao });
    io.emit('sala', sala);
    idSessao++;
  });
});

function temRegistro(players: Record<string, any>, value: string, idPlayer: string): boolean {
  return Object.keys(players).some(
    (key) => players[key].player === value && idPlayer === key
  );
}

function getMultplayerName(player: string): string {
  switch (player) {
    case 'mainPlayer':
      return 'multPlayerNina';
    case 'mainPlayerTeff':
      return 'multPlayerTeff';
    case 'mainPlayerSnow':
      return 'multPlayerSnow';
    case 'mainPlayerDark':
      return 'multPlayerDark';
    default:
      return '';
  }
}

export const gameServer = serverless(app);