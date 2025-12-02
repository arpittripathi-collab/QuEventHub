// // pages/Admin.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api"; // New API utility
// import { Loader2, Plus, Edit, Trash2, X } from "lucide-react";

// const Admin = () => {
//   const [events, setEvents] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const nav = useNavigate();

//   // forms
//   const [eventForm, setEventForm] = useState({ title: "", date: "", time: "", venue: "", description: "", category: "Technical" }); // Added category
//   const [clubForm, setClubForm] = useState({ name: "", meeting: "", time: "", venue: "", description: "" });

//   // edit state
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [editingClub, setEditingClub] = useState(null);

//   // image files
//   const [eventImageFile, setEventImageFile] = useState(null);
//   const [clubImageFile, setClubImageFile] = useState(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       // NOTE: Assuming your backend has admin-only endpoints for fetching all events/clubs
//       // If not, you'll need to create them (e.g., api.get("/admin/events"))
//       const [evRes, clRes] = await Promise.all([api.get("/events"), api.get("/clubs")]);
//       setEvents(evRes.data.data); // Adjusting based on backend format { data: [...] }
//       setClubs(clRes.data.data); // Assuming similar structure for clubs
//     } catch (err) {
//       console.error("Load Error:", err);
//       setError("Failed to load data. Check API connection and token.");
//     }
//     setLoading(false);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     nav("/login");
//   };

//   // Helper to submit form as multipart/form-data
//   const buildFormData = (payload, file) => {
//     const form = new FormData();
//     Object.keys(payload).forEach(k => form.append(k, payload[k]));
//     if (file) form.append("image", file); // Ensure backend expects key 'image'
//     return form;
//   };

//   // CRUD for Events
//   const submitEvent = async () => {
//     setLoading(true);
//     try {
//       const formData = buildFormData(eventForm, eventImageFile);
//       if (editingEvent) {
//         await api.put(`/events/${editingEvent._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
//         setEditingEvent(null);
//       } else {
//         await api.post("/events", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setEventForm({ title: "", date: "", time: "", venue: "", description: "", category: "Technical" });
//       setEventImageFile(null);
//       load();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save event.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteEvent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     try {
//       await api.delete(`/events/${id}`);
//       load();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete event.");
//     }
//   };

//   const startEditEvent = (e) => {
//     setEditingEvent(e);
//     setEventForm({ title: e.title, date: e.date, time: e.time, venue: e.venue, description: e.description, category: e.category });
//   };

//   // CRUD for Clubs (Similar logic, assuming a /clubs endpoint)
//   const submitClub = async () => {
//     setLoading(true);
//     try {
//       const formData = buildFormData(clubForm, clubImageFile);
//       if (editingClub) {
//         await api.put(`/clubs/${editingClub._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
//         setEditingClub(null);
//       } else {
//         await api.post("/clubs", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setClubForm({ name: "", meeting: "", time: "", venue: "", description: "" });
//       setClubImageFile(null);
//       load();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save club.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteClub = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this club?")) return;
//     try {
//       await api.delete(`/clubs/${id}`);
//       load();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete club.");
//     }
//   };

//   const startEditClub = (c) => {
//     setEditingClub(c);
//     setClubForm({ name: c.name, meeting: c.meeting, time: c.time, venue: c.venue, description: c.description });
//   };
  
//   const EventForm = () => (
//     <div className="flex flex-col gap-2">
//       <input className="w-full border p-2 rounded" placeholder="Title" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} />
//       <select className="w-full border p-2 rounded" value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value })}>
//           <option value="Technical">Technical</option>
//           <option value="Cultural">Cultural</option>
//           <option value="Sports">Sports</option>
//           <option value="Workshop">Workshop</option>
//       </select>
//       <input className="w-full border p-2 rounded" placeholder="Date (e.g., 2025-12-20)" type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} />
//       <input className="w-full border p-2 rounded" placeholder="Time" type="time" value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} />
//       <input className="w-full border p-2 rounded" placeholder="Venue" value={eventForm.venue} onChange={e => setEventForm({ ...eventForm, venue: e.target.value })} />
//       <textarea className="w-full border p-2 rounded" placeholder="Description" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
      
//       <label className="block mt-2 text-sm font-medium text-gray-700">Event Image (Optional)</label>
//       <input type="file" onChange={e => setEventImageFile(e.target.files[0])} className="p-1 border rounded w-full"/>

