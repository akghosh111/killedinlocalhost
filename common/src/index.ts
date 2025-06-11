import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SigninInput = z.infer<typeof signinInput>

// Project input schema for creating new projects
export const projectInput = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    published: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    abandonedAt: z.date().nullable().optional()
})

export type ProjectInput = z.infer<typeof projectInput>

// Project update schema - all fields optional except for validation when provided
export const updateProjectInput = z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    content: z.string().min(1, "Content cannot be empty").optional(),
    published: z.boolean().optional(),
    upvotes: z.number().int().min(0).optional(),
    tags: z.array(z.string()).optional(),
    abandonedAt: z.date().nullable().optional()
})

export type UpdateProjectInput = z.infer<typeof updateProjectInput>