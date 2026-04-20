import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

// 1. Create the context (empty box)
export const AuthContext = createContext(null);

// 2. Translation labels
const translations = {
  en: {
    dashboard: 'Dashboard',
    customers: 'Customers',
    invoices: 'Invoices',
    settings: 'Settings',
    logout: 'Logout',
    totalSales: 'Total Sales',
    welcome: 'Welcome',
  },
  ja: {
    dashboard: 'ダッシュボード',
    customers: '顧客',
    invoices: '請求書',
    settings: '設定',
    logout: 'ログアウト',
    totalSales: '総売上',
    welcome: 'ようこそ',
  },
};

// 3. Currency config
const currencyConfig = {
  INR: { symbol: '₹', rate: 1 },
  JPY: { symbol: '¥', rate: 1.85 }, // static rate: 1 INR = 1.85 JPY
};

// 4. Provider component (wraps entire app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load — check if user is already logged in via cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        setUser(res.data.user);
      } catch (error) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    setUser(res.data.user);
    return res.data;
  };

  // Register function
  const register = async (formData) => {
    const res = await axiosInstance.post('/auth/register', formData);
    setUser(res.data.user);
    return res.data;
  };

  // Logout function
  const logout = async () => {
    await axiosInstance.post('/auth/logout');
    setUser(null);
  };

  // Get labels based on user's language
  const t = (key) => {
    const lang = user?.language || 'en';
    return translations[lang][key] || key;
  };

  // Format amount based on user's currency
  const formatAmount = (amountInINR) => {
    const config = currencyConfig[user?.currency || 'INR'];
    const converted = amountInINR * config.rate;
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      t,           // use this to get translated labels
      formatAmount // use this to show currency amounts
    }}>
      {children}
    </AuthContext.Provider>
  );
};