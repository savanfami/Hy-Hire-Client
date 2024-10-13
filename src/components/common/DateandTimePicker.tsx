import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover";
import { format } from 'date-fns'
import { cn } from "../../lib/utils";


export const DatePicker: React.FC<any> = ({ date, time, onDateChange, onTimeChange }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    return (
        <div className="flex flex-col space-y-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={onDateChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <div className="flex space-x-2">
                <Select onValueChange={(value) => onTimeChange(`${value}:${time.split(':')[1] || '00'}`)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                        {hours.map((hour) => (
                            <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                                {hour.toString().padStart(2, '0')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => onTimeChange(`${time.split(':')[0] || '00'}:${value}`)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent>
                        {minutes.map((minute) => (
                            <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                                {minute.toString().padStart(2, '0')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="text-sm text-gray-500">
                Selected: {date && time ? `${format(date, "PPP")} ${time} IST` : "No date and time selected"}
            </div>
        </div>
    );
};

