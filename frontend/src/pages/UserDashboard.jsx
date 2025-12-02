// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch User Profile Using Token
  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data.user);
    } catch (err) {
      console.log("Auth Error:", err);
      navigate("/login");
    }
  };

  // Fetch Clubs
  const fetchClubs = async () => {
    try {
      const res = await api.get("/clubs");
      setClubs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.data || res.data || []);
    } catch (err) {
      console.log(err);
      setEvents([]);
    }
  };

  useEffect(() => {
    Promise.all([fetchProfile(), fetchClubs(), fetchEvents()]).then(() =>
      setLoading(false)
    );
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* User Header */}
      <div className="bg-blue-600 text-white p-6 rounded-xl mb-6 shadow">
        <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>
        <p className="mt-1 text-sm">Your Student Dashboard</p>
      </div>

      {/* Profile Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-3">📌 Profile Details</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Q-ID:</b> {user.q_id}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Course:</b> {user.course}</p>
          <p><b>Year:</b> {user.year}</p>
          <p><b>Section:</b> {user.section}</p>
        </div>

        <div className="p-5 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-3">⚙️ Quick Actions</h2>
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-blue-500 text-white py-2 rounded mt-2"
          >
            Edit Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full bg-red-500 text-white py-2 rounded mt-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ---- Club List ---- */}
      <h2 className="text-2xl font-bold mb-4">🎯 Campus Clubs</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="border p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{club.name}</h3>
            <p className="text-sm mt-1">{club.description}</p>
            <button className="mt-3 bg-blue-600 text-white py-1 px-3 rounded">
              Join
            </button>
          </div>
        ))}
      </div>

      {/* ---- Event List ---- */}
      <h2 className="text-2xl font-bold my-6">📅 Upcoming Events</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {events.map((ev) => (
          <div key={ev._id} className="border p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold text-lg">{ev.title}</h3>
            <p className="text-sm mt-1">{ev.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              {ev.date} • {ev.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
