
import React, { useState, useEffect } from 'react';
import { Palette, Eye, CheckCircle, XCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ColorContrastChecker = () => {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [contrastRatio, setContrastRatio] = useState(null);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const calculateContrast = (color1, color2) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return null;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  useEffect(() => {
    const ratio = calculateContrast(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
  }, [foregroundColor, backgroundColor]);

  const getWCAGCompliance = (ratio) => {
    if (!ratio) return {};
    
    return {
      aaSmall: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaSmall: ratio >= 7,
      aaaLarge: ratio >= 4.5
    };
  };

  const compliance = getWCAGCompliance(contrastRatio);

  const ComplianceIndicator = ({ passes, label }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <span className="text-sm font-medium">{label}</span>
      {passes ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )}
    </div>
  );

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={Palette}
          title="Color Contrast Checker"
          description="Check color contrast ratios for web accessibility compliance"
          gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="foreground">Foreground Color (Text)</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="foreground"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border"
                    />
                    <Input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="background">Background Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="background"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg border-2 border-dashed border-gray-300"
                  style={{ 
                    backgroundColor: backgroundColor,
                    color: foregroundColor 
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">Sample Heading</h3>
                  <p className="mb-2">
                    This is normal text to test readability and contrast.
                  </p>
                  <p className="text-sm">
                    This is smaller text for testing minimum contrast requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {contrastRatio && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contrast Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">
                      {contrastRatio.toFixed(2)}:1
                    </div>
                    <Badge 
                      variant={contrastRatio >= 4.5 ? "default" : "destructive"}
                      className="text-lg px-4 py-2"
                    >
                      {contrastRatio >= 7 ? "AAA Compliant" : 
                       contrastRatio >= 4.5 ? "AA Compliant" : 
                       contrastRatio >= 3 ? "AA Large Compliant" : "Non-Compliant"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>WCAG Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ComplianceIndicator 
                    passes={compliance.aaLarge} 
                    label="AA Large Text (3:1)" 
                  />
                  <ComplianceIndicator 
                    passes={compliance.aaSmall} 
                    label="AA Normal Text (4.5:1)" 
                  />
                  <ComplianceIndicator 
                    passes={compliance.aaaLarge} 
                    label="AAA Large Text (4.5:1)" 
                  />
                  <ComplianceIndicator 
                    passes={compliance.aaaSmall} 
                    label="AAA Normal Text (7:1)" 
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Understanding WCAG Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">WCAG AA (Minimum)</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Normal text: 4.5:1 contrast ratio</li>
                    <li>• Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio</li>
                    <li>• Meets basic accessibility requirements</li>
                    <li>• Required by many accessibility laws</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">WCAG AAA (Enhanced)</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Normal text: 7:1 contrast ratio</li>
                    <li>• Large text: 4.5:1 contrast ratio</li>
                    <li>• Highest level of accessibility</li>
                    <li>• Recommended for critical applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default ColorContrastChecker;
