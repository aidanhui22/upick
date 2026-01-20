import { useState } from 'react';
import './App.css';

function App() {
  const [cuisines, setCuisines] = useState([
    "Italian", "Mexican", "Chinese", "Japanese", 
    "Thai", "Indian", "Korean", "Vietnamese", 
    "Greek", "American"
  ]);

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

  return (
    <div>
      <h1 className='App-header'>uPick</h1>
      {cuisines.length > 2 ? (
        <div>
          {cuisines.map(cuisine => (
            <button className='Button' key={cuisine} onClick={() => removeCuisine(cuisine)}>
              {cuisine} ❌
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Winner: {cuisines.join(' or ')}</h2>
          <button className='Button' onClick={() => reset()}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;