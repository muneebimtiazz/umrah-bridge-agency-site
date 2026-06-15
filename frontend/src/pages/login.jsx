import { useState } from "react";
import bg_img from "../assets/images/abdurahman-iseini-DNwQ35LdxXQ-unsplash.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Eye, EyeOff } from "lucide-react";

// import logo_img from "../../assets/Group_20.webp";
// import logo2_img from "../../assets/logo-black.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      // SIMPLE DUMMY AUTH
      if (email === "admin@companyname.com" && password === "admin@") {
        localStorage.setItem("isLoggedIn", "true");

        navigate("/admin", { replace: true });
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 500);
  };

  const inputClass = `
    w-full py-2 outline-none
    border-b border-gray-300 focus:border-black
    text-black bg-transparent
    placeholder:text-sm placeholder:text-gray-400
  `;

  return (
    <div className="min-h-screen sm:h-screen sm:flex bg-white">

      {/* LEFT */}
      <div className="hidden sm:flex sm:w-[55%] p-1">
        <img
          src={bg_img}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>

      {/* RIGHT */}
      <div className="w-full sm:w-[45%] flex flex-col justify-center py-10 px-16">

        {/* Logo */}
        {/* <div className="flex gap-4 items-center">
          <img src={logo_img} alt="Logo" />
          <p className="text-xl font-extralight text-[#9E9E9E]">|</p>
          <img className="w-30" src={logo2_img} alt="Company logo" />
        </div> */}

        {/* Form */}
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl">Admin Login </h1>
          <p className="text-sm">Hello there,login here and start managing you website</p>
            </div>


          {/* Email */}
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />

          {/* Password */}
          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-10`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 bg-black text-white rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* <div className="text-xs mt-4">
            <NavLink to="/forgot-pass">Forgot Password?</NavLink>
          </div> */}
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-800 mt-4">
          © 2026 ? umrah and travel agency
        </p>
      </div>
    </div>
  );
}