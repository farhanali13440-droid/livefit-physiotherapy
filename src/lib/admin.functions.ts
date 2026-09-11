import { createServerFn } from "@tanstack/react-start";

export type DashboardLead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  source: string | null;
  contact_method: string | null;
  status: string;
  notes: string | null;
};

export const STATUSES = ["New", "Contacted", "Converted", "Lost"] as const;

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; password: string }) => ({
    email: String(input?.email ?? "").trim().toLowerCase(),
    password: String(input?.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const { adminSession } = await import("./livefit-session.server");
    const { timingSafeEqual, createHash } = await import("node:crypto");
    const expectedEmail = (process.env["LIVEFIT_ADMIN_EMAIL"] ?? "").trim().toLowerCase();
    const expectedPassword = process.env["LIVEFIT_ADMIN_PASSWORD"] ?? "";
    if (!expectedEmail || !expectedPassword) throw new Error("Dashboard login is not configured.");
    const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
    const ok =
      timingSafeEqual(digest(data.email), digest(expectedEmail)) &&
      timingSafeEqual(digest(data.password), digest(expectedPassword));
    if (!ok) return { ok: false as const };
    const session = await adminSession();
    await session.update({ admin: true, email: expectedEmail });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { adminSession } = await import("./livefit-session.server");
  const session = await adminSession();
  await session.clear();
  return { ok: true as const };
});

async function requireAdmin() {
  const { adminSession } = await import("./livefit-session.server");
  const session = await adminSession();
  if (!session.data.admin) throw new Error("UNAUTHORIZED");
}

export const getDashboard = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("id,created_at,name,phone,email,source,contact_method,status,notes")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) throw new Error("Could not load leads.");
  return { leads: (data ?? []) as DashboardLead[] };
});

export const updateLead = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; status?: string; notes?: string }) => {
    const id = String(input?.id ?? "");
    if (!id) throw new Error("Missing lead.");
    const patch: { status?: string; notes?: string | null } = {};
    if (typeof input.status === "string") {
      if (!(STATUSES as readonly string[]).includes(input.status)) throw new Error("Invalid status.");
      patch.status = input.status;
    }
    if (typeof input.notes === "string") patch.notes = input.notes.slice(0, 2000);
    return { id, patch };
  })
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .update(data.patch)
      .eq("id", data.id)
      .select("id,created_at,name,phone,email,source,contact_method,status,notes")
      .single();
    if (error || !lead) throw new Error("Could not update this lead.");
    return { lead: lead as DashboardLead };
  });
