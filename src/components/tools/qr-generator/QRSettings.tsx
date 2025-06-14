
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface QRSettingsProps {
  qrData: string;
  setQrData: (data: string) => void;
  qrType: string;
  setQrType: (type: string) => void;
  qrSize: number[];
  setQrSize: (size: number[]) => void;
  qrColor: string;
  setQrColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  onGenerate: () => void;
}

const QRSettings = ({
  qrData,
  setQrData,
  qrType,
  setQrType,
  qrSize,
  setQrSize,
  qrColor,
  setQrColor,
  bgColor,
  setBgColor,
  onGenerate
}: QRSettingsProps) => {
  const getPlaceholderText = () => {
    switch (qrType) {
      case 'url': return 'https://example.com';
      case 'email': return 'mailto:example@email.com';
      case 'phone': return '+1234567890';
      case 'wifi': return 'WIFI:T:WPA;S:NetworkName;P:Password;;';
      case 'sms': return 'sms:+1234567890:Hello World';
      default: return 'Enter your text here';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="qr-type">QR Code Type</Label>
          <Select value={qrType} onValueChange={setQrType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="wifi">WiFi</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="qr-data">Data</Label>
          <Textarea
            id="qr-data"
            placeholder={getPlaceholderText()}
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label>Size: {qrSize[0]}px</Label>
          <Slider
            value={qrSize}
            onValueChange={setQrSize}
            min={100}
            max={500}
            step={50}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="qr-color">QR Color</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="qr-color"
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="bg-color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={onGenerate}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Generate QR Code
        </Button>
      </CardContent>
    </Card>
  );
};

export default QRSettings;
