import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function UserTable({ token }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Registered Users</h2>
      <div className="overflow-auto">
        <table className="w-full border text-left text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Event</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.eventId?.name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.eventId?.date || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
