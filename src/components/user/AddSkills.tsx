import { FaTrashAlt } from 'react-icons/fa';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'; // Debounce for API call optimization
import '../../assets/styles/UserAddskills.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { CustomButton } from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateProfile } from '../../redux/action/userActions';

export const AddSkills = () => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <CustomButton text='Add Skills' />
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <SkillsSection />
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
};

const SkillsSection = () => {
    const dispatch: AppDispatch = useDispatch();
    const [skill, setSkill] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]); // To store fetched skills
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]); // For selected skills
    const [error, setError] = useState<string>('');
    const { user: { data } } = useSelector((state: RootState) => state.user);

    // Load existing skills from Redux state
    useEffect(() => {
        if (data?.skills) {
            setSelectedSkills(data.skills);  // Set previously added skills when modal opens
        }
    }, [data]);

    // API call to fetch skills with debounce
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
            }
        }, 300),
        []
    );

    // Handle input change to trigger skill search
    const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSkill(query);
        fetchSkills(query);  // Fetch skills from the API
    };

    // Add skill to the selected skills list
    const handleAddSkill = (skill: string) => {
        if (!skill.trim()) {
            setError('Skill cannot be empty');
            return;
            
        }
        if (selectedSkills.includes(skill)) {
            setError('This Skill is  already added');
            return;
        }

        setSelectedSkills([...selectedSkills, skill]);
        setSkill('');
        setSkills([])
        setError('');
    };

    // Delete skill from the selected list
    const handleDeleteSkill = (index: number) => {
        setSelectedSkills(selectedSkills.filter((_, i) => i !== index));
    };

    // Submit selected skills to the backend
    const handleSubmit = async () => {
        // if (selectedSkills.length === 0) {
        //     setError('You must add at least one skill');
            
    
        // }

        const payload = {
            skills: selectedSkills
        };

        try {
            await dispatch(updateProfile(payload)).unwrap();
        } catch (error) {
            console.error('Error updating skills:', error);
        }
    };

    return (
        <div className="skills-section">
            <h2>Add Skills</h2>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter a skill"
                    value={skill}
                    onChange={handleSkillInputChange}
                />
                <CustomButton text='Add' onClick={() => handleAddSkill(skill)} />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="api-suggestion cursor-pointer ">
                <ul>
                    {skills.map((s, index) => (
                        <li className='border rounded-sm border-gray-200 ' key={index} onClick={() => handleAddSkill(s)}>
                            {s}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="skills-list">
                {selectedSkills.length === 0 ? (
                    <p className='text-red-600'>No skills added yet.</p>
                ) : (
                    <ul>
                        {selectedSkills.map((s, index) => (
                            <li key={index} className="skill-item">
                                <span>{s}</span>
                                <FaTrashAlt
                                    onClick={() => handleDeleteSkill(index)}
                                    className="delete-icon"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            <AlertDialogFooter className='mt-2 '>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
            </AlertDialogFooter>
        </div>
    );
};

export default SkillsSection;
