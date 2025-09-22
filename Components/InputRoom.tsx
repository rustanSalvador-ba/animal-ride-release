import  React from 'react'

function InputRoom(props:any)  {
 
let name = props.name ? props.name: "Animal Ride";
  return <div className='input-group col-md-2'>
    <input type='text' id="room-name" className='form-control' placeholder='type here...'>
      </input><div className="input-group-btn">
      <button id="new-room-button" type="button" className='btn btn-success' onClick={props.onClick}>
      Save
      </button>
    </div>
  </div> 
}

export default InputRoom;