// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const navigate = useNavigate();

//   // Check login state
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setLoggedIn(!!token);
//   }, []);

//   // Logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     navigate("/login");
//   };

//   const dropdownItems = {
//     Events: ["Seminars", "Workshops", "Fest", "Sports"],
//     Clubs: ["Tech Club", "Music Club", "Dance Club", "Literary Club"],
//   };

//   return (
//     <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
//         {/* Logo */}
//         <h2 className="text-2xl font-bold">Campus Event Hub</h2>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8 items-center text-lg">

//           <NavItem title="Home" link="/" />

//           <DropdownMenu
//             title="Events"
//             dropdown={dropdown}
//             setDropdown={setDropdown}
//             items={dropdownItems.Events}
//             link="/events"
//           />

//           <DropdownMenu
//             title="Clubs"
//             dropdown={dropdown}
//             setDropdown={setDropdown}
//             items={dropdownItems.Clubs}
//             link="/clubs"
//           />

//           <NavItem title="Contact" link="/contact" />

//           {/* Show Admin Panel only if logged in */}
//           {loggedIn && (
//             <NavItem title="Admin Panel" link="/admin" />
//           )}

//           {/* Login / Logout Button */}
//           {!loggedIn ? (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
//             >
//               Logout
//             </button>
//           )}
//         </ul>

//         {/* Mobile Menu Toggle Button */}
//         <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
//           {mobileOpen ? <X size={30} /> : <Menu size={30} />}
//         </button>
//       </div>

//       {/* Mobile Panel */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0 }}
//             animate={{ height: "auto" }}
//             exit={{ height: 0 }}
//             className="md:hidden bg-slate-800 p-4 rounded-lg mt-3"
//           >
//             <MobileMenu
//               dropdownItems={dropdownItems}
//               loggedIn={loggedIn}
//               handleLogout={handleLogout}
//               navigate={navigate}
//               setMobileOpen={setMobileOpen}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// /* ===== Helper Components ===== */

// function NavItem({ title, link }) {
//   return (
//     <li>
//       <Link to={link} className="hover:text-blue-400 transition font-medium">
//         {title}
//       </Link>
//     </li>
//   );
// }

// function DropdownMenu({ title, dropdown, setDropdown, items, link }) {
//   return (
//     <li
//       className="relative"
//       onMouseEnter={() => setDropdown(title)}
//       onMouseLeave={() => setDropdown(null)}
//     >
//       <Link to={link} className="flex items-center gap-1 hover:text-blue-400">
//         {title} <ChevronDown size={18} />
//       </Link>

//       <AnimatePresence>
//         {dropdown === title && (
//           <motion.ul
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute bg-slate-800 mt-2 p-3 rounded-lg shadow-lg w-40"
//           >
//             {items.map((item) => (
//               <li key={item} className="py-1">
//                 <Link className="hover:text-blue-400" to="#">
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </li>
//   );
// }

// function MobileMenu({ dropdownItems, loggedIn, handleLogout, navigate, setMobileOpen }) {
//   return (
//     <ul className="flex flex-col gap-4 text-lg">
      
//       <NavItem title="Home" link="/" />
//       <MobileDropdown title="Events" items={dropdownItems.Events} link="/events" />
//       <MobileDropdown title="Clubs" items={dropdownItems.Clubs} link="/clubs" />
//       <NavItem title="Contact" link="/contact" />

//       {loggedIn && <NavItem title="Admin Panel" link="/admin" />}

//       {!loggedIn ? (
//         <button
//           onClick={() => { navigate("/login"); setMobileOpen(false); }}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
//         >
//           Login
//         </button>
//       ) : (
//         <button
//           onClick={() => { handleLogout(); setMobileOpen(false); }}
//           className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
//         >
//           Logout
//         </button>
//       )}
//     </ul>
//   );
// }

