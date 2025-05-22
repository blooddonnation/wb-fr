import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle, Search, Filter, Download, PlusCircle, Trash2 } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface Event {
  id: number;
  date: string;
  center: {
    id: number;
    name: string;
  };
}

const AddEvent: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    address: '',
    capacity: '',
    description: '',
    staffNeeded: '',
    bloodTypesNeeded: [] as string[],
    imageUrl: '',
    centerId: '1',
  });

  // Events list state
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('http://localhost:8083/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      setErrorMessage(error.message || 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8083/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(events.filter(event => event.id !== eventId));
    } catch (error: any) {
      console.error('Error deleting event:', error);
      setErrorMessage(error.message || 'Failed to delete event');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleBloodTypeChange = (type: string) => {
    const newBloodTypes = formData.bloodTypesNeeded.includes(type)
      ? formData.bloodTypesNeeded.filter(t => t !== type)
      : [...formData.bloodTypesNeeded, type];
    
    setFormData({
      ...formData,
      bloodTypesNeeded: newBloodTypes,
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.capacity) {
      newErrors.capacity = 'Donor capacity is required';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be a positive number';
    }
    
    if (!formData.staffNeeded) {
      newErrors.staffNeeded = 'Number of staff needed is required';
    } else if (isNaN(Number(formData.staffNeeded)) || Number(formData.staffNeeded) <= 0) {
      newErrors.staffNeeded = 'Staff needed must be a positive number';
    }
    
    if (formData.bloodTypesNeeded.length === 0) {
      newErrors.bloodTypesNeeded = 'Select at least one blood type';
    }

    if (!formData.centerId) {
      newErrors.centerId = 'Center ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8083/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          location: formData.location,
          address: formData.address,
          capacity: Number(formData.capacity),
          description: formData.description,
          staffNeeded: Number(formData.staffNeeded),
          bloodTypesNeeded: formData.bloodTypesNeeded,
          imageUrl: formData.imageUrl,
          center: { id: Number(formData.centerId) },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      const data = await response.json();
      alert('Event created successfully!');
      setFormData({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        address: '',
        capacity: '',
        description: '',
        staffNeeded: '',
        bloodTypesNeeded: [],
        imageUrl: '',
        centerId: '1',
      });
      setShowAddForm(false);
      fetchEvents(); // Refresh the events list
    } catch (err: any) {
      alert(`Error creating event: ${err.message || 'Please try again.'}`);
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (event.center?.name?.toLowerCase() || '').includes(searchLower) ||
      (event.date?.toLowerCase() || '').includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Events Management</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage blood donation events</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center" onClick={() => setShowAddForm(!showAddForm)}>
            <PlusCircle size={16} className="mr-2" />
            <span>{showAddForm ? 'View Events' : 'Add New Event'}</span>
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

      {showAddForm ? (
        // Add Event Form
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Details Card */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Event Details</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Input
                      id="title"
                      name="title"
                      label="Event Title"
                      value={formData.title}
                      onChange={handleChange}
                      error={errors.title}
                      placeholder="e.g., Community Blood Drive"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      label="Event Date"
                      value={formData.date}
                      onChange={handleChange}
                      error={errors.date}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        label="Start Time"
                        value={formData.startTime}
                        onChange={handleChange}
                        error={errors.startTime}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        label="End Time"
                        value={formData.endTime}
                        onChange={handleChange}
                        error={errors.endTime}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Input
                      id="location"
                      name="location"
                      label="Location Name"
                      value={formData.location}
                      onChange={handleChange}
                      error={errors.location}
                      placeholder="e.g., Central Hospital"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Input
                      id="address"
                      name="address"
                      label="Address"
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                      placeholder="Full address of the event"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      label="Donor Capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      error={errors.capacity}
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      id="staffNeeded"
                      name="staffNeeded"
                      type="number"
                      label="Staff Needed"
                      value={formData.staffNeeded}
                      onChange={handleChange}
                      error={errors.staffNeeded}
                      min="1"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Provide details about the event, special instructions, or requirements"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Input
                      id="centerId"
                      name="centerId"
                      type="number"
                      label="Center ID"
                      value={formData.centerId}
                      onChange={handleChange}
                      error={errors.centerId}
                      placeholder="Enter the Center ID for this event"
                      required
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Blood Types Card */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Blood Types Needed</h2>
              </CardHeader>
              <CardBody>
                <div>
                  <p className="text-sm text-gray-500 mb-4">Select all blood types that are needed for this donation event.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {bloodTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          id={`bloodType-${type}`}
                          name="bloodTypesNeeded"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formData.bloodTypesNeeded.includes(type)}
                          onChange={() => handleBloodTypeChange(type)}
                        />
                        <label htmlFor={`bloodType-${type}`} className="ml-2 block text-sm text-gray-900">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {errors.bloodTypesNeeded && (
                    <p className="mt-2 text-sm text-error-500">{errors.bloodTypesNeeded}</p>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Image Upload Card */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Event Image</h2>
              </CardHeader>
              <CardBody>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter URL for event image (optional)"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter a URL for an image to be displayed with your event, or leave blank to use a default image.
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Create Event
              </Button>
            </div>
          </div>
        </form>
      ) : (
        // Events List View
        <>
          {/* Filters and Search */}
          <Card>
            <CardBody>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Events Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Center Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Loading events...
                      </td>
                    </tr>
                  ) : filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{event.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {event.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {event.center.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredEvents.length}</span> of <span className="font-medium">{events.length}</span> events
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
        </>
      )}
    </div>
  );
};

export default AddEvent;