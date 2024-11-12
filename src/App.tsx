import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRouteProps } from './PrivateRoute'
import { isLogin } from './helpers/isLogin'
import { Layout } from './layout/layout'
import { LoginPage } from './pages/auth/LoginPage'

function App() {
  console.log(name)
  return (
    <>
      <Routes>
        {/* <Route path="/resetPassword/:token" element={<ResetPassword />} /> */}
        <Route path="/login" element={
          <PublicRoute>
              <LoginPage/>
            </PublicRoute>
          } />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

function PrivateRoute({ children }) {
  // let location = useLocation();
  return isLogin() ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  return !isLogin() ? children : <Navigate to="/dashboard" replace />;
};

export default App
