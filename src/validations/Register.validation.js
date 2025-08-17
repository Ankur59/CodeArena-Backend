import { z } from "zod";

export const registrationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required")
        .max(30, "Cannot exceed 30 letters"),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Cannot exceed 50 letters"),

    email: z
        .email("Invalid email address")  // ✅ Use z.email() directly
        .max(50, "Email should be under 50 characters"),

    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters"),
});