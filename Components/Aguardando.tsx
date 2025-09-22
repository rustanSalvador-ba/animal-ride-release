import React, { useEffect, useState } from 'react';

type AguardandoProps = {
  onDone?: () => void;
  autoHideAfter?: number | null;
};

const Aguardando: React.FC<AguardandoProps> = ({ onDone, autoHideAfter = null }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);

    // Se quiser ocultar automaticamente após certo tempo
    if (autoHideAfter !== null) {
      const timeoutId = setTimeout(() => {
        onDone?.() // Chama callback se fornecido
        clearInterval(intervalId); // Para o contador
      }, autoHideAfter * 1000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }

    return () => clearInterval(intervalId);
  }, [autoHideAfter, onDone]);

  return (
    <div className="aguardando">
      <h1 style={styles.title}>⏳ Aguardando jogadores...</h1>
      <p style={styles.counter}>Tempo de espera: {counter} segundos</p>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '2.5em',
    marginBottom: '20px'
  },
  counter: {
    fontSize: '1.5em'
  }
};

export default Aguardando;