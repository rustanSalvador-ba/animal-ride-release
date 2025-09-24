import { useEffect } from 'react';
import * as me from 'melonjs';

export default function CanvasRenderer({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    const canvas = document.querySelector('#screen canvas');
    if (canvas) canvas.remove();

    if (!me.video.init(1040, 1080, { parent: 'screen', scale: 'auto' })) {
      console.error('Seu navegador não suporta canvas HTML5.');
      return;
    }

    me.state.set(me.state.PLAY, new me.Stage());
    me.state.change(me.state.PLAY);

    onReady?.();

    return () => {
      if (me.state.isRunning()) {
        me.state.stop();
        const canvas = document.querySelector('canvas');
        if (canvas) canvas.remove();
      }
    };
  }, []);

  return <div id="screen" />;
}