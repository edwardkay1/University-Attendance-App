import React, { useState } from 'react';
import { AttendanceStat } from '../../components/cards/AttendanceStat';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getSystemStats, getRecentActivity, getCourseStats } from '../../data/mockAdminData';
import AddUserModal from '../../components/modals/AddUserModal';
import CreateCourseModal from '../../components/modals/CreateCourseModal';
import ViewReportsModal from '../../components/modals/ViewReportsModal';
import QRScanner from '../../components/common/QRScanner';

const AdminDashboard: React.FC = () => {
  const systemStats = getSystemStats();
  const recentActivity = getRecentActivity(5);
  const courseStats = getCourseStats();

  const [modals, setModals] = useState({
    addUser: false,
    createCourse: false,
    viewReports: false,
    scanner: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const handleUserCreated = () => {
    // Refresh data or show success message
    console.log('User created successfully');
  };

  const handleCourseCreated = () => {
    // Refresh data or show success message
    console.log('Course created successfully');
  };

  const handleScanResult = (result: string) => {
    console.log('Scanned:', result);
    alert(`Scanned: ${result}\n\nThis could be used for student ID verification, QR code validation, or other administrative tasks.`);
    closeModal('scanner');
  };

  const handleScanError = (error: string) => {
    console.error('Scan error:', error);
    alert('Scanning failed: ' + error);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'attendance_marked':
        return 'bg-green-100 text-green-800';
      case 'qr_generated':
        return 'bg-blue-100 text-blue-800';
      case 'user_created':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-600">System overview and management</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('viewReports')}
            className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AttendanceStat
          title="Total Students"
          value={systemStats.totalStudents}
          icon="👥"
          trend="+5%"
          trendUp={true}
        />
        <AttendanceStat
          title="Total Lecturers"
          value={systemStats.totalLecturers}
          icon="👨‍🏫"
          trend="+2%"
          trendUp={true}
        />
        <AttendanceStat
          title="Active Courses"
          value={systemStats.totalCourses}
          icon="📚"
          trend="0%"
          trendUp={false}
        />
        <AttendanceStat
          title="Active QR Sessions"
          value={systemStats.activeQRSessions}
          icon="📱"
          trend="+10%"
          trendUp={true}
        />
      </div>

      {/* System Health */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <p className="mt-1 text-gray-600">Overall system status and performance</p>
          </div>
          <StatusBadge status={systemStats.systemHealth === 'healthy' ? 'success' : 'warning'}>
            {systemStats.systemHealth.toUpperCase()}
          </StatusBadge>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{systemStats.totalAttendanceRecords}</div>
            <div className="text-sm text-gray-600">Attendance Records</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">&lt;50ms</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.userType === 'student' ? 'bg-green-500' :
                    activity.userType === 'lecturer' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {activity.userType}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getActionColor(activity.action)}`}>
                      {activity.action.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{activity.details}</p>
                  <p className="mt-1 text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Course Performance</h3>
          <div className="space-y-4">
            {courseStats.slice(0, 5).map((course) => (
              <div key={course.courseId} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{course.courseName}</h4>
                  <p className="text-xs text-gray-600">{course.totalStudents} students</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{course.averageAttendance}%</div>
                  <div className="text-xs text-gray-600">attendance</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Quick Actions */}
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => openModal('addUser')}
            className="flex items-center justify-center p-4 space-x-2 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50"
          >
            <span className="text-2xl">👤</span>
            <span className="text-sm font-medium text-gray-700">Add New User</span>
          </button>
          <button
            onClick={() => openModal('createCourse')}
            className="flex items-center justify-center p-4 space-x-2 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 hover:bg-green-50"
          >
            <span className="text-2xl">📚</span>
            <span className="text-sm font-medium text-gray-700">Create Course</span>
          </button>
          <button
            onClick={() => openModal('viewReports')}
            className="flex items-center justify-center p-4 space-x-2 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 hover:bg-purple-50"
          >
            <span className="text-2xl">📊</span>
            <span className="text-sm font-medium text-gray-700">View Reports</span>
          </button>
          <button
            onClick={() => openModal('scanner')}
            className="flex items-center justify-center p-4 space-x-2 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-red-500 hover:bg-red-50"
          >
            <span className="text-2xl">📱</span>
            <span className="text-sm font-medium text-gray-700">Scan QR Code</span>
          </button>
        </div>
      </div>

      <AddUserModal
        isOpen={modals.addUser}
        onClose={() => closeModal('addUser')}
        onUserCreated={handleUserCreated}
      />
      <CreateCourseModal
        isOpen={modals.createCourse}
        onClose={() => closeModal('createCourse')}
        onCourseCreated={handleCourseCreated}
      />
      <ViewReportsModal
        isOpen={modals.viewReports}
        onClose={() => closeModal('viewReports')}
      />

      {/* QR Scanner Modal */}
      {modals.scanner && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => closeModal('scanner')}></div>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Scan QR Code</h3>
                <button
                  onClick={() => closeModal('scanner')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Use this scanner for administrative tasks such as verifying student IDs, scanning QR codes, or other identification purposes.
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <QRScanner
                    onScan={handleScanResult}
                    onError={handleScanError}
                    isActive={modals.scanner}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => closeModal('scanner')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

