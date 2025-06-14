
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Trash2, CalendarDays } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  date: string;
  time: string;
  status: 'scheduled' | 'draft';
}

const SocialMediaScheduler = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [currentPost, setCurrentPost] = useState({
    content: '',
    platform: 'Instagram',
    date: '',
    time: ''
  });

  const platforms = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'];

  const addPost = () => {
    if (!currentPost.content.trim() || !currentPost.date || !currentPost.time) {
      toast.error('Please fill in all fields');
      return;
    }

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      content: currentPost.content,
      platform: currentPost.platform,
      date: currentPost.date,
      time: currentPost.time,
      status: 'scheduled'
    };

    setPosts([...posts, newPost]);
    setCurrentPost({
      content: '',
      platform: 'Instagram',
      date: '',
      time: ''
    });
    toast.success('Post scheduled successfully!');
  };

  const removePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast.success('Post removed from schedule');
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      Instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Twitter: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      LinkedIn: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      TikTok: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      YouTube: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-6xl mx-auto py-12">
        <ToolHeader
          icon={CalendarDays}
          title="Social Media Post Scheduler UI"
          description="Plan and schedule your social media posts across multiple platforms (Mock Interface)"
          gradient="bg-gradient-to-r from-teal-600 to-green-600"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Post</CardTitle>
              <CardDescription>
                Create and schedule a new social media post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="content">Post Content</Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind? Include hashtags and mentions..."
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  rows={4}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {currentPost.content.length}/280 characters
                </div>
              </div>

              <div>
                <Label>Platform</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {platforms.map((platform) => (
                    <Badge
                      key={platform}
                      variant={currentPost.platform === platform ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setCurrentPost({ ...currentPost, platform })}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentPost.date}
                    onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={currentPost.time}
                    onChange={(e) => setCurrentPost({ ...currentPost, time: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={addPost} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> This is a mock interface for demonstration purposes. 
                  In a real application, this would connect to social media APIs for actual scheduling.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Posts ({posts.length})
              </CardTitle>
              <CardDescription>
                Your upcoming social media posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No scheduled posts yet. Create your first post!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {posts
                    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
                    .map((post) => (
                      <div
                        key={post.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className={getPlatformColor(post.platform)}>
                              {post.platform}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {post.status}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePost(post.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDateTime(post.date, post.time)}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default SocialMediaScheduler;
