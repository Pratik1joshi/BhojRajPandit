'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/dashboard');
    } else if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
    </div>
  );
}
