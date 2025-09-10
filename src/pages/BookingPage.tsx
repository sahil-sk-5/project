import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, MapPin, ArrowLeft, Check } from 'lucide-react';
import { MOCK_SCOOTIES } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import ProtectedRoute from '../components/ProtectedRoute';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const scooty = MOCK_SCOOTIES.find(s => s.id === id);
  
  const [bookingData, setBookingData] = useState({
    startDate: '',
    startTime: '',
    hours: 1,
    rentalType: 'hourly'
  });
  
  const [currentStep, setCurrentStep] = useState(1);

  if (!scooty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Scooty Not Found</h2>
          <button
            onClick={() => navigate('/scooties')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Scooties
          </button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const rate = bookingData.rentalType === 'daily' ? scooty.pricePerDay : scooty.pricePerHour;
    const multiplier = bookingData.rentalType === 'daily' ? Math.ceil(bookingData.hours / 24) : bookingData.hours;
    return rate * multiplier;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!bookingData.startDate || !bookingData.startTime || bookingData.hours < 1) {
        addToast('Please fill in all booking details', 'error');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleConfirmBooking = () => {
    // In a real app, this would make an API call
    addToast('Booking confirmed successfully!', 'success');
    navigate('/bookings');
  };

  const steps = [
    { number: 1, title: 'Select Date & Time', active: currentStep === 1, completed: currentStep > 1 },
    { number: 2, title: 'Review & Payment', active: currentStep === 2, completed: currentStep > 2 },
    { number: 3, title: 'Confirmation', active: currentStep === 3, completed: false }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate('/scooties')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Scooties</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Book {scooty.name}</h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : step.active 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.completed ? <Check className="h-5 w-5" /> : step.number}
                    </div>
                    <span className={`text-xs mt-2 ${
                      step.active ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${
                      steps[index + 1].completed || steps[index + 1].active ? 'bg-blue-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            name="startDate"
                            value={bookingData.startDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="time"
                            name="startTime"
                            value={bookingData.startTime}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rental Type
                        </label>
                        <select
                          name="rentalType"
                          value={bookingData.rentalType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration ({bookingData.rentalType === 'daily' ? 'days' : 'hours'})
                        </label>
                        <input
                          type="number"
                          name="hours"
                          value={bookingData.hours}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Next: Review Booking
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Payment</h2>
                    
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="text-gray-900">{bookingData.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="text-gray-900">{bookingData.startTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="text-gray-900">
                              {bookingData.hours} {bookingData.rentalType === 'daily' ? 'day(s)' : 'hour(s)'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="payment" value="card" defaultChecked className="text-blue-600" />
                            <CreditCard className="h-5 w-5 text-gray-400" />
                            <span>Credit/Debit Card</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total Amount:</span>
                          <span className="text-blue-600">${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Confirm & Pay
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-8">
                      Your booking has been confirmed. You'll receive a confirmation email shortly.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => navigate('/bookings')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View My Bookings
                      </button>
                      <button
                        onClick={() => navigate('/scooties')}
                        className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Book Another
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={scooty.image}
                    alt={scooty.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{scooty.name}</h3>
                    <p className="text-gray-600 text-sm">{scooty.model}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{scooty.location}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hourly Rate:</span>
                    <span className="font-medium text-gray-900">${scooty.pricePerHour}/hr</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Daily Rate:</span>
                    <span className="font-medium text-gray-900">${scooty.pricePerDay}/day</span>
                  </div>
                </div>

                {currentStep > 1 && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-blue-600">${calculateTotal()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}