import React, { useState } from 'react';
import { Search, Filter, Download, UserPlus, Eye, Edit, Trash2 } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Donors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');

  // Mock data for donors
  const donors = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', bloodType: 'O+', lastDonation: '2025-06-01', location: 'Central Hospital', donations: 5 },
    { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', bloodType: 'A-', lastDonation: '2025-05-15', location: 'Tech Plaza', donations: 3 },
    { id: 3, name: 'Michael Wilson', email: 'michael.w@example.com', bloodType: 'B+', lastDonation: '2025-05-10', location: 'State University', donations: 8 },
    { id: 4, name: 'Sarah Davis', email: 'sarah.d@example.com', bloodType: 'AB+', lastDonation: '2025-04-22', location: 'Community Center', donations: 2 },
    { id: 5, name: 'David Martinez', email: 'david.m@example.com', bloodType: 'O-', lastDonation: '2025-04-05', location: 'Central Hospital', donations: 10 },
    { id: 6, name: 'Jennifer Lee', email: 'jennifer.l@example.com', bloodType: 'A+', lastDonation: '2025-03-30', location: 'State University', donations: 4 },
    { id: 7, name: 'Robert Chen', email: 'robert.c@example.com', bloodType: 'O+', lastDonation: '2025-03-25', location: 'Tech Plaza', donations: 7 },
    { id: 8, name: 'Maria Garcia', email: 'maria.g@example.com', bloodType: 'AB-', lastDonation: '2025-03-20', location: 'Golden Years Center', donations: 6 },
    { id: 9, name: 'James Johnson', email: 'james.j@example.com', bloodType: 'B-', lastDonation: '2025-03-10', location: 'Community Center', donations: 1 },
    { id: 10, name: 'Lisa Thompson', email: 'lisa.t@example.com', bloodType: 'A+', lastDonation: '2025-02-28', location: 'Central Hospital', donations: 9 },
  ];

  const bloodTypes = ['All Types', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         donor.email.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesBloodType = selectedBloodType === '' || 
                           selectedBloodType === 'All Types' || 
                           donor.bloodType === selectedBloodType;
                           
    return matchesSearch && matchesBloodType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Donors</h1>
          <p className="mt-1 text-sm text-gray-500">Manage registered blood donors</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center">
            <UserPlus size={16} className="mr-2" />
            <span>Add New Donor</span>
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search donors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <select
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Blood Types</option>
                  {bloodTypes.slice(1).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline" className="flex items-center">
                <Filter size={16} className="mr-2" />
                <span>More Filters</span>
              </Button>

              <Button variant="outline" className="flex items-center">
                <Download size={16} className="mr-2" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Donors Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Donation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Donations
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{donor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {donor.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donor.lastDonation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donor.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{donor.donations}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-secondary-600 hover:text-secondary-900">
                        <Eye size={18} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit size={18} />
                      </button>
                      <button className="text-error-500 hover:text-error-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredDonors.length}</span> of <span className="font-medium">{donors.length}</span> donors
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled className="px-4">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary-50 text-primary-600 border-primary-300 px-4">
              1
            </Button>
            <Button variant="outline" size="sm" className="px-4">
              2
            </Button>
            <Button variant="outline" size="sm" className="px-4">
              3
            </Button>
            <Button variant="outline" size="sm" className="px-4">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Donors;