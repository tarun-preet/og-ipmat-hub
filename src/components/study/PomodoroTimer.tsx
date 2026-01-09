import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [sessions, setSessions] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer completed
                        handleTimerComplete();
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, minutes, seconds]);

    const handleTimerComplete = () => {
        setIsActive(false);

        if (!isBreak) {
            // Work session complete
            setSessions(sessions + 1);
            toast.success('🎉 Session Complete!', {
                description: 'Time for a break! Great work!',
            });

            // Start break
            setIsBreak(true);
            setMinutes(5);
            setSeconds(0);
        } else {
            // Break complete
            toast.info('Break over!', {
                description: 'Ready to focus again?',
            });

            setIsBreak(false);
            setMinutes(25);
            setSeconds(0);
        }
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
    };

    const progress = isBreak
        ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
        : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

    return (
        <Card className="shadow-brutal-lg border-3 border-border bg-card">
            <CardHeader className="pb-3 bg-primary/10 border-b-3 border-border">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                    <span>🍅 Pomodoro Timer</span>
                    {isBreak && <span className="text-sm text-warning">(Break Time)</span>}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {/* Timer Display */}
                <div className="relative mb-6">
                    {/* Circular Progress */}
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-muted"
                        />
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 90}`}
                            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                            className={cn(
                                "transition-all duration-1000",
                                isBreak ? "text-warning" : "text-primary"
                            )}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                        />
                    </svg>

                    {/* Time  Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-6xl font-black tabular-nums">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                        <div className="text-sm font-bold text-muted-foreground mt-2 uppercase">
                            {isBreak ? 'Break Time' : 'Focus Time'}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-center mb-4">
                    <Button
                        onClick={toggleTimer}
                        size="lg"
                        className="flex-1 font-bold text-lg h-12"
                    >
                        {isActive ? (
                            <>
                                <Pause className="w-5 h-5 mr-2" />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 mr-2" />
                                Start
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={resetTimer}
                        size="lg"
                        variant="outline"
                        className="font-bold border-3"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t-3 border-border">
                    <div className="text-center">
                        <div className="text-3xl font-black text-primary">{sessions}</div>
                        <div className="text-xs font-bold text-muted-foreground uppercase">Sessions Today</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-secondary">{sessions * 25}</div>
                        <div className="text-xs font-bold text-muted-foreground uppercase">Minutes Focused</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
