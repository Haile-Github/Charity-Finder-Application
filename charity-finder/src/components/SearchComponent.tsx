// src/components/SearchComponent.tsx

// src/components/SearchComponent.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchComponent.css'

interface Cause {
    ein: string;
    websiteUrl: string;
  }
  

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [causes, setCauses] = useState<Cause[]>([]);
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);

  useEffect(() => {
    // Fetch causes from CauseList.json or your API endpoint
    axios.get('https://partners.every.org/v0.2/search/pets?apiKey=pk_live_20243f5ef6c3f7f83cc63e0c4ff2ab14').then((response) => {
      setCauses(response.data.nonprofits);
    });
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedCause) {
      // Navigate to the selected cause's website
      window.location.href = selectedCause.websiteUrl;
    } else {
      console.warn('Please select a cause before submitting.');
    }
  };

  return (
    <div>
    <h2>Search Charity</h2>
    <form onSubmit={handleSearchSubmit} className="search-form">
      <label className="search-label">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        
      </label>
      <select
        value={selectedCause?.ein || ''}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedCause = causes.find((cause) => cause.ein === selectedId) || null;
          setSelectedCause(selectedCause);
        }}
      >
        <option value="" disabled>
          Select a Charity link
        </option>
        {causes.map((cause) => (
          <option key={cause.ein} value={cause.ein}>
            {cause.websiteUrl}
          </option>
        ))}
      </select>
      <button type="submit" className='gbutton'>Search</button>
    </form>
  </div>
  );
};

export default SearchComponent;

