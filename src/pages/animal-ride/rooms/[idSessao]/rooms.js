import NavBar from "../../../../../Components/NavBar"
import Head from "../../../../../Components/Head"
import Footer from "../../../../../Components/Footer"
import { useState, useEffect } from 'react'

export default function Rooms () {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
   // window.$ = window.jQuery = require('jquery')
    setIsClient(true)
  }, [])

  if (!isClient)
  return(<></>)
  else
    return (
    <html>
        <Head/>
        <body>
            <NavBar/>
            <Footer name="About"/>
        </body>
    </html>
    )
}
