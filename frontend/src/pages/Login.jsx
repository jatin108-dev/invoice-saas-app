import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PRIMARY = 'rgb(29, 158, 117)';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      {/* DARK OVERLAY (important for visibility) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* BACK BUTTON */}
      <button
        onClick={() => {
          if (window.history.length > 1) navigate(-1);
          else navigate('/');
        }}
        className="absolute top-6 left-6 z-20 text-white border border-white/30 px-3 py-1 rounded-md text-sm hover:bg-white/10"
      >
        ← Back
      </button>

      {/* LOGIN CARD */}
      <div className="relative z-10 backdrop-blur-md bg-white/15 border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

        {/* BRAND */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="p-2 rounded-lg text-white"
            style={{ background: PRIMARY }}
          >
            🧾
          </div>
          <h1 className="text-lg font-semibold">InvoiceApp</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          Welcome Back
        </h2>

        <p className="text-sm text-white/70 mb-6">
          Login to your account
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-200 px-3 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="raj@shop.com"
              className="w-full mt-1 bg-white/20 border border-white/30 rounded-md px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full mt-1 bg-white/20 border border-white/30 rounded-md px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none"
              required
            />
          </div>

          <div className="text-right text-xs text-white/60 hover:underline cursor-pointer">
            Forgot password?
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md text-sm font-medium text-white"
            style={{ background: PRIMARY }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <p className="px-3 text-sm text-white/60">or</p>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button className="flex-1 border border-white/30 rounded-md py-2 text-sm hover:bg-white/10">
            Google
          </button>
          <button className="flex-1 border border-white/30 rounded-md py-2 text-sm hover:bg-white/10">
            Demo
          </button>
        </div>

        <p className="text-center text-sm text-white/70 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: PRIMARY }}>
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;