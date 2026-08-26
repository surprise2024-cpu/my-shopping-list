import { z } from 'zod';

export const itemSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    notes: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    image: z.string().optional(),
});

export type ItemFormValues = z.infer<typeof itemSchema>;