import { Scooty, Booking } from '../types';

export const MOCK_SCOOTIES: Scooty[] = [
  {
    id: '1',
    name: 'Urban Rider Pro',
    model: 'UR-2024',
    image: 'https://images.pexels.com/photos/4621269/pexels-photo-4621269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerHour: 12,
    pricePerDay: 150,
    location: 'Downtown',
    available: true,
    features: ['Electric', 'GPS Tracking', 'Phone Holder', 'LED Lights'],
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'City Cruiser',
    model: 'CC-2024',
    image: 'https://images.pexels.com/photos/3849016/pexels-photo-3849016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerHour: 10,
    pricePerDay: 120,
    location: 'Uptown',
    available: true,
    features: ['Bluetooth', 'Anti-theft', 'Storage Box', 'USB Charging'],
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Eco Glide',
    model: 'EG-2024',
    image: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerHour: 8,
    pricePerDay: 100,
    location: 'Midtown',
    available: false,
    features: ['Eco Mode', 'Digital Display', 'Alarm System'],
    rating: 4.4,
    reviews: 67
  },
  {
    id: '4',
    name: 'Speed Demon',
    model: 'SD-2024',
    image: 'https://images.pexels.com/photos/13634013/pexels-photo-13634013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerHour: 15,
    pricePerDay: 180,
    location: 'Downtown',
    available: true,
    features: ['High Performance', 'Sport Mode', 'Premium Tires', 'Racing Handlebars'],
    rating: 4.9,
    reviews: 156
  },
  {
    id: '5',
    name: 'Comfort Plus',
    model: 'CP-2024',
    image: 'https://images.pexels.com/photos/4621276/pexels-photo-4621276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerHour: 11,
    pricePerDay: 135,
    location: 'Suburbs',
    available: true,
    features: ['Comfort Seat', 'Suspension', 'Weather Shield', 'Extra Storage'],
    rating: 4.7,
    reviews: 98
  },
  {
    id: '6',
    name: 'Night Rider',
    model: 'NR-2024',
    image: 'https://images.pexels.com/photos/9851351/pexels-photo-9851351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerHour: 13,
    pricePerDay: 160,
    location: 'City Center',
    available: true,
    features: ['Enhanced Lighting', 'Night Vision', 'Security Lock', 'Reflective Body'],
    rating: 4.5,
    reviews: 76
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    userId: '1',
    scootyId: '1',
    scooty: MOCK_SCOOTIES[0],
    startDate: '2024-01-15T10:00:00Z',
    endDate: '2024-01-15T16:00:00Z',
    totalHours: 6,
    totalAmount: 72,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    scootyId: '2',
    scooty: MOCK_SCOOTIES[1],
    startDate: '2024-01-20T09:00:00Z',
    endDate: '2024-01-20T18:00:00Z',
    totalHours: 9,
    totalAmount: 90,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-19T12:00:00Z'
  }
];