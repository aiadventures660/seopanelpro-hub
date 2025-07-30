import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, X, Settings } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now()
    }));
    setShowBanner(false);
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now()
    }));
    setShowBanner(false);
  };

  const saveCustomSettings = (settings: any) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...settings,
      necessary: true, // Always required
      timestamp: Date.now()
    }));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl shadow-lg border-t-4 border-blue-600">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Cookie className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">We use cookies</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                  You can customize your preferences or learn more in our{' '}
                  <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={acceptNecessaryOnly}
                >
                  Necessary Only
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAllCookies}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <CookieSettings 
              onSave={saveCustomSettings}
              onBack={() => setShowSettings(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const CookieSettings = ({ onSave, onBack }: { onSave: (settings: any) => void; onBack: () => void }) => {
  const [settings, setSettings] = useState({
    necessary: true,
    analytics: true,
    advertising: true
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Cookie Preferences</h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Necessary Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Required for the website to function properly
            </p>
          </div>
          <div className="text-sm text-gray-500">Always Active</div>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Analytics Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Help us understand how visitors interact with our website
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.analytics}
              onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Advertising Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Used to deliver relevant advertisements and track ad performance
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.advertising}
              onChange={(e) => setSettings({ ...settings, advertising: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => onSave({ analytics: false, advertising: false })}
          className="flex-1"
        >
          Necessary Only
        </Button>
        <Button
          onClick={() => onSave(settings)}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;