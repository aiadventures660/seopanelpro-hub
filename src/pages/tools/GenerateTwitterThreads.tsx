
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const GenerateTwitterThreads = () => {
  const [content, setContent] = useState('');
  const [thread, setThread] = useState<string[]>([]);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (sourceContent: string) => {
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: { type: 'twitter-thread', prompt: sourceContent },
      });
      if (error) throw new Error(error.message);
      return JSON.parse(data.generatedText);
    },
    onSuccess: (data: string[]) => {
      setThread(data);
      toast({
        title: 'Thread Generated!',
        description: 'Your Twitter thread is ready to be posted.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: "Failed to generate thread. You may need to set up your OpenAI API key.",
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const handleGenerate = () => {
    if (!content.trim()) {
      toast({
        title: 'Uh oh!',
        description: 'Please paste your blog post or content first.',
        variant: 'destructive',
      });
      return;
    }
    mutate(content);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={MessageSquare}
        title="Twitter Thread Generator"
        description="Turn any article or long text into an engaging Twitter thread."
        gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <Textarea
              placeholder="Paste your blog post, article, or any long text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="resize-y"
            />
            <Button onClick={handleGenerate} disabled={isPending} className="w-full mt-4">
              {isPending ? 'Generating Thread...' : 'Generate Twitter Thread'}
            </Button>
          </CardContent>
        </Card>

        {(isPending || thread.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Twitter Thread</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {thread.map((tweet, index) => (
                    <div key={index}>
                      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="whitespace-pre-wrap">{tweet}</p>
                        <p className="text-right text-sm text-gray-500 mt-2">{index + 1}/{thread.length}</p>
                      </div>
                      {index < thread.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="generatetwitterthreads"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default GenerateTwitterThreads;
