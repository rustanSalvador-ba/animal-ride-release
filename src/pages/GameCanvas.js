import React, { useRef, useEffect, useState } from 'react';
import NavBar from "../../Components/NavBar"
import Head from "../../Components/Head"
import Footer from "../../Components/Footer"
import GamePad from "../../Components/GamePad"
import Chat from "../../Components/Chat"
import * as me from 'melonjs';
import DataManifest from '../../manifest';
import PlayScreen from '../../js/stage/play.js';
import { PlayerEntity, CoinEntity, EnemyEntity, MultPlayerEntity, EmptyEntity, MultPlayerEntitySnow, MultPlayerEntityNina, MultPlayerEntityTeff, MultPlayerEntityDark } from '../../js/renderables/entities.js';
import io from 'socket.io-client';
import dynamic from 'next/dynamic';


const GameCanvas = ({ players, myPlayerId, onPlayerMove }) => {
  const canvasRef = useRef(null);
  const initialized = useRef(false);
  const [mainPlayer, setMainPlayer] = useState([])
  let myPlayerEntity = null; // Para manter a referência ao jogador local

  const [isClient, setIsClient] = useState(false)
  const [idSessao, setIdSessao] = useState("0")
  const [idPlayer, setIdPlayer] = useState(myPlayerId)
  //const socket = io(`https://https://salajs.netlify.app/:3001`);
const socket = fetch('/.netlify/functions/gameServer');
//const socket = result.json();



  useEffect(() => {
    const playerEntities = ["mainPlayer", "mainPlayerTeff", "mainPlayerSnow", "mainPlayerDark"];
    const multiplayerEntities = ["multPlayerNina", "multPlayerTeff", "multPlayerSnow", "multPlayerDark"];
    // Prevent duplicate initialization
    if (initialized.current) return;
    initialized.current = true;


    // Cleanup function to stop game and remove canvas on unmount
    const cleanup = () => {

      if (me.state.isRunning()) {
        me.state.stop();
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };

    if (typeof window !== 'undefined') {
      //window.$ = window.jQuery = require('jquery')

    }

    const pathname = window.location.pathname.split("/animal-ride/rooms/")[1];
    var param = getQueryVariable("player");
    var mode = getQueryVariable("mode");
    setIdSessao(pathname)
    setIsClient(true)
    setMainPlayer(param)

    // Remove any existing canvas
    cleanup();

    me.device.onReady(() => {

      // Clear any existing canvas first
      const existingCanvas = document.querySelector('#screen canvas');
      if (existingCanvas) {
        existingCanvas.remove();
      }

      if (!me.video.init(1040, 1080, { parent: "screen", scale: "auto" })) {
        console.error("Your browser does not support HTML5 canvas.");
        return;
      }


      me.loader.preload(DataManifest, function () {
        console.log("idPlayer", idPlayer)
        registerEntities(multiplayerEntities, getMultplayerName(param), MultPlayerEntity, "multPlayerEntity", "MultPlayer" + idPlayer);
        registerEntities(playerEntities, param, PlayerEntity, "playerEntity", idPlayer);
        me.pool.register("CoinEntity", CoinEntity, false);
        me.pool.register("EnemyEntity", EnemyEntity, false);

        me.state.transition("fade", "#FFFFFF", 250);
        // me.pool.register({mainPlayer}, PlayerEntity);  

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", false);
        me.input.bindKey(me.input.KEY.W, "jump", false);

        const multiControls = getMultiplayerControls();

        me.input.bindKey(multiControls.LEFT, "mp-left");
        me.input.bindKey(multiControls.RIGHT, "mp-right");
        me.input.bindKey(multiControls.JUMP, "mp-jump", false);

        const multiControlsSnow = getMultiplayerControlsSnow()

        me.input.bindKey(multiControlsSnow.LEFT, "mp-left-snow");
        me.input.bindKey(multiControlsSnow.RIGHT, "mp-right-snow");
        me.input.bindKey(multiControlsSnow.JUMP, "mp-jump-snow", false);

        const multiControlsTeff = getMultiplayerControlsTeff()

        me.input.bindKey(multiControlsTeff.LEFT, "mp-left-teff");
        me.input.bindKey(multiControlsTeff.RIGHT, "mp-right-teff");
        me.input.bindKey(multiControlsTeff.JUMP, "mp-jump-teff", false);

        const multiControlsDark = getMultiplayerControlsDark()

        me.input.bindKey(multiControlsDark.LEFT, "mp-left-dark");
        me.input.bindKey(multiControlsDark.RIGHT, "mp-right-dark");
        me.input.bindKey(multiControlsDark.JUMP, "mp-jump-dark", false);

        const multiControlsNina = getMultiplayerControlsNina()

        me.input.bindKey(multiControlsNina.LEFT, "mp-left-nina");
        me.input.bindKey(multiControlsNina.RIGHT, "mp-right-nina");
        me.input.bindKey(multiControlsNina.JUMP, "mp-jump-nina", false);

        document.addEventListener('keyleft', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
          enviarMovimento("LEFT")
        });

        document.addEventListener('keyright', (event) => {
          enviarMovimento("RIGHT")
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);

        });

        document.addEventListener('keyrightStop', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
        });

        document.addEventListener('keyleftStop', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
        });

        document.addEventListener('up', (event) => {
          console.log("KEYUP")
          me.input.triggerKeyEvent(me.input.KEY.UP, true);
          //enviarMovimento("UP")
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.UP, false);
          }, 500)
        });

        document.addEventListener('mp-keyleft', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.J, true);

        });

        document.addEventListener('mp-keyright', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.L, true);
        });

        document.addEventListener('mp-keyrightStop', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.L, false);
        });

        document.addEventListener('mp-keyleftStop', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.J, false);
        });

        document.addEventListener('mp-keyup', (event) => {
          me.input.triggerKeyEvent(me.input.KEY.I, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.I, false);
          }, 500)
        });

        document.addEventListener("keyup", (event) => {
          if (event.key == "ArrowUp" || event.key == "w")
            enviarMovimento("UP")

          if (event.key == "ArrowLeft" || event.key == "a")
            enviarMovimento("LEFT")

          if (event.key == "ArrowRight" || event.key == "d")
            enviarMovimento("RIGHT")

        });


        // if (players != null) {
        //   Object.keys(players).forEach(key => {
        //     if (players[key].idPlayer !== idPlayer) {
        //       me.pool.register(players[key].player, MultPlayerEntity);
        //     }

        //     });
        // }


        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.change(me.state.PLAY)
        me.state.transition("start")

        if (mode == "single") {
          snowIA()
          teffIA()
          ninaIA()
          darkIA()
        }

        socket.on('playerMoved', (playerInfo) => {
          if (playerInfo.idPlayer !== myPlayerId) {
            if (playerInfo.movimento === "UP") {
              me.input.triggerKeyEvent(me.input.KEY.I, true); // Simula pressionamento de 'I' (pular)
              setTimeout(() => {
                me.input.triggerKeyEvent(me.input.KEY.I, false); // Libera a tecla após 500ms
              }, 500);
            }

            if (playerInfo.movimento === "LEFT") {
              me.input.triggerKeyEvent(me.input.KEY.J, true); // Simula pressionamento de 'J' (mover esquerda)
              setTimeout(() => {
                me.input.triggerKeyEvent(me.input.KEY.J, false); // Libera a tecla após 500ms
              }, 1500);
            }

            if (playerInfo.movimento === "RIGHT") {
              me.input.triggerKeyEvent(me.input.KEY.L, true); // Simula pressionamento de 'L' (mover direita)
              setTimeout(() => {
                me.input.triggerKeyEvent(me.input.KEY.L, false); // Libera a tecla após 500ms
              }, 1500);
            }
          }
        });

        // socket.on('currentPlayers', (serverPlayers) => {
        //   console.log("serverPlayers", serverPlayers)
        //   Object.keys(serverPlayers).forEach(key => {
        //       if (serverPlayers[key].idPlayer !== idPlayer) {
        //         //me.pool.register(serverPlayers[key].player, MultPlayerEntity);
        //         console.log(serverPlayers[key].player)
        //       }
        //   });
        // });


      })
    }, []);

    function getMultiplayerControls() {
      return {
        LEFT: me.input.KEY.J,
        RIGHT: me.input.KEY.L,
        JUMP: me.input.KEY.I
      };
    }

    function getMultiplayerControlsSnow() {
      return {
        LEFT: me.input.KEY.H,
        RIGHT: me.input.KEY.F,
        JUMP: me.input.KEY.T
      };
    }

    function getMultiplayerControlsTeff() {
      return {
        LEFT: me.input.KEY.V,
        RIGHT: me.input.KEY.B,
        JUMP: me.input.KEY.G
      };
    }

    function getMultiplayerControlsDark() {
      return {
        LEFT: me.input.KEY.K,
        RIGHT: me.input.KEY.Ç,
        JUMP: me.input.KEY.P
      };
    }

    function getMultiplayerControlsNina() {
      return {
        LEFT: me.input.KEY.N,
        RIGHT: me.input.KEY.M,
        JUMP: me.input.KEY.U
      };
    }


    function enviarMovimento(movimentoAtual) {
      let msg = {
        idPlayer: idPlayer.idPlayer,
        player: param,
        movimento: movimentoAtual
      }

      socket.emit("playerMovement", JSON.stringify(msg))
    }

    function temRegistro(players, value) {
      let retorno = false
      Object.keys(players).forEach(key => {
        if (players[key].player === value) {
          console.log("temRegistro", players[key].player, value)
          retorno = true
        }
      });

      return retorno
    }

    function isMainPlayer(players, value, idPlayer) {
      let retorno = false
      Object.keys(players).forEach(key => {
        if (players[key].player === value && idPlayer === players[key].idPlayer || (players[key].player === value && idPlayer.split("MultPlayer")[1] === players[key].idPlayer.split("MultPlayer")[1])) {
          console.log("isMainPlayer", players[key].player, value, idPlayer, key)
          retorno = true
        }
      });

      return retorno
    }

    function isMainPlayerName(players, value, idPlayer, mainPlayer) {
      let retorno = false
      Object.keys(players).forEach(key => {
        if (mainPlayer != null && players[key].player === value && idPlayer !== players[key].idPlayer) {
          console.log("isMainPlayer name Multplayer", players[key].player, value, idPlayer, key)
          retorno = true
        }
      });

      return retorno
    }

    function removePlayersById(players, idToRemove) {
      const filteredPlayers = {};

      Object.keys(players).forEach(key => {
        if (players[key].idPlayer !== idToRemove) {
          filteredPlayers[key] = players[key];
        }
      });

      return filteredPlayers;
    }


    function registerEntities(entityList, mainEntity, entityClass, type, idPlayer) {
      let playersFiltered = removePlayersById(players, "MultPlayer" + idPlayer)
      try {

        entityList.forEach(entity => {
          if (type == "playerEntity") {
            me.pool.register(entity, entity == mainEntity ? entityClass : EmptyEntity);
          } else {

            if (mode == "single" && !temRegistro(players, entity)) {
              if (entity == "multPlayerSnow")
                me.pool.register(entity, MultPlayerEntitySnow);
              if (entity == "multPlayerTeff")
                me.pool.register(entity, MultPlayerEntityTeff);
              if (entity == "multPlayerDark")
                me.pool.register(entity, MultPlayerEntityDark);
              if (entity == "multPlayerNina")
                me.pool.register(entity, MultPlayerEntityNina);
            } else if (mode == "versus" && !temRegistro(players, entity)) {
              me.pool.register(entity, EmptyEntity);
            } else if (mode == "versus" && temRegistro(players, entity)) {

              if (entity == "multPlayerSnow" && !isMainPlayer(playersFiltered, entity, idPlayer)) {
                me.pool.register(entity, MultPlayerEntity);

              } else if (entity == "multPlayerSnow" && isMainPlayerName(playersFiltered, entity, idPlayer, mainEntity))
                me.pool.register(entity, MultPlayerEntity);
              else if (entity == "multPlayerSnow") {
                console.log("não registrando", entity)
                me.pool.register(entity, EmptyEntity);
              }


              if (entity == "multPlayerTeff" && !isMainPlayer(playersFiltered, entity, idPlayer)) {
                me.pool.register(entity, MultPlayerEntity);

              } else if (entity == "multPlayerTeff" && isMainPlayerName(playersFiltered, entity, idPlayer, mainEntity))
                me.pool.register(entity, MultPlayerEntity);
              else if (entity == "multPlayerTeff") {
                me.pool.register(entity, EmptyEntity);
              }

              if (entity == "multPlayerDark" && !isMainPlayer(playersFiltered, entity, idPlayer)) {
                me.pool.register(entity, MultPlayerEntity);

              } else if (entity == "multPlayerDark" && isMainPlayerName(playersFiltered, entity, idPlayer, mainEntity))
                me.pool.register(entity, MultPlayerEntity);
              else if (entity == "multPlayerDark") {
                me.pool.register(entity, EmptyEntity);
              }

              if (entity == "multPlayerNina" && !isMainPlayer(playersFiltered, entity, idPlayer)) {
                me.pool.register(entity, MultPlayerEntity);

              } else if (entity == "multPlayerNina" && isMainPlayerName(playersFiltered, entity, idPlayer, mainEntity))
                me.pool.register(entity, MultPlayerEntity);
              else if (entity == "multPlayerNina") {
                me.pool.register(entity, EmptyEntity);
              }

            }
            else {
              me.pool.register(entity, EmptyEntity);
            }

          }
        }

        );
      } catch (error) {
        console.error("Erro ao registrar entidades:", error);

      }
    }




    function getMultplayerName(player) {
      let retorno = "";
      switch (player) {
        case ("mainPlayer"): {
          retorno = "multPlayerNina"
          break;
        }

        case ("mainPlayerTeff"): {
          retorno = "multPlayerTeff"
          break;
        }

        case ("mainPlayerSnow"): {
          retorno = "multPlayerSnow"
          break;
        }

        case ("mainPlayerDark"): {
          retorno = "multPlayerDark"
          break;
        }
      }

      return retorno;
    }

    function snowIA() {
      const movimentos = ["UP", "LEFT", "RIGHT"];

      const interval = setInterval(() => {
        if (!socket.connected) {
          clearInterval(interval);
          return;
        }

        const escolhido = movimentos[Math.floor(Math.random() * movimentos.length)];


        if (escolhido === "UP") {
          me.input.triggerKeyEvent(me.input.KEY.T, true);
          me.input.triggerKeyEvent(me.input.KEY.F, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.T, false);
          }, 500);
        }

        // if (escolhido === "LEFT") {
        //   me.input.triggerKeyEvent(me.input.KEY.H, true);
        //   setTimeout(() => {
        //     me.input.triggerKeyEvent(me.input.KEY.H, false);
        //   }, 500);
        // }

        if (escolhido === "RIGHT") {
          me.input.triggerKeyEvent(me.input.KEY.F, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.F, false);
          }, 2500);
        }

      }, 1000); // Executa a cada 3 segundos
    }

    function teffIA() {
      const movimentos = ["UP", "LEFT", "RIGHT"];

      const interval = setInterval(() => {
        if (!socket.connected) {
          clearInterval(interval);
          return;
        }

        const escolhido = movimentos[Math.floor(Math.random() * movimentos.length)];


        if (escolhido === "UP") {
          me.input.triggerKeyEvent(me.input.KEY.G, true);
          me.input.triggerKeyEvent(me.input.KEY.B, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.G, false);
          }, 500);
        }

        // if (escolhido === "LEFT") {
        //   me.input.triggerKeyEvent(me.input.KEY.H, true);
        //   setTimeout(() => {
        //     me.input.triggerKeyEvent(me.input.KEY.H, false);
        //   }, 500);
        // }

        if (escolhido === "RIGHT") {
          me.input.triggerKeyEvent(me.input.KEY.B, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.B, false);
          }, 2500);
        }

      }, 1000); // Executa a cada 3 segundos
    }

    function darkIA() {
      const movimentos = ["UP", "LEFT", "RIGHT"];

      const interval = setInterval(() => {
        if (!socket.connected) {
          clearInterval(interval);
          return;
        }

        const escolhido = movimentos[Math.floor(Math.random() * movimentos.length)];


        if (escolhido === "UP") {
          me.input.triggerKeyEvent(me.input.KEY.P, true);
          me.input.triggerKeyEvent(me.input.KEY.Ç, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.P, false);
          }, 500);
        }

        // if (escolhido === "LEFT") {
        //   me.input.triggerKeyEvent(me.input.KEY.H, true);
        //   setTimeout(() => {
        //     me.input.triggerKeyEvent(me.input.KEY.H, false);
        //   }, 500);
        // }

        if (escolhido === "RIGHT") {
          me.input.triggerKeyEvent(me.input.KEY.Ç, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.Ç, false);
          }, 2500);
        }

      }, 1000); // Executa a cada 3 segundos
    }

    function ninaIA() {
      const movimentos = ["UP", "LEFT", "RIGHT"];

      const interval = setInterval(() => {
        if (!socket.connected) {
          clearInterval(interval);
          return;
        }

        const escolhido = movimentos[Math.floor(Math.random() * movimentos.length)];


        if (escolhido === "UP") {
          me.input.triggerKeyEvent(me.input.KEY.U, true);
          me.input.triggerKeyEvent(me.input.KEY.M, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.U, false);
          }, 500);
        }

        // if (escolhido === "LEFT") {
        //   me.input.triggerKeyEvent(me.input.KEY.H, true);
        //   setTimeout(() => {
        //     me.input.triggerKeyEvent(me.input.KEY.H, false);
        //   }, 500);
        // }

        if (escolhido === "RIGHT") {
          me.input.triggerKeyEvent(me.input.KEY.M, true);
          setTimeout(() => {
            me.input.triggerKeyEvent(me.input.KEY.M, false);
          }, 2500);
        }

      }, 1000); // Executa a cada 3 segundos
    }

    return () => {

      // Limpeza do MelonJS ao desmontar o componente
      // me.video.destroy();
    };
  }, [idPlayer, myPlayerId, players, socket]); // Executa apenas uma vez na montagem

  // Atualiza a tela de jogo quando as props 'players' mudam
  useEffect(() => {
    if (me.game.world) {
      me.state.current().onResetEvent(); // Re-renderiza jogadores
    }

  }, [myPlayerId, players]); // Depende de players e myPlayerId

  return (isClient &&
    <div>
      <NavBar />
      <span style={{ Color: "greem" }}>SALA: {idSessao}</span>
      <Chat id={{ idSessao }} stage={{ me }} playername={{ mainPlayer }} idPlayer={{ idPlayer }}></Chat>
      <div id='container'>
        <div id="screen"></div>
      </div>
      <GamePad name="" element={getDocument()} idPlayer={{ idPlayer }} playername={{ mainPlayer }} />
      <Footer name="Room" />
    </div>
  )
};
function getDocument() {
  if (typeof document === 'undefined') {
    return null;
  } else {
    return document;
  }
}

function getQueryVariable(variable) {

  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
}

export default dynamic(() => Promise.resolve(GameCanvas), { ssr: false });