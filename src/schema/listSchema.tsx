import { z } from 'zod';

export const listSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

export type ListFormValues = z.infer<typeof listSchema>;