import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { type, prompt } = await req.json();

    if (!type || !prompt) {
      throw new Error('Missing required fields: type and prompt');
    }

    console.log(`Generating ${type} content for prompt:`, prompt);

    // Define system prompts for different types
    const systemPrompts = {
      'instagram-bio': 'You are an expert Instagram bio writer. Create engaging, concise bios that capture personality and encourage follows. Return only the bio text.',
      'twitter-thread': 'You are a Twitter thread expert. Break down the content into engaging tweets (max 280 chars each). Return an array of tweet strings in JSON format.',
      'instagram-story-ideas': 'You are a social media strategist. Generate 5-8 creative Instagram story ideas based on the topic. Return an array of story idea strings in JSON format.',
      'reddit-title': 'You are a Reddit expert. Generate 5-8 engaging, attention-grabbing post titles that would perform well on Reddit. Return an array of title strings in JSON format.',
      'facebook-ad-headline': 'You are a Facebook advertising expert. Create compelling ad headlines that drive clicks and conversions. Return an array of headline strings in JSON format.',
      'youtube-description': 'You are a YouTube SEO expert. Create optimized video descriptions with relevant keywords and proper formatting. Return only the description text.',
      'youtube-title': 'You are a YouTube expert. Generate engaging, SEO-optimized video titles that drive clicks. Return an array of title strings in JSON format.',
      'youtube-script': 'You are a YouTube scriptwriter. Create engaging video scripts with clear structure, hooks, and calls-to-action. Return only the script text.',
      'youtube-tags': 'You are a YouTube SEO expert. Generate relevant tags for better video discoverability. Return an array of tag strings in JSON format.',
      'tiktok-caption': 'You are a TikTok content expert. Create engaging captions with trending hashtags and hooks. Return only the caption text.',
      'meme-text': 'You are a meme expert. Generate funny, relatable meme text that would go viral. Return only the meme text.',
      'blog-title': 'You are a blog writing expert. Generate SEO-optimized, engaging blog titles that drive clicks. Return an array of title strings in JSON format.',
      'catchy-hook': 'You are a copywriting expert. Create compelling hooks that grab attention immediately. Return an array of hook strings in JSON format.',
      'essay-rewrite': 'You are an academic writing expert. Rewrite the content to improve clarity, flow, and engagement while maintaining the original meaning. Return only the rewritten text.',
      'article-rewrite': 'You are a content writing expert. Rewrite the article to make it more engaging, readable, and unique while preserving key information. Return only the rewritten article.',
      'paraphrase': 'You are a writing expert. Paraphrase the content to express the same ideas using different words and sentence structures. Return only the paraphrased text.',
      'grammar-fix': 'You are a grammar expert. Fix all grammar, spelling, and punctuation errors while maintaining the original tone and meaning. Return only the corrected text.',
      'hashtag-generator': 'You are a social media hashtag expert. Generate relevant, trending hashtags for the given topic. Return an array of hashtag strings (including #) in JSON format.'
    };

    const systemPrompt = systemPrompts[type] || 'You are a helpful assistant that generates content based on user prompts.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log(`Generated ${type} content:`, generatedText);

    // Store the generation in the database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const sessionId = req.headers.get('authorization')?.replace('Bearer ', '') || 'anonymous';
    
    await supabase.from('ai_content_generations').insert({
      type,
      prompt,
      generated_content: generatedText,
      user_session: sessionId
    });

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred',
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});