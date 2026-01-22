import { useState } from 'react';
import './App.css';

function App() {
  const [cuisines, setCuisines] = useState([
    "Italian", "Mexican", "Chinese", "Japanese", 
    "Thai", "Indian", "Korean", "Vietnamese", 
    "Greek", "American"
  ]);

  const [location, setLocation] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLocation(e.target.value);
  }

  const onSubmit = () => {
    getPlaces(location, cuisines);
  }

  const [eateries, setEateries] = useState([]);

  const removeCuisine = (cuisineToRemove) => {
    setCuisines(cuisines.filter(c => c !== cuisineToRemove));
  };

  const reset = () => {
    setCuisines([
      "Italian", "Mexican", "Chinese", "Japanese", 
      "Thai", "Indian", "Korean", "Vietnamese", 
      "Greek", "American"
    ]);
    setEateries([]);
    setLocation('');
  };

  const getPlaces = async(location, cuisines) => {
    const textQuery = `${cuisines[0]} and ${cuisines[1]} restaurants in ${location}`;
    setError('');
    setLoading(true);
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
        setError('Failed to find restaurants, try again');
    } finally {
      setLoading(false);
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
      {cuisines.length === 2 && (
      <div className='Center'>
        Enter current location <input type="text" value={location} onChange={handleChange} 
          onKeyDown={(e) => e.key === 'Enter' && location.length > 3 && onSubmit()}/>
        {location.length > 3 && (<button type="button" onClick={onSubmit}>Submit</button>)}
      </div>
      )}
      {loading && <p>Finding restaurants...</p>}
      {eateries.length > 0 && (
      <div className='Table'>
        <h3>Restaurants:</h3>
        {eateries.map((place, index) => (
          <div key={index}>
            <p>{place.displayName?.text}</p>
            <p>{place.formattedAddress}</p>
          </div>
        ))}
      </div>
      )}
      {error && <p className='Error'>{error}</p>}
      <div className='Center'>
          {cuisines.length < 10 && (<button className='Button' onClick={() => reset()}>Reset</button>)}
      </div>
    </div>
  );
}

export default App;