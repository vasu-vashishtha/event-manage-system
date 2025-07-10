import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Topnav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
    toast.success("Logout Successfully!");
  };

  return (
    <div className="bg-black border-b-1 border-gray-500 text-white p-4 flex justify-between items-center shadow-2xl">
      {/* <h1 className="text-xl font-semibold">Admin Dashboard</h1> */}
      <div></div>
      <div>
        <button onClick={handleLogout} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer ">
          Logout
        </button>
      </div>
    </div>
  );
}
