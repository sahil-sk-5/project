import React from 'react';
import { Star, MapPin, Clock, Zap } from 'lucide-react';
import { Scooty } from '../types';
import { Link } from 'react-router-dom';

interface ScootyCardProps {
  scooty: Scooty;
}

export default function ScootyCard({ scooty }: ScootyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={scooty.image}
          alt={scooty.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`${
              scooty.available ? 'bg-green-500' : 'bg-red-500'
            } text-white px-3 py-1 rounded-full text-sm font-medium`}
          >
            {scooty.available ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{scooty.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{scooty.rating}</span>
            <span className="text-xs text-gray-500">({scooty.reviews})</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{scooty.model}</p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{scooty.location}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {scooty.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
          {scooty.features.length > 3 && (
            <span className="text-xs text-gray-500">
              +{scooty.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-lg font-bold text-gray-900">${scooty.pricePerHour}/hr</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-gray-400" />
            <span className="text-lg font-bold text-gray-900">${scooty.pricePerDay}/day</span>
          </div>
        </div>
        
        <Link
          to={`/book/${scooty.id}`}
          className={`w-full py-3 px-4 rounded-lg font-medium text-center block transition-all ${
            scooty.available
              ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {scooty.available ? 'Book Now' : 'Not Available'}
        </Link>
      </div>
    </div>
  );
}