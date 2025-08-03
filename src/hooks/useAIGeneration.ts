import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseAIGenerationOptions {
  type: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useAIGeneration = ({ type, onSuccess, onError }: UseAIGenerationOptions) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      if (!prompt?.trim()) {
        throw new Error('Please provide a prompt');
      }

      console.log(`Generating ${type} content for prompt:`, prompt);

      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: { type, prompt },
      });

      if (error) {
        console.error(`Error generating ${type}:`, error);
        throw new Error(error.message || `Failed to generate ${type}`);
      }

      if (!data?.generatedText) {
        throw new Error('No content was generated');
      }

      return data.generatedText;
    },
    onSuccess: (data) => {
      console.log(`Successfully generated ${type}:`, data);
      toast({
        title: "Content generated successfully!",
        description: `Your ${type.replace('-', ' ')} has been created.`,
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error(`Error in ${type} generation:`, error);
      toast({
        title: "Generation failed",
        description: error.message || `Failed to generate ${type}. Please try again.`,
        variant: "destructive",
      });
      onError?.(error);
    },
    retry: 2,
    retryDelay: 1000,
  });

  return {
    generate: mutation.mutate,
    isGenerating: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};