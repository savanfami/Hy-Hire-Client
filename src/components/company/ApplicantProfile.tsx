import React from 'react'
import { IApplicantProfileProps } from '../../types/companyTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const ApplicantProfile: React.FC<IApplicantProfileProps> = ({ userId }) => {

    const { applicantDetails } = useSelector((state: RootState) => state?.job)
    const applicantData = applicantDetails.find((data) => data.userDetails._id === userId)

    return (
        <div>
            <div className="flex flex-col mt-6  w-full border border-solid border-zinc-200 p-4">
                <div className="flex flex-col items-start w-full max-w-2xl max-md:max-w-full">
                    <div className="self-stretch text-lg font-semibold leading-relaxed text-slate-800">
                        Personal Info
                    </div>
                    <div className="flex gap-10 justify-between items-start mt-4 max-w-full leading-relaxed w-[456px]">
                        <div className="flex flex-col">
                            <div className="flex flex-col self-start">
                                <div className="text-slate-500">Full Name</div>
                                <div className="font-medium text-slate-800">{applicantData?.userDetails?.name}</div>
                            </div>
                            <div className="flex flex-col self-start">
                                <div className="text-slate-500">location</div>
                                <div className="font-sm  ">{applicantData?.userDetails?.location}</div>
                            </div>
                            {/* <div className="flex flex-col mt-4">
                  <div className="text-slate-500">Date of Birth</div>
                  <div className="font-medium text-gray-400">
                    March 23, 1995{" "}
                    <span className="text-gray-400">(26 y.o)</span>{" "}
                  </div>
                </div> */}
                        </div>
                        <div className="flex flex-col">
                            {/* <div className="flex flex-col self-start whitespace-nowrap">
                  <div className="text-slate-500">Gender</div>
                  <div className="font-medium text-slate-800">Male</div>
                </div> */}
                            {/* <div className="flex flex-col mt-4">
                  <div className="text-slate-500">Language</div>
                  <div className="font-medium text-slate-800">
                    English, French, Bahasa
                  </div>
                </div> */}
                        </div>
                    </div>
                    {/* <div className="flex flex-col mt-4 max-w-full w-[232px]">
              <div className="leading-relaxed text-slate-500">Address</div>
              <div className="font-medium leading-7 text-slate-800">
                4517 Washington Ave. Manchester, Kentucky 39495
              </div>
            </div> */}
                </div>
                <div className="flex mt-6 w-full bg-zinc-200 min-h-[1px] max-md:max-w-full" />
                <div className="flex flex-col mt-6 w-full max-w-2xl max-md:max-w-full">
                    <div className="text-lg font-semibold leading-relaxed text-slate-800">
                        Professional Info
                    </div>
                    {applicantData?.userDetails?.aboutMe &&
                        <div className="flex flex-col mt-4 w-full">
                            <div className="leading-relaxed text-slate-500">About Me</div>
                            <div className="flex flex-col mt-2 w-full  leading-7 ">
                                <div className="max-md:max-w-full">
                                    {applicantData?.userDetails?.aboutMe}
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex flex-wrap gap-10 items-start mt-2 w-full leading-relaxed max-md:max-w-full">
                        {applicantData?.userDetails?.skills &&
                            <div className="flex flex-col">
                                <div className="flex flex-col mt-4">
                                    <div className="text-slate-500">Skill set</div>
                                    <div className="flex gap-4 items-start text-teal-600">
                                        {applicantData?.userDetails?.skills.map((skill, index) => (
                                            <div key={index} className="gap-4 self-stretch  py-1 bg-slate-100 rounded-lg p-3">
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col space-y-8 mt-8">
    {/* Experiences Section */}
    <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Experiences</h3>
        {applicantData?.userDetails?.experiences.map((experience, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-lg shadow-md mb-4">
                <h4 className="text-xl font-semibold text-gray-900">{experience.title}</h4>
                <p className="text-md font-medium">{experience.company}</p>
                <p className="text-sm mt-1">
                    From: {new Date(experience.year.from).toLocaleDateString()} {/* Formatting the date */}
                </p>
                <p className="text-md  mt-2">{experience.description}</p>
            </div>
        ))}
    </div>

    {/* Education Section */}
    <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Education</h3>
        {applicantData?.userDetails?.education.map((education, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-lg shadow-md mb-4">
                <h4 className="text-xl font-semibold text-gray-800">{education.course}</h4>
                <p className="text-md ">{education.university}</p>
                <p className="text-md  mt-1">
                    From: {new Date(education.year.from).toLocaleDateString()} 
                    {education.year.to && ` to ${new Date(education.year.to).toLocaleDateString()}`}
                </p>
                {education.description && (
                    <p className="text-sm text-slate-700 mt-2">{education.description}</p>
                )}
            </div>
        ))}
    </div>
</div>

                </div>
            </div>
        </div>

    )
}

