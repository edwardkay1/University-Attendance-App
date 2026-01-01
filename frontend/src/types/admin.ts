import type { Student } from './student';
import type { Lecturer, Course } from './lecturer';

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'faculty_admin' | 'super_admin';
  facultyId?: string; // For faculty admins
  permissions: string[];
  isApproved: boolean;
  createdAt: string;
}

export interface Faculty {
  id: string;
  name: string;
  domain: string; // e.g., 'engineering', 'science', 'arts'
  deanId?: string;
}

export interface SystemStats {
  totalStudents: number;
  totalLecturers: number;
  totalCourses: number;
  totalAttendanceRecords: number;
  activeQRSessions: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export interface UserManagement {
  students: Student[];
  lecturers: Lecturer[];
  admins: Admin[];
}

export interface CourseManagement {
  courses: Course[];
  departments: string[];
  courseStats: CourseStats[];
}

export interface CourseStats {
  courseId: string;
  courseName: string;
  totalStudents: number;
  averageAttendance: number;
  totalClasses: number;
  attendanceRate: number;
}

export interface SystemSettings {
  qrCodeExpiry: number; // in minutes
  attendanceThreshold: number; // percentage
  emailNotifications: boolean;
  autoBackup: boolean;
  maintenanceMode: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userType: 'student' | 'lecturer' | 'admin';
  action: string;
  timestamp: string;
  details?: string;
}
