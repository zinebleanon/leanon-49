import { Button } from '@/components/ui/button';
import { PercentCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  handleBrowseDeals: () => void;
}

const HeroSection = ({ handleBrowseDeals }: HeroSectionProps) => {
  return (
    <section className="py-8 md:py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
      </div>
    </section>
  );
};

export default HeroSection;
