
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Type, Check } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const InstagramFontGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fontStyles = [
    { name: 'Bold', transform: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
      const bold = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const index = normal.indexOf(char);
      return index !== -1 ? bold[index] : char;
    })},
    { name: 'Italic', transform: (text: string) => text.replace(/[a-zA-Z]/g, (char) => {
      const italic = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const index = normal.indexOf(char);
      return index !== -1 ? italic[index] : char;
    })},
    { name: 'Monospace', transform: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
      const mono = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const index = normal.indexOf(char);
      return index !== -1 ? mono[index] : char;
    })},
    { name: 'Sans-serif', transform: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
      const sans = '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const index = normal.indexOf(char);
      return index !== -1 ? sans[index] : char;
    })},
    { name: 'Double-struck', transform: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
      const double = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const index = normal.indexOf(char);
      return index !== -1 ? double[index] : char;
    })},
    { name: 'Circled', transform: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
      const circled = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const index = normal.indexOf(char);
      return index !== -1 ? circled[index] : char;
    })},
    { name: 'Squared', transform: (text: string) => text.replace(/[a-zA-Z]/g, (char) => {
      const squared = '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const index = normal.indexOf(char);
      return index !== -1 ? squared[index] : char;
    })},
    { name: 'Inverted', transform: (text: string) => text.replace(/[a-zA-Z]/g, (char) => {
      const inverted = '∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMXʎZɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz';
      const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const index = normal.indexOf(char);
      return index !== -1 ? inverted[index] : char;
    })}
  ];

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Type}
          title="Instagram Font Generator (Fancy Text)"
          description="Transform your text into stylish fonts for Instagram bios, captions, and stories"
          gradient="bg-gradient-to-r from-pink-600 to-purple-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
            <CardDescription>
              Type any text to see it transformed into different stylish fonts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="inputText">Text to Transform</Label>
              <Input
                id="inputText"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {inputText && (
          <div className="space-y-4">
            {fontStyles.map((style, index) => {
              const transformedText = style.transform(inputText);
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          {style.name}
                        </div>
                        <div className="text-lg font-mono break-all bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          {transformedText}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyText(transformedText, index)}
                        className="shrink-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1" />
                        )}
                        {copiedIndex === index ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default InstagramFontGenerator;
