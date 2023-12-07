// src/components/CharityDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const CharityDetails: React.FC = () => {
  const { uin } = useParams<{ uin?: string }>();
  const charityId = uin ? parseInt(uin, 10) : undefined;

  // Check if charityId is defined before using it
  if (charityId === undefined) {
    return (
      <div>
        <h2>Charity Details</h2>
        <p>Invalid Charity ID</p>
      </div>
    );
  }

  // Fetch charity details based on charityId

  return (
    <div>
      <h2>Charity Details</h2>
      <p>Details for Charity ID: {charityId}</p>
    </div>
  );
};

export default CharityDetails;
