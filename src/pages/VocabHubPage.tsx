import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VocabHub as VocabHubComponent } from '@/components/vocab/VocabHub';
import { BookOpen } from 'lucide-react';

const VocabHubPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded border-3 border-black bg-accent shadow-brutal-sm">
            <BookOpen className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-wide">Vocab Hub</h1>
            <p className="text-muted-foreground font-bold italic">Build your vocabulary for IPMAT Verbal section</p>
          </div>
        </div>

        {/* Content */}
        <VocabHubComponent />
      </div>
    </DashboardLayout>
  );
};

export default VocabHubPage;
