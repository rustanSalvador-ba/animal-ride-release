import  React from 'react'


function Sala(props:any) {
   
    let name = props.name ? props.name: "No name";
    return <div className='col-md-2'><a href={"animal-ride/rooms/"+props.href+"?player="+props.player+"&mode="+props.mode}>{name}<span className="glyphicon glyphicon-globe online"></span></a></div>
}

export default Sala;