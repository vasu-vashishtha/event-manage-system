
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Register() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load event details');
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/users/register/${eventId}`, formData);
      toast.success(res.data.message || 'Registration successful!');
      setFormData({ name: '', email: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 py-10">
      <div className="max-w-xl w-full bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-white via-sky-300 to-blue-600 bg-clip-text text-transparent mb-6">
          Register for Event
        </h2>

        {event && (
          <div className="text-center mb-6">
            <p className="text-xl font-semibold text-blue-300">{event.name}</p>
            <p className="text-sm text-gray-400">{event.date} at {event.time}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
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
}

