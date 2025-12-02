// // pages/EventDetail.jsx
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api";
// import { Loader2, Calendar, Clock, MapPin, DollarSign, CheckCircle } from "lucide-react";

// export default function EventDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [regStatus, setRegStatus] = useState({ state: 'idle', message: '' }); // idle, requiredPayment, pending, registered
//   const [transactionId, setTransactionId] = useState("");

//   useEffect(() => {
//     fetchEvent();
//   }, [id]);

//   const fetchEvent = async () => {
//     setLoading(true);
//     try {
//       // Assuming you have a GET /events/:id endpoint
//       const res = await api.get(`/events/${id}`);
//       setEvent(res.data);
//     } catch (error) {
//       console.error("Error fetching event:", error);
//       navigate('/events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegistration = async () => {
//     if (!localStorage.getItem('token')) {
//         navigate('/login', { state: { from: window.location.pathname } });
//         return;
//     }
    
//     // If payment is required and transaction ID is missing, set state to ask for it.
//     if (event.isPaid && regStatus.state !== 'requiredPayment' && !transactionId) {
//         setRegStatus({ state: 'requiredPayment', message: 'Please complete payment before submitting.' });
//         return;
//     }
    
//     setRegStatus({ state: 'pending', message: 'Processing registration...' });
//     try {
//       const payload = { eventId: id };
//       if (event.isPaid && transactionId) {
//         payload.transactionId = transactionId;
//       }

//       const res = await api.post('/events/register', payload);
      
//       if (res.data.requiresPayment) {
//         setRegStatus({ state: 'requiredPayment', message: res.data.message });
//       } else {
//         setRegStatus({ state: 'registered', message: res.data.message });
//       }

//     } catch (error) {
//       const msg = error.response?.data?.message || "Registration failed.";
//       if (msg.includes('Already registered')) {
//           setRegStatus({ state: 'registered', message: msg });
//       } else {
//         setRegStatus({ state: 'error', message: msg });
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader2 size={48} className="animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (!event) return <div className="min-h-screen text-center py-20">Event not found.</div>;

//   const isPaid = event.isPaid;
//   const showPaymentForm = regStatus.state === 'requiredPayment';
//   const isRegistered = regStatus.state === 'registered';

//   return (
//     <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-2xl rounded-lg">
//       <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{event.title}</h1>
//       <p className="text-lg text-gray-600 mb-6">{event.category}</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-b pb-6">
//         <div className="space-y-3">
//             <div className="flex items-center gap-3 text-gray-700">
//                 <Calendar size={20} className="text-blue-500"/>
//                 <span className="font-semibold">Date:</span> {new Date(event.date).toDateString()}
//             </div>
//             <div className="flex items-center gap-3 text-gray-700">
//                 <Clock size={20} className="text-blue-500"/>
//                 <span className="font-semibold">Time:</span> {event.time}
//             </div>
//             <div className="flex items-center gap-3 text-gray-700">
//                 <MapPin size={20} className="text-blue-500"/>
//                 <span className="font-semibold">Venue:</span> {event.venue}
//             </div>
//             <div className="flex items-center gap-3 text-gray-700">
//                 <DollarSign size={20} className="text-blue-500"/>
//                 <span className="font-semibold">Price:</span> {isPaid ? `₹${event.price}` : 'Free'}
//             </div>
//         </div>
        
//         {event.image && (
//             <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg shadow-md" />
//         )}
//       </div>

//       <h2 className="text-2xl font-semibold text-gray-800 mb-3">Description</h2>
//       <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

//       {/* Registration/Payment Section */}
//       <div className="mt-8 p-4 border rounded-lg bg-blue-50">
//           <h3 className="text-xl font-bold mb-3 text-blue-700">Registration</h3>
          
//           {isRegistered ? (
//               <div className="flex items-center text-green-600 font-bold text-lg"><CheckCircle size={24} className="mr-2"/> {regStatus.message}</div>
//           ) : (
//               <>
//                 {(regStatus.state === 'pending' || regStatus.state === 'error') && (
//                     <p className={`p-2 mb-3 rounded ${regStatus.state === 'error' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>{regStatus.message}</p>
//                 )}
                
//                 {showPaymentForm && isPaid && (
//                     <div className="p-4 bg-yellow-50 rounded-lg mb-4">
//                         <p className="font-semibold text-orange-700 mb-3">{regStatus.message}</p>
//                         {/*  - Trigger for illustration */}
//                         {event.paymentQrCode && (
//                             <img src={event.paymentQrCode} alt="Payment QR Code" className="w-40 h-40 object-contain mx-auto my-4 border p-1 rounded" />
//                         )}
//                         <p className="text-sm mb-3">Amount: ₹{event.price}</p>
//                         <input 
//                             type="text"
//                             placeholder="Enter Transaction ID after payment"
//                             value={transactionId}
//                             onChange={(e) => setTransactionId(e.target.value)}
//                             className="w-full p-2 border rounded mb-3"
//                         />
//                     </div>
//                 )}
                
