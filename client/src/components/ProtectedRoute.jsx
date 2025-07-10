// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = useSelector((state) => state.auth.adminToken);
//   return token ? children : <Navigate to="/admin/login" />;
// };

// export default ProtectedRoute;

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const reduxToken = useSelector((state) => state.auth.adminToken);
  const localToken = localStorage.getItem('adminToken');

  const token = reduxToken || localToken;

  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;