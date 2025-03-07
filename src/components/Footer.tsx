
import { cn } from '@/lib/utils';
import { Users, HelpCircle, Bookmark } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-8 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-medium tracking-tight mb-4">MumzAllies</div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Motherhood together feels less alone. Mumz need Mumz.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mumz Ally
            </h3>
            <ul className="space-y-3">
              {['Mom Groups', 'Events', 'Meetups', 'Support Circles', 'Mentorship'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Mumz Ask
            </h3>
            <ul className="space-y-3">
              {['Expert Advice', 'Q&A', 'Parenting Topics', 'Development', 'Health'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Mumz Save
            </h3>
            <ul className="space-y-3">
              {['Deals', 'Exclusive Offers', 'Partner Brands', 'Gift Cards', 'Rewards'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MumzAllies. All rights reserved.
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
