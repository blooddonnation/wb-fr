import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm z-10 py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 md:ml-0 text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell size={20} />
          </button>
          
          <div className="relative">
            <button className="flex items-center text-sm focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="ml-2 hidden md:block font-medium text-gray-700">Admin User</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;