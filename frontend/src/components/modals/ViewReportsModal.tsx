import React, { useState } from 'react';
import { generateAttendanceReport, generateStudentsReport, generateLecturersReport, generateCoursesReport, downloadReport } from '../../utils/reportGenerator';

interface ViewReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReportFormData {
  reportType: 'attendance' | 'students' | 'courses' | 'lecturers';
  facultyId: string;
  courseId?: string;
  dateRange: {
    start: string;
    end: string;
  };
  format: 'pdf' | 'csv';
}

const ViewReportsModal: React.FC<ViewReportsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReportFormData>({
    reportType: 'attendance',
    facultyId: '',
    courseId: '',
    dateRange: {
      start: '',
      end: '',
    },
    format: 'pdf',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setFormData(prev => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    try {
      let reportContent = '';
      let filename = '';

      switch (formData.reportType) {
        case 'attendance':
          reportContent = generateAttendanceReport(
            formData.facultyId || undefined,
            formData.courseId || undefined,
            formData.dateRange.start && formData.dateRange.end ? formData.dateRange : undefined
          );
          filename = `attendance-report-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'students':
          reportContent = generateStudentsReport(formData.facultyId || undefined);
          filename = `students-report-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'courses':
          reportContent = generateCoursesReport(formData.facultyId || undefined);
          filename = `courses-report-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'lecturers':
          reportContent = generateLecturersReport(formData.facultyId || undefined);
          filename = `lecturers-report-${new Date().toISOString().split('T')[0]}`;
          break;
      }

      downloadReport(reportContent, filename, formData.format);

      alert(`Report generated and downloaded successfully! (${formData.reportType} - ${formData.format.toUpperCase()})`);

      onClose();
    } catch (error) {
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Generate Report</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="attendance">Attendance Report</option>
                <option value="students">Students Report</option>
                <option value="courses">Courses Report</option>
                <option value="lecturers">Lecturers Report</option>
              </select>
            </div>

            {/* Faculty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
              <select
                name="facultyId"
                value={formData.facultyId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Faculties</option>
                <option value="engineering">Engineering</option>
                <option value="science">Science</option>
                <option value="arts">Arts & Humanities</option>
                <option value="business">Business</option>
                <option value="medicine">Medicine</option>
              </select>
            </div>

            {/* Course (only for attendance reports) */}
            {formData.reportType === 'attendance' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course (Optional)</label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Courses</option>
                  <option value="cs101">CS101 - Introduction to Computer Science</option>
                  <option value="math201">MATH201 - Calculus II</option>
                  <option value="phys101">PHYS101 - Physics I</option>
                </select>
              </div>
            )}

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  name="start"
                  value={formData.dateRange.start}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  name="end"
                  value={formData.dateRange.end}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={formData.format === 'pdf'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  PDF
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={formData.format === 'csv'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  CSV
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReportsModal;