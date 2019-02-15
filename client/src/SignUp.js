import React from 'react';
import { Link } from "react-router-dom";
import WelcomeSBP from './WelcomeSBP';
import CreateAccount from './CreateAccount';


function SignUp({
  setCSRFToken,
}){
  return(
    <div>
      <WelcomeSBP/>
      <CreateAccount setCSRFToken = {setCSRFToken}/>
      <Link to="/"><button>Login to an existing account.</button></Link>

    </div>
  )
}

export default SignUp