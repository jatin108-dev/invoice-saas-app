import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // taking data from landing

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    language: location.state?.language || 'en',  //  pre-filled from landing
    currency: location.state?.currency || 'INR', //  pre-filled from landing
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
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // accent color based on pre-selected country
  const accentColor = formData.currency === 'INR' ? '#1D9E75' : '#378ADD';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">

        {/* Back to landing */}
        <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>

        {/* Title */}
        <h2 className="text-2xl font-medium text-gray-800 mb-1">
          {formData.currency === 'INR' ? '🇮🇳' : '🇯🇵'} Create Account
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {formData.currency === 'INR'
            ? 'Indian shop — ₹ INR billing'
            : 'Japanese shop — ¥ JPY billing'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Raj Kumar"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': accentColor }}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="raj@shop.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="text" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="+919876543210"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="Min 6 characters"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              required
            />
          </div>

          {/* Language + Currency — shown but pre-filled */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
              <select
                name="language" value={formData.language} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              >
                <option value="en">🇮🇳 English</option>
                <option value="ja">🇯🇵 Japanese</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Currency</label>
              <select
                name="currency" value={formData.currency} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              >
                <option value="INR">₹ INR</option>
                <option value="JPY">¥ JPY</option>
              </select>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full text-white font-medium py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
            style={{ background: accentColor }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="font-medium hover:underline"
            style={{ color: accentColor }}>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;