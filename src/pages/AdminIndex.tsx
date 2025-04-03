
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import SummaryBoxWrapper from '@/components/dashboard/SummaryBoxWrapper';

const AdminIndex = () => {
  return (
    <NavLayout userRole="admin">
      <div className="w-full space-y-6">
        <SummaryBoxWrapper title="Admin Dashboard">
          <AdminDashboard />
        </SummaryBoxWrapper>
      </div>
    </NavLayout>
  );
};

export default AdminIndex;
