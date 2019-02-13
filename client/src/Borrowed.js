import React from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";


const Borrowed = ()=> (
  <Query
    query={gql`
    query{
      viewer{
        borrowed{
          id
          title
          description
        }
      }
    }
    `}
    >
    {({ loading, error, data }) => {
      if (loading) return <option>Loading...</option>
      if (error) return <option>Error :(</option>      
      return(  
        <div className = "page_header">
          <h1>Items I'm Borrowing</h1>
          {data.viewer.borrowed.map(item =>(
          <div key = {item.id}>
            <p>{item.title} </p>
            <p>{item.description} </p>
          </div>
      ))}
        </div>
      )
      }}
  </Query>
)
export default Borrowed