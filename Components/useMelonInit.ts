import { useEffect } from 'react';
import * as me from 'melonjs';
import DataManifest from '../../manifest';
import PlayScreen from '../../js/stage/play.js';
import {
  PlayerEntity,
  CoinEntity,
  EnemyEntity,
  MultPlayerEntity,
  MultPlayerEntitySnow,
  MultPlayerEntityTeff,
  MultPlayerEntityNina,
  MultPlayerEntityDark
} from '../../js/renderables/entities.js';

export default function useMelonInit({ idPlayer, playerName, mode }) {
  useEffect(() => {
    const playerEntities = ['mainPlayer', 'mainPlayerTeff', 'mainPlayerSnow', 'mainPlayerDark'];
    const multiplayerEntities = ['multPlayerNina', 'multPlayerTeff', 'multPlayerSnow', 'multPlayerDark'];

    const cleanup = () => {
      if (me.state.isRunning()) {
        me.state.stop();
        const canvas = document.querySelector('canvas');
        if (canvas) canvas.remove();
      }
    };

    cleanup();

    me.device.onReady(() => {
      const canvas = document.querySelector('#screen canvas');
      if (canvas) canvas.remove();

      if (!me.video.init(1040, 1080, { parent: 'screen', scale: 'auto' })) {
        console.error('Seu navegador não suporta HTML5 canvas.');
        return;
      }

      me.loader.preload(DataManifest, () => {
        registerEntities(multiplayerEntities, getMultplayerName(playerName), MultPlayerEntity, 'multPlayerEntity', 'MultPlayer' + idPlayer);
        registerEntities(playerEntities, playerName, PlayerEntity, 'playerEntity', idPlayer);
        me.pool.register('CoinEntity', CoinEntity, false);
        me.pool.register('EnemyEntity', EnemyEntity, false);

        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.A, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.D, 'right');
        me.input.bindKey(me.input.KEY.UP, 'jump', false);
        me.input.bindKey(me.input.KEY.W, 'jump', false);

        bindMultiplayerControls();

        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.change(me.state.PLAY);
        me.state.transition('start');

        if (mode === 'single') {
          snowIA();
          teffIA();
          ninaIA();
          darkIA();
        }
      });
    });

    return cleanup;
  }, []);
}