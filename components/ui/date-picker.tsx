"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date | null | undefined;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  name: string;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  onBlur,
  name,
  disabled,
}) => {
  const [date, setDate] = React.useState<Date | null | undefined>(value);

  React.useEffect(() => {
    setDate(value); // Ensure local state syncs with form value
  }, [value]);

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            onBlur={onBlur}
            disabled={disabled}
            className={cn(
              "w-[240px] justify-start text-left font-normal dark:bg-gray-800 text-gray-500",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              onChange(selectedDate); // Call form `onChange` to update form state
            }}
            initialFocus
            className="bg-gray-900 text-gray-200"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
