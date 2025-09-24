import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket(hostname: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(`https://${hostname}:3001`);
    return () => {
      socketRef.current?.disconnect();
    };
  }, [hostname]);

  return socketRef;
}