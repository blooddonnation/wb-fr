import React from 'react';
import { Heart, Shield, Award, Globe, Map, Activity } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About BloodHeroes</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              We connect voluntary blood donors with those in need, helping to ensure 
              that hospitals and medical facilities have access to safe and sufficient blood supplies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At BloodHeroes, our mission is to ensure no one dies due to lack of blood. We work 
              to mobilize donors, modernize the donation process, and educate communities 
              about the importance of regular blood donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Point 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary-100 mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Lives</h3>
              <p className="text-gray-600">
                We connect donors with recipients to ensure timely access to safe blood supplies for those in need.
              </p>
            </div>

            {/* Mission Point 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary-100 mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ensure Safety</h3>
              <p className="text-gray-600">
                We maintain the highest standards for blood collection, testing, and distribution to protect both donors and recipients.
              </p>
            </div>

            {/* Mission Point 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary-100 mb-4">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Community</h3>
              <p className="text-gray-600">
                We foster a community of regular donors who understand the vital importance of blood donation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <img 
                  src="https://images.pexels.com/photos/6823559/pexels-photo-6823559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Blood donation"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  BloodHeroes began in 2020 when our founder, Dr. Sarah Chen, witnessed firsthand the critical shortage 
                  of blood during emergency situations. As an emergency physician, she saw patients whose lives were at risk 
                  simply due to lack of available blood.
                </p>
                <p className="text-gray-600 mb-4">
                  Determined to make a difference, Dr. Chen assembled a team of healthcare professionals, 
                  technology experts, and community organizers to create a platform that would streamline the 
                  blood donation process and connect donors directly with local needs.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, BloodHeroes operates in 12 states with a community of over 50,000 registered donors 
                  who have collectively helped save more than 100,000 lives through their generous donations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button>Join Our Mission</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every donation makes a difference. Here's how our community is changing lives every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">50,000+</p>
              <p className="text-gray-700 font-medium">Registered Donors</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">100,000+</p>
              <p className="text-gray-700 font-medium">Lives Saved</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">1,200+</p>
              <p className="text-gray-700 font-medium">Donation Events</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">12</p>
              <p className="text-gray-700 font-medium">States Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind BloodHeroes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="h-48 bg-gray-300">
                <img 
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Dr. Sarah Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Sarah Chen</h3>
                <p className="text-primary-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Emergency physician with 15+ years of experience and a passion for improving healthcare access.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="h-48 bg-gray-300">
                <img 
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Dr. Michael Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Michael Rodriguez</h3>
                <p className="text-primary-600 mb-3">Medical Director</p>
                <p className="text-gray-600 text-sm">
                  Hematologist specializing in blood disorders with a focus on transfusion medicine.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="h-48 bg-gray-300">
                <img 
                  src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Alex Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Alex Johnson</h3>
                <p className="text-primary-600 mb-3">Technology Director</p>
                <p className="text-gray-600 text-sm">
                  Tech entrepreneur with expertise in creating healthcare platforms that connect communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with leading healthcare organizations to expand our reach and impact
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Partner logos would go here - using colored boxes as placeholders */}
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">Hospital Network</div>
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">Medical Research</div>
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">Healthcare Alliance</div>
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">Community Health</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission Today</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Whether you're a donor, volunteer, or partner organization, there's a place for you in our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-primary-600 hover:bg-gray-100">
                Become a Donor
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;