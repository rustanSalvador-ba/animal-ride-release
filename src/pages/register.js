import NavBar from "../../Components/NavBar"
import Head from "../../Components/Head"
import Footer from "../../Components/Footer"
import { useState, useEffect } from 'react'
import  "../../js/util.js"
 
export default function Register () {
  const [isClient, setIsClient] = useState(false)

  function handleRegister(e) {
    register(e)
  } 

  useEffect(() => {
   // window.$ = window.jQuery = require('jquery')
    setIsClient(true)
  }, [])

  if (!isClient)
  return(<>Aguarde</>)
  else
    return (
  <html>
  <Head/>
  <body>
  <NavBar/>
  <div className="painel_login">
  <br/>
  <h4 className="text-center"><span className="glyphicon glyphicon-user"></span> Register</h4>
  <br/>

  <form id="form-register">
    <div className="form-group">
      <label htmlFor="name" className="input_label"><span className="glyphicon glyphicon-user"></span> Username:</label>
      <input type="text" className="form-control input_text" autoComplete="name" id="name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="email" className="input_label"><span className="glyphicon glyphicon-envelope"></span> Email address:</label>
      <input type="email" className="form-control input_text" autoComplete="email-register" id="email-register" required/>
    </div>
    <div className="form-group">
      <label htmlFor="password" className="input_label"><span className="glyphicon glyphicon-eye-open"></span> Password:</label>
      <input type="password" className="form-control input_text" id="password" autoComplete="current-password" min="6" maxLength="6" required/>
    </div>
    <div className="form-group">
      <label htmlFor="passwordConfirm" className="input_label"><span className="glyphicon glyphicon-eye-open"></span> Password Confirm:</label>
      <input type="password" className="form-control input_text" id="passwordConfirm" autoComplete="current-password" min="6" maxLength="6" required/>
    </div>
    <div>
      <button type="button" className="btn btn-info pull-right login_button" onClick={(e)=>handleRegister(e)}>Register</button>
    </div>
    <div className="text-left"><br/>
      <span className="input_label">Is a member? <a href="login">Sign In</a></span><br/>
    </div>
  <br/>  
 
</form>
</div>
  <Footer name="Register"/>
    </body>
  </html>)
}
