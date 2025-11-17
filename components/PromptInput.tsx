import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

// This component has been removed as it is part of the unused starter kit.
export const PromptInput: React.FC<PromptInputProps> = () => {
  return null;
};
