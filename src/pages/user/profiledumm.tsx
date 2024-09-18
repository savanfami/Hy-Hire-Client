// import React, { useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store';
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Pencil, Plus, X } from 'lucide-react';
// import { Textarea } from '../../components/ui/textarea';
// import { uploadToCloudinary } from '../../utils/common/cloudinaryUpload';
// import { updateProfile } from '../../redux/action/userActions';
// import { ProfilePicSection } from '../../components/user/ProfilePicSection';

// interface Experience {
//     id: string;
//     company: string;
//     position: string;
//     startDate: string;
//     endDate: string;
// }

// interface Education {
//     id: string;
//     institution: string;
//     degree: string;
//     graduationDate: string;
// }

// interface SocialLink {
//     platform: string;
//     url: string;
// }

// export const UserProfile: React.FC = () => {
//     const { user: { data } } = useSelector((state: RootState) => state?.user);
//     console.log(data)
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [image, setImage] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const resumeInputRef = useRef<HTMLInputElement>(null);
//     const [profileData, setProfileData] = useState({
//         name: data?.name || '',
//         location: '',
//         profileUrl: '',
//         phone: '',
//         aboutMe: '',
//         experiences: [] as Experience[],
//         educations: [] as Education[],
//         skills: [] as string[],
//         socialLinks: [] as SocialLink[],
//         resumeUrl: ''
//     });



//     const [editingField, setEditingField] = useState<string | null>(null);
//     const [newSkill, setNewSkill] = useState('');
//     const dispatch: AppDispatch = useDispatch()
//     const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });
//     const handleProfilePicClick = () => {
//         if (fileInputRef.current) fileInputRef.current.click();
//     };
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => setImage(reader.result as string);
//             reader.readAsDataURL(file);
//         }
//         const imageUrl = await uploadToCloudinary(file);
//         console.log(imageUrl, 'url image')
//         if (imageUrl) {
//             setProfileData(prev => ({ ...prev, profileUrl: imageUrl }));
//         }
//     };

//     const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         console.log('clled herer')
//         const file = e.target.files?.[0];
//         const resumeurl = await uploadToCloudinary(file);
//         console.log(resumeurl, ';urlresume')
//         if (resumeurl) {
//             setProfileData(prev => ({ ...prev, resumeUrl: resumeurl }));
//         }

//     };


//     const handleEdit = (fieldName: string) => setEditingField(fieldName);

//     const handleSave = (fieldName: string, value: string) => {
//         setProfileData(prev => ({ ...prev, [fieldName]: value }));
//         console.log(profileData, 'profiledatataa')
//         setEditingField(null);
//     };

//     const renderEditableField = (fieldName: string, value: any, placeholder: string) => {
//         if (editingField === fieldName) {
//             return (
//                 <Input
//                     value={value}
//                     onChange={(e) => setProfileData({ ...profileData, [fieldName]: e.target.value })}
//                     onBlur={() => handleSave(fieldName, profileData[fieldName as keyof typeof profileData])}
//                     placeholder={placeholder}
//                     className="mr-2"
//                 />
//             );
//         }
//         return (
//             <>
//                 <span>{value || placeholder}</span>
//                 <Button variant="ghost" size="icon" onClick={() => handleEdit(fieldName)} className="ml-2">
//                     <Pencil className="h-4 w-4" />
//                 </Button>
//             </>
//         );
//     };

//     const addExperience = () => {
//         const newExperience: Experience = {
//             id: Date.now().toString(),
//             company: '',
//             position: '',
//             startDate: '',
//             endDate: '',
//         };
//         setProfileData(prev => ({ ...prev, experiences: [...prev.experiences, newExperience] }));
//     };

//     const updateExperience = (id: string, field: keyof Experience, value: string) => {
//         setProfileData(prev => ({
//             ...prev,
//             experiences: prev.experiences.map(exp =>
//                 exp.id === id ? { ...exp, [field]: value } : exp
//             )
//         }));
//     };

//     const removeExperience = (id: string) => {
//         setProfileData(prev => ({
//             ...prev,
//             experiences: prev.experiences.filter(exp => exp.id !== id)
//         }));
//     };

