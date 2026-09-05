
import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(2, 'Name must at least be 2 characters long'),
    surname: z.string().min(2, 'Surname must at least be 2 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^(\+[1-9]\d{6,14}|0\d{6,14})$/, 'Invalid phone number format'),
    avatar: z.string().optional(),
});

export const passwordSchema = z.object({

    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(1, 'New password must at least 6 characters long'),
    confirmPassword: z.string(),

}).refine((data) => data.newPassword === data.confirmPassword, {

    message: 'Passwords do not match',
    path: ['confirmPassword'],
    
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;