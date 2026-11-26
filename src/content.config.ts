import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

const sourceSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    authors: z.string().min(1),
    year: z.coerce.number().int().gte(1900).lte(2100),
    url: z.string().url().optional(),
    doi: z
      .string()
      .regex(/^10\.\d{4,9}\/\S+$/)
      .optional(),
    tier: z.coerce.number().int().min(1).max(3),
  })
  .refine((source) => Boolean(source.url || source.doi), {
    message: 'Each source needs a url or a DOI',
  });

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        en: z.string().optional(),
        status: z.enum(['draft', 'literature-checked', 'vet-reviewed']).optional(),
        reviewed_by: z.string().optional(),
        last_updated: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
        last_verified: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
        urgency: z.enum(['emergency', 'soon', 'monitor']).optional(),
        sources: z.array(sourceSchema).optional(),
      }),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
