import { useRef } from 'react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 px-6 md:px-8 relative overflow-hidden"
    >
      {/* Empty section - all content has been removed */}
    </section>
  );
};

export default Features;
