import { Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import ProjectsPage from './pages/ProjectsPage';

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projeler" element={<ProjectsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterApp;
