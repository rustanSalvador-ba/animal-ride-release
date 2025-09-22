import  React from 'react'
import { useState, useEffect } from 'react'
import Sala from './Sala'
function Salas()  {
    let rooms : Array<typeof Sala>= []
    const [salas, setSalas] = useState(rooms)
    const [isClient, setIsClient] = useState(false)

useEffect(()=>{
    setIsClient(true)
    document.getElementById('new-room-button')?.addEventListener("click",(e)=>{add()})

    
},[])

function add() {
   let nome = new String(document.getElementById('room-name')?.textContent?.toString())
 //  console.log(sala)
 let sala =  Sala(nome)
   //rooms.push(sala)
   // setSalas([...rooms, sala])
}
// if (!isClient)
// return(<div>Sala Vazia</div>)
// else
    salas.forEach(element => {
       return {element}
    });
}

export default Salas;