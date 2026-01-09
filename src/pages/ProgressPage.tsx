import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProgressTracker as ProgressTrackerComponent } from '@/components/tracker/ProgressTracker';
import { CheckSquare } from 'lucide-react';

const ProgressPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded border-3 border-black bg-success shadow-brutal-sm">
            <CheckSquare className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-wide">Progress Tracker</h1>
            <p className="text-muted-foreground font-bold">Track your IPMAT syllabus completion</p>
          </div>
        </div>

        {/* Content */}
        <ProgressTrackerComponent />
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage;
