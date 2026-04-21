import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// Pages (we build these in next step)
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Landing />} />

      {/* Protected routes go here later */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <div>Dashboard coming soon...</div>
        </ProtectedRoute>
      } />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
      
    </Routes>
  );
};

export default App;