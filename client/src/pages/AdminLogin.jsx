import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:5000/api/admin/login', values);
        dispatch(login(res.data.token));
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } catch (err) {
        toast.error('Invalid credentials. Please try again.');
      }
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-white via-sky-300 to-blue-600 bg-clip-text text-transparent mb-8">
        Admin Login
      </h2>

      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow">
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 transition px-4 py-2 rounded-lg text-white font-medium cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
      
      <Link to="/">
        <button
            
            className="bg-gray-600 hover:bg-gray-700 transition px-4 py-2 rounded-lg text-white font-medium mt-5 cursor-pointer"
          >
            Back to Home
        </button>
      </Link>
    </div>
  );
};

export default AdminLogin;
