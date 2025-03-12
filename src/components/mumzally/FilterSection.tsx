
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, UserCircle, BabyIcon, MapPin, Flag, Briefcase } from 'lucide-react';
import { useState } from 'react';

const FilterSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'age', label: 'Your Age', icon: <UserCircle className="h-4 w-4" /> },
    { id: 'kids', label: 'Kids Age/Gender', icon: <BabyIcon className="h-4 w-4" /> },
    { id: 'location', label: 'Neighborhood', icon: <MapPin className="h-4 w-4" /> },
    { id: 'nationality', label: 'Nationality', icon: <Flag className="h-4 w-4" /> },
    { id: 'work', label: 'Work Status', icon: <Briefcase className="h-4 w-4" /> },
  ];
  
  return (
    <section className="py-6 md:py-8 px-4 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-4 md:mb-6 gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">Filter Allies</h2>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-xs md:text-sm">
            <Filter className="h-3 w-3 md:h-4 md:w-4" />
            Advanced Filters
          </Button>
        </div>
        
        <div className="flex items-center mb-4 md:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by name, interests, etc." 
              className="pl-10 rounded-full text-sm h-9 md:h-10" 
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs md:text-sm py-1 h-8 md:h-9"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon && <span className="mr-1 md:mr-2">{filter.icon}</span>}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
