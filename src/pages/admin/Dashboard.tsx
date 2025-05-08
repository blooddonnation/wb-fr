import React from 'react';
import { Users, Droplet, Calendar, TrendingUp, Activity, Award } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  // Mock data for recent donations
  const recentDonations = [
    { id: 1, donor: 'John Smith', bloodType: 'O+', date: '2025-06-01', location: 'Central Hospital' },
    { id: 2, donor: 'Emily Johnson', bloodType: 'A-', date: '2025-05-30', location: 'Tech Plaza' },
    { id: 3, donor: 'Michael Wilson', bloodType: 'B+', date: '2025-05-29', location: 'State University' },
    { id: 4, donor: 'Sarah Davis', bloodType: 'AB+', date: '2025-05-28', location: 'Community Center' },
    { id: 5, donor: 'David Martinez', bloodType: 'O-', date: '2025-05-27', location: 'Central Hospital' },
  ];

  // Mock data for statistics
  const statistics = [
    { id: 1, title: 'Total Donors', value: '1,245', icon: <Users className="h-8 w-8 text-primary-600" />, change: '+12%', color: 'primary' },
    { id: 2, title: 'Donations This Month', value: '156', icon: <Droplet className="h-8 w-8 text-secondary-600" />, change: '+8%', color: 'secondary' },
    { id: 3, title: 'Upcoming Events', value: '12', icon: <Calendar className="h-8 w-8 text-accent-600" />, change: '+2', color: 'accent' },
    { id: 4, title: 'Needed Blood Types', value: 'O-, AB+', icon: <Activity className="h-8 w-8 text-error-500" />, change: 'Urgent', color: 'error' },
  ];

  // Donation by blood type data for the pie chart (would connect to a chart library in a real app)
  const bloodTypeDistribution = [
    { type: 'O+', percentage: 38 },
    { type: 'A+', percentage: 34 },
    { type: 'B+', percentage: 9 },
    { type: 'AB+', percentage: 3 },
    { type: 'O-', percentage: 7 },
    { type: 'A-', percentage: 6 },
    { type: 'B-', percentage: 2 },
    { type: 'AB-', percentage: 1 },
  ];

  // Monthly donations data for the bar chart (would connect to a chart library in a real app)
  const monthlyDonations = [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 135 },
    { month: 'Mar', count: 148 },
    { month: 'Apr', count: 130 },
    { month: 'May', count: 145 },
    { month: 'Jun', count: 156 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of donation activities and statistics</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline" className="flex items-center">
            <span className="mr-2">Export Report</span>
            <TrendingUp size={16} />
          </Button>
          <Button className="flex items-center">
            <span className="mr-2">Add Event</span>
            <Calendar size={16} />
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat) => (
          <Card key={stat.id} className="h-full">
            <CardBody>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`rounded-full p-2 bg-${stat.color}-100`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.color === 'error' ? 'text-error-500' : 'text-success-500'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  {stat.color !== 'error' ? 'from last month' : 'demand'}
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Donations Chart */}
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Monthly Donations</h2>
          </CardHeader>
          <CardBody>
            <div className="h-60 flex items-end justify-between space-x-2">
              {monthlyDonations.map((item) => (
                <div key={item.month} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-primary-500 rounded-t" 
                    style={{ height: `${(item.count / 160) * 100}%`, minHeight: '20px' }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-600">{item.month}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Blood Type Distribution */}
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Blood Type Distribution</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-4 gap-4">
              {bloodTypeDistribution.map((item) => (
                <div key={item.type} className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{item.type}</div>
                  <div 
                    className="mx-auto mt-2 mb-1 rounded-full"
                    style={{ 
                      background: `conic-gradient(#DC2626 ${item.percentage}%, #F3F4F6 0)`,
                      width: '60px',
                      height: '60px'
                    }}
                  ></div>
                  <div className="text-sm text-gray-500">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recent Donations</h2>
          <Button variant="text" className="text-sm">View all</Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{donation.donor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {donation.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-primary-600 hover:text-primary-900 mr-3">View</a>
                    <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recognition Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Donors */}
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Top Donors This Month</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-4">
              {['Sarah Adams', 'Robert Chen', 'Maria Garcia'].map((name, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{3 - index} donations</p>
                  </div>
                  <Award className="ml-auto h-5 w-5 text-yellow-500" />
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Needed Blood Types */}
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Critical Blood Types</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-error-100 text-error-600 font-bold flex items-center justify-center mr-3">
                  O-
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Very Low Supply</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-error-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-warning-100 text-warning-600 font-bold flex items-center justify-center mr-3">
                  AB+
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Low Supply</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-warning-100 text-warning-600 font-bold flex items-center justify-center mr-3">
                  B-
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Low Supply</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Upcoming Events */}
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Next Donation Events</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-4">
              {[
                { name: 'Community Blood Drive', date: 'June 15, 2025', location: 'Central Hospital' },
                { name: 'University Donation Day', date: 'June 22, 2025', location: 'State University' },
                { name: 'Corporate Donor Event', date: 'July 5, 2025', location: 'Tech Plaza' }
              ].map((event, index) => (
                <li key={index} className="flex items-start">
                  <div className="min-w-[40px] h-10 rounded-md bg-secondary-100 text-secondary-700 flex flex-col items-center justify-center mr-3 text-xs">
                    <span className="font-bold text-sm">{event.date.split(' ')[1]}</span>
                    <span>{event.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="text" className="w-full mt-4 justify-center">
              View All Events
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;