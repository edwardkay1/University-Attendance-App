import type { Admin, Faculty, SystemStats, CourseStats, ActivityLog } from '../types/admin';
import type { Student } from '../types/student';
import type { Lecturer, Course } from '../types/lecturer';
import { mockStudents, mockAttendanceRecords } from './mockStudentData';
import { mockLecturers, mockCourses, mockQRCodeSessions } from './mockLecturerData';

// Faculty Mock Data
export const mockFaculties: Faculty[] = [
  {
    id: 'science',
    name: 'Faculty of Science',
    domain: 'science',
    deanId: 'LEC001'
  },
  {
    id: 'agriculture',
    name: 'Faculty of Agriculture',
    domain: 'agriculture',
    deanId: 'LEC002'
  },
  {
    id: 'fobe',
    name: 'Faculty of Business and Economics',
    domain: 'fobe',
    deanId: 'LEC003'
  }
];

// Admin Mock Data
export const mockAdmins: Admin[] = [
  {
    id: 'ADM001',
    name: 'System Administrator',
    email: 'admin@university.edu',
    role: 'super_admin',
    permissions: ['all'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM002',
    name: 'Science Faculty Admin',
    email: 'science.admin@university.edu',
    role: 'faculty_admin',
    facultyId: 'science',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM003',
    name: 'Agriculture Faculty Admin',
    email: 'agriculture.admin@university.edu',
    role: 'faculty_admin',
    facultyId: 'agriculture',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM004',
    name: 'FOBE Faculty Admin',
    email: 'fobe.admin@university.edu',
    role: 'faculty_admin',
    facultyId: 'fobe',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'LOG001',
    userId: 'STU001',
    userType: 'student',
    action: 'attendance_marked',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    details: 'Marked present for CS101'
  },
  {
    id: 'LOG002',
    userId: 'LEC001',
    userType: 'lecturer',
    action: 'qr_generated',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    details: 'Generated QR code for CS101'
  },
  {
    id: 'LOG003',
    userId: 'ADM001',
    userType: 'admin',
    action: 'user_created',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    details: 'Created new student account'
  }
];

// Admin Helper Functions
export const getAdminById = (id: string): Admin | undefined => {
  return mockAdmins.find(admin => admin.id === id);
};

export const getSystemStats = (): SystemStats => {
  return {
    totalStudents: mockStudents.length,
    totalLecturers: mockLecturers.length,
    totalCourses: mockCourses.length,
    totalAttendanceRecords: mockAttendanceRecords.length,
    activeQRSessions: mockQRCodeSessions.filter(session => session.isActive).length,
    systemHealth: 'healthy' // In a real app, this would be calculated based on system metrics
  };
};

export const getCourseStats = (): CourseStats[] => {
  return mockCourses.map(course => {
    const courseAttendance = mockAttendanceRecords.filter(record =>
      record.subject.toLowerCase().includes(course.code.toLowerCase())
    );

    const totalClasses = course.schedule.length * 4; // Assuming 4 weeks per month
    const presentCount = courseAttendance.filter(record => record.status === 'present').length;
    const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

    return {
      courseId: course.id,
      courseName: course.name,
      totalStudents: mockStudents.filter(student =>
        student.course.toLowerCase().includes(course.department.toLowerCase()) ||
        course.department.toLowerCase().includes(student.course.toLowerCase())
      ).length,
      averageAttendance: attendanceRate,
      totalClasses,
      attendanceRate
    };
  });
};

export const getRecentActivity = (limit: number = 10): ActivityLog[] => {
  return mockActivityLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>): void => {
  const newLog: ActivityLog = {
    ...log,
    id: `LOG${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  mockActivityLogs.unshift(newLog);
};
