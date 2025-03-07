
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-8 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-medium tracking-tight mb-4">Nova</div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Crafting exceptional products with a focus on simplicity, functionality, and timeless design.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Products</h3>
            <ul className="space-y-3">
              {['Audio', 'Lighting', 'Accessories', 'Home', 'Office'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Sustainability', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              {['Terms', 'Privacy', 'Cookies', 'Licenses', 'Contact'].map((item) => (
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
            © {currentYear} Nova Design. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
