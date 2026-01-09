import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { QuantVault as QuantVaultComponent } from '@/components/quant/QuantVault';
import { Calculator } from 'lucide-react';

const QuantVaultPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded border-3 border-black bg-primary shadow-brutal-sm">
            <Calculator className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-wide">Quant Vault</h1>
            <p className="text-muted-foreground font-bold italic">Essential formulas for IPMAT Quantitative Aptitude</p>
          </div>
        </div>

        {/* Content */}
        <QuantVaultComponent />
      </div>
    </DashboardLayout>
  );
};

export default QuantVaultPage;
