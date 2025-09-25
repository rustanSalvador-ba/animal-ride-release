

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
export default function Chat(props:any) {

  const [textSend, setTextSend] = useState('');
  const [textReceived, setTextReceived] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [otherPlayerName, setOtherPlayer] = useState("mainplayer")
  const [idPlayer, setIdPlayer] = useState(props.idPlayer)
  let spanWidth:number = 1;
 // let cliente = new WebSocket('ws://localhost:4999')
    const socket = io(`https://salajs.netlify.app:3001`,{
             timeout: 9990000,
             tryAllTransports: true,
             withCredentials: true
         });
          
  useEffect(() => {
      if (socket != null) {
        socket.on('connect', () => {
           if (socket != null) {
   var ID:String = props.id.idSessao;
   var player = props.playername.mainPlayer

   let msg = {
      type: "message",
      text: textSend,
      idSessao: ID,
      idPlayer: idPlayer,
      player: player
    }

    socket.emit("message", JSON.stringify(msg))
  }
        });
  
        socket.on('message', (event:any) => {
          console.log("chat event", event)
         if (event != null && event.text != "") {
            var received = event
            //JSON.parse(event.data);
            let propsReceived = props;
        
          if ( propsReceived.id.idSessao) {        
            setTextReceived(textReceived+"\r  "+received.text)
          // document.getElementById("textoResp").innerHTML = textReceived+"\r  "+received.text
         
            if (received.player) { 
              setOtherPlayer(received.player)
            }
           
            spanWidth++
         }
         }
       
        });
    }
 
  }, []);

    function sendMessage() {   
  if (socket != null) {
   var ID:String = props.id.idSessao;
   var player = props.playername.mainPlayer

   let msg = {
      type: "message",
      text: textSend,
      idSessao: ID,
      idPlayer: idPlayer,
      player: player
    }

    socket.emit("message", JSON.stringify(msg))
  }
}

        

return (<div>
  <Button variant="success" onClick={handleShow}>
  Chat
</Button>
{show && <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea id="textoResp" className="form-control" rows={5} cols={spanWidth} value={textReceived} readOnly></textarea>
        <textarea className="form-control" rows={5}  id="textoSend" onKeyUp={(e) => setTextSend(e.currentTarget.value)} value={textSend} onChange={(e)=>setTextSend(e.currentTarget.value)}></textarea>
        <button className="btn btn-primary" id="buttonSend" onClick={sendMessage}>Send</button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick = {handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal.Dialog>}
  </div>
)
};



