
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: 'local' | 'international';
  description: string;
  website: string;
  discount_code: string;
  discount_value: string;
  bg_color: string;
  created_at?: string;
  updated_at?: string;
}

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');

      if (error) throw error;

      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { brands, isLoading, error };
};
