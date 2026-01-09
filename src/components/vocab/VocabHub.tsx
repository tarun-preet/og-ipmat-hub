import { useState, useEffect } from 'react';
import { Search, Volume2, Plus, Trash2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { getVocab, setVocab, UserVocabItem } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface VocabItem {
  id?: string;
  term: string;
  meaning: string;
  example?: string;
  origin?: string;
  isUserAdded?: boolean;
}

const defaultIdioms: VocabItem[] = [
  { term: 'Bite the bullet', meaning: 'To endure a painful experience bravely', example: 'She had to bite the bullet and tell her parents about the accident.' },
  { term: 'Break the ice', meaning: 'To make people feel more comfortable in a social situation', example: 'He told a joke to break the ice at the meeting.' },
  { term: 'Burning the midnight oil', meaning: 'Working late into the night', example: "She's been burning the midnight oil to finish her project." },
  { term: 'Cost an arm and a leg', meaning: 'Very expensive', example: 'That designer bag cost an arm and a leg.' },
  { term: 'Hit the nail on the head', meaning: 'To be exactly right about something', example: 'You hit the nail on the head with that analysis.' },
  { term: 'Once in a blue moon', meaning: 'Very rarely', example: 'He visits his hometown once in a blue moon.' },
  { term: 'Piece of cake', meaning: 'Something very easy', example: 'The exam was a piece of cake for her.' },
  { term: 'Spill the beans', meaning: 'To reveal a secret', example: "Don't spill the beans about the surprise party." },
  { term: 'The ball is in your court', meaning: "It's your turn to take action", example: "I've made my offer, now the ball is in your court." },
  { term: 'Under the weather', meaning: 'Feeling ill', example: "I'm feeling a bit under the weather today." },
  { term: 'Beat around the bush', meaning: 'To avoid the main topic', example: 'Stop beating around the bush and get to the point.' },
  { term: 'Better late than never', meaning: 'Doing something late is better than not doing it at all', example: 'He finally arrived; better late than never.' },
  { term: 'Call it a day', meaning: 'To stop working on something', example: "It's late, let's call it a day." },
  { term: 'Cutting corners', meaning: 'Doing something poorly to save time or money', example: 'They cut corners on the construction, which led to safety issues.' },
  { term: 'Get out of hand', meaning: 'To get out of control', example: 'The party got out of hand quickly.' },
];

const defaultPhrasalVerbs: VocabItem[] = [
  { term: 'Break down', meaning: '1. Stop functioning 2. Analyze in detail 3. Become emotional', example: 'The car broke down on the highway.' },
  { term: 'Bring up', meaning: '1. Raise (a child) 2. Mention a topic', example: "Don't bring up politics at dinner." },
  { term: 'Call off', meaning: 'To cancel something', example: 'They had to call off the match due to rain.' },
  { term: 'Carry on', meaning: 'To continue doing something', example: 'Please carry on with your work.' },
  { term: 'Come across', meaning: 'To find by chance or give an impression', example: 'I came across an old photo album.' },
  { term: 'Figure out', meaning: 'To understand or solve something', example: 'I need to figure out this math problem.' },
  { term: 'Give up', meaning: 'To stop trying or quit', example: 'Never give up on your dreams.' },
  { term: 'Look forward to', meaning: 'To anticipate with pleasure', example: "I'm looking forward to the vacation." },
  { term: 'Put off', meaning: 'To postpone', example: "Don't put off your studies until tomorrow." },
  { term: 'Turn down', meaning: 'To reject or refuse', example: 'She turned down the job offer.' },
  { term: 'Back up', meaning: 'To support someone or something', example: 'My team backed me up during the presentation.' },
  { term: 'Blow up', meaning: 'To explode or become suddenly angry', example: 'The boss blew up when he saw the sales report.' },
  { term: 'Check out', meaning: 'To investigate or look at something', example: 'You should check out that new restaurant.' },
  { term: 'Draw up', meaning: 'To prepare a document or plan', example: 'We need to draw up a contract.' },
  { term: 'Get along', meaning: 'To have a good relationship', example: 'I get along well with my roommates.' },
];

const defaultDailyVocab: VocabItem[] = [
  { term: 'Ephemeral', meaning: 'Lasting for a very short time', example: 'The ephemeral beauty of cherry blossoms attracts tourists every spring.', origin: 'Greek: ephemeros (lasting only a day)' },
  { term: 'Ubiquitous', meaning: 'Present everywhere', example: 'Smartphones have become ubiquitous in modern society.', origin: 'Latin: ubique (everywhere)' },
  { term: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically', example: 'We need a pragmatic approach to solve this problem.', origin: 'Greek: pragma (deed, act)' },
  { term: 'Eloquent', meaning: 'Fluent and persuasive in speaking or writing', example: 'The leader gave an eloquent speech that moved everyone.', origin: 'Latin: eloquens (speaking out)' },
  { term: 'Meticulous', meaning: 'Showing great attention to detail', example: 'The artist was meticulous in her brushwork.', origin: 'Latin: meticulosus (fearful)' },
  { term: 'Resilient', meaning: 'Able to recover quickly from difficulties', example: 'Children are remarkably resilient in adapting to change.', origin: 'Latin: resilire (to spring back)' },
  { term: 'Ambiguous', meaning: 'Open to more than one interpretation', example: 'The contract language was ambiguous and led to disputes.', origin: 'Latin: ambiguus (doubtful)' },
  { term: 'Benevolent', meaning: 'Well-meaning and kindly', example: 'The benevolent donor funded the entire scholarship program.', origin: 'Latin: bene (well) + volens (wishing)' },
  { term: 'Candid', meaning: 'Truthful and straightforward', example: 'I appreciate your candid feedback on my presentation.', origin: 'Latin: candidus (white, pure)' },
  { term: 'Diligent', meaning: 'Having or showing care in work', example: 'The diligent student always completed assignments on time.', origin: 'Latin: diligere (to value highly)' },
];

interface VocabListProps {
  items: VocabItem[];
  searchQuery: string;
  showOrigin?: boolean;
  onDelete?: (id: string) => void;
}

const VocabList = ({ items, searchQuery, showOrigin = false, onDelete }: VocabListProps) => {
  const filtered = items.filter(
    item =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-accent/5 rounded border-3 border-dashed border-black/10">
        <p className="font-bold">No items found matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {filtered.map((item, index) => (
        <Card
          key={item.id || index}
          className="shadow-brutal-sm hover:shadow-brutal-md transition-all border-3 border-border bg-card group"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-black text-foreground text-lg uppercase tracking-tight">{item.term}</h4>
                {item.isUserAdded && (
                  <span className="text-[10px] bg-primary border-2 border-black font-black px-1.5 py-0.5 rounded uppercase">Your Add</span>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  className="p-1.5 rounded border-2 border-transparent hover:border-black hover:bg-secondary transition-all text-muted-foreground hover:text-black"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(item.term);
                    speechSynthesis.speak(utterance);
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                {item.isUserAdded && onDelete && item.id && (
                  <button
                    className="p-1.5 rounded border-2 border-transparent hover:border-black hover:bg-destructive hover:text-white transition-all text-muted-foreground"
                    onClick={() => onDelete(item.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm font-bold text-foreground mb-3 leading-snug">{item.meaning}</p>
            {item.example && (
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary border-r-2 border-black" />
                <p className="text-sm italic font-medium text-foreground/70 bg-primary/5 pl-4 py-2 pr-2">
                  "{item.example}"
                </p>
              </div>
            )}
            {showOrigin && item.origin && (
              <div className="mt-3 inline-block bg-black text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase">
                {item.origin}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const VocabHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userVocab, setUserVocab] = useState<UserVocabItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Form states
  const [newTerm, setNewTerm] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newOrigin, setNewOrigin] = useState('');
  const [newCategory, setNewCategory] = useState<'idioms' | 'phrasal' | 'daily'>('daily');

  useEffect(() => {
    setUserVocab(getVocab());
  }, []);

  // Enhanced Lookup Feature
  const performLookup = async (term: string) => {
    if (!term || term.length < 2) return;

    setIsSearching(true);
    try {
      // Clean term: trim, and handle phrasal verbs that might start with 'to '
      let cleanTerm = term.trim().toLowerCase();
      if (cleanTerm.startsWith('to ')) cleanTerm = cleanTerm.substring(3);

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanTerm)}`);

      if (response.ok) {
        const data = await response.json();
        // Take the first available meaningful definition
        let foundMeaning = '';
        let foundExample = '';

        for (const entry of data) {
          for (const meaning of entry.meanings) {
            for (const def of meaning.definitions) {
              if (!foundMeaning) foundMeaning = def.definition;
              if (!foundExample && def.example) foundExample = def.example;
              if (foundMeaning && foundExample) break;
            }
            if (foundMeaning && foundExample) break;
          }
          if (foundMeaning && foundExample) break;
        }

        if (foundMeaning) {
          setNewMeaning(foundMeaning);
          if (foundExample) setNewExample(foundExample);
          toast({
            title: "Success",
            description: `Fetched meaning for "${term}"`,
          });
        }
      } else {
        toast({
          title: "Not Found",
          description: "Could not auto-fetch definition. You can still add it manually!",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Lookup failed', error);
      toast({
        title: "Search Error",
        description: "Failed to connect to dictionary service.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Auto-lookup with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (newTerm.length > 2 && !newMeaning && !isSearching) {
        performLookup(newTerm);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [newTerm]);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: UserVocabItem = {
      id: Date.now().toString(),
      term: newTerm,
      meaning: newMeaning,
      example: newExample,
      origin: newOrigin,
      category: newCategory,
      createdAt: new Date().toISOString(),
    };

    const updated = [newItem, ...userVocab];
    setUserVocab(updated);
    setVocab(updated);
    setIsOpen(false);

    // Reset
    setNewTerm('');
    setNewMeaning('');
    setNewExample('');
    setNewOrigin('');

    toast({
      title: "Word Added!",
      description: `"${newTerm}" has been added to your hub.`,
    });
  };

  const handleDeleteUserWord = (id: string) => {
    const updated = userVocab.filter(i => i.id !== id);
    setUserVocab(updated);
    setVocab(updated);
    toast({
      title: "Word Removed",
      description: "Item has been deleted from your hub.",
    });
  };

  const idioms = [...defaultIdioms, ...userVocab.filter(i => i.category === 'idioms').map(i => ({ ...i, isUserAdded: true }))];
  const phrasal = [...defaultPhrasalVerbs, ...userVocab.filter(i => i.category === 'phrasal').map(i => ({ ...i, isUserAdded: true }))];
  const daily = [...defaultDailyVocab, ...userVocab.filter(i => i.category === 'daily').map(i => ({ ...i, isUserAdded: true }))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
          <Input
            placeholder="Search vocabulary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-3 border-black shadow-brutal-sm focus:shadow-brutal-md transition-all font-bold placeholder:text-zinc-400"
          />
        </div>

        {/* Add Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto font-black shadow-brutal-sm">
              <Plus className="w-5 h-5 mr-2" />
              Add Your Own
            </Button>
          </DialogTrigger>
          <DialogContent className="border-5 border-black shadow-brutal-lg max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">Add New Entry</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddWord} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label className="font-black uppercase text-xs">Category</Label>
                  <Select value={newCategory} onValueChange={(val: any) => setNewCategory(val)}>
                    <SelectTrigger className="border-3 border-black font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-black shadow-brutal-md">
                      <SelectItem value="idioms">Idioms</SelectItem>
                      <SelectItem value="phrasal">Phrasal Verbs</SelectItem>
                      <SelectItem value="daily">Daily Vocab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label className="font-black uppercase text-xs">Word / Phrase</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={newTerm}
                        onChange={e => setNewTerm(e.target.value)}
                        placeholder="Type a word..."
                        className="border-3 border-black font-bold"
                        required
                      />
                      {isSearching && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-3 border-black px-3 hover:bg-primary transition-all"
                      onClick={() => performLookup(newTerm)}
                      disabled={isSearching || newTerm.length < 2}
                      title="Manual Lookup"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-xs">Meaning</Label>
                <textarea
                  value={newMeaning}
                  onChange={e => setNewMeaning(e.target.value)}
                  className="w-full min-h-[80px] p-3 border-3 border-black rounded font-bold focus:shadow-brutal-sm transition-all focus:outline-none"
                  placeholder="Enter meaning (or wait for auto-lookup)..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-xs">Example Sentence</Label>
                <Input
                  value={newExample}
                  onChange={e => setNewExample(e.target.value)}
                  className="border-3 border-black font-bold"
                  placeholder="Example usage..."
                />
              </div>

              {newCategory === 'daily' && (
                <div className="space-y-2">
                  <Label className="font-black uppercase text-xs">Origin (Optional)</Label>
                  <Input
                    value={newOrigin}
                    onChange={e => setNewOrigin(e.target.value)}
                    className="border-3 border-black font-bold"
                    placeholder="e.g. Latin: ..."
                  />
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" className="w-full h-12 text-lg font-black uppercase shadow-brutal-sm hover:translate-y-[-2px] hover:shadow-brutal-md">
                  Add to Hub
                </Button>
                <p className="text-[10px] text-center mt-3 font-bold text-muted-foreground uppercase flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Enhanced lookup supports phrases and idioms
                </p>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="idioms" className="w-full">
        <TabsList className="bg-card border-3 border-border p-1 h-auto grid grid-cols-3 max-w-lg shadow-brutal-sm">
          <TabsTrigger
            value="idioms"
            className="data-[state=active]:bg-primary data-[state=active]:text-black border-2 border-transparent data-[state=active]:border-black font-black uppercase py-2 transition-all"
          >
            Idioms
          </TabsTrigger>
          <TabsTrigger
            value="phrasal"
            className="data-[state=active]:bg-secondary data-[state=active]:text-black border-2 border-transparent data-[state=active]:border-black font-black uppercase py-2 transition-all"
          >
            Phrasal
          </TabsTrigger>
          <TabsTrigger
            value="daily"
            className="data-[state=active]:bg-warning data-[state=active]:text-black border-2 border-transparent data-[state=active]:border-black font-black uppercase py-2 transition-all"
          >
            Daily
          </TabsTrigger>
        </TabsList>

        <TabsContent value="idioms" className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/50 text-xs font-bold rounded">
            <AlertCircle className="w-4 h-4" /> Commonly used expressions that carry a non-literal meaning.
          </div>
          <VocabList items={idioms} searchQuery={searchQuery} onDelete={handleDeleteUserWord} />
        </TabsContent>

        <TabsContent value="phrasal" className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-secondary/10 border-2 border-secondary/50 text-xs font-bold rounded">
            <AlertCircle className="w-4 h-4" /> Verb + preposition/adverb combinations with unique meanings.
          </div>
          <VocabList items={phrasal} searchQuery={searchQuery} onDelete={handleDeleteUserWord} />
        </TabsContent>

        <TabsContent value="daily" className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-warning/10 border-2 border-warning/50 text-xs font-bold rounded">
            <AlertCircle className="w-4 h-4" /> Advanced academic words to enhance your verbal score.
          </div>
          <VocabList items={daily} searchQuery={searchQuery} showOrigin onDelete={handleDeleteUserWord} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

