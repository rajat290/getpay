
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  CreditCard, 
  FileText, 
  GraduationCap,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NavigationBar from './NavigationBar';
import MobileControlBar from './MobileControlBar';
import { Toggle } from '@/components/ui/toggle';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const NavItem = ({ to, label, icon, active }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-6 py-3 text-base rounded-md transition-colors",
        active 
          ? "bg-primary text-white font-medium" 
          : "text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-slate-700/30"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface NavLayoutProps {
  children: React.ReactNode;
  userRole: 'student' | 'admin';
}

const NavLayout = ({ children, userRole }: NavLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has already set a preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      return savedTheme === 'dark' || (!savedTheme && prefersDark);
    }
    return false;
  });
  
  const location = useLocation();
  const isMobile = useIsMobile();

  // Apply theme when it changes
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const studentNavItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={20} />, active: isActive('/') },
    { to: '/fees', label: 'Pay Fees', icon: <CreditCard size={20} />, active: isActive('/fees') },
    { to: '/history', label: 'Payment History', icon: <FileText size={20} />, active: isActive('/history') },
    { to: '/profile', label: 'Profile', icon: <GraduationCap size={20} />, active: isActive('/profile') },
  ];

  const adminNavItems = [
    { to: '/admin', label: 'Dashboard', icon: <Home size={20} />, active: isActive('/admin') },
    { to: '/admin/students', label: 'Students', icon: <GraduationCap size={20} />, active: isActive('/admin/students') },
    { to: '/admin/payments', label: 'Payments', icon: <CreditCard size={20} />, active: isActive('/admin/payments') },
    { to: '/admin/reports', label: 'Reports', icon: <FileText size={20} />, active: isActive('/admin/reports') },
  ];

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 bottom-0 left-0 w-64 dark:bg-slate-800 bg-white border-r border-gray-200 dark:border-slate-700 z-40 flex flex-col transition-transform duration-300",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">PayWise</h1>
          <Toggle 
            pressed={isDarkMode} 
            onPressedChange={toggleTheme} 
            aria-label="Toggle theme"
            className="ml-2"
          >
            {isDarkMode ? 
              <Moon size={18} className="text-indigo-200" /> : 
              <Sun size={18} className="text-amber-500" />
            }
          </Toggle>
        </div>
        
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <NavItem 
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              active={item.active}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start gap-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700/30" 
            onClick={() => console.log("Logout")}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content area with navbar */}
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64", // Add left margin on desktop equal to sidebar width
      )}>
        {/* Top navbar */}
        <NavigationBar 
          toggleSidebar={toggleSidebar} 
          userRole={userRole}
          institutionName="PayWise Institution"
        />

        {/* Main content */}
        <main className={cn(
          "flex-1",
          isMobile && sidebarOpen ? "opacity-50" : "opacity-100"
        )}>
          <div className="w-full px-8 py-6 transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Control Bar */}
      {isMobile && <MobileControlBar userRole={userRole} />}
    </div>
  );
};

export default NavLayout;
