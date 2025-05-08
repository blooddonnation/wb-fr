import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, AlertCircle } from 'lucide-react';
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [showPopupWarning, setShowPopupWarning] = useState(false);

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
      
      localStorage.setItem('access_token', tokenResponse.access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      navigate('/admin');
    } catch (err) {
      setError('Failed to get user information');
      console.error('Google auth error:', err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
      setShowPopupWarning(true);
      setError('Google login failed. Please check if popups are blocked in your browser.');
    },
    flow: 'implicit',
    scope: 'email profile',
    popup_type: 'window',
    ux_mode: 'popup'
  });

  const handleGoogleLoginClick = () => {
    setError('');
    setShowPopupWarning(false);
    googleLogin();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (email === 'admin@example.com' && password === 'password') {
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Droplet className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            register if you don't have an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <CardBody>
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {showPopupWarning && (
              <div className="bg-warning-50 border border-warning-200 text-warning-700 px-4 py-3 rounded relative mb-4" role="alert">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Please enable popups for this site to use Google Sign-In</span>
                </div>
                <ol className="list-decimal ml-5 mt-2 text-sm">
                  <li>Look for the popup blocked icon in your browser's address bar</li>
                  <li>Click it and select "Always allow popups from this site"</li>
                  <li>Try signing in with Google again</li>
                </ol>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={handleGoogleLoginClick}
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

export default Login;