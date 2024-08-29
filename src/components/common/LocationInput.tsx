import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash';
import { IoCloseCircle } from 'react-icons/io5';

interface LocationInputProps {
    label: string;
    name: string;
    location: any[]
    setLocation: React.Dispatch<React.SetStateAction<any[]>>;
}

export const LocationInput: React.FC<LocationInputProps> = ({ label, name, location, setLocation }) => {
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [field, setField] = useState('')

    const handleSuggestionClick = (suggestion: any) => {
        setLocation((prevLocation) => [...prevLocation, suggestion.csc]);
        setField('');
        setSuggestions([]);
    };

    const removeLocation = (data: string) => {
        setLocation(prevLocation => prevLocation.filter(loc => loc !== data));
    }

    const fetchLocation = useCallback(
        _.debounce(async (value: string) => {
            if (value.length > 3) {
                try {
                    let response: any;
                    try {
                        response = await axios.get('https://ccsapi.up.railway.app/api/v1/search-db', {
                            params: {
                                search: value,
                                limit: 20,
                                offset: 0,
                            },
                        });
                    } catch (error: any) {
                        if (error.response && error.response.status === 429) {
                            response = await axios.get('https://api.thecompaniesapi.com/v1/locations/cities', {
                                params: {
                                    search: value,
                                    limit: 10,
                                },
                            });
                        } else {
                            console.log(error)
                        }
                    }

                    // Ensure that response.data.results is an array
                    const results = Array.isArray(response?.data?.results) ? response.data.results : [];
                    setSuggestions(results);
                } catch (error) {
                    console.error('Error fetching location data:', error);
                    setSuggestions([]); // Set to empty array in case of error
                }
            } else {
                setSuggestions([]);
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchLocation(field);
    }, [field, fetchLocation]);

    return (
        <>
            <div>
                <div className='block text-sm font-medium text-gray-700'>{label}</div>
                <div className="flex items-center pl-3 mt-2">
                    <input
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                        name={name}
                        className="mt-1 block w-[50%] border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                    />
                </div>
                
                {suggestions && suggestions.length > 0 && (
                    <div className='mt-1 max-h-[130px] overflow-y-auto bg-gray-100 border border-gray-300 rounded-md'>
                        <ul>
                            {suggestions.map((suggestion: any, index) => (
                                <li 
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className='px-3 py-2 hover:bg-gray-200 cursor-pointer border-b border-gray-300 last:border-b-0' 
                                    key={index}
                                >
                                    {suggestion?.csc || suggestion?.code || 'Unknown'}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {location && location.length > 0 && (
                <div className="mt-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr">
                    <div className="flex flex-wrap gap-2">
                        {location.map((data: string, index: number) => (
                            <div key={index} className="flex gap-2 justify-center items-center py-1 pr-1 pl-3 bg-slate-50 rounded">
                                {data}
                                <IoCloseCircle onClick={() => removeLocation(data)} size={20} className="cursor-pointer" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
} 