//                 <button 
//                     onClick={handleRegistration}
//                     disabled={regStatus.state === 'pending'}
//                     className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center"
//                 >
//                     {regStatus.state === 'pending' ? <Loader2 size={24} className="animate-spin mr-2"/> : isPaid ? "Proceed to Pay / Submit Registration" : "One-Click Register"}
//                 </button>
//             </>
//           )}
//       </div>
//     </div>
//   );
// }




// src/pages/EventDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Loader2, Calendar, Clock, MapPin, DollarSign, CheckCircle } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regStatus, setRegStatus] = useState({ state: 'idle', message: '' }); 
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.error("Error fetching event:", error);
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    if (!localStorage.getItem('token')) {
        alert("You must log in to register for an event.");
        navigate('/login', { state: { from: window.location.pathname } });
        return;
    }
    
    // Logic for paid events
    if (event.isPaid && regStatus.state !== 'requiredPayment' && !transactionId && regStatus.state !== 'registered') {
        setRegStatus({ state: 'requiredPayment', message: 'This is a paid event. Please complete payment and enter the transaction ID.' });
        return;
    }
    
    setRegStatus({ state: 'pending', message: 'Processing registration...' });
    try {
      const payload = { eventId: id };
      if (event.isPaid && transactionId) {
        payload.transactionId = transactionId;
      }

      const res = await api.post('/events/register', payload);
      
      setRegStatus({ state: 'registered', message: res.data.message || 'Successfully registered for the event!' });

    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      if (msg.includes('Already registered')) {
          setRegStatus({ state: 'registered', message: msg });
      } else {
        setRegStatus({ state: 'error', message: msg });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!event) return <div className="min-h-screen text-center py-20">Event not found.</div>;

  const isPaid = event.isPaid;
  const showPaymentForm = regStatus.state === 'requiredPayment' || (isPaid && !regStatus.state);
  const isRegistered = regStatus.state === 'registered';

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-2xl rounded-lg">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{event.title}</h1>
      <p className="text-lg text-gray-600 mb-6 font-medium border-b pb-4">Category: {event.category}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
                <Calendar size={20} className="text-blue-500"/>
                <span className="font-semibold">Date:</span> {new Date(event.date).toDateString()}
            </div>
            <div className="flex items-center gap-3 text-gray-700">
                <Clock size={20} className="text-blue-500"/>
                <span className="font-semibold">Time:</span> {event.time}
            </div>
            <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={20} className="text-blue-500"/>
                <span className="font-semibold">Venue:</span> {event.venue}
            </div>
            <div className="flex items-center gap-3 text-gray-700">
                <DollarSign size={20} className="text-blue-500"/>
                <span className="font-semibold">Price:</span> {isPaid ? `₹${event.price}` : 'Free'}
            </div>
        </div>
        
        {event.image && (
            <img src={event.image.path} alt={event.title} className="w-full h-48 object-cover rounded-lg shadow-md" />
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Event Details</h2>
      <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

      {/* Registration/Payment Section */}
      <div className="mt-8 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
          <h3 className="text-xl font-bold mb-3 text-blue-700">Registration Status</h3>
          
          {regStatus.state === 'error' && (
             <p className="p-2 mb-3 rounded bg-red-100 text-red-600 font-medium">{regStatus.message}</p>
          )}

          {isRegistered ? (
              <div className="flex items-center text-green-600 font-bold text-lg p-3 bg-green-100 rounded-lg"><CheckCircle size={24} className="mr-2"/> {regStatus.message}</div>
          ) : (
              <>
                {showPaymentForm && isPaid && (
                    <div className="p-4 bg-yellow-50 rounded-lg mb-4 border border-yellow-300">
                        <p className="font-semibold text-orange-700 mb-3">Action Required: {regStatus.message}</p>
                        
                        {/* NOTE: If your event object contains a payment QR code path, display it here */}
                        <p className="text-sm mb-3">Amount to Pay: ₹{event.price}</p>
                        
                        <input 
                            type="text"
                            placeholder="Enter Transaction ID after payment"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full p-2 border rounded mb-3"
                        />
                    </div>
                )}
                
                <button 
                    onClick={handleRegistration}
                    disabled={regStatus.state === 'pending'}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center"
                >
                    {regStatus.state === 'pending' ? <Loader2 size={24} className="animate-spin mr-2"/> 
                        : isPaid ? "Submit Registration" 
                        : "One-Click Register"}
                </button>
            </>
          )}
      </div>
    </div>
  );
}