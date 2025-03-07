
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
    <section className="py-8 px-6 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Filter Allies</h2>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by name, interests, etc." 
              className="pl-10 rounded-full" 
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon && <span className="mr-2">{filter.icon}</span>}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
