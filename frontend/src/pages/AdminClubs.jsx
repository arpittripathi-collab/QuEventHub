import React, { useEffect, useState } from "react";
import api from "../api";

const emptyForm = {
  name: "",
  category: "technical",
  description: "",
  meeting: "",
  time: "",
  venue: "",
  imageUrl: "",
};

const AdminClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleInputFocus = (e) => {
    e.target.focus();
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/clubs");
      setClubs(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load clubs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setForm(emptyForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (form._id) {
        await api.put(`/clubs/${form._id}`, form);
      } else {
        const res = await api.post("/clubs", form);
        const creds = res.data?.data?.credentials;
        if (creds) {
          alert(
            `Club created!\n\nClub ID: ${creds.clubId}\nPassword: ${creds.password}\n\nPlease share these credentials securely with the club.`
          );
        }
      }
      resetForm();
      fetchClubs();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to save club.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete club?")) return;
    try {
      await api.delete(`/clubs/${id}`);
      fetchClubs();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to delete club.");
    }
  };

  const startEdit = (club) =>
    setForm({
      _id: club._id,
      name: club.name || "",
      category: club.category || "technical",
      description: club.description || "",
      meeting: club.meeting || "",
      time: club.time || "",
      venue: club.venue || "",
      imageUrl: club.imageUrl || "",
    });

  const inputClasses =
    "p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500";

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin — Manage Clubs</h2>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-6"
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={inputClasses}
          required
          autoFocus
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={inputClasses}
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
          onChange={(e) => setForm({ ...form, meeting: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={inputClasses}
        />
        <input
          placeholder="Time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={inputClasses}
        />
        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={inputClasses}
        />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={inputClasses}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          className={`${inputClasses} md:col-span-2`}
        ></textarea>

        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {form._id ? "Update" : "Create"}
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

      <div className="grid gap-3">
        {loading ? (
          <p className="text-sm text-gray-500">Loading clubs...</p>
        ) : (
          clubs.map((c) => (
            <div
              key={c._id}
              className="p-3 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-500">
                  {c.category} • {c.meeting || "TBD"}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(c)} className="px-3 py-1 border rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminClubs;
