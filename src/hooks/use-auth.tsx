
import { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string; phone?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state change event:", event);
      
      // First, update the session and user state
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Then handle redirects and UI updates
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        console.log("User signed in or updated, redirecting to Index");
        
        // Use setTimeout to prevent potential auth state deadlocks
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 0);
        
        if (event === 'SIGNED_IN') {
          const isNewUser = newSession?.user?.app_metadata?.provider === 'email' && 
                           newSession?.user?.app_metadata?.created_at === newSession?.user?.app_metadata?.last_sign_in_at;
          
          if (isNewUser) {
            toast({
              title: "Welcome to LeanOn!",
              description: "Your account has been created successfully. Share your referral code with friends!",
            });
          }
        }
      } else if (event === 'SIGNED_OUT') {
        // Use setTimeout to prevent potential auth state deadlocks
        setTimeout(() => {
          navigate('/sign-in', { replace: true });
        }, 0);
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "User logged in" : "No session");
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session) {
        // Force redirect to home if already authenticated
        setTimeout(() => {
          const currentPath = window.location.pathname;
          if (currentPath === '/sign-in' || currentPath === '/sign-up') {
            navigate('/', { replace: true });
          }
        }, 0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Auth state change event will handle redirect
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { first_name?: string; last_name?: string; phone?: string }) => {
    try {
      console.log("Attempting sign up for:", email);
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        console.log("Sign up successful, user created:", data.user.id);
        toast({
          title: "Account created!",
          description: "Welcome to LeanOn! Your account has been created.",
        });
        
        // Auth state change event will handle the redirect
        // But we'll force a redirect here as a backup
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const origin = window.location.origin;
      const redirectTo = `${origin}/reset-password`;
      
      console.log(`Sending password reset email with redirect to: ${redirectTo}`);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password",
      });
      
    } catch (error: any) {
      toast({
        title: "Error resetting password",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Auth state change will handle redirect
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
