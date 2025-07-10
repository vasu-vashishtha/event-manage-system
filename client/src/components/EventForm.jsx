import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import ExcelImport from './ExcelImport';

export default function EventForm({ token, fetchEvents, editEvent, setEditEvent }) {
  const [formData, setFormData] = useState({
    name: '',
    tagLine: '',
    description: '',
    topics: '',
    date: '',
    time: '',
    duration: '',
    address: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (editEvent) {
      setFormData({
        ...editEvent,
        topics: editEvent.topics?.join(', ') || '',
      });
    }
  }, [editEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      topics: formData.topics.split(',').map((t) => t.trim()),
    };

    try {
      if (editEvent) {
        await axios.put(`/events/${editEvent._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Event updated successfully!');
      } else {
        await axios.post('/events', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Event added successfully!');
      }

      setFormData({
        name: '',
        tagLine: '',
        description: '',
        topics: '',
        date: '',
        time: '',
        duration: '',
        address: '',
        imageUrl: '',
      });

      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to save event.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { name: 'name', label: 'Event Name' },
          { name: 'tagLine', label: 'Tagline' },
          { name: 'description', label: 'Description' },
          { name: 'topics', label: 'Topics (comma separated)' },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'time', label: 'Time' },
          { name: 'duration', label: 'Duration' },
          { name: 'address', label: 'Address' },
          { name: 'imageUrl', label: 'Image URL' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="flex flex-col">
            <label className="font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded"
              required={name !== 'imageUrl'}
            />
          </div>
        ))}

        <div className="col-span-full">
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            {editEvent ? 'Update Event' : 'Add Event'}
          </button>
          {editEvent && (
            <button
              type="button"
              onClick={() => setEditEvent(null)}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4 cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      <ExcelImport token={token} fetchEvents={fetchEvents} />
    </>

    
  );
}
