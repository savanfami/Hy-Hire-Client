// import React, { useState } from 'react';
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "../../lib/utils";
// import { Button } from "../../components/ui/button";
// import { Calendar } from "../../components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../components/ui/popover";
// import { Alert, AlertDescription } from "../../components/ui/alert";

// export const DatePicker: React.FC<any> = ({ date, setDate }) => {
//   const [open, setOpen] = useState(false);
//   const [tempDate, setTempDate] = useState<Date | undefined>(date);
//   const [error, setError] = useState<string>("");

//   const handleSetDate = () => {
//     if (!tempDate) {
//       setError("Please select a date");
//       return;
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (tempDate < today) {
//       setError("Cannot select a past date");
//       return;
//     }

//     setDate(tempDate);
//     setError("");
//     setOpen(false);
//   };

//   const handleSelect = (selectedDate: Date | undefined) => {
//     setTempDate(selectedDate);
//     setError("");
//   };

//   const disableDate = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return date < today;
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "w-[280px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <div className="p-3">
//             <Calendar
//               mode="single"
//               selected={tempDate}
//               onSelect={handleSelect}
//               disabled={disableDate}
//               initialFocus
//             />
//             {error && (
//               <Alert variant="destructive" className="mt-2">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <div className="flex justify-end mt-4 gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setOpen(false);
//                   setTempDate(date);
//                   setError("");
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleSetDate}>Set Date</Button>
//             </div>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