// function MobileDropdown({ title, items, link }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <li>
//       <div className="flex gap-2 items-center">
//         <Link to={link} className="flex-1 hover:text-blue-400 font-medium">
//           {title}
//         </Link>

//         <button onClick={() => setOpen(!open)}>
//           <ChevronDown />
//         </button>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="ml-4 mt-2"
//           >
//             {items.map((item) => (
//               <li key={item} className="py-1">
//                 <Link className="hover:text-blue-400" to="#">
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </li>
//   );
// }



// // src/components/Navbar.jsx
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ChevronDown } from "lucide-react";

// // Assuming these are the categories your backend supports for filtering
// const dropdownItems = {
//   Events: ["Seminars", "Workshops", "Fest", "Sports", "Technical", "Cultural"],
//   Clubs: ["Tech Club", "Music Club", "Dance Club", "Literary Club"],
// };

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const navigate = useNavigate();

//   // Check login state
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setLoggedIn(!!token);
//   }, []);

//   // Logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
//         {/* Logo */}
//         <Link to="/">
//           <h2 className="text-2xl font-bold hover:text-blue-400 transition">Campus Event Hub</h2>
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8 items-center text-lg">

//           <NavItem title="Home" link="/" />

//           <DropdownMenu
//             title="Events"
//             dropdown={dropdown}
//             setDropdown={setDropdown}
//             items={dropdownItems.Events}
//             link="/events"
//           />

//           <NavItem title="Clubs" link="/clubs" />

//           <NavItem title="Contact" link="/contact" />

//           {/* Show Admin Panel only if logged in */}
//           {loggedIn && (
//             <NavItem title="Admin Panel" link="/admin" />
//           )}

//           {/* Login / Logout Button */}
//           {!loggedIn ? (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
//             >
//               Logout
//             </button>
//           )}
//         </ul>

//         {/* Mobile Menu Toggle Button */}
//         <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
//           {mobileOpen ? <X size={30} /> : <Menu size={30} />}
//         </button>
//       </div>

//       {/* Mobile Panel */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0 }}
//             animate={{ height: "auto" }}
//             exit={{ height: 0 }}
//             className="md:hidden bg-slate-800 p-4 rounded-lg mt-3 overflow-hidden"
//           >
//             <MobileMenu
//               dropdownItems={dropdownItems}
//               loggedIn={loggedIn}
//               handleLogout={handleLogout}
//               navigate={navigate}
//               setMobileOpen={setMobileOpen}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// /* ===== Helper Components ===== */

// function NavItem({ title, link }) {
//   return (
//     <li>
//       <Link to={link} className="hover:text-blue-400 transition font-medium">
//         {title}
//       </Link>
//     </li>
//   );
// }

// function DropdownMenu({ title, dropdown, setDropdown, items, link }) {
//   return (
//     <li
//       className="relative"
//       onMouseEnter={() => setDropdown(title)}
//       onMouseLeave={() => setDropdown(null)}
//     >
//       <Link to={link} className="flex items-center gap-1 hover:text-blue-400">
//         {title} <ChevronDown size={18} />
//       </Link>

//       <AnimatePresence>
//         {dropdown === title && (
//           <motion.ul
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute bg-slate-800 mt-2 p-3 rounded-lg shadow-lg w-40 z-10"
//           >
//             {items.map((item) => (
//               <li key={item} className="py-1">
//                 {/* Links to events page with category filter applied */}
//                 <Link className="hover:text-blue-400" to={`/events?category=${item}`}>
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </li>
//   );
// }

// function MobileMenu({ dropdownItems, loggedIn, handleLogout, navigate, setMobileOpen }) {
//   return (
//     <ul className="flex flex-col gap-4 text-lg">
      
//       <NavItem title="Home" link="/" />
//       <MobileDropdown title="Events" items={dropdownItems.Events} link="/events" />
//       <NavItem title="Clubs" link="/clubs" />
//       <NavItem title="Contact" link="/contact" />

//       {loggedIn && <NavItem title="Admin Panel" link="/admin" />}

