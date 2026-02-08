
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
  origin?: {
    location: string;
    farmName: string;
    description: string;
  };
  nutrition?: {
    calories: string;
    sugarContent: string;
    vitaminC: string;
    fiber: string;
  };
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
