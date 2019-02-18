import React from 'react'
import { Link } from "react-router-dom"
import LoginForm from './LoginForm'
import WelcomeSBP from './WelcomeSBP'


function HomePage({
  setCSRFToken,
}){
  return(
    <div className="homepage">
      <WelcomeSBP/>
      <LoginForm setCSRFToken = {setCSRFToken}/>
      <Link to="/SignUp"><button>Create an Account</button></Link>
    </div>
  )
}

export default HomePage