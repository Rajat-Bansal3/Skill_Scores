export const eventSchema = z.object({
  type: z.enum(["rapid", "blitz", "bullet"]).default("blitz"),
  difficult: z.enum(["easy", "medium", "hard"]).default("easy"),
  maxMembers: z.number().int().nonnegative().default(0),
  minMembers: z.number().int().nonnegative().default(0),
  maxBounty: z.number().int().nonnegative().default(0),
  firstPrize: z.number().int().nonnegative().default(0),
  entryFess: z.number().int().nonnegative().default(0),
  duration: z.string(),
  participationDuration: z.string(),
  startTime: z.string(),
  offers: z.string(),
  state: z.enum(["live", "upcoming", "ended"]).optional(),
  participants: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
