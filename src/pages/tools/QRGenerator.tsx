
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import QRSettings from '@/components/tools/qr-generator/QRSettings';
import QRPreview from '@/components/tools/qr-generator/QRPreview';

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

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={QrCode}
        title="QR Code Generator"
        description="Generate QR codes for URLs, text, contact information, and more"
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <QRSettings
            qrData={qrData}
            setQrData={setQrData}
            qrType={qrType}
            setQrType={setQrType}
            qrSize={qrSize}
            setQrSize={setQrSize}
            qrColor={qrColor}
            setQrColor={setQrColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            onGenerate={generateQR}
          />
        </div>

        <div>
          <QRPreview
            generatedQR={generatedQR}
            qrSize={qrSize}
            onDownload={downloadQR}
          />
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
