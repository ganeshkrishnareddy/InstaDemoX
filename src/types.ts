export interface Lead {
  id: string;
  slug: string;
  business_name: string;
  category: string;
  owner_name: string;
  address: string;
  phone: string;
  whatsapp: string;
  city: string;
  tagline?: string;
  created_at: string;
  viewed: boolean;
  viewed_at?: string | null;
  time_on_page: number; // in seconds
  converted: boolean;
  converted_at?: string | null;
  whatsapp_pinged?: boolean;
  generated_demo?: boolean;
  viewed_demo?: boolean;
  clicked_whatsapp?: boolean;
  viewed_pricing?: boolean;
}

export type Category = 'Restaurant' | 'Hotel' | 'Salon' | 'Clinic' | 'Real Estate' | 'Gym' | 'School';
