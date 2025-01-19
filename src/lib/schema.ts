import { z } from 'zod'

export const schema = z.object({
  material: z.string().min(1, 'Suck your mom'),
  type: z.string().min(1, 'Material is required'),

  name: z.string(),
  company: z.string().min(1, 'Company is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  
  city: z.string().min(1, 'City is required'),
  setting: z.array(z.string()),

  date: z.string().min(1, 'Setting is required'),
  from: z.string().min(1, 'Setting is required'),
  to: z.string().min(1, 'Setting is required'),
  
  options: z.array(z.string()),
})