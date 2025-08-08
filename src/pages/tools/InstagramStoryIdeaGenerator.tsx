
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const InstagramStoryIdeaGenerator = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (prompt: string) => {
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: { type: 'instagram-story-ideas', prompt },
      });
      if (error) throw new Error(error.message);
      return JSON.parse(data.generatedText);
    },
    onSuccess: (data: string[]) => {
      setIdeas(data);
      toast({
        title: 'Ideas Generated!',
        description: 'Here are some fresh ideas for your Instagram stories.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: "Failed to generate ideas. You may need to set up your OpenAI API key.",
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const handleGenerate = () => {
    mutate(topic || 'general topics');
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Camera}
        title="Instagram Story Idea Generator"
        description="Never run out of ideas for your Instagram stories again."
        gradient="bg-gradient-to-r from-purple-500 to-pink-500"
      />
      <div className="max-w-2xl mx-auto text-center space-y-6">
         <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-gray-600 dark:text-gray-300">Enter a topic for your stories, or leave it blank for general ideas.</p>
            <div className="flex gap-4">
              <Input 
                placeholder="e.g., fitness, travel, cooking" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <Button onClick={handleGenerate} disabled={isPending} className="w-1/3">
                {isPending ? 'Generating...' : 'Get Ideas'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isPending || ideas.length > 0) && (
          <Card className="text-left">
            <CardHeader>
              <CardTitle>Your Story Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
                </div>
              ) : (
                <ul className="space-y-2 list-disc list-inside">
                  {ideas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="instagramstoryideagenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default InstagramStoryIdeaGenerator;
