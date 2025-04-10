
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TopicSummaryProps {
  content: string;
  topic: string;
}

const TopicSummary: React.FC<TopicSummaryProps> = ({ content, topic }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    const saved = localStorage.getItem('openai_api_key');
    return saved || '';
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState(!localStorage.getItem('openai_api_key'));
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the summarization feature.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that summarizes content related to parenting, especially focusing on the topic: ${topic}.`
            },
            {
              role: "user",
              content: `Please summarize the following content in 2-3 concise, informative sentences: ${content}`
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error connecting to OpenAI');
      }

      const data = await response.json();
      setSummary(data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Summarization error:', error);
      toast({
        title: "Summarization Failed",
        description: error instanceof Error ? error.message : "Failed to generate summary",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved for future use."
      });
    }
  };

  return (
    <div className="mb-6">
      {showApiKeyInput ? (
        <div className="p-4 bg-[#FFD9A7]/20 rounded-md border border-[#FFD9A7] mb-4">
          <h3 className="font-medium mb-2">OpenAI API Key Required</h3>
          <p className="text-sm text-muted-foreground mb-3">
            To use the AI summary feature, please enter your OpenAI API key. 
            It will be stored in your browser for future use.
          </p>
          <form onSubmit={handleApiKeySubmit} className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
              placeholder="sk-..."
            />
            <Button type="submit" size="sm">Save Key</Button>
          </form>
        </div>
      ) : summary ? (
        <div className="p-4 bg-[#B8CEC2]/20 rounded-md border border-[#B8CEC2]">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-[#FFD9A7]" />
              AI Summary
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSummary(null)}
              className="h-6 px-2 text-xs"
            >
              Dismiss
            </Button>
          </div>
          <p className="text-sm">{summary}</p>
        </div>
      ) : (
        <Button
          onClick={handleSummarize}
          disabled={isLoading}
          variant="outline"
          className="w-full border-dashed border-[#B8CEC2] hover:bg-[#B8CEC2]/10 text-foreground"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating summary...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2 text-[#FFD9A7]" />
              Summarize this topic with AI
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default TopicSummary;
