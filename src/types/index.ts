export interface SalesData {
  date: string;
  amount: number;
  category: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  traffic: number;
}

export interface Prediction {
  category: string;
  forecast: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'analyst';
  email: string;
}