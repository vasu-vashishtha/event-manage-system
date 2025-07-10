import { FaEdit, FaTrash } from 'react-icons/fa';

export default function EventTable({ events = [], onEdit, onDelete }) {
  if (!Array.isArray(events)) {
    return <div className="text-red-500 p-4">Invalid data format for events</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded shadow text-sm">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id} className="border-t hover:bg-gray-800">
                <td className="p-3 font-medium">{event.name}</td>
                <td className="p-3">{event.date}</td>
                <td className="p-3">{event.time}</td>
                <td className="p-3">{event.address}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => onEdit(event)}
                    className="text-blue-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this event?')) {
                        onDelete(event._id);
                      }
                    }}
                    className="text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-400">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

