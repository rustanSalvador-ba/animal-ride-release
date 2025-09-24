import { useState, useEffect } from 'react';

export default function useGameLogic() {
  const [mainPlayer, setMainPlayer] = useState('');
  const [idSessao, setIdSessao] = useState('0');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname.split('/animal-ride/rooms/')[1];
    const param = getQueryVariable('player');
    setIdSessao(pathname);
    setMainPlayer(param);
    setIsClient(true);
  }, []);

  return { mainPlayer, idSessao, isClient };
}

function getQueryVariable(variable: string): string {
  if (typeof window === 'undefined') return '';
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (const pair of vars) {
    const [key, value] = pair.split('=');
    if (key === variable) return value;
  }
  return '';
}