import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    LayoutDashboard,
    Calculator,
    BookOpen,
    BarChart3,
    CheckSquare,
    PenLine,
    Moon,
    Sun,
    Search,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CommandOption {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    keywords?: string[];
}

export const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    // Keyboard shortcut handler
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const navigationCommands: CommandOption[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <LayoutDashboard className="w-4 h-4" />,
            action: () => navigate('/'),
            keywords: ['home', 'overview'],
        },
        {
            id: 'quant-vault',
            label: 'Quant Vault',
            icon: <Calculator className="w-4 h-4" />,
            action: () => navigate('/quant-vault'),
            keywords: ['formulas', 'math', 'quantitative'],
        },
        {
            id: 'vocab-hub',
            label: 'Vocab Hub',
            icon: <BookOpen className="w-4 h-4" />,
            action: () => navigate('/vocab-hub'),
            keywords: ['words', 'vocabulary', 'verbal'],
        },
        {
            id: 'progress',
            label: 'Progress Tracker',
            icon: <BarChart3 className="w-4 h-4" />,
            action: () => navigate('/progress'),
            keywords: ['syllabus', 'completion', 'tracking'],
        },
        {
            id: 'mock-scores',
            label: 'Mock Scores',
            icon: <CheckSquare className="w-4 h-4" />,
            action: () => navigate('/mock-scores'),
            keywords: ['tests', 'exams', 'scores'],
        },
        {
            id: 'daily-log',
            label: 'Daily Log',
            icon: <PenLine className="w-4 h-4" />,
            action: () => navigate('/daily-log'),
            keywords: ['journal', 'reflections', 'notes'],
        },
    ];

    const actionCommands: CommandOption[] = [
        {
            id: 'toggle-theme',
            label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
            icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
            action: () => {
                toggleTheme();
                setOpen(false);
            },
            keywords: ['theme', 'appearance', 'dark', 'light'],
        },
    ];

    const handleSelect = useCallback((action: () => void) => {
        setOpen(false);
        action();
    }, []);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Navigation">
                    {navigationCommands.map((cmd) => (
                        <CommandItem
                            key={cmd.id}
                            onSelect={() => handleSelect(cmd.action)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            {cmd.icon}
                            <span>{cmd.label}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Actions">
                    {actionCommands.map((cmd) => (
                        <CommandItem
                            key={cmd.id}
                            onSelect={() => handleSelect(cmd.action)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            {cmd.icon}
                            <span>{cmd.label}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
