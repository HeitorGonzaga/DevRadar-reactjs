import React, { useEffect, useState } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {

  const [devs, setDevs] = useState([]);
  

  async function handleAddDev(data){
    console.log('passou aqui');
    console.log(data);
    const response = await api.post('/devs', data);
    
    setDevs([...devs, response.data]);
    

  }

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();

  }, [])

   
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev._id}></DevItem>
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
