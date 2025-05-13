import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, PlusCircle } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface Donation {
  donationId: string;
  userId: string;
  recipientType: string;
  recipientId: string;
  recipientName: string;
  volume: number;
  donationDate: string;
  location: string;
  pointsEarned: number;
}

const DonationHistory: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipientType, setSelectedRecipientType] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDonation, setNewDonation] = useState({
    recipientType: 'bloodcenter',
    recipientName: '',
    volume: 0,
    location: '',
  });
  const [loadingUsernames, setLoadingUsernames] = useState(false);
  const [errorUsernames, setErrorUsernames] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch usernames and donation history on component mount
  useEffect(() => {
    const fetchUsernames = async () => {
      setLoadingUsernames(true);
      setErrorUsernames(null);
      try {
        const token = localStorage.getItem('jwt_token');
        console.log('Fetching usernames with token:', token);
        if (!token) {
          throw new Error('No JWT token found. Please log in.');
        }
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        console.log('Usernames request headers:', headers);
        const response = await fetch('http://localhost:8080/api/auth/users/usernames', {
          headers: headers,
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch usernames: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setUsernames(data);
      } catch (error: any) {
        console.error('Error fetching usernames:', error);
        setErrorUsernames(error.message || 'Failed to load usernames');
      } finally {
        setLoadingUsernames(false);
      }
    };

    const fetchDonationHistory = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        console.log('Fetching donation history with token:', token);
        if (!token) {
          throw new Error('No JWT token found. Please log in.');
        }
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        console.log('Donation history request headers:', headers);
        const response = await fetch('http://localhost:8081/api/donations/history', {
          headers: headers,
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
          throw new Error(`Failed to fetch donation history: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setDonations(data);
      } catch (error: any) {
        console.error('Error fetching donation history:', error);
        setErrorMessage(error.message || 'Failed to load donation history');
        setDonations([]);
      }
    };

    fetchUsernames();
    fetchDonationHistory();
  }, []);

  // Handle form submission to add a new donation
  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const token = localStorage.getItem('jwt_token');
      console.log('Adding donation with token:', token);
      if (!token) {
        throw new Error('No JWT token found. Please log in.');
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log('Add donation request headers:', headers, 'Data:', {
        ...newDonation,
        recipientId: 'center1',
      });
      const response = await fetch('http://localhost:8081/api/donations', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          ...newDonation,
          recipientId: 'center1',
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        throw new Error(`Failed to add donation: ${response.status} - ${errorText}`);
      }
      const savedDonation = await response.json();
      setDonations([...donations, savedDonation]);
      setShowAddForm(false);
      setNewDonation({ recipientType: 'bloodcenter', recipientName: '', volume: 0, location: '' });
    } catch (error: any) {
      console.error('Error adding donation:', error);
      setErrorMessage(error.message || 'Failed to add donation');
    }
  };

  // Filter donations based on search query and recipient type
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRecipientType = selectedRecipientType === '' ||
                                 selectedRecipientType === 'All Types' ||
                                 donation.recipientType === selectedRecipientType;
    return matchesSearch && matchesRecipientType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Donation History</h1>
          <p className="mt-1 text-sm text-gray-500">View your donation history</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center" onClick={() => setShowAddForm(true)}>
            <PlusCircle size={16} className="mr-2" />
            <span>Add New Donation</span>
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      {/* Add Donation Form */}
      {showAddForm && (
        <Card>
          <CardBody>
            <form onSubmit={handleAddDonation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Type</label>
                  <select
                    value={newDonation.recipientType}
                    onChange={(e) => setNewDonation({ ...newDonation, recipientType: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="bloodcenter">Blood Center</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
                  {loadingUsernames ? (
                    <div className="mt-1 text-sm text-gray-500">Loading usernames...</div>
                  ) : errorUsernames ? (
                    <div className="mt-1 text-sm text-error-500">{errorUsernames}</div>
                  ) : (
                    <select
                      value={newDonation.recipientName}
                      onChange={(e) => setNewDonation({ ...newDonation, recipientName: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select a recipient</option>
                      {usernames.map((username) => (
                        <option key={username} value={username}>
                          {username}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Volume (mL)</label>
                  <Input
                    type="number"
                    value={newDonation.volume}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewDonation({
                        ...newDonation,
                        volume: value === '' ? 0 : isNaN(parseInt(value)) ? newDonation.volume : parseInt(value),
                      });
                    }}
                    placeholder="e.g., 450"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <Input
                    type="text"
                    value={newDonation.location}
                    onChange={(e) => setNewDonation({ ...newDonation, location: e.target.value })}
                    placeholder="e.g., City Hospital"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex items-center">
                  <PlusCircle size={16} className="mr-2" />
                  <span>Submit Donation</span>
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <select
                  value={selectedRecipientType}
                  onChange={(e) => setSelectedRecipientType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Recipient Types</option>
                  <option value="bloodcenter">Blood Center</option>
                  <option value="user">User</option>
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

      {/* Donation History Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donation ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume (mL)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donation Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points Earned
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.donationId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{donation.donationId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.recipientType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.recipientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.volume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.donationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donation.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{donation.pointsEarned}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredDonations.length}</span> of <span className="font-medium">{donations.length}</span> donations
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

export default DonationHistory;