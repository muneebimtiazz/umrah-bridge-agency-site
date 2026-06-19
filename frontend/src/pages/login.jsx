// src/pages/login.jsx
import { useState, useEffect } from "react";
import bg_img from "../assets/images/abdurahman-iseini-DNwQ35LdxXQ-unsplash.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/auth-context";

// import logo_img from "../../assets/Group_20.webp";
// import logo2_img from "../../assets/logo-black.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Tracks the silent /auth/me check that runs on mount.
  // While it's running we show nothing to avoid a flash of the login form
  // followed by an immediate redirect for users who are already logged in.
  const [sessionChecking, setSessionChecking] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const { login, checkAuth } = useAuth();

  // Redirect destination after login — honours where ProtectedRoute bounced from
  const from = location.state?.from?.pathname || "/admin";

  // ── On mount: silently check if a valid session cookie already exists ──
  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkAuth();
        if (user) {
          navigate("/admin", { replace: true });
          return; // skip setSessionChecking — component is unmounting
        }
      } catch {
        // No session — fall through and show the form
      } finally {
        setSessionChecking(false);
      }
    };

    verifySession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Form submit: call backend /auth/login via auth-context → auth.service ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (submitting) return;

    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Backend sends { message: "..." } on 401
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    w-full py-2 outline-none
    border-b border-gray-300 focus:border-black
    text-black bg-transparent
    placeholder:text-sm placeholder:text-gray-400
    transition-colors duration-150
  `;

  // Don't render anything while we silently verify the session —
  // prevents a visible flash of the login form for authenticated admins.
  if (sessionChecking) return null;

  return (
    <div className="min-h-screen sm:h-screen sm:flex bg-white">

      {/* ── LEFT: hero image ── */}
      <div className="hidden sm:flex sm:w-[55%] p-1">
        <img
          src={bg_img}
          className="w-full h-full object-cover rounded-lg"
          alt="Makkah"
        />
      </div>

      {/* ── RIGHT: form ── */}
      <div className="w-full sm:w-[45%] flex flex-col justify-center py-10 px-16">

        {/* Logo (uncomment when assets are ready) */}
        {/* <div className="flex gap-4 items-center mb-10">
          <img src={logo_img} alt="Logo" />
          <p className="text-xl font-extralight text-[#9E9E9E]">|</p>
          <img className="w-30" src={logo2_img} alt="Company logo" />
        </div> */}

        <form onSubmit={handleSubmit}>

          {/* Heading */}
          <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">Admin Login</h1>
            <p className="text-sm text-gray-500 mt-1">
              Hello there, login here and start managing your website
            </p>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
            required
          />

          {/* Password */}
          <div className="relative mt-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-10`}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm mt-3" role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-8 py-3 bg-black text-white rounded-md
                       hover:bg-gray-900 active:bg-gray-800
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-150 font-medium"
          >
            {submitting ? "Logging in…" : "Login"}
          </button>

          {/* Forgot password (uncomment when route exists) */}
          {/* <div className="text-xs mt-4 text-center">
            <NavLink to="/forgot-password" className="text-gray-500 hover:text-black">
              Forgot Password?
            </NavLink>
          </div> */}

        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-8">
          © 2026 Umrah Bridge Travel Agency
        </p>
      </div>
    </div>
  );
}