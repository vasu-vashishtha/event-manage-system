import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/slices/eventSlice';
import { Link } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const { list: events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p className="p-10">Loading events...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      {/* Header */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-center px-4 py-6 sm:px-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left bg-gradient-to-r from-white via-sky-300 to-blue-600 bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        <Link
          to="/admin/login"
          className="mt-4 sm:mt-0 bg-gray-800 hover:bg-gray-600 transition px-4 py-2 rounded-2xl text-sm sm:text-base"
        >
          Admin Login
        </Link>
      </header>

      {/* Events Grid */}
      <main className="flex-1 w-full px-4 sm:px-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link to={`/event/${event._id}`} key={event._id}>
              <div className="bg-gray-800 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 p-4">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="h-48 w-full object-cover rounded"
                />
                <h2 className="text-xl sm:text-2xl font-semibold mt-4">{event.name}</h2>
                <p className="text-blue-300">{event.tagLine}</p>
                <p className="text-gray-400 text-sm">{event.date} at {event.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
