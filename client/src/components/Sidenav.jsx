import { FaPlusCircle, FaListAlt, FaUsers } from 'react-icons/fa';

export default function Sidenav({ setView, active }) {
  return (
    <div className="bg-black text-white w-64 min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-10 mt-4 bg-gradient-to-r from-white via-sky-300 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</h2>

      <button
        onClick={() => setView('events')}
        className={`flex items-center gap-2 p-2 rounded ${active === 'events' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
      >
        <FaListAlt /> Manage Events
      </button>

      <button
        onClick={() => setView('add')}
        className={`flex items-center gap-2 p-2 rounded ${active === 'add' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
      >
        <FaPlusCircle /> Add Event
      </button>

      <button
        onClick={() => setView('users')}
        className={`flex items-center gap-2 p-2 rounded ${active === 'users' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
      >
        <FaUsers /> View Users
      </button>
    </div>
  );
}
