
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';

const Index = () => {
  return (
    <NavLayout userRole="student">
      <StudentDashboard />
    </NavLayout>
  );
};

export default Index;
