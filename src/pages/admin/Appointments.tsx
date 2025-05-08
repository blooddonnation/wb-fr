import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, AlertCircle, Check, X } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Appointments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Mock appointment data
  const appointments = [
    {
      id: 1,
      donor: 'John Smith',
      bloodType: 'O+',
      date: '2025-06-15',
      time: '9:30 AM',
      location: 'Central Hospital',
      status: 'confirmed',
      notes: 'Recurring donor, no health issues'
    },
    {
      id: 2,
      donor: 'Emily Johnson',
      bloodType: 'A-',
      date: '2025-06-15',
      time: '10:15 AM',
      location: 'Central Hospital',
      status: 'pending',
      notes: 'First-time donor, check eligibility'
    },
    {
      id: 3,
      donor: 'Michael Wilson',
      bloodType: 'B+',
      date: '2025-06-15',
      time: '11:00 AM',
      location: 'Central Hospital',
      status: 'confirmed',
      notes: 'Has donated 3 times before'
    },
    {
      id: 4,
      donor: 'Sarah Davis',
      bloodType: 'AB+',
      date: '2025-06-15',
      time: '1:45 PM',
      location: 'Central Hospital',
      status: 'cancelled',
      notes: 'Cancelled due to illness'
    },
    {
      id: 5,
      donor: 'David Martinez',
      bloodType: 'O-',
      date: '2025-06-16',
      time: '9:00 AM',
      location: 'State University',
      status: 'confirmed',
      notes: 'Regular donor, preferred right arm'
    },
    {
      id: 6,
      donor: 'Jennifer Lee',
      bloodType: 'A+',
      date: '2025-06-16',
      time: '10:30 AM',
      location: 'State University',
      status: 'pending',
      notes: 'Recently traveled, verify eligibility'
    },
    {
      id: 7,
      donor: 'Robert Chen',
      bloodType: 'O+',
      date: '2025-06-16',
      time: '11:15 AM',
      location: 'State University',
      status: 'confirmed',
      notes: 'Previous donation was 4 months ago'
    },
    {
      id: 8,
      donor: 'Maria Garcia',
      bloodType: 'AB-',
      date: '2025-06-16',
      time: '2:00 PM',
      location: 'State University',
      status: 'completed',
      notes: 'Successfully donated, no issues'
    },
    {
      id: 9,
      donor: 'James Johnson',
      bloodType: 'B-',
      date: '2025-06-17',
      time: '9:45 AM',
      location: 'Tech Plaza',
      status: 'pending',
      notes: 'New donor, needs full screening'
    },
    {
      id: 10,
      donor: 'Lisa Thompson',
      bloodType: 'A+',
      date: '2025-06-17',
      time: '10:45 AM',
      location: 'Tech Plaza',
      status: 'confirmed',
      notes: 'Donated 5 times previously'
    },
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.donor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         appointment.location.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
                           
    return matchesSearch && matchesStatus;
  });

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    if (!groups[appointment.date]) {
      groups[appointment.date] = [];
    }
    groups[appointment.date].push(appointment);
    return groups;
  }, {} as Record<string, typeof appointments>);

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-secondary-100 text-secondary-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage donation appointments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>Schedule Appointment</span>
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
                placeholder="Search by donor or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline" className="flex items-center">
                <Filter size={16} className="mr-2" />
                <span>Date Range</span>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Appointment Calendar */}
      {Object.keys(groupedAppointments).length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-gray-500">Try changing your search criteria or create a new appointment.</p>
            <div className="mt-6">
              <Button>Schedule Appointment</Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        Object.entries(groupedAppointments).map(([date, dayAppointments]) => (
          <Card key={date} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <h2 className="font-semibold text-gray-900">{formatDate(date)}</h2>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dayAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-900">{appointment.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{appointment.donor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {appointment.bloodType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        <div className="flex items-center">
                          {appointment.notes ? (
                            <>
                              <AlertCircle className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="truncate max-w-[150px]">{appointment.notes}</span>
                            </>
                          ) : (
                            <span className="text-gray-400">No notes</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button className="p-1 rounded-full bg-success-100 text-success-600 hover:bg-success-200" title="Confirm">
                                <Check size={16} />
                              </button>
                              <button className="p-1 rounded-full bg-error-100 text-error-600 hover:bg-error-200" title="Cancel">
                                <X size={16} />
                              </button>
                            </>
                          )}
                          <button className="text-primary-600 hover:text-primary-900">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Appointments;