import React from 'react'
import { Button } from '@material-ui/core'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Header = ({
  setCSRFToken,
}) => (
  <Query
    query={gql`
    query {
      viewer{
        username
      }
    }
    `}
    >
    {({ loading, error, data }) => {
      if (loading) return <option>Loading...</option>;
      if (error) {
        console.log(error)
        return <option>Error </option>;
      }
    return(
        <div className="Header"> 
          <h4>You are logged in as: {data.viewer.username}</h4>
          <Button varient="contained" onClick = {() => {
            localStorage.removeItem('token')
            setCSRFToken(null)
            window.location = "/"
        }}>Log Out</Button>
        </div>
    )
    }}
  </Query>
)

export default Header
