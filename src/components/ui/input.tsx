
import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, prefix, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const togglePassword = () => {
      setShowPassword(prev => !prev);
    };
    
    // Determine the actual input type - show text if it's a password field and showPassword is true
    const inputType = showPasswordToggle && type === "password" 
      ? (showPassword ? "text" : "password") 
      : type;
      
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {prefix}
          </div>
        )}
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon && "pl-10",
            prefix && "pl-16", 
            showPasswordToggle && "pr-10", // Add padding for the password toggle
            className
          )}
          ref={ref}
          {...props}
        />
        
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={togglePassword}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
