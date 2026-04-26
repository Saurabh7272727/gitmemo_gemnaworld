import { z } from 'zod';

export const projectFormSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().min(10, 'Description is required'),
    techStack: z.string().optional(),
    teamSize: z.string().refine((value) => Number(value) > 0, { message: 'Team size must be a positive number' }),
    roles: z.string().optional(),
});

export const taskFormSchema = z.object({
    title: z.string().min(3, 'Task title is required'),
    description: z.string().optional(),
    assignedTo: z.string().optional(),
    deadline: z.string().optional(),
});

export const problemFormSchema = z.object({
    title: z.string().min(5, 'Problem title is required'),
    description: z.string().min(10, 'Problem description is required'),
    category: z.string().optional(),
    tags: z.string().optional(),
});