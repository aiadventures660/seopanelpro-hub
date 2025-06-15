
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const AIInstagramBioRewriter = () => {
  const [bio, setBio] = useState('');
  const [rewrittenBio, setRewrittenBio] = useState('');
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (currentBio: string) => {
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: { 
          type: 'instagram-bio',
          prompt: currentBio 
        },
      });
      if (error) throw new Error(error.message);
      return data.generatedText;
    },
    onSuccess: (data) => {
      setRewrittenBio(data);
      toast({
        title: 'Bio Rewritten!',
        description: 'Your new AI-powered Instagram bio is ready.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: "Failed to rewrite bio. You might need to set up your OpenAI API key in Supabase.",
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const handleRewrite = () => {
    if (!bio.trim()) {
      toast({
        title: 'Uh oh!',
        description: 'Please enter your current bio first.',
        variant: 'destructive',
      });
      return;
    }
    mutate(bio);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Sparkles}
        title="AI Instagram Bio Rewriter"
        description="Let AI craft a compelling and engaging Instagram bio for you."
        gradient="bg-gradient-to-r from-pink-500 to-yellow-500"
      />
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your current bio or some keywords about you..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button onClick={handleRewrite} disabled={isPending} className="w-full">
                {isPending ? 'Rewriting...' : 'Rewrite Bio with AI'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isPending || rewrittenBio) && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your New Bio:</h3>
              {isPending ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{rewrittenBio}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default AIInstagramBioRewriter;
