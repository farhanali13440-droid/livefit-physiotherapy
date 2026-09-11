import { useSession } from "@tanstack/react-start/server";

export type AdminSession = { admin?: boolean; email?: string };
export type LeadSession = { leadId?: string };

const isProd = () => process.env["NODE_ENV"] === "production";

function secret() {
  const value = process.env["LIVEFIT_SESSION_SECRET"];
  if (!value) throw new Error("Session secret is not configured.");
  return value;
}

export function adminSession() {
  return useSession<AdminSession>({
    password: secret(),
    name: "livefit-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: isProd(), sameSite: "lax", path: "/" },
  });
}

export function leadSession() {
  return useSession<LeadSession>({
    password: secret(),
    name: "livefit-lead",
    maxAge: 60 * 60 * 6,
    cookie: { httpOnly: true, secure: isProd(), sameSite: "lax", path: "/" },
  });
}
