
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Video, Sparkles } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const TikTokCaptionGenerator = () => {
  const [videoTopic, setVideoTopic] = useState('');
  const [mood, setMood] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = ['Funny', 'Inspirational', 'Educational', 'Trendy', 'Mysterious', 'Dramatic'];

  const generateCaptions = () => {
    if (!videoTopic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const captionTemplates = [
        `POV: You finally learned ${videoTopic} 💯\n\n${mood === 'Funny' ? '😂 Why didn\'t anyone tell me this sooner?' : mood === 'Inspirational' ? '✨ Never stop learning and growing' : 'Drop a 🔥 if you learned something new!'}\n\n#${videoTopic.replace(/\s+/g, '')} #fyp #viral #learning`,
        
        `This ${videoTopic} hack will blow your mind! 🤯\n\n${mood === 'Educational' ? 'Save this for later! 📚' : mood === 'Trendy' ? 'Everyone needs to see this! 👀' : 'Trust me on this one 💪'}\n\n#lifehack #tips #${videoTopic.replace(/\s+/g, '')} #foryou`,
        
        `Watch me ${videoTopic} in 60 seconds ⏰\n\n${mood === 'Dramatic' ? 'The transformation is UNREAL 😱' : mood === 'Mysterious' ? 'The secret ingredient is... 👀' : 'Follow for more content like this! 💝'}\n\n#tutorial #howto #${videoTopic.replace(/\s+/g, '')} #trending`,
        
        `${mood === 'Funny' ? 'Me trying to' : 'When you finally master'} ${videoTopic} ${mood === 'Funny' ? '😅' : '✨'}\n\n${targetAudience ? `Calling all ${targetAudience}! 📢` : 'Tag someone who needs to see this! 👇'}\n\n#relatable #${videoTopic.replace(/\s+/g, '')} #viral #fyp`,
        
        `${mood === 'Inspirational' ? 'Reminder:' : 'Fun fact:'} ${videoTopic} can change everything! 🌟\n\n${mood === 'Inspirational' ? 'You\'re capable of amazing things ✨' : 'Mind = blown 🤯'}\n\n#motivation #inspiration #${videoTopic.replace(/\s+/g, '')} #positivity`
      ];
      
      setCaptions(captionTemplates);
      setIsGenerating(false);
    }, 2000);
  };

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Video}
          title="TikTok Caption Ideas Generator"
          description="Generate engaging and viral-worthy captions for your TikTok videos"
          gradient="bg-gradient-to-r from-pink-500 to-red-500"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>
              Tell us about your video to generate personalized captions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="videoTopic">Video Topic *</Label>
              <Input
                id="videoTopic"
                placeholder="e.g., cooking, dancing, DIY, makeup tutorial"
                value={videoTopic}
                onChange={(e) => setVideoTopic(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="mood">Mood/Tone</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {moods.map((moodOption) => (
                  <Badge
                    key={moodOption}
                    variant={mood === moodOption ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setMood(moodOption)}
                  >
                    {moodOption}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="targetAudience">Target Audience (optional)</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., students, parents, fitness enthusiasts"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            <Button 
              onClick={generateCaptions} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Caption Ideas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {captions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Captions</CardTitle>
              <CardDescription>
                Choose the caption that best fits your video style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {captions.map((caption, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">Caption {index + 1}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyCaption(caption)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={caption}
                      readOnly
                      rows={6}
                      className="text-sm bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="tiktokcaptiongenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default TikTokCaptionGenerator;
