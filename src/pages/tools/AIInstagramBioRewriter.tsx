
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useAIGeneration } from '@/hooks/useAIGeneration';

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

  const { generate, isGenerating } = useAIGeneration({
    type: 'instagram-bio',
    onSuccess: (data) => setRewrittenBio(data),
  });

  const handleRewrite = () => {
    if (!bio.trim()) return;
    generate(bio);
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
              <Button onClick={handleRewrite} disabled={isGenerating} className="w-full">
                {isGenerating ? 'Rewriting...' : 'Rewrite Bio with AI'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isGenerating || rewrittenBio) && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your New Bio:</h3>
              {isGenerating ? (
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
