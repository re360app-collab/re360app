import React from 'react';
import { Menu, Bell, UserCircle, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useTheme } from '@/contexts/ThemeProvider';

const Header = ({ user, userProfile, onMenuClick, onLogout }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const getDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };
  
  const getDisplayRole = () => {
    if (userProfile?.position) {
      return userProfile.position;
    }
    return 'Member';
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="lg:hidden">
            <Logo className="h-8 w-auto" linkTo="/dashboard" siteTitleColor="text-gray-800 dark:text-gray-200" />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={userProfile?.profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=random&color=fff`}
                  alt="User avatar"
                />
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{getDisplayName()}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{getDisplayRole()}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 dark:bg-slate-800 dark:border-slate-700">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center space-x-2 mb-2">
                  <Logo className="h-8 w-auto" linkTo="/dashboard" siteTitleColor="text-gray-800 dark:text-gray-200" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none dark:text-gray-200">{getDisplayName()}</p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem asChild className="dark:text-gray-200 dark:focus:bg-slate-700">
                <Link to="/dashboard/profile" className="flex items-center cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:!bg-red-50 focus:!bg-red-50 focus:!text-red-700 dark:text-red-500 dark:hover:!bg-red-900/50 dark:focus:!bg-red-900/50 dark:focus:!text-red-400 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;