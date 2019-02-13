import React from 'react'
import { Link } from "react-router-dom"


function SideBar(){
  return(
    <div>
      <Link to="/"><button>My Items</button></Link>
      <Link to="/borrowed"><button>Borrowing</button></Link>
      <Link to="/library"><button>Library</button></Link>      
    </div>
  )
}

export default SideBar