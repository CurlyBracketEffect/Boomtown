import React from 'react';
import { Link } from "react-router-dom"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Header from './Header'




const Dashboard = ({
  setCSRFToken,
})=> (
  <Query
    query={gql`
    query {
      viewer{
        items{
          id
          title
          description
        }
      }
    }
    `}
    >
    {({ loading, error, data }) => {
      if (loading) return <option>Loading...</option>;
      if (error) return <option>Error</option>;      
      return(  
        
        <div className = "page_header">
        {/* <Header setCSRFToken = {setCSRFToken}/> */}
          <h1>My Items</h1>
          {data.viewer.items.map(item =>(
          <div key = {item.id}>
            <p>{item.title} </p>
            <p>{item.description} </p>
          </div>
      ))}
          <Link to="/items/create"><button>Add Item</button></Link>
        </div>
      )
      }}
  </Query>
)

export default Dashboard


