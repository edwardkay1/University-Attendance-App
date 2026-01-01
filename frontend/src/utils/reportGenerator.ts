import { getSystemStats, getRecentActivity, getCourseStats } from '../data/mockAdminData';

export const generateAttendanceReport = (facultyId?: string, courseId?: string, dateRange?: { start: string; end: string }) => {
  const systemStats = getSystemStats();
  const courseStats = getCourseStats();
  const recentActivity = getRecentActivity(20);

  let reportContent = `
ATTENDANCE SYSTEM REPORT
Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

================================================================================

SYSTEM OVERVIEW
================================================================================
Total Students: ${systemStats.totalStudents}
Total Lecturers: ${systemStats.totalLecturers}
Active Courses: ${systemStats.totalCourses}
Active QR Sessions: ${systemStats.activeQRSessions}
System Health: ${systemStats.systemHealth.toUpperCase()}
Total Attendance Records: ${systemStats.totalAttendanceRecords}

================================================================================

COURSE PERFORMANCE
================================================================================
`;

  courseStats.forEach(course => {
    reportContent += `
Course: ${course.courseName}
Students: ${course.totalStudents}
Average Attendance: ${course.averageAttendance}%
--------------------------------------------------------------------------------
`;
  });

  reportContent += `

================================================================================

RECENT ACTIVITY (Last 20 entries)
================================================================================
`;

  recentActivity.forEach(activity => {
    const timestamp = new Date(activity.timestamp).toLocaleString();
    reportContent += `${timestamp} - ${activity.userType.toUpperCase()} - ${activity.action.replace('_', ' ')} - ${activity.details}\n`;
  });

  reportContent += `

================================================================================
END OF REPORT
================================================================================
`;

  return reportContent;
};

export const generateStudentsReport = (facultyId?: string) => {
  const { mockStudents } = require('../data/mockStudentData');

  let reportContent = `
STUDENTS REPORT
Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

================================================================================

`;

  mockStudents.forEach((student: any, index: number) => {
    if (!facultyId || student.facultyId === facultyId) {
      reportContent += `
Student #${index + 1}
Name: ${student.name}
Email: ${student.email}
Student ID: ${student.studentId}
Faculty: ${student.facultyId}
Status: ${student.isApproved ? 'Approved' : 'Pending Approval'}
--------------------------------------------------------------------------------
`;
    }
  });

  reportContent += `

================================================================================
END OF REPORT
================================================================================
`;

  return reportContent;
};

export const generateLecturersReport = (facultyId?: string) => {
  const { mockLecturers } = require('../data/mockLecturerData');

  let reportContent = `
LECTURERS REPORT
Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

================================================================================

`;

  mockLecturers.forEach((lecturer: any, index: number) => {
    if (!facultyId || lecturer.facultyId === facultyId) {
      reportContent += `
Lecturer #${index + 1}
Name: ${lecturer.name}
Email: ${lecturer.email}
Employee ID: ${lecturer.employeeId}
Faculty: ${lecturer.facultyId}
Department: ${lecturer.department}
Status: ${lecturer.isApproved ? 'Approved' : 'Pending Approval'}
--------------------------------------------------------------------------------
`;
    }
  });

  reportContent += `

================================================================================
END OF REPORT
================================================================================
`;

  return reportContent;
};

export const generateCoursesReport = (facultyId?: string) => {
  const { mockCourses } = require('../data/mockLecturerData');
  const courseStats = getCourseStats();

  let reportContent = `
COURSES REPORT
Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

================================================================================

`;

  mockCourses.forEach((course: any, index: number) => {
    if (!facultyId || course.facultyId === facultyId) {
      const stats = courseStats.find(stat => stat.courseId === course.id);
      reportContent += `
Course #${index + 1}
Name: ${course.name}
Code: ${course.code}
Faculty: ${course.facultyId}
Department: ${course.department}
Lecturer: ${course.lecturerId}
${stats ? `Students: ${stats.totalStudents}\nAverage Attendance: ${stats.averageAttendance}%` : 'No statistics available'}
--------------------------------------------------------------------------------
`;
    }
  });

  reportContent += `

================================================================================
END OF REPORT
================================================================================
`;

  return reportContent;
};

export const downloadReport = (content: string, filename: string, format: 'txt' | 'csv' | 'pdf' = 'txt') => {
  const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};