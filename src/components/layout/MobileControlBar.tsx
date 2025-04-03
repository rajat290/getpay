
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, CreditCard, FileText, Settings, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileControlBarProps {
  userRole: 'student' | 'admin';
}

const MobileControlBar = ({ userRole }: MobileControlBarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return null;
  }

  const studentNavItems = [
    { 
      to: '/', 
      label: 'Dashboard', 
      icon: <Home size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/'
    },
    { 
      to: '/fees', 
      label: 'Pay Fees', 
      icon: <CreditCard size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/fees'
    },
    { 
      to: '/history', 
      label: 'History', 
      icon: <FileText size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/history'
    },
    { 
      to: '/profile', 
      label: 'Profile', 
      icon: <User size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/profile'
    },
  ];

  const adminNavItems = [
    { 
      to: '/admin', 
      label: 'Dashboard', 
      icon: <Home size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/admin'
    },
    { 
      to: '/admin/students', 
      label: 'Students', 
      icon: <User size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/admin/students'
    },
    { 
      to: '/admin/payments', 
      label: 'Payments', 
      icon: <CreditCard size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/admin/payments'
    },
    { 
      to: '/admin/settings', 
      label: 'Settings', 
      icon: <Settings size={22} strokeWidth={2.5} className="text-primary" />, 
      active: location.pathname === '/admin/settings'
    },
  ];

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700 py-2 shadow-lg">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link 
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center px-3 py-1 rounded-lg transition-all duration-200",
              item.active 
                ? "bg-slate-700/50 text-white scale-110 shadow-md" 
                : "text-slate-300 hover:text-white hover:bg-slate-700/30"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-full mb-1 transition-transform",
              item.active ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-inner shadow-blue-700/50" : ""
            )}>
              {item.icon}
            </div>
            <span className={cn(
              "text-xs font-medium",
              item.active ? "text-white" : "text-slate-300"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileControlBar;
