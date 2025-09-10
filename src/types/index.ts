export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Scooty {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerHour: number;
  pricePerDay: number;
  location: string;
  available: boolean;
  features: string[];
  rating: number;
  reviews: number;
}

export interface Booking {
  id: string;
  userId: string;
  scootyId: string;
  scooty: Scooty;
  startDate: string;
  endDate: string;
  totalHours: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}