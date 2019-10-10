import React, { useEffect, useState } from 'react';
import main_url from '../../config'
import StandingsTable from '../../components/StandingsTable/StandingsTable'
import StandingsTabs from '../../components/StandingsTabs/StandingsTabs'

function Teams() {
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
      <div className="Teams">     
        { isLoading ? <div>Loading</div> : <StandingsTabs teams={teams}/>}
      </div>
    );
  }
  
  export default Teams;