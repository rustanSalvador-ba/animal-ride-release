
//import  "../../js/util.js"
import NavBar from "../../Components/NavBar"
import Head from "../../Components/Head"
import Footer from "../../Components/Footer"
import { useState, useEffect } from 'react'
 
export default function Login() {
  const [isClient, setIsClient] = useState(false)

  function handleLogin(e) {
   // login(e)
  } 

  useEffect(() => {
  //if (typeof document !== 'undefined')
  // window.$ = window.jQuery = require('jquery')
   (async ()=>{
      try{
        const result = await fetch('/.netlify/functions/fetch-products');
        const resultJSON = await result.json();
      
        console.log(resultJSON);
      } catch (err){
        console.log('Failed to do netlify function', err);
      }
    })();
    setIsClient(true)
  }, [])

  if (!isClient)
  return(<>Aguarde..</>)
  else
    return (
<div>
  <NavBar/>
    <div className="painel_login">
      <form role="form" id="form-login" /> <br/>
        <h4 className="text-center"><span className="glyphicon glyphicon-lock"></span> Login</h4>
          <div className="form-group">
            <label htmlFor="email"  className="input_label"><span className="glyphicon glyphicon-user"></span> E-Mail</label>
            <input type="email" className="form-control input_text" id="email" placeholder="Enter email" required>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="psw" className="input_label"><span className="glyphicon glyphicon-eye-open"></span> Password</label>
            <input type="password" className="form-control input_text" id="psw" placeholder="Enter password" autoComplete="current-password" required maxLength="6" />
          </div>
          <div className="form-group checkbox text-left">
            <label className="input_label"><input type="checkbox" value="" defaultChecked id="remember" />Remember me</label>
          </div>
          <br/>
          <div className="form-group">
            <button type="button" className="btn btn-info pull-right login_button" onClick={(e)=>handleLogin(e)}><span className="glyphicon glyphicon-off"></span> Login</button>
          </div>
        <div className="text-left">
          <span style={{color:'white'}} className="input_label">Not a member? <a href="register">Sign Up</a></span><br/>
          <span style={{color:'white'}} className="input_label">Forgot <a href="reset-password">Password?</a></span>
          <br/>
        </div>
      </div>
      <Footer name="Login"/>
 </div>
)
  }
