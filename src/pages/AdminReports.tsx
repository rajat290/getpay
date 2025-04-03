
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import ReportsManagement from '@/components/admin/ReportsManagement';

const AdminReports = () => {
  return (
    <NavLayout userRole="admin">
      <div className="animate-fade-in">
        <ReportsManagement />
      </div>
    </NavLayout>
  );
};

export default AdminReports;
