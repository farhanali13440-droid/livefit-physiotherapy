import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/owner/login")({ component: OwnerLogin });

function OwnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const { data: owner } = await supabase.rpc("is_livefit_owner");
      if (owner === true) void navigate({ to: "/owner", replace: true });
      else await supabase.auth.signOut();
    });
  }, [navigate]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) {
      setError("Invalid email or password.");
      setBusy(false);
      return;
    }
    const { data: owner } = await supabase.rpc("is_livefit_owner");
    if (owner !== true) {
      await supabase.auth.signOut();
      setError("This account is not authorized for the LiveFit lead dashboard.");
      setBusy(false);
      return;
    }
    void navigate({ to: "/owner", replace: true });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <div className="w-full max-w-md border border-border bg-card p-8 shadow-[0_24px_70px_-45px_oklch(0.24_0.006_150_/_0.45)] sm:p-10">
        <p className="eyebrow text-primary">LiveFit Physiotherapy</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-charcoal">Lead Tracking Login</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Private owner access to LiveFit leads and tracking data.</p>
        {!supabaseConfigured ? (
          <p className="mt-6 border border-border bg-sand p-4 text-sm text-charcoal-soft">Supabase is not configured for this deployment. Add the existing Supabase environment variables before logging in.</p>
        ) : (
          <form onSubmit={submit} className="mt-7 grid gap-5">
            <label className="block"><span className="mb-2 block text-sm font-semibold">Email</span><input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-border bg-background px-4 py-3.5 outline-none focus:border-primary" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-border bg-background px-4 py-3.5 outline-none focus:border-primary" /></label>
            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
            <button disabled={busy} type="submit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy ? "Signing in…" : "LOGIN"}</button>
          </form>
        )}
      </div>
    </main>
  );
}
