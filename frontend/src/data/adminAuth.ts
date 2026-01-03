import type { Admin } from '../types/admin';

// Admin Authentication Data
export const adminCredentials: Array<{
  id: string;
  email: string;
  password: string;
  admin: Admin;
}> = [
  {
    id: 'ADM001',
    email: 'edward@university',
    password: 'admin123',
    admin: {
      id: 'ADM001',
      name: 'System Administrator',
      email: 'admin@university.edu',
      role: 'super_admin',
      permissions: ['all'],
      isApproved: true,
      createdAt: '2024-01-01T00:00:00Z'
    }
  },
  {
    id: 'ADM002',
    email: 'attendance@university.edu',
    password: 'admin123',
    admin: {
      id: 'ADM002',
      name: 'Attendance Manager',
      email: 'attendance@university.edu',
      role: 'faculty_admin',
      facultyId: 'engineering',
      permissions: ['manage_users', 'view_reports', 'manage_courses'],
      isApproved: true,
      createdAt: '2024-01-01T00:00:00Z'
    }
  }
];

// Helper functions
export const authenticateAdmin = (email: string, password: string) => {
  return adminCredentials.find(cred => cred.email === email && cred.password === password);
};

export const getAdminById = (id: string) => {
  const cred = adminCredentials.find(cred => cred.id === id);
  return cred?.admin;
};