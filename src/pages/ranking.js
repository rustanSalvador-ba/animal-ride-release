//import ReactDOM from 'react-dom';
//import jQuery from 'jquery';
//import login from "../js/util.js"
import NavBar from "../../Components/NavBar"
import Head from "../../Components/Head"
import Footer from "../../Components/Footer"
import { useState, useEffect } from 'react'

export default function Ranking () {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    //window.$ = window.jQuery = require('jquery')
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
  <div className="container">
        <h2>Players</h2>
        <p>This is the Ranking of the best players.</p>            
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th>1º</th>
            <td>Felipe</td>
            <td>100</td>
            </tr>
            <tr>
            <th>2º</th>
            <td>Sarah</td>
            <td>50</td>
            </tr>
            <tr>
            <th>3º</th>
            <td>Milla</td>
            <td>0</td>
            </tr>
        </tbody>
        </table>
    </div>
      <Footer name="Ranking"/>
    </body>
  </html>
)
  }
