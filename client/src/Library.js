import React from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import BorrowButton from './BorrowButton'

const Library = () => (
  <Query
      query={gql`
      query{
        items{
          id
          title
          description
          borrower{
            id
          }
        }
      }
      `}
      >
      {({ loading, error, data }) => {
        if (loading) return <option>Loading...</option>
        if (error) return <option>Error :(</option>      
        return(
          <div>
            <h2>Library</h2>
            {data.items.map(item => (
              <div key ={item.id} style={item.borrower ? {textDecoration: 'line-through'} : {}}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                {!item.borrower ? <BorrowButton itemID = {{itemID: item.id}}/> : ""}
              </div>
            ))}
          </div>
    )
    }}
  </Query>
)

export default Library