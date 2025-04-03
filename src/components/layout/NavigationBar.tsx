
import React from 'react';
import { Menu, User, ChevronDown, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationBarProps {
  toggleSidebar: () => void;
  institutionName?: string;
  userRole: 'student' | 'admin';
}

const NavigationBar = ({ 
  toggleSidebar, 
  institutionName = 'PayWise Institution', 
  userRole 
}: NavigationBarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="sticky top-0 z-30 w-full bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu size={20} />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          {!isMobile && <span className="text-lg font-medium dark:text-white">{institutionName}</span>}
        </div>
        
        {isMobile && <span className="text-lg font-medium dark:text-white">{institutionName}</span>}
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full">
                <div className="relative h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={16} />
                </div>
                {!isMobile && (
                  <>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium dark:text-white">Raj Kumar Singh</span>
                      <span className="text-xs text-muted-foreground">{userRole === 'student' ? 'Student' : 'Administrator'}</span>
                    </div>
                    <ChevronDown size={16} />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
