import type { Student } from '../types/student';

// Student Authentication Data
export const studentCredentials: Array<{
  id: string;
  email: string;
  password: string;
  student: Student;
}> = [
  {
    id: 'STU001',
    email: 'alice.johnson@university.edu',
    password: 'student123',
    student: {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@university.edu',
      studentId: 'STU001',
      course: 'Computer Science',
      year: 3,
      facultyId: 'engineering',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU002',
    email: 'bob.smith@university.edu',
    password: 'student123',
    student: {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@university.edu',
      studentId: 'STU002',
      course: 'Computer Science',
      year: 2,
      facultyId: 'engineering',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU003',
    email: 'charlie.brown@university.edu',
    password: 'student123',
    student: {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie.brown@university.edu',
      studentId: 'STU003',
      course: 'Mathematics',
      year: 1,
      facultyId: 'science',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU004',
    email: 'diana.wilson@university.edu',
    password: 'student123',
    student: {
      id: '4',
      name: 'Diana Wilson',
      email: 'diana.wilson@university.edu',
      studentId: 'STU004',
      course: 'Physics',
      year: 4,
      facultyId: 'science',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU005',
    email: 'eve.davis@university.edu',
    password: 'student123',
    student: {
      id: '5',
      name: 'Eve Davis',
      email: 'eve.davis@university.edu',
      studentId: 'STU005',
      course: 'Chemistry',
      year: 2,
      facultyId: 'science',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU006',
    email: 'frank.miller@university.edu',
    password: 'student123',
    student: {
      id: '6',
      name: 'Frank Miller',
      email: 'frank.miller@university.edu',
      studentId: 'STU006',
      course: 'Biology',
      year: 3,
      facultyId: 'science',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU007',
    email: 'george.miller@university.edu',
    password: 'student123',
    student: {
      id: '7',
      name: 'George Miller',
      email: 'george.miller@university.edu',
      studentId: 'STU007',
      course: 'Engineering',
      year: 2,
      facultyId: 'engineering',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU008',
    email: 'helen.taylor@university.edu',
    password: 'student123',
    student: {
      id: '8',
      name: 'Helen Taylor',
      email: 'helen.taylor@university.edu',
      studentId: 'STU008',
      course: 'Business',
      year: 3,
      facultyId: 'business',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU009',
    email: 'ian.anderson@university.edu',
    password: 'student123',
    student: {
      id: '9',
      name: 'Ian Anderson',
      email: 'ian.anderson@university.edu',
      studentId: 'STU009',
      course: 'History',
      year: 4,
      facultyId: 'arts',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  },
  {
    id: 'STU010',
    email: 'julia.martinez@university.edu',
    password: 'student123',
    student: {
      id: '10',
      name: 'Julia Martinez',
      email: 'julia.martinez@university.edu',
      studentId: 'STU010',
      course: 'Literature',
      year: 2,
      facultyId: 'arts',
      isApproved: true,
      createdAt: '2024-01-15T10:00:00Z'
    }
  }
];

// Helper functions
export const authenticateStudent = (email: string, password: string) => {
  return studentCredentials.find(cred => cred.email === email && cred.password === password);
};

export const getStudentById = (id: string) => {
  const cred = studentCredentials.find(cred => cred.id === id);
  return cred?.student;
};