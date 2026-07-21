import { z } from "zod";

/** Step 1: League Setup Validation Schema */
export const leagueSetupSchema = z.object({
  leagueName: z
    .string()
    .min(1, "League name is required")
    .min(2, "League name must be at least 2 characters"),
  fifaVersion: z.string().min(1, "Please select a FIFA version"),
});

export type LeagueSetupFormValues = z.infer<typeof leagueSetupSchema>;

/** Step 2: Attendees List Item Schema */
export const attendeeItemSchema = z.object({
  id: z.string(),
  resolvedName: z.string().optional(),
  avatar: z.string().optional(),
});

/** Step 2: Attendees Roster Validation Schema */
export const attendeesSchema = z.object({
  list: z
    .array(attendeeItemSchema)
    .refine(
      (items) => items.filter((item) => item.resolvedName?.trim()).length >= 3,
      "You must add and resolve at least 3 attendees to continue"
    ),
});

export type AttendeesFormValues = z.infer<typeof attendeesSchema>;

/** Step 3: League Rules & Format Validation Schema */
export const leagueRulesSchema = z.object({
  gameFormat: z.enum(["single", "homeAway"]),
  priorityMethod: z.enum(["goalDifference", "faceToFace"]),
});

export type LeagueRulesFormValues = z.infer<typeof leagueRulesSchema>;

/** Score Entry Modal Validation Schema */
export const scoreEntrySchema = z.object({
  homeScore: z.coerce.number().min(0, "Score cannot be negative"),
  awayScore: z.coerce.number().min(0, "Score cannot be negative"),
});

export type ScoreEntryFormValues = z.infer<typeof scoreEntrySchema>;
