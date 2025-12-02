import React, { useEffect, useState } from "react";
import api from "../api";
import { Loader2 } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  registrationDeadline: "",
  category: "Technical",
  isPaid: false,
  price: 0,
  capacity: 0,
  imageUrl: "",
};

const ClubDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/events/club");
      setEvents(res.data.data || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load club events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await api.put(`/events/club/${editingId}`, form);
      } else {
        await api.post("/events/club", form);
      }
      resetForm();
      loadEvents();
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (ev) => {
    setEditingId(ev._id);
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      date: ev.date ? ev.date.substring(0, 10) : "",
      time: ev.time || "",
      venue: ev.venue || "",
      registrationDeadline: ev.registrationDeadline
        ? ev.registrationDeadline.substring(0, 10)
        : "",
      category: ev.category || "Technical",
      isPaid: !!ev.isPaid,
      price: ev.price || 0,
      capacity: ev.capacity || 0,
      imageUrl: ev.imageUrl || "",
    });
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/club/${id}`);
      loadEvents();
    } catch (e) {
      console.error(e);
      setError("Failed to delete event");
    }
  };

  const loadRegistrations = async (eventId) => {
    setSelectedEventId(eventId);
    setRegistrations([]);
    try {
      const res = await api.get(`/events/club/${eventId}/registrations`);
      setRegistrations(res.data.data || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load registrations");
    }
  };

  const markAttendance = async (eventId, regId) => {
    try {
      await api.post(`/events/club/${eventId}/attendance/${regId}`);
      loadRegistrations(eventId);
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Could not mark attendance");
    }
  };

  const inputClasses =
    "p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Club Dashboard</h1>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">{error}</p>
      )}

      {/* Event form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 grid-cols-1 md:grid-cols-2 mb-8 bg-white p-4 rounded shadow"
      >
        <input
          placeholder="Event Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClasses}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClasses}
        >
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className={inputClasses}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className={inputClasses}
        />
        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          className={inputClasses}
        />
        <input
          type="date"
          placeholder="Registration Deadline"
          value={form.registrationDeadline}
          onChange={(e) =>
            setForm({ ...form, registrationDeadline: e.target.value })
          }
          className={inputClasses}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
          className={inputClasses}
          min={0}
        />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className={inputClasses}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClasses} md:col-span-2`}
        />

        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {editingId ? "Update Event" : "Create Event"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border rounded"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Event list */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{ev.title}</div>
                <div className="text-sm text-gray-500">
                  {ev.date ? new Date(ev.date).toLocaleDateString() : ""} •{" "}
                  {ev.time || "TBD"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => loadRegistrations(ev._id)}
                  className="px-3 py-1 border rounded"
                >
                  Registrations
                </button>
                <button
                  onClick={() => startEdit(ev)}
                  className="px-3 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(ev._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registrations list */}
      {selectedEventId && (
        <div className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Registrations</h2>
          {registrations.length === 0 ? (
            <p className="text-gray-500 text-sm">No registrations yet.</p>
          ) : (
            <ul className="space-y-2">
              {registrations.map((r) => (
                <li
                  key={r._id}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <div className="font-medium">{r.user?.name || "Unknown"}</div>
                    <div className="text-gray-500">
                      {r.user?.q_id} • {r.user?.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.attended ? (
                      <span className="text-green-600 font-semibold">Present</span>
                    ) : (
                      <button
                        onClick={() => markAttendance(selectedEventId, r._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Mark Present
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubDashboard;

