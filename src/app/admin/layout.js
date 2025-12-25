'use client';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaCalendarAlt, FaCog, FaImages, FaComments, FaSignOutAlt, FaHome, FaUsers, FaLock } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <Link href="/admin/dashboard">
            <div className="flex items-center space-x-2 mb-8">
              <div className="text-3xl">🕉️</div>
              <div>
                <h1 className="text-xl font-bold">Pandit Admin</h1>
                <p className="text-xs text-gray-400">Management Panel</p>
              </div>
            </div>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <item.icon className="text-orange-500" />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-left"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {session.user.name}</h2>
            <Link href="/" className="text-orange-600 hover:text-orange-700">
              View Website
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
