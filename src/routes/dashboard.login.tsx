import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/dashboard/login")({ component: DashboardLogin });

const functionUrl = () => {
  const base = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  return base ? `${base.replace(/\/$/, "")}/functions/v1/livefit-dashboard` : "";
};

function DashboardLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const url = functionUrl();
    if (!url) {
      setError("Dashboard backend is not connected. Configure VITE_SUPABASE_URL and deploy the existing livefit-dashboard Supabase function.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${url}?action=login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Login failed.");
      void navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally { setLoading(false); }
  }

  return <main className="min-h-screen bg-background px-5 py-12 text-charcoal sm:px-8"><div className="mx-auto flex min-h-[70vh] max-w-md items-center"><form onSubmit={submit} className="w-full border border-border bg-card p-7 shadow-sm sm:p-9"><p className="eyebrow text-primary">LiveFit Physiotherapy</p><h1 className="mt-2 font-display text-3xl font-bold">Private Dashboard</h1><p className="mt-2 text-sm text-muted-foreground">Sign in to view LiveFit leads and conversion activity.</p><label className="mt-7 block"><span className="mb-2 block text-sm font-semibold">Email</span><input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary" /></label><label className="mt-4 block"><span className="mb-2 block text-sm font-semibold">Password</span><input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary" /></label>{error&&<p className="mt-4 border border-border bg-sand p-3 text-sm text-destructive">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-background disabled:opacity-60">{loading?"Signing in…":"Open Dashboard"}</button></form></div></main>;
}
