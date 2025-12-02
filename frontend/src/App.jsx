// // App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Events from "./pages/Events";
// import EventDetail from "./pages/EventDetail"; // NEW
// import Clubs from "./pages/Clubs";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register"; // NEW
// import Admin from "./pages/Admin";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <>
//       {/* NAVBAR ALWAYS VISIBLE */}
//       <Navbar />

//       {/* PAGES */}
//       <div className="min-h-screen">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/events/:id" element={<EventDetail />} /> {/* NEW: Event Detail */}
//           <Route path="/clubs" element={<Clubs />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} /> {/* NEW: Registration */}

//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <Admin />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>

//       {/* FOOTER ALWAYS VISIBLE */}
//       <Footer />
//     </>
//   );
// }




// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail"; // NEW
import Clubs from "./pages/Clubs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register"; // NEW
import Admin from "./pages/Admin";
import ClubDetails from "./pages/ClubDetails"; // NEW

export default function App() {
  return (
    <>
      {/* NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      {/* PAGES */}
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} /> {/* Dynamic route for event details */}
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs/:id" element={<ClubDetails />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* FOOTER ALWAYS VISIBLE */}
      <Footer />
    </>
  );
}