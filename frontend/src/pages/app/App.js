import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../../components/Header/Header'
import DivisionTable from '../../components/DivisionTable/DivisionTable'
import main_url from '../../config'

function App() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    async function fetchData(){
      const res = await main_url.get('/teams/api/')
      .then(res=> setTeams(res.data))
      setIsLoading(false)
    }
    fetchData()
  },[])


console.log(teams)

  return (
    <div className="App">
      <Header />
      { isLoading ? <div>Loading</div> : <DivisionTable teams={teams}/>}
    </div>
  );
}

export default App;
