import { useState, useEffect } from 'react';
import { Plus, ArrowUpDown, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMockScores, setMockScores, MockScore, ExamType } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type SortField = 'date' | 'totalScore';
type SortDirection = 'asc' | 'desc';

export const MockScoreTracker = () => {
  const [scores, setScores] = useState<MockScore[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Form state
  const [mockName, setMockName] = useState('');
  const [examType, setExamType] = useState<ExamType>('INDORE');
  const [date, setDate] = useState('');

  // Section Stores
  const [saScore, setSaScore] = useState('');
  const [mcqScore, setMcqScore] = useState('');
  const [qaScore, setQaScore] = useState('');
  const [vaScore, setVaScore] = useState('');
  const [lrScore, setLrScore] = useState('');

  useEffect(() => {
    setScores(getMockScores());
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedScores = [...scores].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'totalScore':
        comparison = a.totalScore - b.totalScore;
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sa = parseInt(saScore) || 0;
    const mcq = parseInt(mcqScore) || 0;
    const qa = parseInt(qaScore) || 0;
    const va = parseInt(vaScore) || 0;
    const lr = parseInt(lrScore) || 0;

    let total = 0;
    const breakdown: any = { va };

    if (examType === 'INDORE') {
      breakdown.sa = sa;
      breakdown.mcq = mcq;
      total = sa + mcq + va;
    } else {
      breakdown.qa = qa;
      breakdown.lr = lr;
      total = qa + va + lr;
    }

    const newScore: MockScore = {
      id: Date.now().toString(),
      mockName,
      examType,
      date,
      breakdown,
      totalScore: total,
    };

    const updatedScores = [newScore, ...scores];
    setScores(updatedScores);
    setMockScores(updatedScores);

    // Reset form
    setMockName('');
    setDate('');
    setSaScore('');
    setMcqScore('');
    setQaScore('');
    setVaScore('');
    setLrScore('');
    setIsOpen(false);

    toast({
      title: "Score added!",
      description: `${mockName} (${examType}) - Total: ${total}`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedScores = scores.filter(s => s.id !== id);
    setScores(updatedScores);
    setMockScores(updatedScores);
    toast({
      title: "Score deleted",
      description: "The mock score has been removed.",
    });
  };

  const averageTotal = scores.length > 0
    ? Math.round(scores.reduce((sum, s) => sum + s.totalScore, 0) / scores.length)
    : 0;

  const highestScore = scores.length > 0
    ? Math.max(...scores.map(s => s.totalScore))
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-brutal-md border-3 border-border bg-card">
          <CardContent className="p-4">
            <p className="text-sm font-bold text-muted-foreground uppercase">Total Mocks</p>
            <p className="text-3xl font-black text-foreground">{scores.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-brutal-md border-3 border-border bg-card">
          <CardContent className="p-4">
            <p className="text-sm font-bold text-muted-foreground uppercase">Average Score</p>
            <p className="text-3xl font-black text-primary">{averageTotal}</p>
          </CardContent>
        </Card>
        <Card className="shadow-brutal-md border-3 border-border bg-card">
          <CardContent className="p-4">
            <p className="text-sm font-bold text-muted-foreground uppercase">Highest Score</p>
            <p className="text-3xl font-black text-secondary">{highestScore}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Score Button & Dialog */}
      <div className="flex justify-between items-center bg-primary/10 p-4 rounded border-3 border-border shadow-brutal-sm">
        <div>
          <h3 className="text-lg font-black text-foreground uppercase">Score History</h3>
          <p className="text-sm font-bold text-muted-foreground">Manage your mock performance</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold">
              <Plus className="w-5 h-5 mr-2" />
              Add Score
            </Button>
          </DialogTrigger>
          <DialogContent className="border-3 border-black shadow-brutal-lg sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase">Add Mock Score</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="examType" className="font-bold">Exam Type</Label>
                  <Select value={examType} onValueChange={(val: ExamType) => setExamType(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INDORE">IPMAT Indore</SelectItem>
                      <SelectItem value="ROHTAK">IPMAT Rohtak</SelectItem>
                      <SelectItem value="JIPMAT">JIPMAT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-bold">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="border-3 border-black shadow-brutal-sm focus:shadow-brutal-md transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mockName" className="font-bold">Mock Test Name</Label>
                <Input
                  id="mockName"
                  value={mockName}
                  onChange={(e) => setMockName(e.target.value)}
                  placeholder="e.g., IMS Mock 1"
                  required
                  className="border-3 border-black shadow-brutal-sm focus:shadow-brutal-md transition-all"
                />
              </div>

              {/* Dynamic Score Inputs */}
              <div className="space-y-4 pt-2 border-t-3 border-black/10">
                <Label className="font-black text-lg uppercase block text-center">Sectional Scores</Label>

                {examType === 'INDORE' && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="saScore" className="font-bold">SA (Quant)</Label>
                      <Input id="saScore" type="number" min="0" value={saScore} onChange={e => setSaScore(e.target.value)} className="font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mcqScore" className="font-bold">MCQ (Quant)</Label>
                      <Input id="mcqScore" type="number" min="0" value={mcqScore} onChange={e => setMcqScore(e.target.value)} className="font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaScore" className="font-bold">VA</Label>
                      <Input id="vaScore" type="number" min="0" value={vaScore} onChange={e => setVaScore(e.target.value)} className="font-bold" required />
                    </div>
                  </div>
                )}

                {(examType === 'ROHTAK' || examType === 'JIPMAT') && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="qaScore" className="font-bold">QA</Label>
                      <Input id="qaScore" type="number" min="0" value={qaScore} onChange={e => setQaScore(e.target.value)} className="font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lrScore" className="font-bold">LR</Label>
                      <Input id="lrScore" type="number" min="0" value={lrScore} onChange={e => setLrScore(e.target.value)} className="font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaScore" className="font-bold">VA</Label>
                      <Input id="vaScore" type="number" min="0" value={vaScore} onChange={e => setVaScore(e.target.value)} className="font-bold" required />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full text-lg h-12">
                  Save Score
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scores Table */}
      <Card className="shadow-brutal-md border-3 border-border overflow-hidden bg-card">
        <CardContent className="p-0">
          {scores.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p className="font-bold text-lg">No mock scores yet. Add your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-foreground hover:bg-foreground border-b-3 border-border">
                    <TableHead className="text-background font-bold uppercase">Exam</TableHead>
                    <TableHead className="text-background font-bold uppercase">Mock Name</TableHead>
                    <TableHead className="text-background font-bold uppercase">
                      <button
                        onClick={() => handleSort('date')}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        Date
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-background font-bold uppercase">Score Breakdown</TableHead>
                    <TableHead className="text-background font-bold uppercase">
                      <button
                        onClick={() => handleSort('totalScore')}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        Total
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedScores.map((score) => (
                    <TableRow key={score.id} className="border-b-2 border-border font-medium hover:bg-muted">
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-black uppercase text-black border-2 border-black",
                          score.examType === 'INDORE' ? "bg-primary" :
                            score.examType === 'ROHTAK' ? "bg-secondary" : "bg-warning"
                        )}>
                          {score.examType}
                        </span>
                      </TableCell>
                      <TableCell className="font-bold">{score.mockName}</TableCell>
                      <TableCell className="text-muted-foreground font-semibold">
                        {new Date(score.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 text-xs">
                          {score.examType === 'INDORE' ? (
                            <>
                              <span className="bg-slate-100 border border-black px-1.5 py-0.5 rounded">SA: {score.breakdown?.sa ?? '-'}</span>
                              <span className="bg-slate-100 border border-black px-1.5 py-0.5 rounded">MCQ: {score.breakdown?.mcq ?? '-'}</span>
                              <span className="bg-slate-100 border border-black px-1.5 py-0.5 rounded">VA: {score.breakdown?.va ?? '-'}</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-slate-100 border border-black px-1.5 py-0.5 rounded">QA: {score.breakdown?.qa ?? '-'}</span>
                              <span className="bg-slate-100 border border-black px-1.5 py-0.5 rounded">LR: {score.breakdown?.lr ?? '-'}</span>
                              <span className="bg-slate-100 border border-black px-1.5 py-0.5 rounded">VA: {score.breakdown?.va ?? '-'}</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-lg">
                        {score.totalScore}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(score.id)}
                          className="p-2 rounded border-2 border-transparent hover:border-black hover:bg-destructive hover:text-white transition-all text-muted-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
