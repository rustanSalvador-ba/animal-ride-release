import Link from 'next/link';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
export default function IndexPage() {
  
    return (
      <Link href='/login'><button class="btn btn-success text-center">CLIQUE PARA JOGAR</button></Link>
    )
  
}
