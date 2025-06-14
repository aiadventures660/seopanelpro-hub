
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const ProfilePictureResizer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const platforms = [
    { name: 'Instagram', size: '320x320', dimensions: { width: 320, height: 320 } },
    { name: 'Facebook', size: '170x170', dimensions: { width: 170, height: 170 } },
    { name: 'Twitter', size: '400x400', dimensions: { width: 400, height: 400 } },
    { name: 'LinkedIn', size: '300x300', dimensions: { width: 300, height: 300 } },
    { name: 'YouTube', size: '800x800', dimensions: { width: 800, height: 800 } },
    { name: 'TikTok', size: '200x200', dimensions: { width: 200, height: 200 } },
    { name: 'Discord', size: '128x128', dimensions: { width: 128, height: 128 } },
    { name: 'WhatsApp', size: '640x640', dimensions: { width: 640, height: 640 } }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        toast.error('Please select a valid image file');
      }
    }
  };

  const resizeImage = (targetWidth: number, targetHeight: number, platformName: string) => {
    if (!selectedImage || !canvasRef.current) return;

    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas dimensions
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Calculate scaling to maintain aspect ratio
      const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // Center the image
      const x = (targetWidth - scaledWidth) / 2;
      const y = (targetHeight - scaledHeight) / 2;

      // Fill background with white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Draw the image
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Download the resized image
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `profile-picture-${platformName.toLowerCase()}-${targetWidth}x${targetHeight}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success(`${platformName} profile picture downloaded!`);
        }
        setIsProcessing(false);
      }, 'image/png');
    };

    img.src = previewUrl;
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={ImageIcon}
          title="Profile Picture Resizer"
          description="Resize your profile pictures to the perfect dimensions for any social media platform"
          gradient="bg-gradient-to-r from-green-600 to-blue-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Your Image</CardTitle>
            <CardDescription>
              Upload an image and we'll resize it for different social media platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {!selectedImage ? (
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                onClick={triggerFileSelect}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  Click to upload an image
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedImage.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="outline" onClick={triggerFileSelect}>
                    Change Image
                  </Button>
                </div>
                
                {previewUrl && (
                  <div className="flex justify-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-xs max-h-64 rounded-lg shadow-md object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedImage && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Platform Size</CardTitle>
              <CardDescription>
                Click on any platform to download your resized profile picture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
                    onClick={() => resizeImage(
                      platform.dimensions.width,
                      platform.dimensions.height,
                      platform.name
                    )}
                  >
                    <div className="text-center">
                      <div className="font-medium text-gray-900 dark:text-white mb-2">
                        {platform.name}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {platform.size}
                      </Badge>
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4 mr-1" />
                          )}
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolPageLayout>
  );
};

export default ProfilePictureResizer;
