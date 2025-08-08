
import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const RedditPostTitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (postTopic: string) => {
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: { type: 'reddit-title', prompt: postTopic },
      });
      if (error) throw new Error(error.message);
      return JSON.parse(data.generatedText);
    },
    onSuccess: (data: string[]) => {
      setTitles(data);
      toast({
        title: 'Titles Generated!',
        description: 'Your catchy Reddit post titles are ready.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: "Failed to generate titles. You may need to set up your OpenAI API key.",
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: 'Uh oh!',
        description: 'Please enter a topic for your post.',
        variant: 'destructive',
      });
      return;
    }
    mutate(topic);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Rocket}
        title="Reddit Post Title Generator"
        description="Craft viral-worthy titles for your Reddit posts."
        gradient="bg-gradient-to-r from-orange-500 to-red-500"
      />
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter a topic or keywords for your post..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <Button onClick={handleGenerate} disabled={isPending}>
                {isPending ? 'Generating...' : 'Generate Titles'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isPending || titles.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Titles</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}
                </div>
              ) : (
                <ul className="space-y-3">
                  {titles.map((title, index) => (
                    <li key={index} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="redditposttitlegenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default RedditPostTitleGenerator;
