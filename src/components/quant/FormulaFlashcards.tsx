import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

interface Formula {
    name: string;
    latex: string;
    description?: string;
}

interface FormulaFlashcardsProps {
    formulas: Formula[];
}

export const FormulaFlashcards = ({ formulas }: FormulaFlashcardsProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [masteredFormulas, setMasteredFormulas] = useState<Set<number>>(new Set());

    const currentFormula = formulas[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % formulas.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + formulas.length) % formulas.length);
    };

    const handleShuffle = () => {
        setIsFlipped(false);
        const randomIndex = Math.floor(Math.random() * formulas.length);
        setCurrentIndex(randomIndex);
    };

    const toggleMastered = () => {
        const newMastered = new Set(masteredFormulas);
        if (newMastered.has(currentIndex)) {
            newMastered.delete(currentIndex);
        } else {
            newMastered.add(currentIndex);
        }
        setMasteredFormulas(newMastered);
    };

    if (!formulas || formulas.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No formulas available for flashcards
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-muted-foreground">
                    Card {currentIndex + 1} of {formulas.length}
                </span>
                <span className="text-primary">
                    {masteredFormulas.size} / {formulas.length} Mastered
                </span>
            </div>

            {/* Flashcard */}
            <div
                className="relative h-96 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <Card
                    className={cn(
                        "absolute w-full h-full transition-all duration-500 transform-style-3d shadow-brutal-lg border-3 border-border",
                        isFlipped && "rotate-y-180"
                    )}
                >
                    {/* Front - Formula Name */}
                    <CardContent
                        className={cn(
                            "h-full flex flex-col items-center justify-center p-8 backface-hidden",
                            isFlipped && "hidden"
                        )}
                    >
                        <div className="text-sm font-bold text-primary uppercase mb-4">Formula</div>
                        <h2 className="text-3xl font-black text-center mb-4">
                            {currentFormula.name}
                        </h2>
                        {currentFormula.description && (
                            <p className="text-muted-foreground text-center text-sm max-w-md">
                                {currentFormula.description}
                            </p>
                        )}
                        <div className="mt-8 text-xs text-muted-foreground uppercase tracking-wide">
                            Click to reveal formula
                        </div>
                    </CardContent>

                    {/* Back - Formula */}
                    <CardContent
                        className={cn(
                            "h-full flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180",
                            !isFlipped && "hidden"
                        )}
                    >
                        <div className="text-sm font-bold text-secondary uppercase mb-6">Solution</div>
                        <div className="text-2xl text-center overflow-auto max-h-64 w-full">
                            <Latex>{currentFormula.latex}</Latex>
                        </div>
                        <div className="mt-8 text-xs text-muted-foreground uppercase tracking-wide">
                            Click to flip back
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
                <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="font-bold border-3"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                    onClick={handleShuffle}
                    variant="outline"
                    className="font-bold border-3 flex-1"
                >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle
                </Button>

                <Button
                    onClick={toggleMastered}
                    variant={masteredFormulas.has(currentIndex) ? "default" : "outline"}
                    className="font-bold border-3 flex-1"
                >
                    {masteredFormulas.has(currentIndex) ? '✓ Mastered' : 'Mark as Mastered'}
                </Button>

                <Button
                    onClick={handleNext}
                    variant="outline"
                    className="font-bold border-3"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};
