import '../../../../js/util.js'

import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import GameCanvas from '../../GameCanvas'; // Seu componente MelonJS
import Aguardando from '../../../../Components/Aguardando';
 // Conecte-se ao seu servidor


function App() {
    const [players, setPlayers] = useState({});
    const [myPlayerId, setMyPlayerId] = useState(null);
    const [mainPlayer, setMainPlayer] = useState([])
    const [idSessao, setIdSessao] = useState("0")
    const [mode, setMode] = useState(null)
    const [waiting, setWaiting] = useState(true);
   

    function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }

    useEffect(() => {
           
            if (Object.keys(players).length == 0)
            setWaiting(true) 

            if (mode=="versus" && Object.keys(players).length == 4)
            setWaiting(false) 

            if (mode=="single")
            setWaiting(false) 
        
        },[players, mode])

    useEffect(() => {
     //   window.$ = window.jQuery = require('jquery')
        const pathname = window.location.pathname.split("/animal-ride/rooms/")[1];
        setIdSessao(pathname)
        var param = getQueryVariable("player");
        var modo = getQueryVariable("mode")
        
        setMode(modo)
        setMainPlayer(param)
     
       if (modo != "single")
        const socket = io("https://animal-ride-release.onrender.com",{
            timeout: 900000,
            transports: ["websocket"],
            withCredentials: true
        });
         
          
           socket.on('connect', () => {


                setMyPlayerId(socket.id);
                let msg = {
                    idSessao: idSessao,
                    idPlayer: socket.id,
                    player: param
                }

                socket.emit("player", JSON.stringify(msg))

                if (modo=="versus" && !temRegistro(players, getMultplayerName(param))) {
                    let msgMultPlayer = {
                        idSessao: idSessao,
                        idPlayer: "MultPlayer"+socket.id,
                        player: getMultplayerName(param)
                    }
                    socket.emit("player", JSON.stringify(msgMultPlayer))
                }
        });

        socket.on('currentPlayers', (serverPlayers) => {
            // if (temRegistro(serverPlayers, param) || temRegistro(serverPlayers, getMultplayerName(param))) {
            //     console.log("Nome de jogador já em uso. Escolha outro nome.");
            //     return;
            // }
                setPlayers(serverPlayers);
        });

        socket.on('playerDisconnected', (playerId) => {
            setPlayers(prevPlayers => {
                const newPlayers = { ...prevPlayers };
                delete newPlayers[playerId];
                return newPlayers;
            });
        });

        return () => {
            // socket.off('connect');
            // socket.off('currentPlayers');
            // socket.off('newPlayer');
            // socket.off('playerMoved');
            // socket.off('playerDisconnected');
            // socket.disconnect();
        };

    },[players]);

    const sendPlayerMovement = (player) => {
        socket.emit('playerMovement', player);
    };


if (waiting)
    return(<Aguardando onDone={() => setWaiting(false)}></Aguardando>)
else
    return (
           <GameCanvas
                players={players}
                myPlayerId={myPlayerId}
                onPlayerMove={sendPlayerMovement}
            />
    );
}
  function temRegistro(players, value) {
   let retorno = false
    Object.keys(players).forEach(key => {
        if (players[key].player === value) {
          retorno = true
        }
    });

    return retorno
  }
function getMultplayerName(player) {
  let retorno = "";   
      switch(player) {
          case("mainPlayer"): {
                retorno = "multPlayerNina"
                break;
          } 

          case("mainPlayerTeff"):{ 
            retorno = "multPlayerTeff"
            break;
          }

          case("mainPlayerSnow"):{
            retorno = "multPlayerSnow"
            break;
          } 

          case ("mainPlayerDark"):{
            retorno = "multPlayerDark"
            break;
          }
      }

    return retorno;
}
export default App;
