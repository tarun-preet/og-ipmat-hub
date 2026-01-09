import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Youtube } from 'lucide-react';

const videoResources = [
    {
        channel: 'Arithmetic — Concept Builder',
        description: 'Concept builder playlist for Arithmetic',
        link: 'https://youtube.com/playlist?list=PLLtQdEJkug7sF3btK_VQMe_WziFb78rj_&si=Ot9cWsaAlNg990RB',
        tag: 'Arithmetic'
    },
    {
        channel: 'Arithmetic Marathon',
        description: 'Extended arithmetic practice session',
        link: 'https://www.youtube.com/live/ZQNQ64QrbyQ?si=H1ul8iPT51yJD4p0',
        tag: 'Arithmetic'
    },
    {
        channel: 'Number System — One Shot',
        description: 'One-shot number system foundation session',
        link: 'https://www.youtube.com/live/SIbsSC1rDDM?si=L3UAJAUshFXnrS9k',
        tag: 'Number System'
    },
    {
        channel: 'Sequence & Series (Algebra)',
        description: 'Live session on sequences and series',
        link: 'https://www.youtube.com/live/ZbpePu2KDKY?si=gySZHRdVhx6v0Z9C',
        tag: 'Algebra'
    },
    {
        channel: 'Functions — Playlist',
        description: 'Functions playlist covering concepts and problems',
        link: 'https://youtube.com/playlist?list=PL0mYHq-OUsNqAP1a82BRVCUrBIgNkrTLD&si=CyVknpubw3U70Tyv',
        tag: 'Algebra'
    },
    {
        channel: 'Modulus',
        description: 'Video on modulus problems and tricks',
        link: 'https://youtu.be/Sz-IdGBH2mc?si=KUqGt6Kjq6ZXFAkc',
        tag: 'Algebra'
    },
    {
        channel: 'Inequalities',
        description: 'Inequalities live session',
        link: 'https://www.youtube.com/live/zObnZBECO74?si=MCLJCzy7xVFraFlr',
        tag: 'Algebra'
    },
    {
        channel: 'Quadratic Equations — Playlist',
        description: 'Playlist covering quadratic equations',
        link: 'https://youtube.com/playlist?list=PL0mYHq-OUsNrRvyjP0y2PrRusG__Tn3xG&si=yKZokml03_5Y2_DP',
        tag: 'Algebra'
    },
    {
        channel: 'Identities',
        description: 'Live session covering algebraic identities',
        link: 'https://www.youtube.com/live/q3Zmi5BDigQ?si=k0kle-oF7307UzUk',
        tag: 'Algebra'
    },
    {
        channel: 'Geometry — Full Playlist',
        description: 'Comprehensive geometry playlist',
        link: 'https://youtube.com/playlist?list=PL0NRRcddIX2d3oij6M7QQIx8-_xV_gsk2&si=WzIBSv_Ok3i53pEI',
        tag: 'Geometry'
    },
    {
        channel: 'Logarithms — Playlist',
        description: 'Logarithm concepts and problems',
        link: 'https://youtube.com/playlist?list=PL0mYHq-OUsNr5CFEp38l6FwUkI8hojLK8&si=TvoBkpq9so7MSTT7',
        tag: 'Modern Maths'
    },
    {
        channel: 'Permutation & Combination',
        description: 'Live session on permutation and combination',
        link: 'https://www.youtube.com/live/I8UUAC5gXU8?si=OZX1kvs4qOh4d6uC',
        tag: 'Modern Maths'
    },
    {
        channel: 'Set Theory',
        description: 'Video on set theory fundamentals',
        link: 'https://youtu.be/5ZhNmKb-dqk?si=TXVEdRkS1XmuH5j9',
        tag: 'Modern Maths'
    },
    {
        channel: 'Matrices',
        description: 'Matrices live session',
        link: 'https://www.youtube.com/live/XL63EGKUyA4?si=ErZiy5Pjc8ZSqGOw',
        tag: 'Modern Maths'
    },
    {
        channel: 'Determinants',
        description: 'Determinants and related techniques',
        link: 'https://www.youtube.com/live/uisqPNBx3So?si=5pkuslvsnmu8qiT-',
        tag: 'Modern Maths'
    },
    {
        channel: 'Probability',
        description: 'Probability session covering key ideas',
        link: 'https://www.youtube.com/live/sYTW-mvxcOk?si=AT3TGVGKYNwqdzMC',
        tag: 'Modern Maths'
    },
    {
        channel: 'Binomial Theorem',
        description: 'Binomial theorem techniques and examples',
        link: 'https://www.youtube.com/live/YrwNkbHnkC8?si=n_pwYAeyQQQ2CIgj',
        tag: 'Modern Maths'
    },
    {
        channel: "Rodha's CAT Playlist",
        description: 'Advanced formulas and CAT tricks (Rodha)',
        link: 'https://youtube.com/playlist?list=PLG4bwc5fquzgfMh4YFDnv7fttM0RIKiUQ&si=BLYVOPh4ptbQw3su',
        tag: 'Advanced'
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
