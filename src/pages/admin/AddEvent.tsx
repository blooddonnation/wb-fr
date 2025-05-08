import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AddEvent: React.FC = () => {
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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Here you would have your actual event creation logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear form or redirect
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
      });
    } catch (err) {
      alert('Error creating event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add Donation Event</h1>
        <p className="mt-1 text-sm text-gray-500">Create a new blood donation event or drive</p>
      </div>

      {/* Form */}
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

          {/* Image Upload Card (simplified for demo) */}
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Create Event
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;