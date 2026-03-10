import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function requireRole(allowedRoles: Array<"admin" | "editor" | "viewer">) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect("/admin");
  }

  return { user, profile, supabase };
}