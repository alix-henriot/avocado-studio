import { z } from 'zod'

export const FormDataSchema = z.object({
  /* firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'), */

  
  material: z.string().min(1, 'Suck your mom'),
  type: z.string().min(1, 'Material is required'),

  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  
  city: z.string().min(1, 'City is required'),
  setting: z.array(z.string()),

  date: z.string().min(1, 'Setting is required'),
  from: z.string().min(1, 'Setting is required'),
  to: z.string().min(1, 'Setting is required'),
  
  options: z.array(z.string()),
})