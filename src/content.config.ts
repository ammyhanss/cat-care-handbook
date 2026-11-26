import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

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
        urgency: z.enum(['emergency', 'soon', 'monitor']).optional(),
        sources: z.array(z.string().min(1)).optional(),
      }),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
