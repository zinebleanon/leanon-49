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
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state change event:", event, "Session:", newSession ? "exists" : "null");
      
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        console.log("User signed in or updated, redirecting to Index");
        
        // Use setTimeout to avoid potential React state update conflicts
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
        setTimeout(() => {
          navigate('/sign-in', { replace: true });
        }, 0);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "User logged in" : "No session");
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
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
      
      // Check if email confirmation is required
      if (data.user && data.session) {
        // If we have a session, user doesn't need email confirmation
        console.log("Sign up successful with immediate session, user created:", data.user.id);
        // Auth state change event will handle redirects
      } else if (data.user) {
        // If we have a user but no session, email confirmation is needed
        console.log("Sign up successful but email confirmation is required:", data.user.id);
        setLoading(false);
        
        toast({
          title: "Email confirmation required",
          description: "We've sent you an email with a confirmation link. Please check your inbox to verify your account.",
        });
        
        // Keep the user on the sign-in page
        setTimeout(() => {
          navigate('/sign-in', { replace: true });
        }, 0);
      }
    } catch (error: any) {
      console.error("Error in signup:", error);
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
