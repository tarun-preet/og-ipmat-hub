import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DailyGoals } from '@/components/dashboard/DailyGoals';
import { DailyLogComponent } from '@/components/dashboard/DailyLog';
import { PenLine } from 'lucide-react';

const DailyLogPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded border-3 border-black bg-primary shadow-brutal-sm">
            <PenLine className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-wide">Daily Log</h1>
            <p className="text-muted-foreground font-bold italic">Track your study progress and reflections</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DailyGoals />
          <DailyLogComponent />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DailyLogPage;
