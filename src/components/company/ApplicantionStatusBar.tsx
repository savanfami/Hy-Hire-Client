import React from 'react';
import { Check } from 'lucide-react';

interface ApplicationStatusBarProps {
    currentStatus: string|undefined
  }

export const ApplicationStatusBar:React.FC<ApplicationStatusBarProps> = ({ currentStatus }) => {
  const stages = [
    { id: 'in-review', label: 'In Review' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'interview', label: 'Interview' },
    { id: 'hired', label: 'Hired' }
  ];

  const currentIndex = stages.findIndex(stage => stage.id === currentStatus);

  const getStageStyle = (index:number) => {
    if (currentStatus === 'rejected') {
      return 'bg-red-500 text-white';
    }
    
    if (index === currentIndex) {
      return 'bg-sky-400 text-white';
    }
    
    if (index < currentIndex) {
      return 'bg-sky-400 text-white';
    }
    
    return 'bg-gray-100 text-sky-400';
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {currentStatus === 'rejected' ? (
        <div className="flex items-center justify-center bg-red-500 text-white rounded-lg p-4 shadow-md">
          <span className="text-lg font-semibold">Application Rejected</span>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex-1 flex items-center">
              <div className={`
                flex-1 relative group transition-all duration-300
                ${index !== stages.length - 1 ? 'mr-2' : ''}
              `}>
                <div className={`
                  rounded-lg p-3 text-center text-sm font-medium
                  transition-all duration-300 shadow-sm
                  ${getStageStyle(index)}
                  ${index <= currentIndex ? 'shadow-md' : ''}
                `}>
                  <div className="flex items-center justify-center gap-2">
                    {index < currentIndex && (
                      <Check size={16} className="shrink-0" />
                    )}
                    <span>{stage.label}</span>
                  </div>
                </div>
                
                {/* Connector line */}
                {index !== stages.length - 1 && (
                  <div className={`
                    hidden md:block absolute top-1/2 -right-2 w-4 h-0.5
                    ${index < currentIndex ? 'bg-blue-500' : 'bg-gray-200'}
                    transform -translate-y-1/2
                  `} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

