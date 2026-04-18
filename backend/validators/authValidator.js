const { z } = require('zod');

const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name too long'),

  email: z.string()
    .email('Invalid email address'),

  password: z.string()
    .min(6, 'Password must be at least 6 characters'),

  phone: z.string()
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone number too long')
    .regex(/^\+?[0-9]+$/, 'Phone must contain only numbers'), // ✅ added

  language: z.enum(['en', 'ja'], {
    errorMap: () => ({ message: 'Language must be English or Japanesecd ..' }),
  }).default('en'),

  currency: z.enum(['INR', 'JPY'], {
    errorMap: () => ({ message: 'Currency must be INR or JPY' }),
  }).default('INR'),
});

const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address'),

  password: z.string()
    .min(1, 'Password is required'),
});

module.exports = { registerSchema, loginSchema };