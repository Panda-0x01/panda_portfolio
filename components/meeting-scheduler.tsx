"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { format } from "date-fns";

interface MeetingSchedulerProps {
  children: React.ReactNode;
}

export function MeetingScheduler({ children }: MeetingSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleScheduleMeeting = () => {
    if (selectedDate && selectedTime) {
      setIsScheduled(true);
      // Here you would typically send the data to your backend
      console.log("Meeting scheduled for:", selectedDate, "at", selectedTime);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsScheduled(false);
        setIsOpen(false);
        setSelectedDate(undefined);
        setSelectedTime("");
      }, 3000);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const dayOfWeek = date.getDay();
    // Disable past dates and weekends
    return date < today || dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-black border-white/20" align="start">
        <Card className="glass-card border-white/10 w-96">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Icons.calendar className="w-5 h-5" />
              Schedule a Meeting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isScheduled ? (
              <>
                {/* Calendar */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                    className="rounded-md border border-white/10 bg-black/50"
                    classNames={{
                      months: "text-white",
                      month: "space-y-4",
                      caption: "text-white",
                      caption_label: "text-white",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 text-white hover:bg-white/10",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-white rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-white/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/10 rounded-md",
                      day_selected: "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                      day_today: "bg-white/20 text-white",
                      day_outside: "text-white/50",
                      day_disabled: "text-white/30 opacity-50",
                      day_range_middle: "aria-selected:bg-white/10 aria-selected:text-white",
                      day_hidden: "invisible",
                    }}
                  />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          className={`text-xs ${
                            selectedTime === time
                              ? "bg-white text-black"
                              : "border-white/20 text-white hover:bg-white/10"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Meeting Info */}
                {selectedDate && selectedTime && (
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white text-sm">
                      <strong>Meeting scheduled for:</strong>
                    </p>
                    <p className="text-gray-300 text-sm">
                      {format(selectedDate, "EEEE, MMMM do, yyyy")} at {selectedTime}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleScheduleMeeting}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                  >
                    <Icons.calendar className="w-4 h-4 mr-2" />
                    Confirm Meeting
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.calendar className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Meeting Scheduled!</h3>
                <p className="text-gray-300 text-sm">
                  I'll send you a calendar invite shortly.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}