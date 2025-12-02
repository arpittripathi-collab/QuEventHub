
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { Loader2, Calendar, MapPin, Clock } from "lucide-react";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("type") || "all";

/////
<Link to={`/clubs/${club.id || club._id}`}>View Details</Link>


  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    filterClubs();
  }, [clubs, category]);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/clubs");
      setClubs(res.data.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterClubs = () => {
    if (category === "all") {
      setFilteredClubs(clubs);
    } else {
      setFilteredClubs(clubs.filter((club) =>
        club.category?.toLowerCase() === category.toLowerCase()
      ));
    }
  };

  const handleJoinClub = (clubId) => {
    if (!localStorage.getItem("token")) {
      alert("Please login to join a club.");
      navigate("/login");
      return;
    }
    alert(`Join request sent for Club ID: ${clubId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">
        Campus Clubs
      </h1>

      {/* FILTER TABS */}
      <div className="flex justify-center mb-10 space-x-4">
        {["all", "technical", "cultural", "sports", "arts", "music"].map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/clubs?type=${cat}`)}
            className={`px-4 py-2 rounded-full border ${
              category === cat
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* CLUB CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-10">
            <Loader2 size={36} className="animate-spin text-purple-500 mx-auto" />
            <p className="mt-2 text-gray-600">Loading clubs...</p>
          </div>
        ) : filteredClubs.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No clubs found in this category.
          </div>
        ) : (
          filteredClubs.map((club) => (
            <div
              key={club._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col hover:shadow-2xl transition"
            >
              {club.image && (
                <img
                  src={club.image.path}
                  alt={club.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold text-gray-800">{club.name}</h2>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-500" />
                  <span className="font-semibold">Meeting:</span> {club.meeting}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-purple-500" />
                  <span className="font-semibold">Time:</span> {club.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-500" />
                  <span className="font-semibold">Venue:</span> {club.venue}
                </p>
              </div>

              <p className="mt-4 text-gray-700 line-clamp-3 flex-1">
                {club.description}
              </p>

              <button
                onClick={() => handleJoinClub(club._id)}
                className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Join Club
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clubs;
