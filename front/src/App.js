import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className=" bg-gray-200">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={user ? < Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/register'
            element={!user ? <RegisterPage /> : <Navigate to='/' />}
          />
          <Route
            path='/login'
            element={!user ? <LoginPage /> : <Navigate to='/' />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
