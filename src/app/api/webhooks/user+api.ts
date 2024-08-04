import { db } from "@/db";
import { users } from "@/db/schema";
import { InsertPayload, UpdatePayload } from "@/types/supabase";

export async function POST(request: Request) {
  const {
    record: { id, email, phone, raw_user_meta_data },
  }: InsertPayload | UpdatePayload = await request.json();

  await db
    .insert(users)
    .values({
      id,
      email,
      phoneNumber: phone ?? "",
      firstName: raw_user_meta_data.name,
      imageUrl: raw_user_meta_data.avatar_url,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email,
        phoneNumber: phone ?? "",
        firstName: raw_user_meta_data.name,
        imageUrl: raw_user_meta_data.avatar_url,
      },
    });

  return Response.json({});
}
