import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../redux/slices/eventSlice';

export default function EventDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEvent: event, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  if (loading || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading event...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-10 py-10">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full max-h-[400px] object-cover rounded-t-xl"
        />

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-sky-300 to-blue-600 bg-clip-text text-transparent">
            {event.name}
          </h1>
          <p className="mt-2 text-lg text-blue-300">{event.tagLine}</p>

          <p className="mt-4 text-gray-300 leading-relaxed">{event.description}</p>

          <div className="mt-6 text-sm space-y-2 text-gray-400">
            <div>
              <strong className="text-white">Date:</strong> {event.date}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong className="text-white">Time:</strong> {event.time}
            </div>
            <div>
              <strong className="text-white">Address:</strong> {event.address}
            </div>
          </div>

          {event.topics?.length > 0 && (
            <div className="mt-6">
              <strong className="text-white">Topics:</strong>
              <ul className="list-disc list-inside mt-2 text-gray-300">
                {event.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>
          )}

          <Link to={`/register/${event._id}`}>
            <button className="mt-8 bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-full transition text-white cursor-pointer">
              Register for this Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

