import  React from 'react'

function Footer(props:any)  {
 
let name = props.name ? props.name: "Animal Ride";

  return <footer style={{bottom:0, position: 'fixed'}}>
        {name}
    </footer>
}

export default Footer;