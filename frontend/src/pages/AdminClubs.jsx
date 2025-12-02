// src/pages/AdminClubs.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const AdminClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState({ name: "", category: "technical", description: "", meeting: "", time: "", venue: "" });
  const { idToken } = useContext(AuthContext);

  const handleInputFocus = (e) => {
    e.target.focus();
  };

  const fetchClubs = async () => {
    const res = await api.get("/clubs");
    setClubs(res.data.data);
  };

  useEffect(() => { fetchClubs(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clubs", form, { headers: { Authorization: `Bearer ${idToken}` } });
      setForm({ name: "", category: "technical", description: "", meeting: "", time: "", venue: "" });
      fetchClubs();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating club");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete club?")) return;
    await api.delete(`/clubs/${id}`, { headers: { Authorization: `Bearer ${idToken}` } });
    fetchClubs();
  };

  const startEdit = (club) => setForm({ ...club, id: club.id });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clubs/${form.id}`, form, { headers: { Authorization: `Bearer ${idToken}` } });
      setForm({ name: "", category: "technical", description: "", meeting: "", time: "", venue: "" });
      fetchClubs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin — Manage Clubs</h2>

      <form onSubmit={form.id ? handleUpdate : handleCreate} className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-6">
        <input 
          placeholder="Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
          required 
          autoFocus
        />
        <select 
          value={form.category} 
          onChange={e => setForm({...form, category: e.target.value})} 
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="technical">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
          <option value="arts">Arts</option>
          <option value="music">Music</option>
        </select>
        <input 
          placeholder="Meeting" 
          value={form.meeting} 
          onChange={e => setForm({...form, meeting: e.target.value})} 
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
        />
        <input 
          placeholder="Time" 
          value={form.time} 
          onChange={e => setForm({...form, time: e.target.value})} 
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
        />
        <input 
          placeholder="Venue" 
          value={form.venue} 
          onChange={e => setForm({...form, venue: e.target.value})} 
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
        />
        <textarea 
          placeholder="Description" 
          value={form.description} 
          onChange={e => setForm({...form, description: e.target.value})} 
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className="p-2 border rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>

        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{form.id ? "Update" : "Create"}</button>
          <button type="button" onClick={() => setForm({ name: "", category: "technical", description: "", meeting: "", time: "", venue: "" })} className="px-4 py-2 border rounded">Clear</button>
        </div>
      </form>

      <div className="grid gap-3">
        {clubs.map(c => (
          <div key={c.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-500">{c.category} • {c.meeting}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(c)} className="px-3 py-1 border rounded">Edit</button>
              <button onClick={() => handleDelete(c.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClubs;
