import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calculator, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProgress, setProgress, ProgressItem } from '@/lib/storage';
import { cn } from '@/lib/utils';

export const ProgressTracker = () => {
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  useEffect(() => {
    setProgressItems(getProgress());
  }, []);

  const toggleItem = (id: string) => {
    const updated = progressItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setProgressItems(updated);
    setProgress(updated);
  };

  // Helper function to get unit category from label
  const getUnitCategory = (label: string): string => {
    if (label.startsWith('Algebra')) return 'algebra';
    if (label.startsWith('Arithmetic')) return 'arithmetic';
    if (label.startsWith('Geometry')) return 'geometry';
    if (label.startsWith('LRDI')) return 'lrdi';
    if (label.startsWith('Modern Math')) return 'modern-math';
    if (label.startsWith('Number System')) return 'number-system';
    if (label.includes('Progression') || label.includes('Functions') || label.includes('Modulus') ||
      label.includes('Inequalities') || label.includes('Indices') || label.includes('Minima') ||
      label.includes('Identities')) return 'algebra';
    if (label.includes('Trigonometry')) return 'geometry';
    if (label.includes('Conic Sections')) return 'geometry';
    if (label.includes('Logarithm') || label.includes('Binomial')) return 'modern-math';
    return 'other';
  };

  const quantItems = progressItems.filter(item => item.category === 'quants');
  const verbalItems = progressItems.filter(item => item.category === 'verbal');

  // Filter quants items based on selected unit
  const filteredQuantItems = selectedUnit === 'all'
    ? quantItems
    : quantItems.filter(item => getUnitCategory(item.label) === selectedUnit);

  const quantCompleted = quantItems.filter(item => item.completed).length;
  const verbalCompleted = verbalItems.filter(item => item.completed).length;
  const totalCompleted = quantCompleted + verbalCompleted;
  const totalItems = progressItems.length;

  const overallProgress = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;
  const quantProgress = quantItems.length > 0 ? (quantCompleted / quantItems.length) * 100 : 0;
  const verbalProgress = verbalItems.length > 0 ? (verbalCompleted / verbalItems.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card className="shadow-brutal-xl border-5 border-black bg-accent">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-black">Overall Syllabus Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Progress value={overallProgress} className="h-3" />
            </div>
            <span className="text-3xl font-black text-black min-w-[4rem] text-right px-4 py-2 bg-white rounded border-3 border-black shadow-brutal-sm">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <p className="text-sm text-black font-bold">
            {totalCompleted} of {totalItems} topics completed
          </p>
        </CardContent>
      </Card>

      {/* Progress by Category */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quants Section */}
        <Card className="shadow-brutal-lg border-3 border-black">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border-3 border-black bg-primary shadow-brutal-sm">
                  <Calculator className="w-5 h-5 text-black" />
                </div>
                <div>
                  <CardTitle className="text-base">Quantitative Aptitude</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {quantCompleted}/{quantItems.length} completed
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-primary px-3 py-1 bg-black rounded">
                {Math.round(quantProgress)}%
              </span>
            </div>
            <Progress value={quantProgress} className="h-2 mt-3" />

            {/* Unit Filter Dropdown */}
            <div className="mt-4">
              <label className="text-sm font-black text-foreground mb-2 block uppercase tracking-wide">
                Filter by Unit
              </label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="algebra">Algebra</SelectItem>
                  <SelectItem value="arithmetic">Arithmetic</SelectItem>
                  <SelectItem value="geometry">Geometry</SelectItem>
                  <SelectItem value="lrdi">LRDI</SelectItem>
                  <SelectItem value="modern-math">Modern Math</SelectItem>
                  <SelectItem value="number-system">Number System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto">
            <div className="space-y-2">
              {filteredQuantItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded border-3 border-black transition-all text-left font-bold shadow-brutal-sm hover:shadow-brutal-md hover:translate-x-[-2px] hover:translate-y-[-2px]",
                    item.completed
                      ? "bg-success text-black"
                      : "bg-background text-foreground"
                  )}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm font-bold",
                    item.completed && "line-through"
                  )}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verbal Section */}
        <Card className="shadow-brutal-lg border-3 border-black">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border-3 border-black bg-secondary shadow-brutal-sm">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <CardTitle className="text-base">Verbal Ability</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {verbalCompleted}/{verbalItems.length} completed
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-secondary px-3 py-1 bg-black rounded">
                {Math.round(verbalProgress)}%
              </span>
            </div>
            <Progress value={verbalProgress} className="h-2 mt-3" />
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto">
            <div className="space-y-2">
              {verbalItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded border-3 border-black transition-all text-left font-bold shadow-brutal-sm hover:shadow-brutal-md hover:translate-x-[-2px] hover:translate-y-[-2px]",
                    item.completed
                      ? "bg-success text-black"
                      : "bg-background text-foreground"
                  )}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm font-bold",
                    item.completed && "line-through"
                  )}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
