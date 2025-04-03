
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import StudentsManagement from '@/components/admin/StudentsManagement';

const AdminStudents = () => {
  return (
    <NavLayout userRole="admin">
      <StudentsManagement />
    </NavLayout>
  );
};

export default AdminStudents;
