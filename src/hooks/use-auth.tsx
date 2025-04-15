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
      console.log("Auth state change event:", event, "Session:", newSession ? "exists" : "null");
      
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN') {
        console.log("User signed in, redirecting to Index");
        navigate('/', { replace: true });
        
        toast({
          title: "Welcome to LeanOn!",
          description: "Your account has been created successfully.",
        });
      } else if (event === 'SIGNED_OUT') {
        navigate('/sign-in', { replace: true });
      }
    });

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
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/sign-in`
        }
      });
      
      if (error) throw error;
      
      // After successful signup, automatically sign in the user
      await signIn(email, password);
      
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
