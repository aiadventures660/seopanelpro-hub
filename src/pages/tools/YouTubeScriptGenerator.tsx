
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Play, Clock } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const YouTubeScriptGenerator = () => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('5');
  const [style, setStyle] = useState('educational');
  const [targetAudience, setTargetAudience] = useState('');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScript = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const scriptTemplates = {
        educational: `
**HOOK (0-15 seconds)**
Did you know that ${topic} could completely change how you [relevant benefit]? In the next ${duration} minutes, I'm going to show you exactly how to master ${topic}, and by the end of this video, you'll have [specific outcome].

**INTRODUCTION (15-30 seconds)**
Hey everyone! Welcome back to [Channel Name]. If you're new here, I create content about [niche] to help ${targetAudience || 'people like you'} achieve [goal]. Today, we're diving deep into ${topic}.

**MAIN CONTENT (30 seconds - ${Math.floor(parseInt(duration) * 0.8)} minutes)**
Let's start with the basics. ${topic} is important because [reason 1], [reason 2], and [reason 3].

Here's the step-by-step process:

Step 1: [First actionable step]
- Explain why this matters
- Give specific examples
- Share common mistakes to avoid

Step 2: [Second actionable step]
- Provide detailed explanation
- Include practical tips
- Share your personal experience

Step 3: [Third actionable step]
- Break down the process
- Offer alternatives
- Address potential challenges

**CALL TO ACTION (Final 30 seconds)**
So there you have it - everything you need to know about ${topic}. Which of these strategies are you going to try first? Let me know in the comments below!

If this video helped you, smash that like button, subscribe for more content like this, and ring the notification bell so you never miss an update.

See you in the next video!
        `,
        entertaining: `
**HOOK (0-10 seconds)**
Okay, so ${topic}... Let me tell you a story that will blow your mind! 🤯

**INTRODUCTION (10-25 seconds)**
What's up, amazing humans! Welcome back to [Channel Name] where we make [niche] fun and actually interesting. Today we're talking about ${topic}, and trust me, this is NOT going to be boring.

**MAIN CONTENT (25 seconds - ${Math.floor(parseInt(duration) * 0.8)} minutes)**
So here's what happened... [Tell engaging story related to topic]

But seriously, let's break down ${topic}:

🎯 Point 1: [Explain with humor/personality]
🔥 Point 2: [Add entertaining examples]
⚡ Point 3: [Include relatable situations]

**CALL TO ACTION (Final 20 seconds)**
If you enjoyed this chaotic energy, PLEASE hit that subscribe button - it literally makes my day! Drop a comment with your thoughts about ${topic}.

Until next time, stay awesome! ✌️
        `,
        tutorial: `
**HOOK (0-10 seconds)**
In this tutorial, you'll learn exactly how to ${topic} step by step. No fluff, just practical results.

**INTRODUCTION (10-20 seconds)**
Hey everyone, welcome to [Channel Name]. Today's tutorial covers ${topic} - perfect for ${targetAudience || 'beginners and intermediate users'}.

**MAIN CONTENT (20 seconds - ${Math.floor(parseInt(duration) * 0.85)} minutes)**
What you'll need:
- [Tool/Resource 1]
- [Tool/Resource 2]
- [Tool/Resource 3]

Let's get started:

**Phase 1: Setup**
[Detailed instructions]

**Phase 2: Implementation**
[Step-by-step process]

**Phase 3: Optimization**
[Advanced tips and tricks]

**CONCLUSION (Final 15 seconds)**
That's how you master ${topic}! Subscribe for more tutorials and let me know what you'd like to learn next.
        `
      };
      
      const selectedScript = scriptTemplates[style as keyof typeof scriptTemplates];
      setScript(selectedScript.trim());
      setIsGenerating(false);
    }, 2500);
  };

  const copyScript = () => {
    navigator.clipboard.writeText(script);
  };

  const getEstimatedWords = () => {
    return Math.floor(parseInt(duration) * 150); // ~150 words per minute
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Play}
          title="YouTube Script Generator"
          description="Generate engaging scripts for your YouTube videos with proper structure"
          gradient="bg-gradient-to-r from-red-600 to-pink-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Script Settings</CardTitle>
            <CardDescription>
              Configure your video script parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="topic">Video Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., How to start a YouTube channel"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="duration">Video Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 minutes</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="style">Video Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertaining">Entertaining</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience (optional)</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., beginners, entrepreneurs"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Estimated words: ~{getEstimatedWords()}</span>
              </div>
            </div>
            
            <Button 
              onClick={generateScript} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating Script...</>
              ) : (
                'Generate YouTube Script'
              )}
            </Button>
          </CardContent>
        </Card>

        {script && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Script</CardTitle>
              <CardDescription>
                Your complete YouTube video script ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="script">Video Script</Label>
                <Textarea
                  id="script"
                  value={script}
                  readOnly
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Word count: {script.split(' ').length} words
                </div>
                <Button onClick={copyScript} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Script
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="youtubescriptgenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default YouTubeScriptGenerator;
