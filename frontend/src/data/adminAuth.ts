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
    email: 'admin@university.edu',
    password: 'admin123',
    admin: {
      id: 'ADM001',
      name: 'System Administrator',
      email: 'admin@university.edu',
      role: 'super_admin',
      permissions: ['all']
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
      role: 'admin',
      permissions: ['manage_users', 'view_reports', 'manage_courses']
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