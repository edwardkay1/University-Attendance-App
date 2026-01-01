export interface Lecturer {
  id: string;
  name: string;
  email: string;
  department: string;
  employeeId: string;
  facultyId: string;
  courses: string[];
  isApproved: boolean;
  createdAt: string;
  approvedBy?: string; // Admin ID who approved
  approvedAt?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  facultyId: string;
  lecturerId: string;
  schedule: CourseSchedule[];
  isApproved: boolean;
  createdAt: string;
  approvedBy?: string; // Admin ID who approved
  approvedAt?: string;
}

export interface CourseSchedule {
  id: string;
  day: string;
  time: string;
  location: string;
  duration: number; // in minutes
}

export interface QRCodeSession {
  id: string;
  courseId: string;
  courseName: string;
  lecturerId: string;
  lecturerName: string;
  date: string;
  time: string;
  location: string;
  qrData: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}
