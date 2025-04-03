
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import PaymentsManagement from '@/components/admin/PaymentsManagement';

const AdminPayments = () => {
  return (
    <NavLayout userRole="admin">
      <div className="animate-fade-in">
        <PaymentsManagement />
      </div>
    </NavLayout>
  );
};

export default AdminPayments;
