
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-8 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-2xl font-medium tracking-tight mb-4">MumzAlly</div>
          <p className="text-muted-foreground mb-4 max-w-xs">
            Less alone in Motherhood. Moms LeanOn Moms.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MumzAlly. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Terms', 'Privacy', 'Contact', 'About'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
