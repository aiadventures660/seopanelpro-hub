
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, Lightbulb } from 'lucide-react';

const ToolRequestForm = () => {
  const [formData, setFormData] = useState({
    toolName: '',
    toolDescription: '',
    toolCategory: '',
    useCase: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    'SEO & Analytics',
    'Social Media',
    'Content & Writing',
    'Domain & Network',
    'Utility Tools',
    'Other'
  ];

  const getSessionId = (): string => {
    let sessionId = localStorage.getItem('tool_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('tool_session_id', sessionId);
    }
    return sessionId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.toolName.trim() || !formData.toolDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a tool name and description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const sessionId = getSessionId();
      
      const { error } = await supabase
        .from('tool_requests')
        .insert({
          user_session: sessionId,
          tool_name: formData.toolName.trim(),
          tool_description: formData.toolDescription.trim(),
          tool_category: formData.toolCategory || null,
          use_case: formData.useCase.trim() || null,
          email: formData.email.trim() || null
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Request Submitted!",
        description: "Thank you for your suggestion. We'll review it and get back to you soon.",
      });

      // Reset form
      setFormData({
        toolName: '',
        toolDescription: '',
        toolCategory: '',
        useCase: '',
        email: ''
      });
      
    } catch (error) {
      console.error('Error submitting tool request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Lightbulb className="h-8 w-8 text-yellow-500 mr-2" />
        </div>
        <CardTitle className="text-2xl">Request a New Tool</CardTitle>
        <CardDescription>
          Have an idea for a tool that would be useful? Let us know and we might build it!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="toolName">Tool Name *</Label>
            <Input
              id="toolName"
              value={formData.toolName}
              onChange={(e) => handleInputChange('toolName', e.target.value)}
              placeholder="e.g., Advanced URL Shortener"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toolDescription">Tool Description *</Label>
            <Textarea
              id="toolDescription"
              value={formData.toolDescription}
              onChange={(e) => handleInputChange('toolDescription', e.target.value)}
              placeholder="Describe what this tool should do and how it would work..."
              rows={4}
              maxLength={500}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toolCategory">Category</Label>
            <Select value={formData.toolCategory} onValueChange={(value) => handleInputChange('toolCategory', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase">Use Case</Label>
            <Textarea
              id="useCase"
              value={formData.useCase}
              onChange={(e) => handleInputChange('useCase', e.target.value)}
              placeholder="When would you use this tool? What problem does it solve?"
              rows={3}
              maxLength={300}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
            />
            <p className="text-xs text-gray-500">
              We'll only use this to update you about your request
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ToolRequestForm;
