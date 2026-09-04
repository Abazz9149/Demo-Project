export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  tag?: 'Best Seller' | 'New Launch' | 'Selling Fast' | 'Top Rated';
  category: string;
  weight?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  product: string;
  avatar: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}
