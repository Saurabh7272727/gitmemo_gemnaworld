import { ZodError, z } from 'zod';
import validator from 'validator';

const sanitizeString = (value) => {
    if (typeof value !== 'string') return value;
    return validator.escape(value.trim());
};

export const parseRequest = (schema) => async (req, res, next) => {
    try {
        const parsed = await schema.parseAsync(req.body);
        const clean = JSON.parse(JSON.stringify(parsed), (key, value) => {
            if (typeof value === 'string') return sanitizeString(value);
            return value;
        });
        req.body = clean;
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.errors,
                success: false,
                status: 400,
            });
        }
        next(error);
    }
};

export const objectIdSchema = z.object({
    id: z.string().min(1, 'id is required'),
});

export const projectSchema = z.object({
    title: z.string().min(3).max(120),
    description: z.string().min(10).max(2000),
    techStack: z.array(z.string().min(1)).max(20),
    teamSize: z.number().min(1).max(50),
    roles: z.array(z.object({ role: z.string().min(2), count: z.number().min(1).max(20) })).optional(),
});

export const joinProjectSchema = z.object({
    projectId: z.string().min(1),
    role: z.string().min(2),
});

export const taskSchema = z.object({
    projectId: z.string().min(1),
    title: z.string().min(3).max(150),
    description: z.string().max(1200).optional(),
    assignedTo: z.string().optional(),
    deadline: z.string().optional(),
});

export const updateTaskStatusSchema = z.object({
    status: z.enum(['pending', 'in_progress', 'completed']),
});

export const contributionSchema = z.object({
    projectId: z.string().min(1),
    taskId: z.string().optional(),
    type: z.enum(['commit', 'manual', 'review']),
    description: z.string().min(10).max(2000),
    proof: z.string().url().optional(),
});

export const problemSchema = z.object({
    title: z.string().min(5).max(150),
    description: z.string().min(10).max(2000),
    category: z.string().max(80).optional(),
    tags: z.array(z.string().min(1)).optional(),
});

export const reputationSchema = z.object({
    userId: z.string().min(1),
    skills: z.array(z.object({ skill: z.string().min(2), level: z.number().min(1).max(10) })).optional(),
    leadershipCount: z.number().min(0).optional(),
});

export const badgeSchema = z.object({
    userId: z.string().min(1),
    projectId: z.string().min(1),
    type: z.enum(['completion', 'leadership', 'contribution']),
    title: z.string().min(3).max(120),
    description: z.string().max(2000).optional(),
});