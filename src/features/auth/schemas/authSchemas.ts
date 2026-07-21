import { z } from "zod";

/** Step 1: Phone number validation schema */
export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\s-]{7,15}$/, "Please enter a valid phone number"),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;

/** Step 2: OTP verification validation schema */
export const otpSchema = z.object({
  otp: z
    .array(z.string())
    .length(5, "OTP must be 5 digits")
    .refine(
      (arr) => arr.every((digit) => /^\d$/.test(digit)),
      "All 5 OTP digits must be numbers"
    ),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

/** Registration Step 1: Profile details validation schema */
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Alphanumeric and underscores only"),
  avatar: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

/** Registration Step 2: Game selection validation schema */
export const gameSchema = z.object({
  game: z.string().min(1, "Please select a game title"),
});

export type GameFormValues = z.infer<typeof gameSchema>;

/** Registration Step 3: Password setup validation schema */
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Must be at least 8 characters")
      .refine(
        (val) => /[A-Za-z]/.test(val) && /\d/.test(val),
        "Must contain both letters and numbers"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
