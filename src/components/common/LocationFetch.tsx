import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Suggestion {
  properties: {
    formatted: string;
  };
}

interface PlacesAutocompleteProps {
  onSelect: (location: string) => void;
  initialValue?: string;
  componentType?:string
}

export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ onSelect, initialValue,componentType }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const fetchPlaceSuggestions = async (input: string) => {
    if (input.length > 2) { 
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string
 
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${apiKey}`;
     
      try {
        const response = await axios.get(url);
        console.log(response,'response')
        setSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching place suggestions:', error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchPlaceSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.properties.formatted);
    setSuggestions([]);
    onSelect(suggestion.properties.formatted);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter location"
        value={inputValue}
        onChange={handleInputChange}
        className={`${componentType==='postjob'?'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3':'border w-full border-black ml-6 rounded-md p-1 mt-2'}`}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li className='border border-black mt-1'
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
