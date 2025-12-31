import React from 'react';

interface AttendanceStatProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

const AttendanceStat: React.FC<AttendanceStatProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trendUp ? 'text-green-600' : 'text-gray-600'}`}>
              {trendUp ? '↗' : '↘'} {trend}
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export { AttendanceStat };
