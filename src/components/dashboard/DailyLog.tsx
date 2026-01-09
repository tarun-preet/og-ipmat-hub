import { useState, useEffect } from 'react';
import { Save, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDailyLogs, setDailyLogs, DailyLog } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { format, subDays, addDays, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

export const DailyLogComponent = () => {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [studyHours, setStudyHours] = useState<string>('0');
  const [studyMinutes, setStudyMinutes] = useState<string>('0');
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const allLogs = getDailyLogs();
    setLogs(allLogs);

    // Load content for current date
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const existingLog = allLogs.find(l => l.date === dateStr);
    setContent(existingLog?.content || '');
    setStudyHours(existingLog?.studyHours?.toString() || '0');
    setStudyMinutes(existingLog?.studyMinutes?.toString() || '0');
    setIsSaved(true);
  }, [currentDate]);

  const handleSave = () => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const existingIndex = logs.findIndex(l => l.date === dateStr);
    const hoursNum = parseInt(studyHours) || 0;
    const minutesNum = parseInt(studyMinutes) || 0;

    let updatedLogs: DailyLog[];

    if (existingIndex >= 0) {
      updatedLogs = logs.map((l, i) =>
        i === existingIndex ? { ...l, content, studyHours: hoursNum, studyMinutes: minutesNum } : l
      );
    } else {
      const newLog: DailyLog = {
        id: Date.now().toString(),
        date: dateStr,
        content,
        studyHours: hoursNum,
        studyMinutes: minutesNum,
      };
      updatedLogs = [...logs, newLog];
    }

    setLogs(updatedLogs);
    setDailyLogs(updatedLogs);
    setIsSaved(true);

    toast({
      title: "Saved!",
      description: `Your log for ${format(currentDate, 'MMM d')} has been saved.`,
    });
  };

  const goToPreviousDay = () => setCurrentDate(subDays(currentDate, 1));
  const goToNextDay = () => {
    if (!isToday(currentDate)) {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  return (
    <Card className="shadow-brutal-lg border-3 border-border bg-card overflow-hidden">
      <CardHeader className="pb-3 bg-secondary/10 border-b-3 border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Study Reflections
          </CardTitle>
          <div className="flex items-center gap-2 bg-card px-3 py-1.5 rounded border-3 border-border shadow-brutal-sm">
            <button
              onClick={goToPreviousDay}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-black min-w-[100px] text-center uppercase">
              {isToday(currentDate) ? 'Today' : format(currentDate, 'MMM d')}
            </span>
            <button
              onClick={goToNextDay}
              disabled={isToday(currentDate)}
              className="p-1 rounded hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {/* Study Time Inputs */}
        <div className="p-4 rounded border-3 border-border bg-accent shadow-brutal-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 rounded bg-card border-2 border-border">
              <Clock className="w-5 h-5" />
            </div>
            <label className="text-sm font-black uppercase tracking-tight">Time Studied</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-foreground/60">Hrs studied</label>
              <Input
                type="number"
                min="0"
                max="24"
                value={studyHours}
                onChange={(e) => {
                  setStudyHours(e.target.value);
                  setIsSaved(false);
                }}
                className="border-3 border-border font-black text-lg bg-card text-foreground shadow-brutal-sm focus:shadow-brutal-md transition-all h-12"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-foreground/60">Minutes studied</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={studyMinutes}
                onChange={(e) => {
                  setStudyMinutes(e.target.value);
                  setIsSaved(false);
                }}
                className="border-3 border-border font-black text-lg bg-card text-foreground shadow-brutal-sm focus:shadow-brutal-md transition-all h-12"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-muted-foreground ml-1">Daily Notes & Challenges</label>
          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setIsSaved(false);
            }}
            placeholder="What did you learn today? What challenges did you face?"
            className="min-h-[160px] resize-none border-3 border-border font-bold p-4 bg-card text-foreground shadow-brutal-sm focus:shadow-brutal-md transition-all text-base"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className={cn(
            "text-xs font-black uppercase px-2 py-1 rounded border-2 border-border",
            isSaved ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
          )}>
            {isSaved ? 'All set!' : 'Unsaved changes'}
          </span>
          <Button
            onClick={handleSave}
            disabled={isSaved}
            className="font-black uppercase shadow-brutal-sm hover:translate-y-[-2px] hover:shadow-brutal-md transition-all px-8 h-11"
          >
            <Save className="w-5 h-5 mr-3" />
            Save Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
