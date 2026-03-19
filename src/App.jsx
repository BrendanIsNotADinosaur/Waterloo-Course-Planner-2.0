import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import CourseDetail from './pages/CourseDetail';
import Compare from './pages/Compare';
import ScheduleBuilder from './pages/ScheduleBuilder';
import Enroll from './pages/Enroll';
import Notifications from './pages/Notifications';
import Progress from './pages/Progress';
import Guidance from './pages/Guidance';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/schedule" element={<ScheduleBuilder />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
