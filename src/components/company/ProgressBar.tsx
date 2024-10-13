import React from 'react';

export const ApplicationProgress = ({ status }:any) => {

  const stages = ['in-review', 'shortlisted', 'interview', 'hired'];
  
  const getStatusColor = (status:string) => {
    switch (status.toLowerCase()) {
      case 'rejected':
        return 'bg-red-400';
      case 'hired':
        return 'bg-green-500';
      default:
        return 'bg-sky-400';
    }
  };

  const getFilledBlocks = (currentStatus:string) => {
    if (currentStatus.toLowerCase() === 'rejected') return 4;
    const stageIndex = stages.indexOf(currentStatus.toLowerCase());
    return stageIndex + 1;
  };

  const getStatusText = (status:string) => {
    if (status.toLowerCase() === 'rejected') return 'Rejected';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filledBlocks = getFilledBlocks(status);
  const statusColor = getStatusColor(status);

  return (
    <div className="flex flex-col p-4 mt-5 w-full bg-slate-50">
      <div className="flex gap-10 justify-between items-start w-full text-sm leading-relaxed whitespace-nowrap">
        <div className="text-slate-800">Stage</div>
        <div className="flex gap-2 items-center text-right">
          <div className={`flex shrink-0 self-stretch my-auto w-2.5 h-2.5 rounded-full ${statusColor}`} />
          <div className="self-stretch my-auto">{getStatusText(status)}</div>
        </div>
      </div>
      <div className="flex gap-0.5 mt-2 w-full min-h-[11px]">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`flex flex-1 shrink basis-0 h-[11px] ${
              index < filledBlocks ? statusColor : 'bg-zinc-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

