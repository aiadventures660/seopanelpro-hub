
import React, { useState } from 'react';
import { SmilePlus } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const memeTemplates = [
  { name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
  { name: 'Drake Hotline Bling', url: 'https://i.imgflip.com/30b1gx.jpg' },
  { name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
  { name: 'Change My Mind', url: 'https://i.imgflip.com/2c5d1w.jpg' },
];

const MemeTextGenerator = () => {
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0]);
  
  const handleTemplateChange = (value: string) => {
      const template = memeTemplates.find(t => t.name === value);
      if (template) setSelectedTemplate(template);
  }

  const handleDownload = () => {
    alert("Please take a screenshot to save your meme!");
  }

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={SmilePlus}
        title="Meme Text Generator"
        description="Create your own custom memes in seconds."
        gradient="bg-gradient-to-r from-green-400 to-blue-500"
      />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium">Meme Template</label>
              <Select onValueChange={handleTemplateChange} defaultValue={selectedTemplate.name}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a meme" />
                </SelectTrigger>
                <SelectContent>
                  {memeTemplates.map(template => (
                    <SelectItem key={template.name} value={template.name}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Top Text</label>
              <Input placeholder="Top text" value={topText} onChange={e => setTopText(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Bottom Text</label>
              <Input placeholder="Bottom text" value={bottomText} onChange={e => setBottomText(e.target.value)} />
            </div>
             <Button onClick={handleDownload} className="w-full">Save Meme</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Meme</h3>
            <div className="relative" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
              <img src={selectedTemplate.url} alt={selectedTemplate.name} className="w-full h-auto" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-full px-2 text-center text-white text-3xl md:text-5xl font-extrabold uppercase" style={{ WebkitTextStroke: '2px black', textShadow: '2px 2px 4px #000' }}>
                {topText}
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full px-2 text-center text-white text-3xl md:text-5xl font-extrabold uppercase" style={{ WebkitTextStroke: '2px black', textShadow: '2px 2px 4px #000' }}>
                {bottomText}
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-500">Take a screenshot to save your meme!</p>
          </CardContent>
        </Card>
      </div>

      <RelatedTools 
        currentToolId="memetextgenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default MemeTextGenerator;
