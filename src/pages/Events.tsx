import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Users } from 'lucide-react';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Community Blood Drive',
      date: 'June 15, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Central Hospital',
      address: '123 Medical Center Dr, Healthytown, CA',
      spots: 45,
      description: 'Join our biggest community blood drive of the year. All blood types needed. Refreshments provided for all donors.',
      image: 'https://images.pexels.com/photos/4226902/pexels-photo-4226902.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'University Donation Day',
      date: 'June 22, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'State University',
      address: '500 University Ave, Collegetown, CA',
      spots: 30,
      description: 'Special blood drive for college students and faculty. Student ID holders will receive volunteer hours for donating.',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Corporate Donor Event',
      date: 'July 5, 2025',
      time: '8:00 AM - 2:00 PM',
      location: 'Tech Plaza',
      address: '800 Innovation Way, Business Park, CA',
      spots: 25,
      description: 'Partnering with local businesses for a special donation drive. Employees get time off to donate during work hours.',
      image: 'https://images.pexels.com/photos/6823553/pexels-photo-6823553.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 4,
      title: 'Weekend Warriors Blood Drive',
      date: 'July 12, 2025',
      time: '11:00 AM - 6:00 PM',
      location: 'Community Center',
      address: '456 Main St, Downtown, CA',
      spots: 40,
      description: 'Special weekend blood drive for those who can\'t donate during the week. Family-friendly with activities for kids.',
      image: 'https://images.pexels.com/photos/6823570/pexels-photo-6823570.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 5,
      title: 'Senior Citizens Special Drive',
      date: 'July 19, 2025',
      time: '9:30 AM - 3:30 PM',
      location: 'Golden Years Center',
      address: '200 Retirement Lane, Peaceful Valley, CA',
      spots: 20,
      description: 'Special drive focusing on senior citizens. Extra staff available to assist. Free health screenings included.',
      image: 'https://images.pexels.com/photos/4226883/pexels-photo-4226883.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 6,
      title: 'First Responders Appreciation',
      date: 'July 26, 2025',
      time: '7:00 AM - 7:00 PM',
      location: 'Fire Station #5',
      address: '911 Emergency Rd, Safetyville, CA',
      spots: 35,
      description: 'Extended hours drive honoring first responders. Open to public, but special recognition for service members.',
      image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const locations = ['All Locations', 'Central Hospital', 'State University', 'Tech Plaza', 'Community Center', 'Golden Years Center', 'Fire Station #5'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesLocation = selectedLocation === '' || 
                           selectedLocation === 'All Locations' || 
                           event.location === selectedLocation;
                           
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Upcoming Blood Donation Events</h1>
            <p className="text-xl opacity-90 mb-8">
              Find and register for blood donation drives in your area
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="w-full md:w-2/3 relative">
                <Input
                  type="text"
                  placeholder="Search by event name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
              
              <div className="w-full md:w-1/3">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Locations</option>
                  {locations.slice(1).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No events found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardBody className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{event.date}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{event.time}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-gray-700">{event.location}</div>
                          <div className="text-gray-500 text-sm">{event.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{event.spots} spots available</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 flex-1">{event.description}</p>
                    
                    <Button variant="primary" className="mt-auto w-full">
                      Register Now
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to host a blood drive?</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6">
            Organizations can host their own blood drives. We provide the equipment, staff, and support.
          </p>
          <Button className="bg-white text-primary-600 hover:bg-gray-100">
            Host a Blood Drive
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;