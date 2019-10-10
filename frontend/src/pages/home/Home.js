import React, { useEffect, useState } from 'react';
import DivisionTable from '../../components/DivisionTable/DivisionTable'
import main_url from '../../config'

function Home() {
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
        { isLoading ? <div>Loading</div> : <DivisionTable teams={teams}/>}
      </div>
    );
  }
  
  export default Home;