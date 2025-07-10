// import { useState } from 'react';

// export default function ExcelImport({ token, fetchEvents }) {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleImport = async () => {
//     if (!file) return alert('Please select a file.');

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await fetch('http://localhost:5000/api/events/import', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage('✅ Events imported successfully!');
//         setFile(null);
//         fetchEvents(); // Refresh list
//       } else {
//         setMessage(`❌ Import failed: ${data.message}`);
//       }
//     } catch (err) {
//       console.error('Import error:', err);
//       setMessage('❌ Import failed.');
//     }
//   };

//   return (
//     <div className="mt-6 border-t pt-6">
//       <h3 className="text-lg font-semibold mb-2">📥 Import Events from Excel</h3>
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={handleFileChange}
//         className="mb-2"
//       />
//       <button
//         onClick={handleImport}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Upload & Import
//       </button>
//       {message && <p className="mt-2 text-sm">{message}</p>}
//     </div>
//   );
// }



import { useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

export default function ExcelImport({ token, fetchEvents }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      toast.warn('Please select an Excel (.xlsx) file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/events/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('✅ Events imported successfully!');
      setFile(null);
      fetchEvents(); // refresh list
    } catch (err) {
      console.error('Import error:', err);
      toast.error('❌ Import failed');
    }
  };

  return (
    <div className="mt-10 pt-6 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-3">📥 Import Events from Excel</h3>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="bg-gray-800 text-white p-2 rounded mb-3 block"
      />
      <button
        onClick={handleImport}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Upload & Import
      </button>
    </div>
  );
}
