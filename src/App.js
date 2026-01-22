import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cuisines, setCuisines] = useState([
    "Italian", "Mexican", "Chinese", "Japanese", 
    "Thai", "Indian", "Korean", "Vietnamese", 
    "Greek", "American"
  ]);

  const [location, setLocation] = useState('');
  const handleChange = (e) => {
    setLocation(e.target.value);
  }

  const [eateries, setEateries] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Location submitted: ${location}`);
    getPlaces(location, cuisines);
  }

  const removeCuisine = (cuisineToRemove) => {
    setCuisines(cuisines.filter(c => c !== cuisineToRemove));
  };

  const reset = () => {
    setCuisines([
      "Italian", "Mexican", "Chinese", "Japanese", 
      "Thai", "Indian", "Korean", "Vietnamese", 
      "Greek", "American"
    ]);
  };

  const getPlaces = async(location, cuisines) => {
    const textQuery = `${cuisines[0]} and ${cuisines[1]} restaurants in ${location}`;
    try {
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      body: JSON.stringify({textQuery, pageSize: 10}),
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
      }
      });
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const data = await response.json();
      setEateries(data.places);
    } catch (error) {
        console.error(error.message);
    }
  }
  return (
    <div>
      <h1 className='App-header'>uPick</h1>
      {cuisines.length > 2 ? (
        <div className='Center'>
          {cuisines.map(cuisine => (
            <button className='Button' key={cuisine} onClick={() => removeCuisine(cuisine)}>
              {cuisine} ❌
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className='App-header'>Winner: {cuisines.join(' or ')}</h2>
        </div>
      )}
      <div className='Center'>
        <form onSubmit={handleSubmit}>
          <label>
            Enter current location: <input type="text" value={location} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      {eateries.length > 0 && (
      <div>
        <h3>Restaurants:</h3>
        {eateries.map((place, index) => (
          <div key={index}>
            <p>{place.displayName?.text}</p>
            <p>{place.formattedAddress}</p>
          </div>
        ))}
      </div>
      )}
      <div className='Center'>
          <button className='Button' onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}

export default App;