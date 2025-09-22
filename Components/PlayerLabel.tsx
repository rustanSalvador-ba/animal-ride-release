import React from 'react'
// import nina from "../public/data/img/sprite/nina/nina.png"
// import snow from "../public/data/img/sprite/snow/snow.png"
// import teff from "../public/data/img/sprite/teff/teff.png"
// import dark from "../public/data/img/sprite/dark/dark.gif"

function PlayerLabel(props:any)  {
    let name: String = props.name ? props.name: "";
    let width= props.width ? props.width: "";
    let height = props.height ? props.height: "";
    
    switch(name) { 
        case "mainPlayer":
            return (
                <div className='col-md-3 painel_img' onClick={props.onClick}>
                 <picture>
                  <h6>Nina</h6><br/>
                  <img alt="nina" width={width} height={height} src={"../public/data/img/sprite/nina/nina.png"}/>
                  </picture>   
                </div>)
      
        case "mainPlayerTeff":
            return (
                <div className='col-md-3 painel_img' onClick={props.onClick}>
                  <picture>
                     <h6>Teff</h6><br/>
                  <img alt="Teff" width={width} height={height} src={"../public/data/img/sprite/teff/teff.png"}/>
                  </picture>
                </div>)
       
        case "mainPlayerSnow":
            return (
                <div className='col-md-3 painel_img' onClick={props.onClick}>
                <picture>
                  <h6>Snow</h6><br/>
                  <img alt="Snow" width={width} height={height} src={"../public/data/img/sprite/snow/snow.png"}/>
                  </picture>  
                </div>)
        case "mainPlayerDark":
        return (
            <div className='col-md-3 painel_img_dark' onClick={props.onClick}>
                <picture>
                  <h6>Dark</h6><br/>
                <img alt="Dark" width={width} height={height} src={"../public/data/img/sprite/dark/dark.gif"} />
                </picture>
            </div>)
        default: 
           return (
            <div className='col-md-3 painel_img'  onClick={props.onClick}>
                <picture>
                  <h6>Nina</h6><br/>
                <img alt="Nina" width={width} height={height} className='col-md-3 painel_img' src={"../public/data/img/sprite/nina/nina.png"}/>
                </picture> 
            </div>)
    }
   
  }
export default PlayerLabel;