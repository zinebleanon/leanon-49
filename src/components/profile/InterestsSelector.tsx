
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const availableInterests = [
  { label: 'Cooking', icon: '🍳' },
  { label: 'Fitness', icon: '💪' },
  { label: 'Reading', icon: '📚' },
  { label: 'Travel', icon: '✈️' },
  { label: 'Music', icon: '🎵' },
  { label: 'Arts & Crafts', icon: '🎨' },
  { label: 'Photography', icon: '📸' },
  { label: 'Gardening', icon: '🌱' },
  { label: 'Fashion', icon: '👗' },
  { label: 'Movies', icon: '🎬' },
  { label: 'Technology', icon: '💻' },
  { label: 'Sports', icon: '⚽' }
];

const InterestsSelector: React.FC<InterestsSelectorProps> = ({
  selectedInterests,
  onInterestsChange,
}) => {
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="font-medium">Your Interests</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableInterests.map(({ label, icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => toggleInterest(label)}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md border text-sm transition-colors",
              selectedInterests.includes(label)
                ? "bg-primary/10 border-primary/30 text-primary"
                : "hover:bg-muted"
            )}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Select your interests to help us match you with like-minded moms
      </p>
    </div>
  );
};

export default InterestsSelector;
