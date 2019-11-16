import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Header from '../../components/Header/Header'
import Standings from '../standings/Standings'
import Home from '../home/Home'
import Teams from '../teams/Teams'
import Schedule from '../schedule/Schedule'
import Rules from '../Rules/Rules'
import About from '../about/About'

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql/"
  });

  return (
    <Router>
      <ApolloProvider client={client}>
            <div className="Teams">
                <Header />
            </div>
        <Switch>
        <Route exact path = '/Standings' component = {Standings}/>
        <Route exact path = '/Rules' component = {Rules}/>
        <Route exact path = '/About' component = {About}/>
        <Route exact path='/' component = {Home}/>
        <Route exact path='/Teams/:name' render ={(props) => <Teams {...props}/> }/>
        <Route exact path='/Teams/Schedule/:name' render ={(props) => <Schedule {...props}/> } /> 
        </Switch>
        </ApolloProvider>
    </Router>
  );
}

export default App;
