import { FaTrashAlt } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import '../../assets/styles/UserAddskills.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
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
                    <AlertDialogTitle>Add Skills</AlertDialogTitle>
                    <SkillsSection />
                </AlertDialogHeader>
                {/* <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter> */}
            </AlertDialogContent>
        </AlertDialog>
    )
};

const SkillsSection = () => {
    const dispatch: AppDispatch = useDispatch();
    const [skill, setSkill] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const { user: { data } } = useSelector((state: RootState) => state.user);

    // Load existing skills from Redux state
    useEffect(() => {
        if (data?.skills) {
            setSkills(data.skills);  // Set previously added skills when modal opens
        }
    }, [data]);

    // Add skill to the list
    const handleAddSkill = () => {
        if (!skill.trim()) {
            setError('Skill cannot be empty');
            return;
        }
        if (skills.includes(skill)) {
            setError('Skill already exists');
            return;
        }

        setSkills([...skills, skill]);
        setSkill('');
        setError('');
    };

    // Delete skill
    const handleDeleteSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    // Send all skills (both existing and new) to the backend on Continue button click
    const handleSubmit = async () => {
        if (skills.length === 0) {
            setError('You must add at least one skill');
            return;
        }

        const payload = {
            skills
        };
        console.log(payload)

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
                    onChange={(e) => setSkill(e.target.value)}
                />
                <CustomButton text='Add' onClick={handleAddSkill}/>
            </div>

            {error && <p style={{ color: 'red', fontWeight: 'semi-bold' }}>{error}</p>}

            <div className="skills-list">
                <h3>Your Skills</h3>
                {skills.length === 0 ? (
                    <p>No skills added yet.</p>
                ) : (
                    <ul>
                        {skills.map((s, index) => (
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
