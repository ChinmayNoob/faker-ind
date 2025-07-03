import { z } from "zod";
import { Languages } from "@/types/language";

export const fakerIndOptsSchema = z.object({
    language: z.enum(Languages).optional(),
}).strict();

export type FakerIndOpts = z.infer<typeof fakerIndOptsSchema>;