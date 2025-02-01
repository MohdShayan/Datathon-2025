import { SalesData, StoreLocation, Prediction } from '../types';

export const mockSalesData: SalesData[] = [
  { date: '2024-03-01', amount: 45000, category: 'Electronics' },
  { date: '2024-03-02', amount: 52000, category: 'Electronics' },
  { date: '2024-03-03', amount: 49000, category: 'Electronics' },
  { date: '2024-03-01', amount: 32000, category: 'Clothing' },
  { date: '2024-03-02', amount: 38000, category: 'Clothing' },
  { date: '2024-03-03', amount: 35000, category: 'Clothing' },
];

export const mockLocations: StoreLocation[] = [
  { id: '1', name: 'Downtown Store', lat: 40.7128, lng: -74.0060, traffic: 1200 },
  { id: '2', name: 'Midtown Store', lat: 40.7549, lng: -73.9840, traffic: 800 },
  { id: '3', name: 'Uptown Store', lat: 40.7829, lng: -73.9654, traffic: 950 },
];

export const mockPredictions: Prediction[] = [
  { category: 'Electronics', forecast: 58000, confidence: 0.85, trend: 'up' },
  { category: 'Clothing', forecast: 42000, confidence: 0.78, trend: 'stable' },
  { category: 'Home Goods', forecast: 35000, confidence: 0.72, trend: 'down' },
];