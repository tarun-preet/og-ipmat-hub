import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DailyGoals } from '@/components/dashboard/DailyGoals';
import { DailyLogComponent } from '@/components/dashboard/DailyLog';
import { getProgress, getMockScores, getCountdownToIPMAT, CountdownTime } from '@/lib/storage';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Calculator,
  BookOpen,
  CheckSquare,
  BarChart3,
  Clock,
  TrendingUp,
  ArrowRight,
  Target,
  Timer
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Index = () => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState<CountdownTime>(getCountdownToIPMAT());
  const [progressPercent, setProgressPercent] = useState(0);
  const [mockCount, setMockCount] = useState(0);
  const [latestScore, setLatestScore] = useState<number | null>(null);

  // Live countdown timer - updates every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownToIPMAT());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const progress = getProgress();
    const completed = progress.filter(p => p.completed).length;
    setProgressPercent(Math.round((completed / progress.length) * 100));

    const mocks = getMockScores();
    setMockCount(mocks.length);
    if (mocks.length > 0) {
      setLatestScore(mocks[0].totalScore);
    }
  }, []);

  const quickLinks = [
    { icon: Calculator, label: 'Quant Vault', path: '/quant-vault', color: 'bg-primary/10 text-primary' },
    { icon: BookOpen, label: 'Vocab Hub', path: '/vocab-hub', color: 'bg-accent/20 text-accent' },
    { icon: CheckSquare, label: 'Progress', path: '/progress', color: 'bg-success/10 text-success' },
    { icon: BarChart3, label: 'Mock Scores', path: '/mock-scores', color: 'bg-warning/10 text-warning' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
        {/* Welcome Header */}
        <div className="bg-primary rounded border-3 border-black shadow-brutal-lg p-6 lg:p-8 text-black">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-4xl font-black mb-2 uppercase tracking-wide">
                Welcome back, {user?.name?.split(' ')[0] || 'Aspirant'}! 👋
              </h1>
              <p className="text-black/80 font-bold text-lg">
                Keep pushing forward. Every moment counts!
              </p>
            </div>
            {/* Live Countdown Timer */}
            <div className="bg-card border-3 border-border rounded-lg px-4 py-3 shadow-brutal-md">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className="text-xs font-black uppercase text-muted-foreground tracking-wider">Time until IPMAT 2026</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Days */}
                <div className="text-center">
                  <p className="text-3xl lg:text-4xl font-black text-foreground tabular-nums">{countdown.days}</p>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">Days</p>
                </div>
                <span className="text-2xl font-black text-primary">:</span>
                {/* Hours */}
                <div className="text-center">
                  <p className="text-3xl lg:text-4xl font-black text-foreground tabular-nums">{String(countdown.hours).padStart(2, '0')}</p>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">Hours</p>
                </div>
                <span className="text-2xl font-black text-primary">:</span>
                {/* Minutes */}
                <div className="text-center">
                  <p className="text-3xl lg:text-4xl font-black text-foreground tabular-nums">{String(countdown.minutes).padStart(2, '0')}</p>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">Mins</p>
                </div>
                <span className="text-2xl font-black text-primary animate-pulse">:</span>
                {/* Seconds */}
                <div className="text-center">
                  <p className="text-3xl lg:text-4xl font-black text-secondary tabular-nums">{String(countdown.seconds).padStart(2, '0')}</p>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">Secs</p>
                </div>
              </div>
              <p className="text-[10px] font-bold text-center mt-2 text-black/60 uppercase">May 4, 2026 • 2:00 PM IST</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-brutal-md border-3 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border-2 border-black bg-success shadow-brutal-sm">
                  <Target className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-muted-foreground uppercase">Syllabus Done</p>
                  <p className="text-xl font-black text-foreground">{progressPercent}%</p>
                </div>
              </div>
              <Progress value={progressPercent} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-brutal-md border-3 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border-2 border-black bg-primary shadow-brutal-sm">
                  <BarChart3 className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Mocks Taken</p>
                  <p className="text-xl font-black text-foreground">{mockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-brutal-md border-3 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border-2 border-black bg-accent shadow-brutal-sm">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Latest Score</p>
                  <p className="text-xl font-black text-foreground">
                    {latestScore ?? '—'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-brutal-md border-3 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border-2 border-black bg-warning shadow-brutal-sm">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Days Left</p>
                  <p className="text-xl font-black text-foreground">{countdown.days}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 p-4 bg-card rounded border-3 border-border shadow-brutal-md hover:shadow-brutal-lg transition-all hover:-translate-y-1 group"
            >
              <div className={`p-2 rounded border-2 border-black ${link.label === 'Quant Vault' ? 'bg-primary' :
                link.label === 'Vocab Hub' ? 'bg-secondary' :
                  link.label === 'Progress' ? 'bg-success' : 'bg-warning'
                }`}>
                <link.icon className="w-5 h-5 text-black" />
              </div>
              <span className="font-black text-foreground text-sm lg:text-base uppercase">{link.label}</span>
              <ArrowRight className="w-5 h-5 text-black ml-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Daily Goals & Log */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DailyGoals />
          <DailyLogComponent />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
