import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText } from 'lucide-react';

const mockResources = [
  {
    name: 'IPMAT Indore Official Mock',
    description: 'Official mock test from IIM Indore',
    link: '#',
    tag: 'Official'
  },
  {
    name: 'IPMAT Rohtak Official Mock',
    description: 'Official mock test from IIM Rohtak',
    link: '#',
    tag: 'Official'
  },
  {
    name: 'Career Launcher Free Mocks',
    description: 'High-quality mocks from Career Launcher',
    link: '#',
    tag: 'Premium'
  },
  {
    name: 'TIME Free Mock Series',
    description: 'Comprehensive mock tests from TIME',
    link: '#',
    tag: 'Popular'
  },
  {
    name: 'Testbook IPMAT Mocks',
    description: 'Free mock tests on Testbook platform',
    link: '#',
    tag: 'Free'
  }
];

export const FreeMocks = () => {
  return (
    <Card className="border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]">
      <CardHeader className="border-b-3 border-black bg-primary/10">
        <CardTitle className="text-2xl font-black uppercase tracking-wide flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Free Mocks
        </CardTitle>
        <CardDescription className="font-bold">
          Practice with high-quality mock tests
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {mockResources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border-2 border-black rounded bg-white hover:bg-primary/5 transition-all duration-200 hover:shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-foreground group-hover:text-primary transition-colors">
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
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
