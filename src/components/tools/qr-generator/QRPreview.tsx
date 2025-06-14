
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';

interface QRPreviewProps {
  generatedQR: string;
  qrSize: number[];
  onDownload: () => void;
}

const QRPreview = ({ generatedQR, qrSize, onDownload }: QRPreviewProps) => {
  return (
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
              <Button onClick={onDownload} variant="outline">
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
  );
};

export default QRPreview;
