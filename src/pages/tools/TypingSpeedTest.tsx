
import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Timer, Target, TrendingUp } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TypingSpeedTest = () => {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet.",
    "Technology has revolutionized the way we communicate, work, and learn in the modern world.",
    "Practice makes perfect when it comes to improving your typing speed and accuracy over time.",
    "Beautiful sunsets paint the sky with vibrant colors of orange, pink, and purple each evening.",
    "Learning new skills requires dedication, patience, and consistent practice to achieve mastery."
  ];

  useEffect(() => {
    if (isStarted && !isFinished) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStarted, isFinished]);

  useEffect(() => {
    if (userInput === currentText && userInput.length > 0) {
      finishTest();
    }
  }, [userInput, currentText]);

  const startTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    setUserInput('');
    setIsStarted(true);
    setIsFinished(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setResults(null);
    inputRef.current?.focus();
  };

  const finishTest = () => {
    if (!isStarted) return;
    
    setIsFinished(true);
    setIsStarted(false);
    
    const timeInMinutes = timeElapsed / 60;
    const wordsTyped = userInput.split(' ').length;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    
    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < Math.min(userInput.length, currentText.length); i++) {
      if (userInput[i] === currentText[i]) {
        correctChars++;
      }
    }
    const accuracy = Math.round((correctChars / currentText.length) * 100);
    
    setResults({
      wpm: isNaN(wpm) || !isFinite(wpm) ? 0 : wpm,
      accuracy,
      timeElapsed,
      wordsTyped,
      correctChars,
      totalChars: currentText.length
    });
  };

  const resetTest = () => {
    setCurrentText('');
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
    setTimeElapsed(0);
    setResults(null);
    setStartTime(null);
  };

  const getCharacterStyle = (index) => {
    if (index >= userInput.length) {
      return 'text-gray-400';
    }
    return userInput[index] === currentText[index] ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

  const progress = currentText ? (userInput.length / currentText.length) * 100 : 0;

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={Keyboard}
          title="Typing Speed Test"
          description="Test your typing speed and accuracy with real-time WPM calculation"
          gradient="bg-gradient-to-r from-blue-500 to-purple-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {!isStarted && !isFinished && !results && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Ready to test your typing speed?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Click the button below to start the typing test. You'll need to type the given text as accurately and quickly as possible.
                </p>
                <Button 
                  onClick={startTest}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Start Typing Test
                </Button>
              </CardContent>
            </Card>
          )}

          {isStarted && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Timer className="h-5 w-5" />
                      Time: {timeElapsed}s
                    </span>
                    <span className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Progress: {Math.round(progress)}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="mb-4" />
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 font-mono text-lg leading-relaxed">
                    {currentText.split('').map((char, index) => (
                      <span key={index} className={getCharacterStyle(index)}>
                        {char}
                      </span>
                    ))}
                  </div>
                  <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full p-4 border rounded-lg font-mono"
                    placeholder="Start typing here..."
                    rows={4}
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={finishTest} variant="outline">
                      Finish Test
                    </Button>
                    <Button onClick={resetTest} variant="outline">
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {results && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    WPM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{results.wpm}</div>
                  <p className="text-sm text-gray-600">Words per minute</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{results.accuracy}%</div>
                  <p className="text-sm text-gray-600">Characters correct</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{results.timeElapsed}s</div>
                  <p className="text-sm text-gray-600">Total time</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Characters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">
                    {results.correctChars}/{results.totalChars}
                  </div>
                  <p className="text-sm text-gray-600">Correct/Total</p>
                </CardContent>
              </Card>
            </div>
          )}

          {results && (
            <Card>
              <CardContent className="text-center pt-6">
                <Button 
                  onClick={resetTest}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Take Another Test
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <RelatedTools 
        currentToolId="typingspeedtest"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default TypingSpeedTest;
