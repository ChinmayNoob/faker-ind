import { z } from "zod";
import { Language } from "@/types/language";

export const fakerIndOptsSchema = z.object({
    language: z.nativeEnum(Language).optional(),
}).strict();

export type FakerIndOpts = z.infer<typeof fakerIndOptsSchema>;