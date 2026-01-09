import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Youtube } from 'lucide-react';

const videoResources = [
    {
        channel: 'Rodha',
        description: 'Complete IPMAT preparation strategy',
        link: '#',
        tag: 'Strategy'
    },
    {
        channel: 'Unacademy IPMAT',
        description: 'Topic-wise concepts and problem solving',
        link: '#',
        tag: 'Concepts'
    },
    {
        channel: 'Career Launcher',
        description: 'Mock analysis and tips',
        link: '#',
        tag: 'Analysis'
    },
    {
        channel: 'Quantifiers',
        description: 'Quant shortcuts and techniques',
        link: '#',
        tag: 'Quant'
    },
    {
        channel: 'MBA Wallah',
        description: 'Complete course for IPMAT',
        link: '#',
        tag: 'Full Course'
    }
];

export const YTVideos = () => {
    return (
        <Card className="border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]">
            <CardHeader className="border-b-3 border-black bg-secondary/10">
                <CardTitle className="text-2xl font-black uppercase tracking-wide flex items-center gap-2">
                    <Youtube className="w-6 h-6" />
                    YT Videos
                </CardTitle>
                <CardDescription className="font-bold">
                    Best YouTube channels for IPMAT prep
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-3">
                    {videoResources.map((resource, index) => (
                        <a
                            key={index}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 border-2 border-black rounded bg-white hover:bg-secondary/5 transition-all duration-200 hover:shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-black text-foreground group-hover:text-secondary transition-colors">
                                            {resource.channel}
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
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0 mt-1" />
                            </div>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
