
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MarketplaceListing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  sub_category: string;
  brand: string;
  age_group: string;
  size: string;
  condition: string;
  price: string;
  status: 'available' | 'sold' | 'reserved';
  approved: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useMarketplaceListings = () => {
  const [listedItems, setListedItems] = useState<MarketplaceListing[]>([]);
  const [pendingApprovalItems, setPendingApprovalItems] = useState<MarketplaceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      
      const { data: listings, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (listings) {
        const typedListings = listings as MarketplaceListing[];
        const approved = typedListings.filter(item => item.approved && item.status !== 'sold');
        const pending = typedListings.filter(item => !item.approved);
        setListedItems(approved);
        setPendingApprovalItems(pending);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const createListing = async (listing: Omit<MarketplaceListing, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'approved' | 'status'>) => {
    try {
      const user = supabase.auth.getUser();
      const userId = (await user).data.user?.id || 'anonymous';

      const { data, error } = await supabase
        .from('marketplace_listings')
        .insert([{ 
          ...listing, 
          user_id: userId,
          status: 'available' as const,
          approved: false
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchListings();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating listing:', error);
      return { data: null, error };
    }
  };

  const updateListing = async (id: string, updates: Partial<MarketplaceListing>) => {
    try {
      const { error } = await supabase
        .from('marketplace_listings')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchListings();
      return { error: null };
    } catch (error) {
      console.error('Error updating listing:', error);
      return { error };
    }
  };

  const deleteListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('marketplace_listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchListings();
      return { error: null };
    } catch (error) {
      console.error('Error deleting listing:', error);
      return { error };
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listedItems,
    pendingApprovalItems,
    isLoading,
    error,
    createListing,
    updateListing,
    deleteListing,
    refetch: fetchListings
  };
};
