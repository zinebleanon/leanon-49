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
  discountCode: string;
  discountValue: string;
  bgColor: string;
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
      // Initialize with empty array until we create the brands table in Supabase
      const brandsData: Brand[] = [];
      
      // Transform data to include required aliases for compatibility
      const transformedBrands = brandsData.map(brand => ({
        ...brand,
        discountCode: brand.discount_code,
        discountValue: brand.discount_value,
        bgColor: brand.bg_color,
      }));
      
      setBrands(transformedBrands);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return { brands, isLoading, error };
};
