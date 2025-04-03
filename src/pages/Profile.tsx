
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import StudentProfile from '@/components/profile/StudentProfile';

const Profile = () => {
  return (
    <NavLayout userRole="student">
      <StudentProfile />
    </NavLayout>
  );
};

export default Profile;
