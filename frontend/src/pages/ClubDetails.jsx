// src/pages/ClubDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api"; // axios instance
// import { AuthContext } from "../context/AuthContext";
import { Loader2, Calendar, MapPin, Clock } from "lucide-react";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idToken, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/clubs/${id}`);
        setClub(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      alert("Please login to join.");
      navigate("/login");
      return;
    }
    try {
      const res = await api.post(`/clubs/${id}/join`, {}, { headers: { Authorization: `Bearer ${idToken}` } });
      alert(res.data.message || "Joined club");
      // optionally update UI or redirect to members or profile
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Could not join club");
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;
  if (!club) return <div className="p-8 text-center">Club not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      {club.image && <img src={club.image.path} alt={club.name} className="w-full h-64 object-cover rounded-lg mb-6" />}
      <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
      <p className="text-sm text-gray-500 mb-4">Category: {club.category}</p>

      <div className="grid md:grid-cols-3 gap-4 mb-4 text-gray-700">
        <div className="flex items-center gap-2"><Calendar /> <span>{club.meeting || "TBD"}</span></div>
        <div className="flex items-center gap-2"><Clock /> <span>{club.time || "TBD"}</span></div>
        <div className="flex items-center gap-2"><MapPin /> <span>{club.venue || "TBD"}</span></div>
      </div>

      <div className="prose mb-6">{club.description}</div>

      <div className="flex gap-4">
        <button onClick={handleJoin} className="bg-purple-600 text-white px-4 py-2 rounded">
          Join Club
        </button>

        <button onClick={() => navigate("/clubs")} className="px-4 py-2 border rounded">Back</button>
      </div>
    </div>
  );
};

export default ClubDetails;
