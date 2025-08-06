
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, Instagram, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allTools } from '@/data/tools';

const InstagramBioGenerator = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [interests, setInterests] = useState('');
  const [style, setStyle] = useState('professional');
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const bioTemplates = {
    professional: [
      "{profession} | {interests} 💼\n✨ Turning ideas into reality\n📍 Based in [Location]\n👇 Let's connect!",
      "{name} • {profession}\n🎯 {interests}\n💡 Sharing insights & inspiration\n📧 DM for collaborations",
      "🚀 {profession}\n💻 Passionate about {interests}\n🌟 Creating value through innovation\n📲 Let's grow together!",
      "{profession} with a passion for {interests}\n✅ Helping others succeed\n🔗 Link in bio for resources\n💬 Always open to chat"
    ],
    creative: [
      "✨ {name} ✨\n🎨 {profession} living the creative life\n💫 {interests} enthusiast\n🌈 Making magic happen daily ✨",
      "🎭 Creative {profession}\n🌟 Obsessed with {interests}\n💖 Spreading good vibes only\n🦄 Living my best life ✨",
      "🎨 {name} | Artist & Dreamer\n✨ {profession} by day, creator by night\n🌙 {interests} + coffee = happiness\n💝 Follow for daily inspiration",
      "🌸 {profession} with a creative soul\n🎪 {interests} makes me happy\n✨ Chasing dreams & sunsets\n🦋 Be your own kind of beautiful"
    ],
    casual: [
      "Hey! I'm {name} 👋\n{profession} who loves {interests}\nJust sharing my journey\nCoffee addict ☕",
      "{name} here!\n{profession} | {interests} lover\nKeeping it real and simple\nLet's be friends! 😊",
      "👋 {profession} from [somewhere]\nReally into {interests}\nSharing random thoughts\nAlways down for good conversation",
      "Just {name} doing {name} things\n{profession} life\n{interests} enthusiast\nLiving one day at a time ✌️"
    ],
    motivational: [
      "💪 {name} | {profession}\n🎯 Focused on {interests}\n🚀 Every day is a new opportunity\n💯 Believe in yourself!",
      "{profession} on a mission 🎯\n✨ {interests} + determination = success\n🔥 Never give up on your dreams\n💪 Let's achieve greatness together!",
      "🌟 {name} • Dream Chaser\n💼 {profession} | 🎯 {interests}\n🚀 Turning obstacles into opportunities\n💯 Your only limit is you!",
      "⚡ {profession} with big goals\n🎯 {interests} drives my passion\n🔥 Success is a journey, not destination\n💪 Keep pushing forward!"
    ]
  };

  const generateBios = () => {
    if (!name.trim() || !profession.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your name and profession.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const templates = bioTemplates[style as keyof typeof bioTemplates];
      const bios = templates.map(template => {
        let bio = template.replace(/\{name\}/g, name);
        bio = bio.replace(/\{profession\}/g, profession);
        bio = bio.replace(/\{interests\}/g, interests || 'life');
        return bio;
      });

      setGeneratedBios(bios);
      setIsGenerating(false);
    }, 1000);
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Copied!",
      description: "Bio copied to clipboard."
    });
  };

  const getCharacterCount = (text: string) => {
    return text.length;
  };

  const getStyleIcon = (styleType: string) => {
    switch (styleType) {
      case 'professional': return '💼';
      case 'creative': return '🎨';
      case 'casual': return '😊';
      case 'motivational': return '💪';
      default: return '✨';
    }
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Instagram}
        title="Instagram Bio Generator"
        description="Create engaging Instagram bio text with emojis and styling that represents your personality"
        gradient="bg-gradient-to-r from-pink-500 to-purple-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Bio</CardTitle>
            <CardDescription>
              Fill in your details to generate personalized Instagram bios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex Johnson"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="profession">Profession/Role *</Label>
              <Input
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="e.g., Designer, Entrepreneur, Student"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="interests">Interests/Hobbies</Label>
              <Input
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., travel, photography, fitness"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                What you're passionate about
              </p>
            </div>

            <div>
              <Label htmlFor="style">Bio Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">💼 Professional</SelectItem>
                  <SelectItem value="creative">🎨 Creative</SelectItem>
                  <SelectItem value="casual">😊 Casual</SelectItem>
                  <SelectItem value="motivational">💪 Motivational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateBios} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Bios
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Bios</CardTitle>
            <CardDescription>
              Click any bio to copy it to your clipboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedBios.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Instagram className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generated bios will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedBios.map((bio, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
                    onClick={() => copyBio(bio)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {getStyleIcon(style)} {style}
                      </Badge>
                      <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                    </div>
                    <div className="whitespace-pre-line text-sm font-medium mb-2">
                      {bio}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={getCharacterCount(bio) > 150 ? "destructive" : "secondary"} 
                        className="text-xs"
                      >
                        {getCharacterCount(bio)}/150 characters
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Instagram Bio Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Character Limits</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Instagram allows up to 150 characters</li>
                <li>• Keep it concise and impactful</li>
                <li>• Use line breaks for readability</li>
                <li>• Include relevant emojis sparingly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Engagement Tips</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Include a call-to-action</li>
                <li>• Add your location if relevant</li>
                <li>• Use keywords for discoverability</li>
                <li>• Update regularly to stay fresh</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <RelatedTools 
        currentToolId="instagram-bio-generator"
        currentCategory="Social Media"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default InstagramBioGenerator;
