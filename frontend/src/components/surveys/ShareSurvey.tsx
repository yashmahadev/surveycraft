import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareSurveyProps {
  surveyId: string;
}

export function ShareSurvey({ surveyId }: ShareSurveyProps) {
  const { toast } = useToast();
  const [customSlug, setCustomSlug] = useState('');
  const baseUrl = window.location.origin;
  const defaultLink = `${baseUrl}/show/${surveyId}`;
  const customLink = customSlug ? `${baseUrl}/show/${customSlug}` : '';

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied!',
      description: 'Survey link copied to clipboard',
    });
  };

  const handleGenerateSlug = () => {
    // Generate a random 8-character slug
    const randomSlug = Math.random().toString(36).substring(2, 10);
    setCustomSlug(randomSlug);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Survey</CardTitle>
        <CardDescription>Share your survey with respondents using the links below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Default Link</Label>
          <div className="flex gap-2">
            <Input value={defaultLink} readOnly />
            <Button variant="outline" size="icon" onClick={() => handleCopyLink(defaultLink)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label>Custom Link</Label>
          <div className="flex gap-2">
            <Input
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              placeholder="Enter custom URL"
            />
            <Button
              variant="outline"
              onClick={handleGenerateSlug}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
          {customSlug && (
            <div className="flex gap-2">
              <Input value={customLink} readOnly />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopyLink(customLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div> */}
      </CardContent>
    </Card>
  );
}
