import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import Input from '../components/Input';
import Button from '../components/Button';
import Card, { CardBody } from '../components/Card';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodType: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [user, setUser] = useState<GoogleUser | null>(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

  const handleGoogleSuccess = async (tokenResponse: { access_token: string }) => {
    try {
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      
      if (!userInfo.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userData = await userInfo.json();
      setUser(userData);
      
      // Store the access token in localStorage
      localStorage.setItem('access_token', tokenResponse.access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Pre-fill the form with Google user data
      setFormData(prev => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || '',
      }));
      
      // Clear any existing errors
      setErrors({});
    } catch (err) {
      setSubmissionError('Failed to get user information');
      console.error('Google auth error:', err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setSubmissionError('Google login failed'),
    flow: 'implicit'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.bloodType) {
      newErrors.bloodType = 'Please select your blood type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here you would have your actual registration logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setSubmissionError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center">
          <Droplet className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in if you already have an account
          </Link>
        </p>
      </div>

      <div className="mt-8 max-w-md mx-auto">
        <Card className="py-8 px-4 sm:px-10">
          <CardBody>
            {submissionError && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{submissionError}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                label="Full Name"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                helper="Password must be at least 8 characters"
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <div className="w-full">
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className={`
                    w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-primary-500 focus:border-primary-500
                    ${errors.bloodType ? 'border-error-500' : 'border-gray-300'}
                  `}
                  required
                >
                  <option value="">Select your blood type</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.bloodType && <p className="mt-1 text-sm text-error-500">{errors.bloodType}</p>}
              </div>

              <Input
                id="location"
                name="location"
                type="text"
                label="Location (optional)"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                helper="City, State or Country"
              />

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Register
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or register with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => googleLogin()}
                >
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google" 
                    className="w-5 h-5 mr-2"
                  />
                  Continue with Google
                </Button>
              </div>

              {user && (
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;