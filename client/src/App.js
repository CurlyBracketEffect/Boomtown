import React, { useState } from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { 
  MuiThemeProvider, 
  createMuiTheme,
} from '@material-ui/core'

import HomePage from './HomePage';
import SignUp from './SignUp';
import apolloClient from './apolloClient'
import Dashboard from './Dashboard';
import SideBar from './SideBar';
import Borrowed from './Borrowed';
import Library from './Library';
import CreateItem from './CreateItem'
import Header from './Header'


const initialCSRFToken = localStorage.getItem('token')

const theme = createMuiTheme({})

function App() {

  const [csrfToken, setCSRFToken] = useState(initialCSRFToken);

  return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className="App">
            
            
            {csrfToken == null && (
              <React.Fragment>
                <Route path="/" exact render ={() =>(
                  <HomePage csrfToken = {csrfToken} setCSRFToken = {setCSRFToken}/>
                )}/>
                <Route path="/SignUp" exact render ={() =>(
                  <SignUp setCSRFToken = {setCSRFToken}/>
                )}/>
              </React.Fragment>
            )}
            {csrfToken != null && (
              <React.Fragment>
                <Header setCSRFToken = {setCSRFToken}/>
                <SideBar/>
                <Route path="/" exact render = {() => (
                  <Dashboard setCSRFToken = {setCSRFToken}/>
                )}/>
                <Route path="/borrowed" exact render = {() => (
                  <Borrowed/>
                )}/>
                <Route path="/library" exact render = {() => (
                  <Library/>
                )}/>
                <Route path="/items/create" exact render = {() => (
                  <CreateItem/>
                )}/>
              </React.Fragment>
            )}    
            </div>
          </Router>
        </MuiThemeProvider>  
      </ApolloProvider>
    );
}

export default App;
