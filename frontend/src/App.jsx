import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Main from './pages/main';
import ProtectedRoute from './routes/protectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