//     const addEducation = () => {
//         const newEducation: Education = {
//             id: Date.now().toString(),
//             institution: '',
//             degree: '',
//             graduationDate: '',
//         };
//         setProfileData(prev => ({ ...prev, educations: [...prev.educations, newEducation] }));
//     };

//     const updateEducation = (id: string, field: keyof Education, value: string) => {
//         setProfileData(prev => ({
//             ...prev,
//             educations: prev.educations.map(edu =>
//                 edu.id === id ? { ...edu, [field]: value } : edu
//             )
//         }));
//     };

//     const handleSubmit = async () => {
//         setIsSubmitting(true);
//         try {

//             const dataToSubmit = {
//                 ...profileData,
//                 profileUrl: profileData.profileUrl,
//                 resumeUrl: profileData.resumeUrl,
//             };
//             console.log(dataToSubmit, 'data to submit')
//             const response = await dispatch(updateProfile(dataToSubmit)).unwrap()
//             console.log(response)
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const removeEducation = (id: string) => {
//         setProfileData(prev => ({
//             ...prev,
//             educations: prev.educations.filter(edu => edu.id !== id)
//         }));
//     };

//     const addSkill = () => {
//         if (newSkill && !profileData.skills.includes(newSkill)) {
//             setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
//             setNewSkill('');
//         }
//     };

//     const removeSkill = (skill: string) => {
//         setProfileData(prev => ({
//             ...prev,
//             skills: prev.skills.filter(s => s !== skill)
//         }));
//     };

//     const addSocialLink = () => {
//         if (newSocialLink.platform && newSocialLink.url) {
//             setProfileData(prev => ({
//                 ...prev,
//                 socialLinks: [...prev.socialLinks, newSocialLink]
//             }));
//             setNewSocialLink({ platform: '', url: '' });
//         }
//     };

//     const removeSocialLink = (platform: string) => {
//         setProfileData(prev => ({
//             ...prev,
//             socialLinks: prev.socialLinks.filter(link => link.platform !== platform)
//         }));
//     };

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//             {/* Main profile section */}
//             <div className="lg:col-span-9 pb-4 flex flex-col justify-center leading-relaxed bg-white border border-solid border-zinc-200  relative">
//                 <div>
                    
//                   <ProfilePicSection/>
//                 </div>
                
//             </div>




//             <div className="lg:col-span-3">
//                 <div className="flex flex-col items-start p-6 bg-white border border-solid border-zinc-200 max-w-[352px]">
//                     <div className="self-stretch my-auto text-xl font-semibold font-sans leading-tight text-slate-800 mb-4">
//                         Additional Details
//                     </div>

//                     <div className="flex flex-col gap-4 w-full">
//                         <div>
//                             <div className="text-slate-500">Phone</div>
//                             <div className="text-slate-800 flex items-center">
//                                 {renderEditableField('phone', profileData.phone, 'Add phone number')}
//                             </div>
//                         </div>

//                         <div>
//                             <div className="text-slate-500">Skills</div>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                                 {profileData.skills.map(skill => (
//                                     <span key={skill} className="bg-gray-200 px-2 py-1 rounded flex items-center">
//                                         {skill}
//                                         <Button variant="ghost" size="icon" onClick={() => removeSkill(skill)} className="ml-1">
//                                             <X className="h-3 w-3" />
//                                         </Button>
//                                     </span>
//                                 ))}
//                             </div>
//                             <div className="flex mt-2">
//                                 <Input
//                                     value={newSkill}
//                                     onChange={(e) => setNewSkill(e.target.value)}
//                                     placeholder="Add a skill"
//                                     className="mr-2"
//                                 />
//                                 <Button onClick={addSkill}>Add</Button>
//                             </div>
//                         </div>

//                         <div>
//                             <div className="text-slate-500">Resume</div>
//                             <div className="flex items-center mt-2">
//                                 <Button onClick={() => resumeInputRef.current?.click()}>
//                                     {profileData.resumeUrl ? 'Update Resume' : 'Upload Resume'}
//                                 </Button>
//                                 <input
//                                     ref={resumeInputRef}
//                                     type="file"
//                                     accept=".pdf,.doc,.docx"
//                                     onChange={handleResumeUpload}
//                                     style={{ display: 'none' }}
//                                 />
//                                 {profileData.resumeUrl && (
//                                     <span className="ml-2 text-sm text-gray-600">{profileData.resumeUrl}</span>
//                                 )}
//                             </div>
//                         </div>

//                         <div>
//                             <div className="text-slate-500">Social Links</div>
//                             <div className="flex flex-col gap-2 mt-2">
//                                 {profileData.socialLinks.map(link => (
//                                     <div key={link.platform} className="flex items-center">
//                                         <span className="mr-2">{link.platform}:</span>
//                                         <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.url}</a>
//                                         <Button variant="ghost" size="icon" onClick={() => removeSocialLink(link.platform)} className="ml-2">
//                                             <X className="h-3 w-3" />
//                                         </Button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="flex flex-col mt-2">
//                                 <Input
//                                     value={newSocialLink.platform}
//                                     onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
//                                     placeholder="Platform (e.g., Twitter, LinkedIn)"
//                                     className="mb-2"
//                                 />
//                                 <Input
//                                     value={newSocialLink.url}
//                                     onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
//                                     placeholder="Profile URL"
//                                     className="mb-2"
//                                 />
//                                 <Button onClick={addSocialLink}>Add Social Link</Button>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//             <div className="lg:col-span-9 pb-4 flex flex-col justify-center leading-relaxed bg-white border border-solid border-zinc-200 relative">
//                 <div className="mt-5 px-4">
//                     <h2 className="text-xl font-semibold mb-4">Experience</h2>
//                     {profileData.experiences.map((exp) => (
//                         <div key={exp.id} className="mb-4 p-4 border rounded">
//                             <Input
//                                 placeholder="Company"
//                                 value={exp.company}
//                                 onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
//                                 className="mb-2"
//                             />
//                             <Input
//                                 placeholder="Position"
//                                 value={exp.position}
//                                 onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
//                                 className="mb-2"
//                             />
//                             <div className="flex gap-2">
//                                 <Input
//                                     type="date"
//                                     placeholder="Start Date"
//                                     value={exp.startDate}
//                                     onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
//                                 />
//                                 <Input
//                                     type="date"
//                                     placeholder="End Date"
//                                     value={exp.endDate}
//                                     onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
//                                 />
//                             </div>
//                             <Button onClick={() => removeExperience(exp.id)} variant="destructive" size="sm" className="mt-2">
//                                 Remove
//                             </Button>
//                         </div>
//                     ))}
//                     <Button onClick={addExperience} variant="outline" className="mt-2">
//                         <Plus className="mr-2 h-4 w-4" /> Add Experience
//                     </Button>
//                 </div>

//                 <div className="mt-5 px-4">
//                     <h2 className="text-xl font-semibold mb-4">Education</h2>
//                     {profileData.educations.map((edu) => (
//                         <div key={edu.id} className="mb-4 p-4 border rounded">
//                             <Input
//                                 placeholder="Institution"
//                                 value={edu.institution}
//                                 onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
//                                 className="mb-2"
//                             />
//                             <Input
//                                 placeholder="Degree"
//                                 value={edu.degree}
//                                 onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
//                                 className="mb-2"
//                             />
//                             <Input
//                                 type="date"
//                                 placeholder="Graduation Date"
//                                 value={edu.graduationDate}
//                                 onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
//                             />
//                             <Button onClick={() => removeEducation(edu.id)} variant="destructive" size="sm" className="mt-2">
//                                 Remove
//                             </Button>
//                         </div>
//                     ))}
//                     <Button onClick={addEducation} variant="outline" className="mt-2">
//                         <Plus className="mr-2 h-4 w-4" /> Add Education
//                     </Button>
//                 </div>
//             </div>
//             <div className="px-4 mt-6">

//                 <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-maincolr text-white">
//                     {isSubmitting ? 'Submitting...' : 'Save Changes'}</Button>
//             </div>
//             {/* Additional details section */}


//         </div>
//     );
// };