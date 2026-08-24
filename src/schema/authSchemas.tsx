import { z } from 'zod';

//Sign in validation
export const signInSchema = z.object({
    email: z.string().min(1, 'Email is required.').email('Invalid email address.'), 
    password: z.string().min(1, 'Password is required.'),
});

export type signInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({

    name: z.string().min(3, 'Username must be at least 3 characters long.'),
    surname: z.string().min(3, 'Surname must be at least 3 characters long.'),
    email: z.string().min(1, 'Email is required.').email('Invalid email address.'),
    phone: z.string().min(3, 'Cellphone number must be 10-digits long.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string().min(8, 'Please confirm your password.'),

}).refine((data) => data.password === data.confirmPassword, {

    message: "Passwords don't match",
    path: ['confirmPassword'], //point error to the confirm password field
    
});

export type signUpFormData = z.infer<typeof signUpSchema>;
