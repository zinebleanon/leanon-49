
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  const scrollToFilters = () => {
    const filterSection = document.getElementById('filter-section');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Force browser to load a fresh copy of the image
    const timestamp = new Date().getTime();
    const logoImg = new Image();
    logoImg.onload = () => {
      console.log("Logo loaded with dimensions:", logoImg.width, "x", logoImg.height);
      setLogoLoaded(true);
    };
    logoImg.onerror = (e) => {
      console.error("Failed to load logo:", e);
    };
    logoImg.src = `/lovable-uploads/e721b501-95df-45ef-b358-51c2c2fc8144.png?t=${timestamp}`;
  }, []);

  return (
    <section className="py-16 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="w-full max-h-[400px] flex justify-center md:justify-start">
              <img 
                src="/lovable-uploads/e721b501-95df-45ef-b358-51c2c2fc8144.png" 
                alt="LeanOn Logo" 
                className="mx-auto md:mx-0"
                style={{ 
                  maxWidth: '100%',
                  maxHeight: '400px',
                  height: 'auto',
                  width: 'auto',
                  objectFit: 'contain'
                }}
                onLoad={(e) => {
                  console.log("Image loaded in component, dimensions:", 
                    e.currentTarget.naturalWidth, "x", e.currentTarget.naturalHeight,
                    "Rendered size:", e.currentTarget.offsetWidth, "x", e.currentTarget.offsetHeight);
                }}
                onError={(e) => {
                  console.error("Error loading image in component:", e);
                  e.currentTarget.style.border = "1px solid red";
                  e.currentTarget.style.padding = "10px";
                  e.currentTarget.alt = "Image failed to load";
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Find <span className="text-gradient">Match with Moms & LeanOn</span> each other
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            Less alone in Motherhood. Connect with mumz based on your age, neighborhood, children's 
            age and gender, nationality, and work status for meaningful friendships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="rounded-full w-full sm:w-auto"
              onClick={scrollToFilters}
            >
              Find Your Allies
            </Button>
            <HowItWorksModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
