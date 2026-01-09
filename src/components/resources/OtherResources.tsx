import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Lightbulb } from 'lucide-react';

const otherResources = [
    {
        name: 'IPMAT Official Website',
        description: 'Official information and updates',
        link: '#',
        tag: 'Official'
    },
    {
        name: 'Previous Year Papers',
        description: 'Download PYQs for practice',
        link: '#',
        tag: 'PYQs'
    },
    {
        name: 'IPMAT Telegram Groups',
        description: 'Join active study communities',
        link: '#',
        tag: 'Community'
    },
    {
        name: 'Study Material PDFs',
        description: 'Free downloadable study materials',
        link: '#',
        tag: 'Study Material'
    },
    {
        name: 'Exam Pattern & Syllabus',
        description: 'Complete exam structure guide',
        link: '#',
        tag: 'Guide'
    },
    {
        name: 'Cut-off Trends',
        description: 'Historical cut-off analysis',
        link: '#',
        tag: 'Analysis'
    }
];

export const OtherResources = () => {
    return (
        <Card className="border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]">
            <CardHeader className="border-b-3 border-black bg-accent/10">
                <CardTitle className="text-2xl font-black uppercase tracking-wide flex items-center gap-2">
                    <Lightbulb className="w-6 h-6" />
                    Other Essential Resources
                </CardTitle>
                <CardDescription className="font-bold">
                    Additional resources to ace IPMAT
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-3">
                    {otherResources.map((resource, index) => (
                        <a
                            key={index}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 border-2 border-black rounded bg-white hover:bg-accent/5 transition-all duration-200 hover:shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-black text-foreground group-hover:text-accent-foreground transition-colors">
                                            {resource.name}
                                        </h3>
                                        <Badge
                                            variant="outline"
                                            className="border-2 border-black font-bold uppercase text-xs"
                                        >
                                            {resource.tag}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium">
                                        {resource.description}
                                    </p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors flex-shrink-0 mt-1" />
                            </div>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
