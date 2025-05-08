import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Droplet, Clock, CalendarCheck } from 'lucide-react';
import Button from '../components/Button';
import Card, { CardBody } from '../components/Card';

const Home: React.FC = () => {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Blood Drive',
      date: 'June 15, 2025',
      location: 'Central Hospital',
      image: 'https://images.pexels.com/photos/4226902/pexels-photo-4226902.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'University Donation Day',
      date: 'June 22, 2025',
      location: 'State University',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Corporate Donor Event',
      date: 'July 5, 2025',
      location: 'Tech Plaza',
      image: 'https://images.pexels.com/photos/6823553/pexels-photo-6823553.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-primary-900 to-primary-700 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/6823447/pexels-photo-6823447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
              Be a hero. <br />
              <span className="text-white">Donate blood.</span>
            </h1>
            <p className="mt-4 text-xl text-white opacity-90 md:pr-10 animate-slide-in">
              Your donation can save up to three lives. Join our community of donors and make a difference today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="animate-fade-in">
                  Donate Now
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 animate-fade-in">
                  Find Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Donate Blood?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Your donation makes a real difference in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <Card className="text-center p-6 transition-all duration-300 hover:shadow-lg">
              <div className="rounded-full bg-primary-100 p-4 inline-flex mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Lives</h3>
              <p className="text-gray-600">
                A single donation can save up to three lives and help patients undergoing surgeries, cancer treatments, and managing chronic illnesses.
              </p>
            </Card>

            {/* Benefit 2 */}
            <Card className="text-center p-6 transition-all duration-300 hover:shadow-lg">
              <div className="rounded-full bg-secondary-100 p-4 inline-flex mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact</h3>
              <p className="text-gray-600">
                Blood can't be manufactured – it can only come from generous donors. Your donation directly helps your local community.
              </p>
            </Card>

            {/* Benefit 3 */}
            <Card className="text-center p-6 transition-all duration-300 hover:shadow-lg">
              <div className="rounded-full bg-accent-100 p-4 inline-flex mx-auto mb-4">
                <Droplet className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Benefits</h3>
              <p className="text-gray-600">
                Regular blood donors receive free health screenings and can reduce the risk of heart attacks and lower cancer risk.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Donating blood is a simple process that takes less than an hour
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="ml-4 text-xl font-semibold text-gray-900">Register</div>
              </div>
              <p className="text-gray-600 ml-14">
                Create an account and complete a quick health questionnaire to determine eligibility.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="ml-4 text-xl font-semibold text-gray-900">Book</div>
              </div>
              <p className="text-gray-600 ml-14">
                Schedule an appointment at a convenient donation center or mobile blood drive near you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="ml-4 text-xl font-semibold text-gray-900">Donate</div>
              </div>
              <p className="text-gray-600 ml-14">
                The donation process takes about 10-15 minutes, followed by a short rest and refreshments.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Donation Events</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Find a blood drive near you and schedule your next donation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardBody>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <CalendarCheck size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <Link to="/events">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/events">
              <Button variant="outline" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make a difference?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join our community of donors today and help save lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;