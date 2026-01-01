import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockStudents } from '../../data/mockStudentData';
import { mockLecturers } from '../../data/mockLecturerData';
import { mockAdmins } from '../../data/mockAdminData';
import type { Student } from '../../types/student';
import type { Lecturer } from '../../types/lecturer';
import type { Admin } from '../../types/admin';
import AddUserModal from '../../components/modals/AddUserModal';

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'lecturers' | 'admins'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleUserCreated = () => {
    // Refresh data or show success message
    console.log('User created successfully');
    setShowAddUserModal(false);
  };

  const tabs = [
    { id: 'students', label: 'Students', count: mockStudents.length },
    { id: 'lecturers', label: 'Lecturers', count: mockLecturers.length },
    { id: 'admins', label: 'Admins', count: mockAdmins.length }
  ];

  const getFilteredUsers = () => {
    let users: (Student | Lecturer | Admin)[] = [];

    switch (activeTab) {
      case 'students':
        users = mockStudents;
        break;
      case 'lecturers':
        users = mockLecturers;
        break;
      case 'admins':
        users = mockAdmins;
        break;
    }

    if (searchTerm) {
      return users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return users;
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'student':
        return 'bg-green-100 text-green-800';
      case 'lecturer':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderUserTable = () => {
    const users = getFilteredUsers();

    return (
      <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {activeTab} Management
            </h3>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 font-medium text-gray-700 bg-gray-300 rounded-full">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {activeTab === 'students' && 'course' in user && user.course}
                      {activeTab === 'lecturers' && 'department' in user && user.department}
                      {activeTab === 'admins' && 'role' in user && user.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {user.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status="success">Active</StatusBadge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-gray-600">Manage students, lecturers, and administrators</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="max-w-md">
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
            Search Users
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex px-6 space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderUserTable()}
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onUserCreated={handleUserCreated}
        userType={activeTab === 'admins' ? 'admin' : activeTab === 'lecturers' ? 'lecturer' : 'student'}
      />
    </div>
  );
};

export default Users;
