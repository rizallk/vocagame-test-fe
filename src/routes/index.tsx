import Error404 from '@/components/Error404';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

// Menggunakan React Lazy untuk mengatasi masalah initial load yang lama. Dengan lazy loading, komponen hanya akan dimuat saat dibutuhkan, sehingga meningkatkan performa aplikasi.
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Transactions = lazy(() => import('@/pages/Transactions'));
const Customers = lazy(() => import('@/pages/Customers'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
