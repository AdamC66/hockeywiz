import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../../components/Header/Header'
import DivisionTable from '../../components/DivisionTable/DivisionTable'
import main_url from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Teams from '../teams/Teams'
import Home from '../home/Home'
function App() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    async function fetchData(){
      const res = await main_url.get('/teams/api/standings')
      .then(res=> setTeams(res.data))
      setIsLoading(false)
    }
    fetchData()
  },[])


  return (
    <Router>
            <div className="Teams">
                <Header />
            </div>
        <Route exact path = '/teams' component = {Teams}/>
        <Route exact path='/' component = {Home}/>
    </Router>
  );
}

export default App;
