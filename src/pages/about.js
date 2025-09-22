import NavBar from "../../Components/NavBar"
import Head from "../../Components/Head"
import Footer from "../../Components/Footer"
import { useState, useEffect } from 'react'
 
export default function About () {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
   // window.$ = window.jQuery = require('jquery')
    setIsClient(true)
  }, [])

  if (!isClient)
  return(<>Aguarde..</>)
  else
    return (
    <html>
        <Head/>
        <body>
            <NavBar/>
            <div className='text-center'>Em construção...</div>
            <Footer name="About"/>
        </body>
    </html>
    )
}
