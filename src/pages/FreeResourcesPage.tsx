import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FreeMocks } from '@/components/resources/FreeMocks';
import { YTVideos } from '@/components/resources/YTVideos';
import { OtherResources } from '@/components/resources/OtherResources';
import { Gift } from 'lucide-react';

const FreeResourcesPage = () => {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded border-3 border-black bg-primary shadow-brutal-sm">
                        <Gift className="w-6 h-6 text-black" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-foreground uppercase tracking-wide">Free Resources</h1>
                        <p className="text-muted-foreground font-bold italic">Everything you need to ace IPMAT</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    <FreeMocks />
                    <YTVideos />
                    <OtherResources />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FreeResourcesPage;
