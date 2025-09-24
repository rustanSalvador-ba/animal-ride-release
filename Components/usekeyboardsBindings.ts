import { useEffect } from 'react';
import * as me from 'melonjs';

export default function useKeyboardBindings(enviarMovimento) {
  useEffect(() => {
    const bind = (eventName, keyCode, movimento, hold = false) => {
      document.addEventListener(eventName, () => {
        me.input.triggerKeyEvent(keyCode, true);
        if (movimento) enviarMovimento(movimento);
        if (hold) {
          setTimeout(() => {
            me.input.triggerKeyEvent(keyCode, false);
          }, hold);
        }
      });
    };

    bind('keyleft', me.input.KEY.LEFT, 'LEFT');
    bind('keyright', me.input.KEY.RIGHT, 'RIGHT');
    bind('keyrightStop', me.input.KEY.RIGHT);
    bind('keyleftStop', me.input.KEY.LEFT);
    bind('up', me.input.KEY.UP, 'UP', 500);

    bind('mp-keyleft', me.input.KEY.J);
    bind('mp-keyright', me.input.KEY.L);
    bind('mp-keyrightStop', me.input.KEY.L);
    bind('mp-keyleftStop', me.input.KEY.J);
    bind('mp-keyup', me.input.KEY.I, null, 500);

    document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowUp' || event.key === 'w') enviarMovimento('UP');
      if (event.key === 'ArrowLeft' || event.key === 'a') enviarMovimento('LEFT');
      if (event.key === 'ArrowRight' || event.key === 'd') enviarMovimento('RIGHT');
    });
  }, []);
}