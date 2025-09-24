import { useEffect } from 'react';
import * as me from 'melonjs';

export default function useMultiplayerSync(socket, myPlayerId) {
  useEffect(() => {
    socket.on('playerMoved', (playerInfo) => {
      if (playerInfo.idPlayer !== myPlayerId) {
        const keyMap = {
          UP: me.input.KEY.I,
          LEFT: me.input.KEY.J,
          RIGHT: me.input.KEY.L,
        };

        const key = keyMap[playerInfo.movimento];
        if (key) {
          me.input.triggerKeyEvent(key, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(key, false);
          }, playerInfo.movimento === 'UP' ? 500 : 1500);
        }
      }
    });
  }, []);
}