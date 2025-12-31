import type { Lecturer } from '../types/lecturer';

// Lecturer Authentication Data
export const lecturerCredentials: Array<{
  id: string;
  email: string;
  password: string;
  lecturer: Lecturer;
}> = [
  {
    id: 'LEC001',
    email: 'sarah.johnson@university.edu',
    password: 'lecturer123',
    lecturer: {
      id: 'LEC001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      department: 'Computer Science',
      employeeId: 'EMP001',
      courses: ['CS101', 'CS201']
    }
  },
  {
    id: 'LEC002',
    email: 'michael.brown@university.edu',
    password: 'lecturer123',
    lecturer: {
      id: 'LEC002',
      name: 'Prof. Michael Brown',
      email: 'michael.brown@university.edu',
      department: 'Mathematics',
      employeeId: 'EMP002',
      courses: ['MATH101', 'MATH201']
    }
  },
  {
    id: 'LEC003',
    email: 'emily.davis@university.edu',
    password: 'lecturer123',
    lecturer: {
      id: 'LEC003',
      name: 'Dr. Emily Davis',
      email: 'emily.davis@university.edu',
      department: 'Physics',
      employeeId: 'EMP003',
      courses: ['PHY101', 'PHY201']
    }
  }
];

// Helper functions
export const authenticateLecturer = (email: string, password: string) => {
  return lecturerCredentials.find(cred => cred.email === email && cred.password === password);
};

export const getLecturerById = (id: string) => {
  const cred = lecturerCredentials.find(cred => cred.id === id);
  return cred?.lecturer;
};