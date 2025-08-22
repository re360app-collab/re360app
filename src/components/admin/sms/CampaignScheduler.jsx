import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const generateTimeOptions = (interval) => {
    const options = [];
    for (let i = 0; i < 60; i += interval) {
        options.push(i.toString().padStart(2, '0'));
    }
    return options;
};

const CampaignScheduler = ({ scheduledAt, onScheduleChange }) => {
    const [date, setDate] = useState(scheduledAt ? new Date(scheduledAt) : null);
    const [hour, setHour] = useState(scheduledAt ? new Date(scheduledAt).getHours() : '09');
    const [minute, setMinute] = useState(scheduledAt ? new Date(scheduledAt).getMinutes() : '00');

    const handleDateTimeChange = (newDate, newHour, newMinute) => {
        if (!newDate) {
            onScheduleChange(null);
            return;
        }

        const updatedDate = new Date(newDate);
        updatedDate.setHours(parseInt(newHour, 10), parseInt(newMinute, 10), 0, 0);
        onScheduleChange(updatedDate);
    };

    const handleDateSelect = (selectedDate) => {
        setDate(selectedDate);
        handleDateTimeChange(selectedDate, hour, minute);
    };

    const handleHourChange = (newHour) => {
        setHour(newHour);
        if (date) handleDateTimeChange(date, newHour, minute);
    };

    const handleMinuteChange = (newMinute) => {
        setMinute(newMinute);
        if (date) handleDateTimeChange(date, hour, newMinute);
    };

    const clearSchedule = () => {
        setDate(null);
        onScheduleChange(null);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule Campaign</CardTitle>
                <CardDescription>
                    {date ? "Your campaign is scheduled." : "Optional: Send this campaign at a future date and time."}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
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
                                onSelect={handleDateSelect}
                                initialFocus
                                disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {date && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Hour</Label>
                            <Select value={hour} onValueChange={handleHourChange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(h => (
                                        <SelectItem key={h} value={h}>{h}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Minute</Label>
                            <Select value={minute} onValueChange={handleMinuteChange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {generateTimeOptions(15).map(m => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
                
                {date && (
                    <Button variant="link" size="sm" onClick={clearSchedule} className="p-0 h-auto">
                        Clear schedule & send now
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default CampaignScheduler;