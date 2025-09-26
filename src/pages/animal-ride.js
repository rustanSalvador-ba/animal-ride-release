
import NavBar from "../../Components/NavBar"
import Head from "../../Components/Head"
import PlayerLabel from "../../Components/PlayerLabel"
import Footer from "../../Components/Footer"
import Mode from "../../Components/Mode"
import { useState, useEffect} from 'react'
import io from 'socket.io-client';
import Sala from '../../Components/Sala'
import InputRoom from '../../Components/InputRoom'
import data from "../../salas.json"
import '../../js/util.js'



export default function AnimalRide () {
  const [isClient, setIsClient] = useState(false)
  const [newRoomShow, setNewRoomShow] = useState("none")
  const [mainPlayer, setMainPlayer] = useState([])
  const [mode, setMode] = useState([])
  const [salas, setSalas] = useState(data.salas)

  useEffect(() => {
   // window.$ = window.jQuery = require('jquery')
   
    const socket = io(`https://${window.location.hostname}:3001`);
    socket.on('connect', () => {
    console.log('Conectado ao servidor de jogo');
    })
    
    socket.on('sala', (sala) => {
      setSalas([...salas, sala])
    });

  }, [salas]) // Add salas dependency
  //salasServer = io(`http://${window.location.hostname}:3001`);
 
 
 useEffect(() => {
//  salasServer = io(`http://${window.location.hostname}:3001`);
//       if (salasServer != null) {
//         salasServer.on('sala', (sala) => {
//           setSalas([...salas, sala])
//         });
//         console.log(salas)
//       }
  }, [])
  

function sendNewSala(nome) {
      const socket = io(process.env.SALA_APP_ENDPOINT,{
                  transports: ["polling"],
                  withCredentials: true
              });
            
    socket.on('connect', () => {
    console.log('Conectado ao servidor de jogo');
    })
 const sala = {
      name: nome
  } 
    setSalas([...salas, sala])
 
 socket.emit("newSala", JSON.stringify(sala))
  
}

function handleClick(name) {
    setMainPlayer(name)
}

function handleClickMode(name) {
  console.log(name)
    setMode(name)
}

function getName(mainPlayer) {

    if(mainPlayer=="mainPlayer")     return "Nina"
    if(mainPlayer=="mainPlayerTeff") return "Teff"
    if(mainPlayer=="mainPlayerSnow") return "Snow"
    if(mainPlayer=="mainPlayerDark") return "Dark"
}

function showInputNewRoom() {
    if (newRoomShow)
      setNewRoomShow(false)
    else
     setNewRoomShow("none")
}

function getDocument() {
  if (typeof window === 'undefined'){
    return null;
  } else {
    return window.document;
  }
}

function add(e) {
        let nome = $('#room-name').val()

        salas.forEach(sala => {
          if (sala.name === nome || nome === null) 
            hasName = true
        }) 

        if (!hasName) {
          sendNewSala(nome)
        }
    }

  useEffect(() => {
    setIsClient(true)

  }, [])

    if (!isClient)
     return(<></>)
    else
     return (<div>
            <NavBar/>
             <div id='salas'>
               <span className='pull-left' style={{marginRight:'10px'}}> <h3>Roons On-line</h3></span><span style={{paddingTop:'25px'}} onClick={()=>showInputNewRoom()}  className={newRoomShow ? "glyphicon glyphicon-plus online":"glyphicon glyphicon-minus online"}> </span>
                
                <div id='newRoom' style={{display:newRoomShow}}>
                    <InputRoom  onClick={(e)=>add(e)}></InputRoom>
                </div> <br></br><br></br>
                
               
                    {
                        salas.filter(e => e.name!=null)
                             .map((el) => {
                            return (<div key={el.id}><Sala name={el.name} href={el.id} player={mainPlayer} mode={mode}></Sala></div>)
                        })
                    }
              </div>
                <div id="players"  >
                  <div className='col-md-8'>
                   <div className='col-md-4'><h4>Selected Mode: {mode}</h4></div>
                  <div className='col-md-4'><h4>Selected Player: {getName(mainPlayer) } <PlayerLabel id={mainPlayer} name={mainPlayer} onClick={(e)=>{  handleClick({mainPlayer})}}></PlayerLabel>
                </h4>
                </div>
                </div>
                <br></br><br></br>
                <h3>Select Mode:</h3>
                <Mode name="Versus" onClick={(e)=>{ handleClickMode("versus")}}/><br></br>
                <Mode name="Single" onClick={(e)=>{ handleClickMode("single")}}/>
                <br></br>
                <h3>Select Player:</h3>
                  <PlayerLabel id="mainPlayer" name="mainPlayer" onClick={(e)=>{  handleClick("mainPlayer")}}></PlayerLabel>
                  <PlayerLabel id="mainPlayerTeff" name="mainPlayerTeff" onClick={(e)=>setMainPlayer("mainPlayerTeff")}></PlayerLabel>
                  <PlayerLabel id="mainPlayerSnow" name="mainPlayerSnow" onClick={(e)=>setMainPlayer("mainPlayerSnow")}></PlayerLabel>
                  <PlayerLabel name="mainPlayerDark" onClick={(e)=>setMainPlayer("mainPlayerDark")}></PlayerLabel>
                </div>
               <Footer/>
               </div>)
}

