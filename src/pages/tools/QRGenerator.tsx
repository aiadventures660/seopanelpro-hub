
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { QrCode, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const QRGenerator = () => {
  const [qrData, setQrData] = useState('');
  const [qrType, setQrType] = useState('text');
  const [qrSize, setQrSize] = useState([200]);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [generatedQR, setGeneratedQR] = useState('');
  const { toast } = useToast();

  const generateQR = () => {
    if (!qrData.trim()) {
      toast({
        title: "Error",
        description: "Please enter data to generate QR code",
        variant: "destructive"
      });
      return;
    }

    // Using a public QR code API for demonstration
    const size = qrSize[0];
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&color=${qrColor.substring(1)}&bgcolor=${bgColor.substring(1)}`;
    setGeneratedQR(qrUrl);
    
    toast({
      title: "Success",
      description: "QR code generated successfully!"
    });
  };

  const downloadQR = () => {
    if (!generatedQR) return;
    
    const link = document.createElement('a');
    link.href = generatedQR;
    link.download = 'qrcode.png';
    link.click();
    
    toast({
      title: "Downloaded",
      description: "QR code image has been downloaded!"
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              QR Code Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Generate QR codes for URLs, text, contact information, and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
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
                    onClick={generateQR}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generated QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedQR ? (
                    <div className="text-center space-y-4">
                      <div className="bg-white p-4 rounded-lg inline-block shadow-sm">
                        <img 
                          src={generatedQR} 
                          alt="Generated QR Code" 
                          className="mx-auto"
                          style={{ width: qrSize[0], height: qrSize[0] }}
                        />
                      </div>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={downloadQR} variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          onClick={() => navigator.share({ url: generatedQR })}
                          variant="outline"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Your QR code will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QRGenerator;
