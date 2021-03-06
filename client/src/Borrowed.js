import React from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ReturnButton from "./ReturnButton"


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
      if (error){
        console.log(error)
        return <option>Error </option>;
      }    
      return(  
        <div>
          <h1>Items I'm Borrowing</h1>
          {data.viewer.borrowed.map(item =>(
          <div key = {item.id}>
            <p>{item.title} </p>
            <p>{item.description} </p>
            <ReturnButton itemID = {{itemID: item.id}}/>
          </div>
      ))}
        </div>
      )
      }}
  </Query>
)
export default Borrowed