//       <div className="flex gap-3 mt-3">
//         <button onClick={submitEvent} disabled={loading} className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-green-700 transition">
//           {editingEvent ? <Edit size={18} /> : <Plus size={18} />} {editingEvent ? "Save Edit" : "Add Event"}
//         </button>
//         {editingEvent && <button onClick={() => { setEditingEvent(null); setEventImageFile(null); }} className="px-3 py-2 border rounded flex items-center gap-1 hover:bg-gray-100 transition"><X size={18} /> Cancel Edit</button>}
//       </div>
//     </div>
//   );

//   // Club form similar to Event Form (omitted for brevity)

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h1 className="text-3xl font-bold text-slate-800">👑 Admin Dashboard</h1>
//           <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-red-700 transition" onClick={logout}>
//             Logout
//           </button>
//         </div>
        
//         {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* EVENTS */}
//           <div className="bg-white p-6 rounded-lg shadow-xl">
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2">📅 Manage Events</h2>
//             {EventForm()}

//             <ul className="mt-6 border-t pt-4 space-y-3">
//               <h3 className="font-semibold text-lg">Current Events ({events.length})</h3>
//               {loading ? <li className="flex justify-center py-4"><Loader2 size={24} className="animate-spin text-blue-500" /></li> : events.map(ev => (
//                 <li key={ev._id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition">
//                   <div>
//                     <div className="font-semibold">{ev.title}</div>
//                     <div className="text-sm text-gray-500">{new Date(ev.date).toLocaleDateString()} — {ev.time}</div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="text-blue-600 hover:text-blue-800 p-1 rounded" onClick={() => startEditEvent(ev)}><Edit size={18} /></button>
//                     <button className="text-red-600 hover:text-red-800 p-1 rounded" onClick={() => deleteEvent(ev._id)}><Trash2 size={18} /></button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* CLUBS (Omitted for brevity, but should follow the same pattern) */}
//           {/* ... Club management code ... */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;







// src/pages/Admin.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import DashboardButton from '../components/DashboardButton.jsx';

// --- Event Form Component (Modal) ---
const EventForm = ({ event, onClose, onSave }) => {
    const [formData, setFormData] = useState(event || { title: '', date: '', capacity: 0, status: 'Open' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const isEdit = !!event;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
                <h2 className="text-2xl font-bold mb-6 text-indigo-700">
                    {isEdit ? 'Edit Event' : 'Create New Event'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                    <div className="flex space-x-4">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                        <input
                            type="number"
                            name="capacity"
                            placeholder="Capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    >
                        <option value="Open">Open</option>
                        <option value="Filling">Filling</option>
                        <option value="Closed">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <div className="flex justify-end space-x-3 pt-4">
                        <DashboardButton onClick={onClose} color="gray" className="!bg-gray-400 hover:!bg-gray-500">
                            Cancel
                        </DashboardButton>
                        <DashboardButton type="submit" color="indigo">
                            {isEdit ? 'Update Event' : 'Create Event'}
                        </DashboardButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- AdminEvents Component (CRUD Table) ---
const Admin = ({ events, setEvents }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const openCreateModal = () => {
        setEditingEvent(null);
        setIsFormOpen(true);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleSave = (formData) => {
        if (editingEvent) {
            // Update logic (PUT/PATCH API call in real app)
            setEvents(events.map(e => (e.id === formData.id ? { ...formData, registered: e.registered } : e)));
        } else {
            // Create logic (POST API call in real app)
            const newEvent = { ...formData, id: Date.now().toString(), registered: 0 };
            setEvents([...events, newEvent]);
        }
        setIsFormOpen(false);
    };

    const handleDelete = (eventId) => {
        // IMPORTANT: Replaced window.confirm with a console message to comply with environment restrictions.
        console.log(`Simulating deletion of event: ${eventId}`);
        // Delete logic (DELETE API call in real app)
        setEvents(events.filter(e => e.id !== eventId));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-100 text-green-800';
            case 'Filling': return 'bg-yellow-100 text-yellow-800';
            case 'Closed': return 'bg-red-100 text-red-800';
            case 'Cancelled': return 'bg-gray-100 text-gray-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 flex items-center space-x-2">
                    <Calendar className="w-6 h-6 text-indigo-500" />
                    <span>Event Management (CRUD)</span>
                </h3>
                <DashboardButton onClick={openCreateModal} icon={Plus} color="indigo">
                    Create New Event
                </DashboardButton>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-50 transition duration-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {event.registered} / {event.capacity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => openEditModal(event)}
                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition"
                                        title="Edit Event"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                                        title="Delete Event"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && <EventForm event={editingEvent} onClose={() => setIsFormOpen(false)} onSave={handleSave} />}
        </div>
    );
};

export default Admin;