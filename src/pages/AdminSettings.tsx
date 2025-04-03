
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import SettingsManagement from '@/components/admin/SettingsManagement';

const AdminSettings = () => {
  return (
    <NavLayout userRole="admin">
      <SettingsManagement />
    </NavLayout>
  );
};

export default AdminSettings;
