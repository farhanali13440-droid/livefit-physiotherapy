import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { LogOut } from "lucide-react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  contact_method: "Not Selected" | "Call" | "WhatsApp" | string;
  created_at: string;
  source: string | null;
  utm_campaign: string | null;
  landing_page: string | null;
};
type Event = { event_type: string; created_at: string; lead_id: string | null; contact_method: string | null };
type Range = "all" | "today" | "7d" | "30d";
type ContactFilter = "all" | "call" | "whatsapp" | "not_selected";

export const Route = createFileRoute("/owner")({ component: Owner });

function Owner() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false), [auth, setAuth] = useState(false), [owner, setOwner] = useState(false);
  const [email, setEmail] = useState(""), [password, setPassword] = useState(""), [error, setError] = useState(""), [busy, setBusy] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]), [events, setEvents] = useState<Event[]>([]);
  const [range, setRange] = useState<Range>("all"), [contactFilter, setContactFilter] = useState<ContactFilter>("all"), [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      setAuth(!!session);
      if (session) await verifyOwner();
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(!!session);
      if (!session) { setOwner(false); return; }
      void verifyOwner();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (owner) void load(); }, [owner]);

  async function verifyOwner() {
    if (!supabase) return false;
    const { data, error } = await supabase.rpc("is_livefit_owner");
    if (error || data !== true) {
      setOwner(false);
      setError("This account is not authorized to access the LiveFit owner dashboard.");
      await supabase.auth.signOut();
      return false;
    }
    setOwner(true);
    setError("");
    return true;
  }

  async function load() {
    if (!supabase) return;
    const [a, b] = await Promise.all([
      supabase.from("leads").select("id,name,phone,email,contact_method,created_at,source,utm_campaign,landing_page").order("created_at", { ascending: false }),
      supabase.from("lead_events").select("event_type,created_at,lead_id,contact_method").order("created_at", { ascending: false }),
    ]);
    if (a.error || b.error) { setError(a.error?.message || b.error?.message || "Could not load dashboard"); return; }
    setLeads((a.data || []) as Lead[]);
    setEvents((b.data || []) as Event[]);
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  }

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuth(false); setOwner(false); setLeads([]); setEvents([]);
    nav({ to: "/" });
  }

  const cutoff = useMemo(() => {
    const now = new Date();
    if (range === "today") return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (range === "7d") return new Date(Date.now() - 7 * 86400000);
    if (range === "30d") return new Date(Date.now() - 30 * 86400000);
    return null;
  }, [range]);

  const filtered = useMemo(() => leads.filter((lead) => {
    const inRange = !cutoff || new Date(lead.created_at) >= cutoff;
    const inContact = contactFilter === "all" ||
      (contactFilter === "call" && lead.contact_method === "Call") ||
      (contactFilter === "whatsapp" && lead.contact_method === "WhatsApp") ||
      (contactFilter === "not_selected" && (!lead.contact_method || lead.contact_method === "Not Selected"));
    const inSource = sourceFilter === "all" || lead.source === sourceFilter;
    return inRange && inContact && inSource;
  }), [leads, cutoff, contactFilter, sourceFilter]);

  const todayStart = useMemo(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }, []);
  const weekStart = useMemo(() => { const n = new Date(); const day = n.getDay(); const diff = day === 0 ? 6 : day - 1; return new Date(n.getFullYear(), n.getMonth(), n.getDate() - diff); }, []);
  const monthStart = useMemo(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); }, []);
  const total = leads.length;
  const today = leads.filter(l => new Date(l.created_at) >= todayStart).length;
  const week = leads.filter(l => new Date(l.created_at) >= weekStart).length;
  const month = leads.filter(l => new Date(l.created_at) >= monthStart).length;
  const calls = leads.filter(l => l.contact_method === "Call").length;
  const wa = leads.filter(l => l.contact_method === "WhatsApp").length;
  const trackedEvents = events.filter(e => !cutoff || new Date(e.created_at) >= cutoff);

  if (!supabaseConfigured) return <Setup />;
  if (!ready) return <div className="grid min-h-screen place-items-center">Loading owner portal…</div>;
  if (!auth || !owner) return <Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} error={error} busy={busy} onSubmit={login}/>;

  return <div className="min-h-screen bg-background text-charcoal">
    <header className="border-b border-border bg-card"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><div><p className="eyebrow text-primary">Private Owner Portal</p><h1 className="mt-1 font-display text-2xl">LIVEFIT OWNER DASHBOARD</h1></div><button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold"><LogOut className="h-4 w-4"/>Logout</button></div></header>
    <main className="mx-auto max-w-7xl px-5 py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{[["TOTAL LEADS",total],["TODAY",today],["THIS WEEK",week],["THIS MONTH",month],["CALL CONTACTS",calls],["WHATSAPP CONTACTS",wa]].map(([label,value])=><div key={String(label)} className="border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-3 font-display text-3xl font-bold">{value}</p></div>)}</div>

      <section className="mt-8 border border-border bg-card"><div className="flex flex-col gap-4 border-b border-border p-5"><div><p className="eyebrow text-primary">Lead Activity</p><h2 className="mt-1 font-display text-2xl">Leads</h2></div><div className="flex flex-wrap gap-2"><span className="self-center text-xs font-semibold text-muted-foreground">TIME</span>{[["all","All Time"],["today","Today"],["7d","Last 7 Days"],["30d","Last 30 Days"]].map(([v,l])=><button key={v} onClick={()=>setRange(v as Range)} className={`rounded-full px-3 py-2 text-xs font-semibold ${range===v?"bg-primary text-primary-foreground":"border border-border"}`}>{l}</button>)}</div><div className="flex flex-wrap gap-2"><span className="self-center text-xs font-semibold text-muted-foreground">CONTACT</span>{[["all","All Leads"],["call","Call"],["whatsapp","WhatsApp"],["not_selected","Not Selected"]].map(([v,l])=><button key={v} onClick={()=>setContactFilter(v as ContactFilter)} className={`rounded-full px-3 py-2 text-xs font-semibold ${contactFilter===v?"bg-charcoal text-background":"border border-border"}`}>{l}</button>)}</div><div className="flex flex-wrap gap-2"><span className="self-center text-xs font-semibold text-muted-foreground">SOURCE</span>{[["all","All"],["Google Ads","Google Ads"],["Meta Ads","Meta Ads"],["Organic","Organic"],["Direct","Direct"],["Other","Other"]].map(([v,l])=><button key={v} onClick={()=>setSourceFilter(v)} className={`rounded-full px-3 py-2 text-xs font-semibold ${sourceFilter===v?"bg-charcoal text-background":"border border-border"}`}>{l}</button>)}</div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="bg-sand text-xs uppercase text-muted-foreground"><tr>{["Name","Phone","Email","Contact Method","Source","Campaign","Landing Page","Date/Time"].map(x=><th key={x} className="px-5 py-3">{x}</th>)}</tr></thead><tbody>{filtered.length?filtered.map(l=><tr key={l.id} className="border-t border-border"><td className="px-5 py-4 font-semibold">{l.name}</td><td className="px-5 py-4 whitespace-nowrap">{l.phone}</td><td className="px-5 py-4">{l.email||"—"}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${l.contact_method === "WhatsApp" ? "bg-primary/15 text-primary" : l.contact_method === "Call" ? "bg-charcoal/10 text-charcoal" : "bg-sand text-muted-foreground"}`}>{l.contact_method || "Not Selected"}</span></td><td className="px-5 py-4">{l.source||"Other"}</td><td className="px-5 py-4">{l.utm_campaign||"—"}</td><td className="max-w-[280px] px-5 py-4 truncate" title={l.landing_page||""}>{l.landing_page||"—"}</td><td className="px-5 py-4 whitespace-nowrap text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td></tr>):<tr><td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">No leads match these filters.</td></tr>}</tbody></table></div>
      </section>

      <section className="mt-8 border border-border bg-card p-5"><div className="flex items-center justify-between gap-4"><div><p className="eyebrow text-primary">Tracking</p><h2 className="mt-1 font-display text-2xl">Event Activity</h2></div><p className="text-sm text-muted-foreground">{trackedEvents.length} tracked event{trackedEvents.length===1?"":"s"}</p></div><p className="mt-4 text-sm text-muted-foreground">Primary flow events are linked to the same lead where available. Direct Call/WhatsApp clicks may be anonymous and are never treated as identified leads. A call click means the CTA was clicked, not that a call was completed.</p></section>
      {error&&<p className="mt-4 text-sm text-destructive">{error}</p>}
    </main>
  </div>;
}

function Setup(){return <div className="grid min-h-screen place-items-center px-5"><div className="max-w-lg border border-border bg-card p-8"><p className="eyebrow text-primary">Owner Portal Setup</p><h1 className="mt-3 font-display text-3xl">Supabase is not configured yet.</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then run the LiveFit lead-tracking migrations.</p></div></div>}
function Login(p:{email:string;password:string;setEmail:(x:string)=>void;setPassword:(x:string)=>void;error:string;busy:boolean;onSubmit:(e:FormEvent)=>void}){return <div className="grid min-h-screen place-items-center bg-sand px-5"><form onSubmit={p.onSubmit} className="w-full max-w-md border border-border bg-card p-8 shadow-xl"><p className="eyebrow text-primary">Private Owner Portal</p><h1 className="mt-3 font-display text-4xl">LiveFit Lead Dashboard</h1><div className="mt-7 space-y-4"><input required type="email" placeholder="Email" value={p.email} onChange={e=>p.setEmail(e.target.value)} className="w-full border border-border bg-background px-4 py-3"/><input required type="password" placeholder="Password" value={p.password} onChange={e=>p.setPassword(e.target.value)} className="w-full border border-border bg-background px-4 py-3"/>{p.error&&<p className="text-sm text-destructive">{p.error}</p>}<button disabled={p.busy} className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground">{p.busy?"Signing in…":"Sign in"}</button></div></form></div>}
