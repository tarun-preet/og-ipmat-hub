import { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDailyGoals, setDailyGoals, DailyGoal } from '@/lib/storage';
import { cn } from '@/lib/utils';

export const DailyGoals = () => {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    // Get today's goals only
    const allGoals = getDailyGoals();
    const today = new Date().toDateString();
    const todayGoals = allGoals.filter(
      g => new Date(g.createdAt).toDateString() === today
    );
    setGoals(todayGoals);
  }, []);

  const saveGoals = (updatedGoals: DailyGoal[]) => {
    // Save all goals including previous days
    const allGoals = getDailyGoals();
    const today = new Date().toDateString();
    const otherDaysGoals = allGoals.filter(
      g => new Date(g.createdAt).toDateString() !== today
    );
    setDailyGoals([...otherDaysGoals, ...updatedGoals]);
    setGoals(updatedGoals);
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;

    const goal: DailyGoal = {
      id: Date.now().toString(),
      text: newGoal.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [...goals, goal];
    saveGoals(updated);
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    const updated = goals.map(g =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    saveGoals(updated);
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    saveGoals(updated);
  };

  const completedCount = goals.filter(g => g.completed).length;

  return (
    <Card className="shadow-brutal-lg border-3 border-border bg-card overflow-hidden">
      <CardHeader className="pb-3 bg-primary/10 border-b-3 border-black">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-black uppercase tracking-tight">Today's Mission</CardTitle>
          {goals.length > 0 && (
            <span className="text-sm font-black bg-black text-white px-2 py-0.5 rounded uppercase">
              {completedCount}/{goals.length} DONE
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        {/* Add Goal Input */}
        <div className="flex gap-2 p-1 bg-black rounded border-2 border-black">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a goal for today..."
            onKeyDown={(e) => e.key === 'Enter' && addGoal()}
            className="flex-1 border-0 focus-visible:ring-0 font-bold bg-card text-foreground"
          />
          <Button onClick={addGoal} className="bg-primary hover:bg-primary/90 text-black font-black uppercase px-4 border-l-2 border-black rounded-none">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Goals List */}
        <div className="space-y-3">
          {goals.length === 0 ? (
            <div className="text-center py-8 border-3 border-dashed border-black/20 rounded bg-accent/5">
              <p className="text-sm font-black text-muted-foreground uppercase opacity-50">
                Silence is empty. Add a goal!
              </p>
            </div>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className={cn(
                  "flex items-center gap-3 p-4 rounded border-3 border-black transition-all group shadow-brutal-sm",
                  goal.completed
                    ? "bg-success text-black translate-x-1 translate-y-1 shadow-none"
                    : "bg-card text-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-md"
                )}
              >
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className="flex-shrink-0"
                >
                  {goal.completed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <span className={cn(
                  "flex-1 text-sm font-black uppercase tracking-tight",
                  goal.completed && "line-through opacity-70"
                )}>
                  {goal.text}
                </span>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-black hover:text-white rounded border-2 border-transparent hover:border-black transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
