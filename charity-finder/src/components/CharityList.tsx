// src/components/CharityList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';


interface Charity {
  ein: string;
  coverImageUrl: string;
  description: string;
  location:string;
  profileUrl:string;
  websiteUrl:string;
}

const CharityList: React.FC = () => {
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get('https://partners.every.org/v0.2/search/pets?apiKey=pk_live_20243f5ef6c3f7f83cc63e0c4ff2ab14');
        
        console.log('API Response:', response.data.nonprofits);
        
        setCharities(response.data.nonprofits);
      } catch (error) {
        console.error('Error fetching charities:', error);
      }
    };

    fetchCharities();
  }, []);

  
  const handleFavoriteClick = (charity: Charity) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Charity[];
    const isAlreadyFavorited = favorites.some((fav) => fav.ein === charity.ein);

    if (!isAlreadyFavorited) {
      const updatedFavorites = [...favorites, charity];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      alert('Added to favorites!');
    } else {
      alert('Charity already in favorites!');
    }
  };

  

  return (
    <div>
        <SearchComponent/>
      <h2>Charity Lists</h2>
      <ul>
        {charities.map((charity) => (
          <li key={charity.ein}>
            <h1><img src={charity.coverImageUrl} height="300" width="500"/></h1>
            <h1>{charity.location}</h1>

            <p>{charity.description}</p>
            <Link to={charity.websiteUrl} target="_blank" rel="noopener noreferrer">
              <button>View Details</button>
            </Link>
            <a href="/favorites">
            <button onClick={() => handleFavoriteClick(charity)}>Add to Favorites</button>
            </a>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
export {};
export default CharityList;