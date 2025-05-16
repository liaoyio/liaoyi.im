import { z } from 'zod'

export const postsSchema = {
  author: z.string().optional(),
  date: z
    .string()
    .or(z.date())
    .transform((value, context) => {
      try {
        return new Date(value)
      }
      catch {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid date',
        })
        return z.NEVER
      }
    })
    .default(() => new Date()),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false),
  series: z.string().optional(),
  seriesPart: z.number().optional(),
}
