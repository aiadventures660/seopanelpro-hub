import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CaptchaVerification } from '@/components/tools/contact/CaptchaVerification';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Import security utilities
    const { validateInput, sanitizeUserInput, checkRateLimit, logSecurityEvent, getSessionId } = await import('@/utils/securityUtils');
    
    // Enhanced validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check CAPTCHA verification
    if (!isCaptchaVerified) {
      toast({
        title: "Security Verification Required",
        description: "Please complete the security verification before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    if (!validateInput.email(formData.email)) {
      toast({
        title: 'Validation Error', 
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return;
    }

    // Check rate limiting
    const sessionId = getSessionId();
    if (!checkRateLimit(`contact_form_${sessionId}`)) {
      toast({
        title: 'Rate Limit Exceeded',
        description: 'Please wait before sending another message',
        variant: 'destructive'
      });
      return;
    }

    // Validate text inputs
    if (!validateInput.text(formData.name, 100) || 
        !validateInput.text(formData.subject, 200) || 
        !validateInput.text(formData.message, 2000)) {
      toast({
        title: 'Validation Error',
        description: 'Input too long or invalid format',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeUserInput(formData.name.trim()),
        email: sanitizeUserInput(formData.email.trim()),
        subject: sanitizeUserInput(formData.subject.trim()),
        message: sanitizeUserInput(formData.message.trim())
      };

      // Log contact attempt
      await logSecurityEvent('contact_form_submitted', {
        name_length: sanitizedData.name.length,
        has_subject: !!sanitizedData.subject,
        message_length: sanitizedData.message.length
      }, 'low');

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      await logSecurityEvent('contact_form_error', { error: String(error) }, 'medium');
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions, suggestions, or need support? We're here to help! Reach out to us using any of the methods below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">General inquiries</p>
                <p className="text-blue-600 dark:text-blue-400">contact@seotoolspro.studio</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Support</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Technical support</p>
                <p className="text-green-600 dark:text-green-400">contact@seotoolspro.studio</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Office</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Visit us at</p>
                <p className="text-purple-600 dark:text-purple-400">123 Tech Street<br />Digital City, DC 12345</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-6 w-6 mr-2 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <CaptchaVerification onVerify={setIsCaptchaVerified} />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Are all tools really free?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes! All our core tools are completely free to use. We support the platform through non-intrusive advertising.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Do you store my data?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We only store minimal analytics data to improve our services. Check our Privacy Policy for full details.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Can I request new tools?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Absolutely! We love hearing from our users. Use our tool request feature or contact us directly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How often do you add new tools?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We continuously work on new tools based on user feedback and market needs. Follow us for updates!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Monday - Friday:</span>
                      <span className="text-gray-900 dark:text-white">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Saturday:</span>
                      <span className="text-gray-900 dark:text-white">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Sunday:</span>
                      <span className="text-gray-900 dark:text-white">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    *Email responses within 24 hours during business days
                  </p>
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

export default Contact;