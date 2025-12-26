'use client';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaCalendarAlt, FaCog, FaImages, FaComments, FaSignOutAlt, FaHome, FaUsers, FaLock, FaBars, FaTimes } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login' && pathname !== '/admin') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);
  
  // Don't apply admin layout to login page
  if (pathname === '/admin/login' || pathname === '/admin') {
    return <>{children}</>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!session) return null;

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FaCalendarAlt, label: 'Appointments', href: '/admin/appointments' },
    { icon: FaCog, label: 'Services', href: '/admin/services' },
    { icon: FaImages, label: 'Gallery', href: '/admin/gallery' },
    { icon: FaComments, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: FaUsers, label: 'Profile', href: '/admin/profile' },
    { icon: FaLock, label: 'Settings', href: '/admin/settings' },
  ];

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Close Button */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Link href="/admin/dashboard" onClick={handleLinkClick}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="text-3xl">🕉️</div>
                  <div>
                    <h1 className="text-xl font-bold">Pandit Admin</h1>
                    <p className="text-xs text-gray-400">Management Panel</p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                  <div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon className={isActive ? 'text-white' : 'text-orange-500'} size={18} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <FaSignOutAlt size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex justify-between items-center px-4 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <FaBars size={24} />
              </button>
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                  Welcome, {session.user.name}
                </h2>
                <p className="text-xs text-gray-500 hidden sm:block">Manage your portfolio and services</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm lg:text-base text-orange-600 hover:text-orange-700 font-medium"
            >
              View Website
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
