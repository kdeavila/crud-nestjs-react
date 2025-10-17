/**
 * Task validation schemas
 * taskFormSchema: For form validation (no transformation)
 * taskSchema: For backend submission (with ISO transformation)
 */

import { z } from 'zod';

const dateValidator = z
  .string()
  .optional()
  .nullable()
  .refine(
    (val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: 'Invalid date' }
  );

export const taskFormSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Maximum 100 characters'),
  description: z.string()
    .max(500, 'Maximum 500 characters')
    .optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: dateValidator,
});

export const taskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Maximum 100 characters'),
  description: z.string()
    .max(500, 'Maximum 500 characters')
    .optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: dateValidator.transform((val) => {
    if (!val) return null;
    return new Date(val).toISOString();
  }),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
export type TaskValues = z.infer<typeof taskSchema>;