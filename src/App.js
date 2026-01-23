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

  // const [finalWinner, setFinalWinner] = useState('');
  
  // const spinWheel = () => {
  //   const randomIndex = Math.floor(Math.random() * cuisines.length);
  //   setFinalWinner(cuisines[randomIndex]);
  // };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const onSubmit = () => {
    setEateries([]);
    getPlaces(location, cuisines);
  };

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
    setError('');
    setLoading(true);
    const textQuery = `${cuisines[0]} and ${cuisines[1]} restaurants in ${location}`;
    try {
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      body: JSON.stringify({textQuery, pageSize: 10}),
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating',
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
      <h1 className='Header'>uPick</h1>
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
          <h2 className='Header'>Winner: {cuisines.join(' or ')}</h2>
        </div>
      )}
      <div className='container'>
        {cuisines.length === 2 && (
          <div className='Eatery-card'>
            <strong style={{padding:"2%"}}>Enter current location</strong> 
            <input type="text" className='search' value={location} onChange={handleChange} 
              onKeyDown={(e) => e.key === 'Enter' && location.length > 3 && onSubmit()}/>
          {location.length > 3 && (<button type="button" className='Button' onClick={onSubmit}>Submit</button>)}
      </div>
      )}
      </div>
      {loading && <strong className='Header'>Finding restaurants...</strong>}
      <div className='container'>
        {eateries.length > 0 && eateries.map((place, index) => (
          <div key={index} className='Eatery-card'>
            <p className='Center'><strong>{place.displayName?.text}</strong></p>
            <p className='Center'>{place.formattedAddress}</p>
            <p className='Center'>{place.rating} ★</p>
            <a 
              style={{paddingBottom:"10px"}}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName?.text + ' ' + place.formattedAddress + ' ' + place.rating)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps →
            </a>
          </div>
        ))}
      </div>
      {error && <p className='Error'>{error}</p>}
      <div className='Center'>
          {cuisines.length < 10 && !loading && (<button className='Button' onClick={() => reset()}>Reset</button>)}
      </div>
    </div>
  );
}

export default App;