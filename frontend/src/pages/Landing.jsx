import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const config = {
  in: {
    color: '#1D9E75',
    salesLabel: 'Total Sales',
    custLabel: 'Customers',
    invLabel: 'Invoices this month',
    amount: '₹ 54,200',
    customers: '38',
    invoices: '14',
    cta: 'Get Started — Indian Shop →',
    previewTitle: 'Dashboard Preview — Indian Shop',
    announceText: 'English interface with ₹ INR billing',
    language: 'en',
    currency: 'INR',
    flag: 'https://flagcdn.com/w80/in.png',
    flagAlt: 'India',
  },
  jp: {
    color: '#378ADD',
    salesLabel: '総売上',
    custLabel: '顧客',
    invLabel: '今月の請求書',
    amount: '¥ 54,200',
    customers: '38',
    invoices: '14',
    cta: '始める — 日本のお店 →',
    previewTitle: 'ダッシュボードプレビュー',
    announceText: '日本語インターフェース・¥ JPY対応',
    language: 'ja',
    currency: 'JPY',
    flag: 'https://flagcdn.com/w80/jp.png',
    flagAlt: 'Japan',
  },
};

const Landing = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const cfg = selected ? config[selected] : null;
  const accentColor = cfg?.color || '#1D9E75';

  const handleGetStarted = () => {
    if (!selected) return;
    navigate('/register', {
      state: {
        language: config[selected].language,
        currency: config[selected].currency,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="w-full px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-medium transition-all duration-500"
              style={{ background: accentColor }}
            >
              S
            </div>
            <div>
              <span className="text-base font-medium text-gray-800">ShopKeeper</span>
              <span className="text-xs text-gray-400 ml-1">Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Features
            </button>
            <button className="text-sm text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Pricing
            </button>
            <Link to="/login" className="text-sm text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Log in
            </Link>
            <button
              onClick={handleGetStarted}
              className="text-sm font-medium text-white px-5 py-2 rounded-lg transition-all duration-500"
              style={{ background: accentColor }}
            >
              Sign up free
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="w-full px-10 pt-14 pb-10 text-center">

        {/* Announce bar */}
        <div className="inline-flex items-center gap-2 text-xs px-5 py-2 rounded-full border border-gray-200 bg-white text-gray-500 mb-6">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: accentColor }}
          />
          {cfg ? cfg.announceText : 'Now available for Indian and Japanese shops'}
        </div>

        {/* Title */}
        <h1 className="text-5xl font-medium text-gray-800 leading-tight mb-4">
          Your shop. Your language.{' '}
          <span className="transition-all duration-500" style={{ color: accentColor }}>
            Your currency.
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-12">
          Invoicing and customer management built for local shops —
          no complexity, just results.
        </p>

        {/* ── Country Cards ── */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">

          {/* India */}
          <div
            onClick={() => setSelected('in')}
            className="bg-white rounded-3xl p-12 cursor-pointer transition-all duration-300 relative"
            style={{
              border: selected === 'in' ? '2px solid #1D9E75' : '1px solid #e5e7eb',
              transform: selected === 'in' ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: selected === 'in' ? '0 10px 30px rgba(29,158,117,0.1)' : 'none',
            }}
          >
            {selected === 'in' && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium">
                ✓
              </div>
            )}
            <img
              src="https://flagcdn.com/w80/in.png"
              alt="India"
              className="w-20 h-14 object-cover rounded-lg mx-auto mb-5"
            />
            <p className="text-xl font-medium text-gray-800 mb-2">Indian Shop</p>
            <p className="text-sm text-gray-400 mb-5">English interface</p>
            <span className="text-sm px-4 py-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              ₹ INR
            </span>
          </div>

          {/* Japan */}
          <div
            onClick={() => setSelected('jp')}
            className="bg-white rounded-3xl p-12 cursor-pointer transition-all duration-300 relative"
            style={{
              border: selected === 'jp' ? '2px solid #378ADD' : '1px solid #e5e7eb',
              transform: selected === 'jp' ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: selected === 'jp' ? '0 10px 30px rgba(55,138,221,0.1)' : 'none',
            }}
          >
            {selected === 'jp' && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                ✓
              </div>
            )}
            <img
              src="https://flagcdn.com/w80/jp.png"
              alt="Japan"
              className="w-20 h-14 object-cover rounded-lg mx-auto mb-5"
            />
            <p className="text-xl font-medium text-gray-800 mb-2">Japanese Shop</p>
            <p className="text-sm text-gray-400 mb-5">日本語インターフェース</p>
            <span className="text-sm px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700">
              ¥ JPY
            </span>
          </div>

        </div>

        {/* ── Dashboard Preview ── */}
        {cfg && (
          <div
            className="bg-white rounded-3xl mb-10 overflow-hidden max-w-4xl mx-auto transition-all duration-500"
            style={{ border: `1.5px solid ${cfg.color}` }}
          >
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-gray-400 ml-3">{cfg.previewTitle}</span>
            </div>
            <div className="p-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">{cfg.salesLabel}</span>
                <span className="text-2xl font-medium transition-all duration-500" style={{ color: cfg.color }}>
                  {cfg.amount}
                </span>
              </div>
              <div className="h-2 rounded-full mb-3 transition-all duration-500" style={{ width: '70%', background: cfg.color, opacity: 0.7 }} />
              <div className="h-2 rounded-full mb-6 transition-all duration-500" style={{ width: '45%', background: cfg.color, opacity: 0.4 }} />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">{cfg.custLabel}</p>
                  <p className="text-lg font-medium text-gray-700">{cfg.customers}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">{cfg.invLabel}</p>
                  <p className="text-lg font-medium text-gray-700">{cfg.invoices}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <button
          onClick={handleGetStarted}
          disabled={!selected}
          className="px-10 py-4 rounded-2xl text-base font-medium transition-all duration-300 mb-3"
          style={{
            background: selected ? accentColor : '#f3f4f6',
            color: selected ? '#fff' : '#9ca3af',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          {cfg ? cfg.cta : 'Select your shop type above'}
        </button>

        <p className="text-sm text-gray-400 mb-12">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline" style={{ color: accentColor }}>
            Log in
          </Link>
        </p>

        <hr className="border-gray-100 mb-10 max-w-4xl mx-auto" />

        {/* ── Features ── */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {[
            { icon: '🧾', label: 'Easy invoicing', desc: 'Create bills in seconds' },
            { icon: '👥', label: 'Customer records', desc: 'Track all your customers' },
            { icon: '📊', label: 'Sales dashboard', desc: 'See your business at a glance' },
          ].map((f) => (
            <div
              key={f.label}
              className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{f.label}</div>
              <div className="text-xs text-gray-400">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {[
            { num: '500+', label: 'Shops using it' },
            { num: '12k+', label: 'Invoices created' },
            { num: '2', label: 'Countries supported' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="text-2xl font-medium transition-all duration-500 mb-1" style={{ color: accentColor }}>
                {s.num}
              </div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-300 pb-10">
          No ads. No tracking. Just your shop data — always yours.
        </p>

      </div>
    </div>
  );
};

export default Landing;