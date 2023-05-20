import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [wildlife, setWildlife] = useState([]);
  const [filteredWildlife, setFilteredWildlife] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  useEffect(() => {
    fetchWildlife();
    fetchSpeciesOptions();
  }, []);

  const fetchWildlife = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/all/');
      setWildlife(response.data);
      setFilteredWildlife(response.data);
    } catch (error) {
      console.log('Error fetching wildlife data', error);
    }
  };

  const fetchSpeciesOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/all/?search=<species>');
      setSpeciesOptions(response.data);
    } catch (error) {
      console.log('Error fetching species options', error);
    }
  };

  const handleFilterChange = (event) => {
    const animalSpecies = event.target.value;
    setSelectedSpecies(animalSpecies);

    if (animalSpecies === 'all') {
      setFilteredWildlife(wildlife);
    } else {
      const filtered = wildlife.filter((item) => item.animal_species === animalSpecies);
      setFilteredWildlife(filtered);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-header">
          The application allows users to track and record wildlife sightings in a specific conservation area.
        </h1>
        <div className="filter-option">
          <label htmlFor="species-filter">Filter by Species:</label>
          <select id="species-filter" value={selectedSpecies} onChange={handleFilterChange}>
            <option value="all">All</option>
            {speciesOptions.map((option) => (
              <option key={option.id} value={option.animal_species}>
                {option.animal_species}
              </option>
            ))}
          </select>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Species</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredWildlife.map((item) => (
              <tr key={item.id}>
                <td>{item.animal_species}</td>
                <td>{formatDate(item.sighting_datetime)}</td>
                <td>{formatTime(item.sighting_datetime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
