import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  PlusCircle, 
  LogOut, 
  X,
  Droplet, 
  MapPin,
  UserCog
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  const navItems = [
  
    { name: 'Donors', icon: <Users size={20} />, path: '/admin/donors' },
    { name: 'Add Event', icon: <PlusCircle size={20} />, path: '/admin/add-event' },
    { name: 'Centers Map', icon: <MapPin size={20} />, path: '/admin/AddCenters' },
    { name: 'User Management', icon: <UserCog size={20} />, path: '/admin/users' },
    { name: 'User Tracking', icon: <UserCog size={20} />, path: '/admin/userTracking' }
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin/donors';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 md:hidden"
        >
          <X size={24} />
        </button>
        
        {/* Logo */}
        <div className="flex items-center px-6 py-4 h-16 border-b border-gray-200">
          <Droplet className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">BloodHeroes</span>
        </div>
        
        {/* Nav Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className={isActive(item.path) ? 'text-primary-600' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
          >
            <LogOut size={20} className="text-gray-500" />
            <span className="ml-3">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;