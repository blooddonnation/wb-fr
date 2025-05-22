import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, PlusCircle, Trash2, UserCog } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface User {
  id: number;
  username: string;
  email: string;
  bloodType: string;
  role: string;
  dateOfBirth: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        throw new Error('No JWT token found. Please log in.');
      }

      const response = await fetch('http://localhost:8080/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setErrorMessage(error.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        throw new Error('No JWT token found. Please log in.');
      }

      const response = await fetch(`http://localhost:8080/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setErrorMessage(error.message || 'Failed to delete user');
    }
  };

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        throw new Error('No JWT token found. Please log in.');
      }

      const response = await fetch(`http://localhost:8080/api/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error: any) {
      console.error('Error updating user role:', error);
      setErrorMessage(error.message || 'Failed to update user role');
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage user accounts and roles</p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search users..."
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

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.bloodType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowRoleModal(true);
                          }}
                        >
                          <UserCog size={16} className="mr-1" />
                          Change Role
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </Button>
                      </div>
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
            Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
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

      {/* Role Update Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update User Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <p className="mt-1 text-sm text-gray-500">{selectedUser.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Role</label>
                <p className="mt-1 text-sm text-gray-500">{selectedUser.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Role</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  onChange={(e) => handleUpdateRole(selectedUser.id, e.target.value)}
                >
                  <option value="">Select a role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                  <option value="CENTERMANAGER">Center Manager</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 