import  React from 'react'

function Mode(props:any) {
   
    return (<div className='col-md-6 painel_img'>
            <div className='col-md-3 painel_img'  onClick={props.onClick} >{props.name}</div> 
        </div>)
}

export default Mode;