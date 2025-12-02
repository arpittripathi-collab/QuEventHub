// pages/Register.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Register, 2: Verify OTP
  const [formData, setFormData] = useState({});
  const [otpData, setOtpData] = useState({ userId: null, emailOtp: "", phoneOtp: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await api.post("/auth/register", formData);
      setOtpData({ ...otpData, userId: res.data.userId });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.errors || err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP Verification
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Verify Email OTP
    try {
      if (otpData.emailOtp) {
        const emailRes = await api.post("/auth/verify", {
          userId: otpData.userId,
          otp: otpData.emailOtp,
          type: "email",
        });
        setMessage(emailRes.data.message);
        if (emailRes.data.status === "fully_verified") {
            localStorage.setItem("token", emailRes.data.token);
            navigate("/"); // Redirect to home after full verification
            return;
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email verification failed.");
      setLoading(false);
      return;
    }
    
    // Verify Phone OTP
    try {
        if (otpData.phoneOtp) {
            const phoneRes = await api.post("/auth/verify", {
                userId: otpData.userId,
                otp: otpData.phoneOtp,
                type: "phone",
            });
            setMessage(phoneRes.data.message);
            if (phoneRes.data.status === "fully_verified") {
                localStorage.setItem("token", phoneRes.data.token);
                navigate("/"); // Redirect to home after full verification
            }
        }
    } catch (err) {
        setError(err.response?.data?.message || "Phone verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (type) => {
    setError("");
    setMessage("");
    try {
        await api.post("/auth/resend", { userId: otpData.userId, type });
        setMessage(`New ${type} OTP sent!`);
    } catch (err) {
        setError(err.response?.data?.message || `Failed to resend ${type} OTP.`);
    }
  };

  const RegistrationForm = () => (
    <form onSubmit={handleRegister} className="flex flex-col gap-3">
        {/* Input fields for name, email, password, etc. */}
        <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required className="p-3 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded" />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required className="p-3 border rounded" />
        <input name="q_id" type="text" placeholder="Q-ID (8 digits)" onChange={handleChange} required className="p-3 border rounded" />
        <input name="course" type="text" placeholder="Course" onChange={handleChange} required className="p-3 border rounded" />
        <input name="year" type="text" placeholder="Year" onChange={handleChange} required className="p-3 border rounded" />
        <input name="section" type="text" placeholder="Section" onChange={handleChange} required className="p-3 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="p-3 border rounded" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required className="p-3 border rounded" />
        
        <button type="submit" disabled={loading} className="bg-green-600 text-white p-3 rounded flex justify-center items-center">
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Register & Send OTP"}
        </button>
    </form>
  );

  const VerificationForm = () => (
    <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold mt-4">Email Verification</h3>
        <input 
            type="text" 
            placeholder="Email OTP" 
            value={otpData.emailOtp} 
            onChange={(e) => setOtpData({ ...otpData, emailOtp: e.target.value })} 
            className="p-3 border rounded" 
        />
        <button type="button" onClick={() => handleResend('email')} className="text-sm text-blue-500 hover:text-blue-700">Resend Email OTP</button>

        <h3 className="text-xl font-semibold mt-4">Phone Verification</h3>
        <input 
            type="text" 
            placeholder="Phone OTP" 
            value={otpData.phoneOtp} 
            onChange={(e) => setOtpData({ ...otpData, phoneOtp: e.target.value })} 
            className="p-3 border rounded" 
        />
        <button type="button" onClick={() => handleResend('phone')} className="text-sm text-blue-500 hover:text-blue-700">Resend Phone OTP</button>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-3 rounded flex justify-center items-center mt-6">
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Verify Account"}
        </button>
    </form>
  );

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-xl my-10">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-slate-800">
        Student {step === 1 ? "Registration" : "Verification"}
      </h2>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      {message && <p className="text-green-600 bg-green-100 p-3 rounded mb-4">{message}</p>}

      {step === 1 ? <RegistrationForm /> : <VerificationForm />}
    </div>
  );
}


