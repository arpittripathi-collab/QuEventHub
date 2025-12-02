import bg from "../assets/bg.jpg";

export default function Home() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
        Welcome to Campus Event Hub
      </h1>
    </div>
  );
}





// // src/pages/Home.jsx// src/pages/Home.jsx
// import bg from "../assets/bg.jpg";
// import React, { useState, useMemo } from 'react';
// import { List } from 'lucide-react';

// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';
// import Admin from './Admin.jsx';
// import Events from './Events.jsx'; // This is the Student Dashboard view
// import { MOCK_EVENTS, MOCK_USER } from '../data/mockData.js';

// // Since we are not using React Router, we simulate navigation using a 'view' state.

// const Home = () => {
//     // Global State for the application
//     const [view, setView] = useState('admin'); // 'admin' or 'student'
//     const [events, setEvents] = useState(MOCK_EVENTS);
//     const [user, setUser] = useState(MOCK_USER);

//     // Derived state for the student's registered events list
//     const registeredEventsData = useMemo(() => {
//         return events.filter(e => user.registeredEvents.includes(e.id));
//     }, [events, user.registeredEvents]);
    
//     // Function to update user's registered events list
//     const setRegisteredEvents = (newRegisteredEvents) => {
//         setUser(prevUser => ({
//             ...prevUser,
//             registeredEvents: newRegisteredEvents,
//         }));
//     };

//     const switchView = (newView) => {
//         setView(newView);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased flex flex-col">
//             <Navbar user={user} view={view} switchView={switchView} />
            
//             <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
//                 {view === 'admin' ? (
//                     <Admin events={events} setEvents={setEvents} />
//                 ) : (
//                     <div className="space-y-10">
//                         <h2 className="text-3xl font-bold text-gray-800">
//                             Welcome, {user.name.split(' ')[0]}!
//                         </h2>
                        
//                         {/* Student's Registered Events Summary */}
//                         <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
//                             <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center space-x-2">
//                                 <List className="w-5 h-5 text-indigo-500" />
//                                 <span>My Registered Events ({registeredEventsData.length})</span>
//                             </h3>
//                             {registeredEventsData.length > 0 ? (
//                                 <ul className="list-disc pl-5 space-y-2 text-gray-600">
//                                     {registeredEventsData.map(event => (
//                                         <li key={event.id} className="font-medium">
//                                             {event.title} <span className="text-sm text-gray-400">({event.date})</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="text-gray-500 italic">You are not currently registered for any events.</p>
//                             )}
//                         </div>

//                         {/* Available Events Dashboard */}
//                         <Events 
//                             events={events} 
//                             user={user} 
//                             setRegisteredEvents={setRegisteredEvents} 
//                         />
//                     </div>
//                 )}
//             </main>
            
//             <Footer />
//         </div>
//     );
// };

// export default Home;