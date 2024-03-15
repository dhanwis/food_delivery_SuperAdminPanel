import React, { useState } from "react";

const LocationSearch = ({ locations }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter location data based on the search term
  const filteredLocations = locations.filter((location) => {
    return location.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ul>
        {filteredLocations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearch;
