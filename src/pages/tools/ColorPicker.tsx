
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Palette, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [colorFormats, setColorFormats] = useState({
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
    cmyk: 'cmyk(76%, 47%, 0%, 4%)'
  });
  const [palette, setPalette] = useState<string[]>([]);
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateColorFormats = (color: string) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

      setColorFormats({
        hex: color.toUpperCase(),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
      });
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateColorFormats(color);
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    handleColorChange(randomColor);
  };

  const generatePalette = () => {
    const baseRgb = hexToRgb(selectedColor);
    if (!baseRgb) return;

    const colors = [];
    
    // Generate complementary colors
    for (let i = 0; i < 5; i++) {
      const factor = 0.2 + (i * 0.2);
      const r = Math.round(baseRgb.r * factor);
      const g = Math.round(baseRgb.g * factor);
      const b = Math.round(baseRgb.b * factor);
      colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    }

    // Generate lighter shades
    for (let i = 1; i <= 3; i++) {
      const factor = 1 + (i * 0.3);
      const r = Math.min(255, Math.round(baseRgb.r * factor));
      const g = Math.min(255, Math.round(baseRgb.g * factor));
      const b = Math.min(255, Math.round(baseRgb.b * factor));
      colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    }

    setPalette(colors);
    toast({
      title: "Palette Generated",
      description: "Color palette has been generated based on your selected color"
    });
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${format} color code copied to clipboard`
    });
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Palette}
        title="Color Picker & Palette Generator"
        description="Pick colors, convert between formats, and generate color palettes for your designs"
        gradient="bg-gradient-to-r from-pink-600 to-purple-600"
      />

      <div className="grid gap-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div 
                  className="w-32 h-32 rounded-lg border-4 border-gray-200 dark:border-gray-700 mx-auto mb-4"
                  style={{ backgroundColor: selectedColor }}
                />
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-20 h-12 mx-auto"
                />
              </div>

              <Button 
                onClick={generateRandomColor} 
                variant="outline" 
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Random Color
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(colorFormats).map(([format, value]) => (
                  <div key={format} className="flex items-center gap-2">
                    <Label className="w-12 text-sm font-medium uppercase">
                      {format}
                    </Label>
                    <Input
                      value={value}
                      readOnly
                      className="flex-1 bg-gray-50 dark:bg-gray-800"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(value, format.toUpperCase())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Color Palette Generator
              <Button onClick={generatePalette}>
                Generate Palette
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {palette.length > 0 ? (
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => copyToClipboard(color, 'HEX')}
                  >
                    <div
                      className="w-full h-16 rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs text-center mt-2 font-mono">{color}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Generate Palette" to create a color palette</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Color Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">HEX</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Hexadecimal color notation used in web development. Format: #RRGGBB
                </p>
                
                <h4 className="font-medium mb-2">RGB</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Red, Green, Blue values from 0-255. Commonly used in digital displays.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">HSL</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Hue, Saturation, Lightness. More intuitive for color manipulation.
                </p>
                
                <h4 className="font-medium mb-2">CMYK</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cyan, Magenta, Yellow, Key (Black). Used in print design.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <RelatedTools 
          currentToolId="color-picker"
          currentCategory="Utility"
          allTools={allTools}
        />
      </div>
    </ToolPageLayout>
  );
};

export default ColorPicker;
