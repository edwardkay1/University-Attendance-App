import React, { useState } from 'react';
import { mockFaculties, mockAdmins } from '../../data/mockAdminData';
import type { Faculty, Admin } from '../../types/admin';
import AddUserModal from '../../components/modals/AddUserModal';

const SuperAdminDashboard: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>(mockFaculties);
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const facultyAdmins = admins.filter(admin => admin.role === 'faculty_admin');
  const superAdmins = admins.filter(admin => admin.role === 'super_admin');

  const handleAddAdmin = () => {
    setShowAddAdminModal(true);
  };

  const handleAdminCreated = () => {
    // Refresh admin list
    console.log('Admin created successfully');
    setShowAddAdminModal(false);
  };

  const handleToggleAdminStatus = (adminId: string) => {
    setAdmins(prev => prev.map(admin =>
      admin.id === adminId
        ? { ...admin, isApproved: !admin.isApproved }
        : admin
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="mt-1 text-gray-600">System-wide management and faculty administration</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleAddAdmin}
            className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Faculty Admin
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Faculties</p>
              <p className="text-2xl font-bold text-gray-900">{faculties.length}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Faculty Admins</p>
              <p className="text-2xl font-bold text-gray-900">{facultyAdmins.length}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Super Admins</p>
              <p className="text-2xl font-bold text-gray-900">{superAdmins.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Management */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Faculty Management</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {faculties.map((faculty) => {
            const facultyAdmin = facultyAdmins.find(admin => admin.facultyId === faculty.id);
            return (
              <div key={faculty.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{faculty.name}</h4>
                  <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    {faculty.domain}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  Dean: {faculty.deanId ? `Lecturer ${faculty.deanId}` : 'Not assigned'}
                </p>
                <p className="text-sm text-gray-600">
                  Admin: {facultyAdmin ? facultyAdmin.name : 'Not assigned'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Management */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">System Administrators</h3>
        <div className="space-y-4">
          {admins.map((admin) => (
            <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{admin.name}</h4>
                <p className="text-sm text-gray-600">{admin.email}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    admin.role === 'super_admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {admin.role === 'super_admin' ? 'Super Admin' : 'Faculty Admin'}
                  </span>
                  {admin.facultyId && (
                    <span className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                      {admin.facultyId}
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    admin.isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {admin.isApproved ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleAdminStatus(admin.id)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    admin.isApproved
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {admin.isApproved ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Admin Modal */}
      <AddUserModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onUserCreated={handleAdminCreated}
        userType="admin"
      />
    </div>
  );
};

export default SuperAdminDashboard;