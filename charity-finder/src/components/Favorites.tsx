// src/components/Favorites.tsx
import React from 'react';
import { useState } from 'react';

interface Charity {
    ein: string;
    coverImageUrl: string;
    description: string;
    location:string;
    profileUrl:string;
    websiteUrl:string;
}

const Favorites: React.FC = () => {


    const [favorites, setFavorites] = useState<Charity[]>(
        JSON.parse(localStorage.getItem('favorites') || '[]') as Charity[]
      );
    
  //const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Charity[];

  const handleDelete = (charityId: string) => {
    // Filter out the charity with the specified ID
    const updatedFavorites = favorites.filter((charity) => charity.ein !== charityId);
    
    // Update local storage and state
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h2>Favorite Charities</h2>
      {favorites.length === 0 ? (
        <p>No favorite charities selected.</p>
      ) : (
        <ul>
          {favorites.map((charity) => (
            <li key={charity.ein}>
              <h1>{charity.location}</h1>
              <p>{charity.description}</p>
              <img src={charity.coverImageUrl} width="500" height="300"/>
              <button onClick={() => handleDelete(charity.ein)}>Delete</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
