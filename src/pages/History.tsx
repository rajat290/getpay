
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import PaymentHistory from '@/components/history/PaymentHistory';

const History = () => {
  return (
    <NavLayout userRole="student">
      <PaymentHistory />
    </NavLayout>
  );
};

export default History;
