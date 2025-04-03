
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import StudentFeePayment from '@/components/fees/StudentFeePayment';

const Fees = () => {
  return (
    <NavLayout userRole="student">
      <StudentFeePayment />
    </NavLayout>
  );
};

export default Fees;
