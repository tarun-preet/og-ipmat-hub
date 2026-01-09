import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MockScoreTracker } from '@/components/tracker/MockScoreTracker';
import { BarChart3 } from 'lucide-react';

const MockScoresPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded border-3 border-black bg-warning shadow-brutal-sm">
            <BarChart3 className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-wide">Mock Score Tracker</h1>
            <p className="text-muted-foreground font-bold">Track and analyze your mock test performance</p>
          </div>
        </div>

        {/* Content */}
        <MockScoreTracker />
      </div>
    </DashboardLayout>
  );
};

export default MockScoresPage;