//       {!loggedIn ? (
//         <button
//           onClick={() => { navigate("/login"); setMobileOpen(false); }}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
//         >
//           Login
//         </button>
//       ) : (
//         <button
//           onClick={() => { handleLogout(); setMobileOpen(false); }}
//           className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
//         >
//           Logout
//         </button>
//       )}
//     </ul>
//   );
// }

// function MobileDropdown({ title, items, link }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <li>
//       <div className="flex gap-2 items-center">
//         <Link to={link} className="flex-1 hover:text-blue-400 font-medium">
//           {title}
//         </Link>

//         <button onClick={() => setOpen(!open)}>
//           <ChevronDown className={open ? 'transform rotate-180 transition' : 'transition'}/>
//         </button>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="ml-4 mt-2 overflow-hidden"
//           >
//             {items.map((item) => (
//               <li key={item} className="py-1">
//                 <Link className="hover:text-blue-400" to={`/events?category=${item}`}>
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </li>
//   );
// }






















import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0b1a33] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Campus Event Hub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-lg">

          {/* Home */}
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>

          {/* EVENTS DROPDOWN */}
          <li className="relative group cursor-pointer">
            <span className="hover:text-blue-400 flex items-center gap-1">
              Events
              <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>

            {/* Dropdown on Hover */}
            <div className="absolute left-0 mt-3 hidden group-hover:block bg-[#0d1b2a] 
                            text-white rounded-lg shadow-lg w-44 py-2 z-50">

              <Link to="/events?type=seminars" className="block px-4 py-2 hover:bg-[#1b263b]">
                Seminars
              </Link>
              <Link to="/events?type=workshops" className="block px-4 py-2 hover:bg-[#1b263b]">
                Workshops
              </Link>
              <Link to="/events?type=fest" className="block px-4 py-2 hover:bg-[#1b263b]">
                Fest
              </Link>
              <Link to="/events?type=sports" className="block px-4 py-2 hover:bg-[#1b263b]">
                Sports
              </Link>
              <Link to="/events?type=technical" className="block px-4 py-2 hover:bg-[#1b263b]">
                Technical
              </Link>
              <Link to="/events?type=cultural" className="block px-4 py-2 hover:bg-[#1b263b]">
                Cultural
              </Link>
            </div>
          </li>

          {/* CLUBS DROPDOWN (Requested) */}
          <li className="relative group cursor-pointer">
            <span className="hover:text-blue-400 flex items-center gap-1">
              Clubs
              <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>

            {/* Dropdown */}
            <div className="absolute left-0 mt-3 hidden group-hover:block bg-[#0d1b2a] 
                            text-white rounded-lg shadow-lg w-44 py-2 z-50">

              <Link to="/clubs?type=technical" className="block px-4 py-2 hover:bg-[#1b263b]">
                Technical Clubs
              </Link>

              <Link to="/clubs?type=cultural" className="block px-4 py-2 hover:bg-[#1b263b]">
                Cultural Clubs
              </Link>

              <Link to="/clubs?type=sports" className="block px-4 py-2 hover:bg-[#1b263b]">
                Sports Clubs
              </Link>

              <Link to="/clubs?type=arts" className="block px-4 py-2 hover:bg-[#1b263b]">
                Arts Clubs
              </Link>

              <Link to="/clubs?type=music" className="block px-4 py-2 hover:bg-[#1b263b]">
                Music Clubs
              </Link>
            </div>
          </li>

          {/* Contact */}
          <li>
            <Link to="/contact" className="hover:text-blue-400">
              Contact
            </Link>
          </li>

          {/* Login */}
          <li>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-[#0b1a33] text-white px-6 pb-5 space-y-4 text-lg">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>

          <li><Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link></li>

          <li><Link to="/clubs" onClick={() => setIsMenuOpen(false)}>Clubs</Link></li>

          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>

          <li>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-blue-500 block text-center py-2 rounded-lg"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
