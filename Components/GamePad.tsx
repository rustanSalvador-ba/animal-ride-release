import  React, { useEffect } from 'react'
import { io } from 'socket.io-client';

function GamePad( props:any)  {
 
let name = props.name ? props.name: "Animal Ride";
let playerName = props.playername;
let element: Document = props.element
let idPlayer= props.idPlayer
let movimentoAtual: String = ""
 const socket = io(`http://${window.location.hostname}:3001`);

function selectEvent(id: string) {

    let button = document.getElementById(id);
    let intervalId: any;
    if (button) {
        button.addEventListener('mousedown', () => {
            intervalId = setInterval(() => {
                console.log('Button is being pressed');
               
                // Add your code here to execute while the button is pressed
            }, 100); // Adjust the interval as needed
        });

        button.addEventListener('mouseup', () => {
            console.log('Button is mouseup');
            clearInterval(intervalId);
        });

        button.addEventListener('mouseleave', () => {
            console.log('Button is mouseleave');
            clearInterval(intervalId);
        });
    }
    
}

    // useEffect(()=>{
    //     selectEvent("up")
    //     selectEvent("left")
    //     selectEvent("right")
    // }, [document])

    function enviarMovimento(movimentoAtual:String){
        let msg = {
            idPlayer: idPlayer.idPlayer,
            player: playerName,
            movimento: movimentoAtual
        }
        socket.emit("playerMovement", JSON.stringify(msg))
    }

function triggerEvent(type:string, e: MouseEvent) {
   
    if ('createEvent' in document) {
        if (type == "up"){
            element.dispatchEvent(new KeyboardEvent(type, {'key':'UP'}));
            movimentoAtual = "UP"
            enviarMovimento(movimentoAtual)
        }
             
 

        if (type == "keyleft") {
            if (e.type.toString()=="pointerdown") {
                element.dispatchEvent(new KeyboardEvent(type, {'key':'LEFT'}));
                   movimentoAtual = "LEFT"
                   enviarMovimento(movimentoAtual)
            } else {
                element.dispatchEvent(new KeyboardEvent("keyleftStop", {'key':'LEFT'})); 
            }
            
        } 

        if (type == "keyright") {
            if (e.type.toString()=="pointerdown") {
                element.dispatchEvent(new KeyboardEvent(type, {'key':'RIGHT'})); 
                 movimentoAtual = "RIGHT"
                enviarMovimento(movimentoAtual)
            } else {
                element.dispatchEvent(new KeyboardEvent("keyrightStop", {'key':'RIGHT'})); 
            }
        }  

        if (type == "up")
            element.dispatchEvent(new KeyboardEvent(type, {'key':'I'}));

        if (type == "keyleft") {
            if (e.type.toString()=="pointerdown") {
                element.dispatchEvent(new KeyboardEvent(type, {'key':'J'}));
            } else {
                element.dispatchEvent(new KeyboardEvent("keyleftStop", {'key':'J'})); 
            }
            
        } 

        if (type == "keyright") {
            if (e.type.toString()=="pointerdown") {
                element.dispatchEvent(new KeyboardEvent(type, {'key':'L'})); 
            } else {
                element.dispatchEvent(new KeyboardEvent("mp-keyrightStop", {'key':'L'})); 
            }
        }  
    }
}

  return <div className='text-center' style={{bottom:50, position: 'fixed'}}>
            <div>
                 <button id="up" className='btn btn-primary' onClick={(e)=>triggerEvent('up', e.nativeEvent)}  >Up</button>
            </div>
            <div> 
                <button id="left" className='btn btn-primary' onClick={(e)=>triggerEvent('keyleft', e.nativeEvent)} onPointerDown={(e)=>triggerEvent('keyleft', e.nativeEvent)}>Left</button>
                <button id="right" className='btn btn-primary' onClick={(e)=>{triggerEvent('keyright', e.nativeEvent)}} onPointerDown={(e)=>triggerEvent('keyright', e.nativeEvent)}>Right</button>
            </div>
        </div>
}

export default GamePad;