import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [wildlife, setWildlife] = useState([]);
  const [filteredWildlife, setFilteredWildlife] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  useEffect(() => {
    fetchWildlife();
    fetchSpeciesOptions();
  }, []);

  const fetchWildlife = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/v1/all/');
      setWildlife(response.data);
      setFilteredWildlife(response.data);
    } catch (error){
      console.log('Error fetching wildlife data', error);
    }
  };

  const fetchSpeciesOptions = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/v1/all/?search=<species>');
      setSpeciesOptions(response.data);
    } catch (error) {
      console.log('Error fetching species options', error)
    }
  };

  const handleFilterChange = event => {
    const animal_species = event.target.value;
    setSelectedSpecies(animal_species);

    if (animal_species === 'all') {
      setFilteredWildlife(wildlife);
    } else {
      const filtered = wildlife.filter(item => item.animal_species === animal_species);
      setFilteredWildlife(filtered)
    }
  };

  return(
    <div className='App'>
      <h1>Wildlife Sighting</h1>

      <div>
        <label htmlFor='species-filter'>Filter by Species:</label>
        <select id="species-filter" value={selectedSpecies} onChange={handleFilterChange}>
          <option value='all'>All</option>
          {speciesOptions.map(option => (
            <option key={option.id} value={option.animal_species}>{option.animal_species}</option>
          ))}
        </select>
      </div>

      <div>
        <ul>
          {filteredWildlife.map(item => (
            <li key={item.id}>
              <strong>{item.animal_species}</strong>  - <small>Date and Time: {item.sighting_datetime}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
