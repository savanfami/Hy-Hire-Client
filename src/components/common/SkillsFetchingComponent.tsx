import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

interface SkillSelectorProps {
    onSkillsChange: (skills: string[]) => void; 
  }

export const SkillSelector: React.FC <SkillSelectorProps>= ({onSkillsChange}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);


  const fetchSkills = useCallback(
    debounce(async (query: string) => {
      
      if (!query) return;
      try {
        const response = await axios.get('https://api.apilayer.com/skills', {
          params: { q: query },
          headers: {
            apikey: 'pF2SSFabdHpepJeuDEV5oPgkmfWkoZk4'
          }
        });
        setSkills(response.data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      fetchSkills(searchTerm);
    } else {
      setSkills([]);
    }
  }, [searchTerm, fetchSkills]);

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
        const updatedSkills=[...selectedSkills,skill]
      setSelectedSkills(updatedSkills);
      setSearchTerm('');
      onSkillsChange(updatedSkills)
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  return (
    <div className="  mx-auto w-full">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for skills"
          className="w-full p-2 border border-gray-300 rounded-md  "
        />
      </div>
      {skills.length > 0 && (
        <ul className="mb-4 max-h-60 overflow-y-auto border  text-black border-gray-200 rounded-md">
          {skills.map((skill, index) => (
            <li
              key={index}
              onClick={() => handleSkillSelect(skill)}
              className="p-2 hover:bg-gray-100 cursor-pointer "
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
          >
            <span>{skill}</span>
            <button
              onClick={() => handleSkillRemove(skill)}
              className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

