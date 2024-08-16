import type * as DocumentPicker from "expo-document-picker";

import { decode } from "base64-arraybuffer";
import { z } from "zod";

import { publicProcedure, router } from "../init";
import { User, UserSchema } from "@/db/schema";
import { supabase } from "@/utils/supabase";

type DocumentPickerAsset = z.ZodType<
  Pick<DocumentPicker.DocumentPickerAsset, "mimeType" | "name"> & {
    base64: string;
    userId: User["id"];
  }
>;

const resumeSchema: DocumentPickerAsset = z.object({
  name: z.string(),
  mimeType: z.string(),
  base64: z.string(),
  userId: UserSchema.shape.id,
});

export const resumeRouter = router({
  create: publicProcedure.input(resumeSchema).mutation(async ({ input }) => {
    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(`${input.userId}/${input.name}`, decode(input.base64), {
        upsert: true,
        contentType: input.mimeType,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("resumes").getPublicUrl(data.fullPath);

    return [{ ...data, publicUrl, name: input.name }];
  }),
});
