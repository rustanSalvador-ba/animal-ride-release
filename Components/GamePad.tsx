// import  React, { useEffect } from 'react'
// import { io } from 'socket.io-client';

// function GamePad( props:any)  {
 
// let name = props.name ? props.name: "Animal Ride";
// let playerName = props.playername;
// let element: Document = props.element
// let idPlayer= props.idPlayer
// let movimentoAtual: String = ""
//  const socket = io(`https://salajs.netlify.app:3001`);

// function selectEvent(id: string) {

//     let button = document.getElementById(id);
//     let intervalId: any;
//     if (button) {
//         button.addEventListener('mousedown', () => {
//             intervalId = setInterval(() => {
//                 console.log('Button is being pressed');
               
//                 // Add your code here to execute while the button is pressed
//             }, 100); // Adjust the interval as needed
//         });

//         button.addEventListener('mouseup', () => {
//             console.log('Button is mouseup');
//             clearInterval(intervalId);
//         });

//         button.addEventListener('mouseleave', () => {
//             console.log('Button is mouseleave');
//             clearInterval(intervalId);
//         });
//     }
    
// }

//     // useEffect(()=>{
//     //     selectEvent("up")
//     //     selectEvent("left")
//     //     selectEvent("right")
//     // }, [document])

//     function enviarMovimento(movimentoAtual:String){
//         let msg = {
//             idPlayer: idPlayer.idPlayer,
//             player: playerName,
//             movimento: movimentoAtual
//         }
//         socket.emit("playerMovement", JSON.stringify(msg))
//     }

// function triggerEvent(type:string, e: MouseEvent) {
   
//     if ('createEvent' in document) {
//         if (type == "up"){
//             element.dispatchEvent(new KeyboardEvent(type, {'key':'UP'}));
//             movimentoAtual = "UP"
//             enviarMovimento(movimentoAtual)
//         }
             
 

//         if (type == "keyleft") {
//             if (e.type.toString()=="pointerdown") {
//                 element.dispatchEvent(new KeyboardEvent(type, {'key':'LEFT'}));
//                    movimentoAtual = "LEFT"
//                    enviarMovimento(movimentoAtual)
//             } else {
//                 element.dispatchEvent(new KeyboardEvent("keyleftStop", {'key':'LEFT'})); 
//             }
            
//         } 

//         if (type == "keyright") {
//             if (e.type.toString()=="pointerdown") {
//                 element.dispatchEvent(new KeyboardEvent(type, {'key':'RIGHT'})); 
//                  movimentoAtual = "RIGHT"
//                 enviarMovimento(movimentoAtual)
//             } else {
//                 element.dispatchEvent(new KeyboardEvent("keyrightStop", {'key':'RIGHT'})); 
//             }
//         }  

//         if (type == "up")
//             element.dispatchEvent(new KeyboardEvent(type, {'key':'I'}));

//         if (type == "keyleft") {
//             if (e.type.toString()=="pointerdown") {
//                 element.dispatchEvent(new KeyboardEvent(type, {'key':'J'}));
//             } else {
//                 element.dispatchEvent(new KeyboardEvent("keyleftStop", {'key':'J'})); 
//             }
            
//         } 

//         if (type == "keyright") {
//             if (e.type.toString()=="pointerdown") {
//                 element.dispatchEvent(new KeyboardEvent(type, {'key':'L'})); 
//             } else {
//                 element.dispatchEvent(new KeyboardEvent("mp-keyrightStop", {'key':'L'})); 
//             }
//         }  
//     }
// }

//   return <div className='text-center' style={{bottom:50, position: 'fixed'}}>
//             <div>
//                  <button id="up" className='btn btn-primary' onClick={(e)=>triggerEvent('up', e.nativeEvent)}  >Up</button>
//             </div>
//             <div> 
//                 <button id="left" className='btn btn-primary' onClick={(e)=>triggerEvent('keyleft', e.nativeEvent)} onPointerDown={(e)=>triggerEvent('keyleft', e.nativeEvent)}>Left</button>
//                 <button id="right" className='btn btn-primary' onClick={(e)=>{triggerEvent('keyright', e.nativeEvent)}} onPointerDown={(e)=>triggerEvent('keyright', e.nativeEvent)}>Right</button>
//             </div>
//         </div>
// }

// export default GamePad;
import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface GamePadProps {
  name?: string;
  playername: string;
  element: Document;
  idPlayer: string;
}

const GamePad: React.FC<GamePadProps> = ({ name = 'Animal Ride', playername, element, idPlayer }) => {
  const socketRef = useRef<Socket | null>(null);
  const movimentoAtualRef = useRef<string>('');

  useEffect(() => {
    socketRef.current = io('https://salajs.netlify.app');

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const enviarMovimento = (movimento: string) => {
    const msg = {
      idPlayer,
      player: playername,
      movimento,
    };
    socketRef.current?.emit('playerMovement', JSON.stringify(msg));
  };

  const dispatchMovimento = (tecla: string, movimento: string) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: tecla }));
    movimentoAtualRef.current = movimento;
    enviarMovimento(movimento);
  };

  const stopMovimento = (tecla: string, tipo: string = 'keyup') => {
    element.dispatchEvent(new KeyboardEvent(tipo, { key: tecla }));
  };

  const handleEvent = (tipo: string, e: MouseEvent) => {
    const isDown = e.type === 'pointerdown' || e.type === 'mousedown';

    switch (tipo) {
      case 'up':
        dispatchMovimento('I', 'UP');
        break;
      case 'left':
        isDown ? dispatchMovimento('J', 'LEFT') : stopMovimento('J');
        break;
      case 'right':
        isDown ? dispatchMovimento('L', 'RIGHT') : stopMovimento('L');
        break;
    }
  };

  return (
    <div className="text-center" style={{ bottom: 50, position: 'fixed' }}>
      <div>
        <button
          id="up"
          className="btn btn-primary"
          onPointerDown={(e) => handleEvent('up', e.nativeEvent)}
        >
          Up
        </button>
      </div>
      <div>
        <button
          id="left"
          className="btn btn-primary"
          onPointerDown={(e) => handleEvent('left', e.nativeEvent)}
          onPointerUp={(e) => handleEvent('left', e.nativeEvent)}
        >
          Left
        </button>
        <button
          id="right"
          className="btn btn-primary"
          onPointerDown={(e) => handleEvent('right', e.nativeEvent)}
          onPointerUp={(e) => handleEvent('right', e.nativeEvent)}
        >
          Right
        </button>
      </div>
    </div>
  );
};

export default GamePad;
