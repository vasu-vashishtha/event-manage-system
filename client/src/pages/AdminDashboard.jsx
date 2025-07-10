import { useEffect, useState } from 'react';
import Sidenav from '../components/Sidenav';
import Topnav from '../components/Topnav';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import UserTable from '../components/UserTable';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [view, setView] = useState('events');
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const token = useSelector((state) => state.auth.adminToken);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      toast.error('Failed to fetch events');
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Event deleted successfully');
        fetchEvents();
      } catch (err) {
        console.error('Delete failed:', err);
        toast.error('Failed to delete event');
      }
    }
  };

    const handleEdit = (event) => {
    setEditEvent(event);
    setView('add');
  };

    const handleAfterSubmit = (actionType) => {
    if (actionType === 'add') toast.success('Event added successfully');
    else if (actionType === 'update') toast.success('Event updated successfully');
    fetchEvents();
    setEditEvent(null);
    setView('events');
  };

  const renderComponent = () => {
    switch (view) {
      case 'events':
        return <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'add':
        return (
          <EventForm
            token={token}
            fetchEvents={fetchEvents}
            editEvent={editEvent}
            setEditEvent={setEditEvent}
            onSuccess={handleAfterSubmit}
          />
        );
      case 'users':
        return <UserTable token={token} />;
      default:
        return <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidenav setView={setView} active={view} />
      <div className="flex flex-col flex-grow">
        <Topnav />
        <div className="p-6 overflow-y-auto bg-black text-white h-full">{renderComponent()}</div>
      </div>
    </div>
  );
}
