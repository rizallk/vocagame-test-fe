import { BrowserRouter } from 'react-router';
import QueryProvider from './providers/QueryProvider';
import AppRoutes from './routes';
import '@/assets/css/index.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import GlobalToast from './components/GlobalToast';

export default function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className="flex w-full overflow-x-hidden">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Navbar />
            <div className="p-6 mt-16.25 bg-body-bg text-body-text">
              <AppRoutes />
            </div>
            <GlobalToast />
          </div>
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}
