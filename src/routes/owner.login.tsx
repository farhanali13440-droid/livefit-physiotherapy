import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/owner/login")({ component: OwnerLogin });

function OwnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active || !data.session) return;
      const { data: isOwner } = await supabase.rpc("is_livefit_owner");
      if (isOwner) void navigate({ to: "/owner" });
      else await supabase.auth.signOut();
    });
    return () => { active = false; };
  }, [navigate]);

  async function login(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      setBusy(false);
      return;
    }
    const { data: isOwner, error: ownerError } = await supabase.rpc("is_livefit_owner");
    if (ownerError || isOwner !== true) {
      await supabase.auth.signOut();
      setError("This account is not authorized to access the LiveFit owner dashboard.");
      setBusy(false);
      return;
    }
    void navigate({ to: "/owner" });
  }

  if (!supabaseConfigured) {
    return <div className="grid min-h-screen place-items-center bg-sand px-5"><div className="max-w-md border border-border bg-card p-8"><p className="eyebrow text-primary">LIVEFIT PHYSIOTHERAPY</p><h1 className="mt-3 font-display text-3xl">Owner portal setup required</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">Supabase Auth must be configured for the deployed site.</p></div></div>;
  }

  return <div className="grid min-h-screen place-items-center bg-sand px-5">
    <form onSubmit={login} className="w-full max-w-md border border-border bg-card p-8 shadow-xl">
      <p className="eyebrow text-primary">LIVEFIT PHYSIOTHERAPY</p>
      <h1 className="mt-2 font-display text-3xl">LIVEFIT OWNER LOGIN</h1>
      <p className="mt-2 text-sm text-muted-foreground">Private Lead Tracking Dashboard</p>
      <div className="mt-7 space-y-4">
        <label className="block"><span className="mb-2 block text-sm font-semibold">Email</span><input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-border bg-background px-4 py-3.5" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-border bg-background px-4 py-3.5" /></label>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <button disabled={busy} className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground">{busy ? "Logging in…" : "LOGIN"}</button>
      </div>
    </form>
  </div>;
}
