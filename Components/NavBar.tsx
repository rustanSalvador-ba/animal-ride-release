import Link from 'next/link';
import  React from 'react'
import Bootstrap from 'bootstrap'

let toogle: boolean = false;

export function toogleNavBar (state:boolean) {
    $("#myNavbar").toggle(state)
} 

function NavBar(props:any){
        return <nav className="navbar navbar-inverse painel" style={{backgroundColor:'hsl(182, 84%, 50%)', borderColor:'hsl(182, 84%, 50%)'}}>
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" onClick={()=>handleToogle(toogle)} style={{backgroundColor:'hsl(182, 84%, 50%)', borderColor:'white'}}>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>                        
                    </button>
                    <a className="navbar-brand" href="animal-ride" style={{color: 'white'}}>Animal Ride</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                    <li><Link href="/animal-ride" ><span className="glyphicon glyphicon-home"></span> Lobby</Link></li>
                    <li><Link href="/ranking" ><span className="glyphicon glyphicon-star"></span> Ranking</Link></li> 
                    <li><Link href="/contact" ><span className="glyphicon glyphicon-envelope"></span> Contact</Link></li>
                    <li><Link href="/about" ><span className="glyphicon glyphicon-question-sign"></span> About</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    <li><Link href="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                    <li><Link href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
 

function handleToogle(state:boolean) {
    toogle = !state
    toogleNavBar (toogle)
}

export default NavBar;