
export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  unit: string;
  image: string;
  features: string[];
  badge?: string;
  isPremium?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
