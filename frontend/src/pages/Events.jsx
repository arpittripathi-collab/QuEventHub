// // pages/Events.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Loader2 } from "lucide-react";

const categories = ["All", "Technical", "Cultural", "Sports", "Workshop"];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const query = selectedCategory !== "All" ? `?category=${selectedCategory}` : "";
      const res = await api.get(`/events${query}`);
      setEvents(res.data.data || res.data || []); // Handle both response formats
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Upcoming Campus Events
      </h1>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-center flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-10">
            <Loader2 size={36} className="animate-spin text-blue-500 mx-auto" />
            <p className="mt-2 text-gray-600">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-10 text-gray-500">
            No events found in this category.
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>

              <div className="mt-3 text-gray-600">
                <p><span className="font-semibold">🏷️ Category:</span> {event.category}</p>
                <p><span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                <p><span className="font-semibold">⏰ Time:</span> {event.time}</p>
                <p><span className="font-semibold">📍 Venue:</span> {event.venue}</p>
              </div>

              <p className="mt-4 text-gray-700 line-clamp-3">{event.description}</p>

              <Link to={`/events/${event._id}`} className="mt-5 w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;






// // src/pages/Events.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import api from "../api";
// import { Loader2, Calendar, MapPin, Tag } from "lucide-react";

// const categories = ["All", "Technical", "Cultural", "Sports", "Workshop", "Seminar", "Fest"];

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
  
//   // Read category from URL query parameters (e.g., /events?category=Fest)
//   const queryParams = new URLSearchParams(location.search);
//   const initialCategory = queryParams.get('category') || "All";
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   useEffect(() => {
//     // Update category state if URL changes outside of button click
//     const newCategory = queryParams.get('category') || "All";
//     if (newCategory !== selectedCategory) {
//         setSelectedCategory(newCategory);
//     }
//   }, [location.search]);

//   useEffect(() => {
//     fetchEvents();
//   }, [selectedCategory]);

//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       // API call includes category filter if not "All"
//       const categoryQuery = selectedCategory !== "All" ? `category=${selectedCategory}` : "";
//       const res = await api.get(`/events?${categoryQuery}`);
//       setEvents(res.data.data); 
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setEvents([]);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleCategoryChange = (cat) => {
//     setSelectedCategory(cat);
//     // Update URL to reflect filter change for persistent state
//     const newParams = new URLSearchParams();
//     if (cat !== "All") {
//         newParams.set('category', cat);
//     }
//     window.history.pushState(null, '', `/events?${newParams.toString()}`);
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
//       <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
//         Upcoming Campus Events
//       </h1>

//       {/* Category Filter */}
//       <div className="max-w-6xl mx-auto mb-8 flex justify-center flex-wrap gap-3">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => handleCategoryChange(cat)}
//             className={`px-4 py-2 rounded-full font-medium text-sm transition ${
//               selectedCategory === cat
//                 ? "bg-blue-600 text-white shadow-lg"
//                 : "bg-white text-gray-700 hover:bg-gray-200 border"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading ? (
//           <div className="md:col-span-2 lg:col-span-3 text-center py-10">
//             <Loader2 size={36} className="animate-spin text-blue-500 mx-auto" />
//             <p className="mt-2 text-gray-600">Loading events...</p>
//           </div>
//         ) : events.length === 0 ? (
//           <div className="md:col-span-2 lg:col-span-3 text-center py-10 text-gray-500">
//             No events found in the selected category.
//           </div>
//         ) : (
//           events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white shadow-lg rounded-xl p-6 flex flex-col hover:shadow-2xl transition-shadow"
//             >
//                 {event.image && (
//                     <img src={event.image.path} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-4" />
//                 )}
//               <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>

//               <div className="mt-3 text-sm text-gray-600 space-y-1">
//                 <p className="flex items-center gap-2"><Tag size={16} className="text-blue-500"/> <span className="font-semibold">Category:</span> {event.category}</p>
//                 <p className="flex items-center gap-2"><Calendar size={16} className="text-blue-500"/> <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
//                 <p className="flex items-center gap-2"><MapPin size={16} className="text-blue-500"/> <span className="font-semibold">Venue:</span> {event.venue}</p>
//               </div>

//               <p className="mt-4 text-gray-700 line-clamp-3 flex-1">{event.description}</p>

//               <Link to={`/events/${event._id}`} className="mt-5 w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//                 View Details
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Events;













// // src/pages/Events.jsx
// import React from 'react';
// import { Users, Calendar } from 'lucide-react';
// import DashboardButton from '../components/DashboardButton.jsx';

// // --- StudentDashboard Component ---
// const Events = ({ events, user, setRegisteredEvents }) => {
//     const isRegistered = (eventId) => user.registeredEvents.includes(eventId);

//     const handleRegister = (eventId) => {
//         // Registration logic (POST to /api/events/register)
//         setRegisteredEvents(prev => {
//             const newEvents = new Set(prev);
//             newEvents.add(eventId);
//             return Array.from(newEvents);
//         });
//         console.log(`Student ${user.id} registered for event ${eventId}`);
//     };

//     const handleUnregister = (eventId) => {
//         // Unregistration logic (DELETE to /api/events/register/eventId)
//         setRegisteredEvents(prev => prev.filter(id => id !== eventId));
//         console.log(`Student ${user.id} unregistered from event ${eventId}`);
//     };

//     const getRegistrationButton = (event) => {
//         if (event.status === 'Closed') {
//             return (
//                 <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
//                     Closed / Full
//                 </span>
//             );
//         }
//         if (event.status === 'Cancelled') {
//              return (
//                 <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
//                     Cancelled
//                 </span>
//             );
//         }
//         if (isRegistered(event.id)) {
//             return (
//                 <DashboardButton onClick={() => handleUnregister(event.id)} color="red" className="!bg-red-500 hover:!bg-red-600">
//                     Unregister
//                 </DashboardButton>
//             );
//         }
//         return (
//             <DashboardButton onClick={() => handleRegister(event.id)} color="indigo">
//                 Register
//             </DashboardButton>
//         );
//     };

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//             <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center space-x-2">
//                 <Users className="w-6 h-6 text-indigo-500" />
//                 <span>Available Events</span>
//             </h3>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {events.map((event) => (
//                     <div 
//                         key={event.id} 
//                         className={`p-5 rounded-xl border-2 transition duration-300 ${isRegistered(event.id) ? 'border-indigo-400 bg-indigo-50 shadow-md' : 'border-gray-200 hover:shadow-lg'}`}
//                     >
//                         <div className="flex justify-between items-start">
//                             <h4 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h4>
//                             <Calendar className="w-5 h-5 text-gray-500" />
//                         </div>
//                         <p className="text-sm text-gray-600 mb-2">
//                             <span className="font-semibold">Date:</span> {event.date}
//                         </p>
//                         <p className="text-sm text-gray-600 mb-4">
//                             <span className="font-semibold">Slots:</span> {event.capacity - event.registered} available
//                         </p>
//                         <div className="flex justify-end">
//                             {getRegistrationButton(event)}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Events;