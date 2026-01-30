/**
 * Authentication Server Actions
 *
 * Server Actions for authentication that can be called directly
 * from Client Components using form actions or event handlers.
 */

"use server";

import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/validations/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  success: boolean;
  error?: string;
  details?: unknown;
};

/**
 * Sign in an existing user.
 */
export async function signIn(formData: FormData): Promise<ActionResult> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = signInSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: "Invalid email or password" };
  }

  if (!data.user) {
    return { success: false, error: "Authentication failed" };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
