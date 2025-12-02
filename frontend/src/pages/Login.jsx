
  // src/pages/Login.jsx
  import { useState } from "react";
  import api from "../api";
  import { useNavigate, Link } from "react-router-dom";
  import { Loader2 } from "lucide-react";

  export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
      identifier: "",   // Q-ID or Email or Phone
      password: ""
    });

    const [error, setError] = useState("");

    const handleInputFocus = (e) => {
      e.target.focus();
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await api.post("/auth/login", form);

        // Save JWT
        localStorage.setItem("token", res.data.token);

        // Save user object if needed later
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const role = res.data.user.role;

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "club") {
          navigate("/club");
        } else {
          navigate("/");
        }

      } catch (err) {
        if (err.response?.status === 403) {
          setError("Account not verified. Please verify your email/phone.");
        } else {
          setError(err.response?.data?.message || "Login failed");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="p-10 max-w-md mx-auto bg-white shadow-xl rounded-xl my-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Campus Login
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Q-ID, Email, or Phone"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            onFocus={handleInputFocus}
            onClick={handleInputFocus}
            required
            autoComplete="username"
            autoFocus
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onFocus={handleInputFocus}
            onClick={handleInputFocus}
            required
            autoComplete="current-password"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition flex justify-center items-center"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          New student?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register Here
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-slate-500">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    );
  }









