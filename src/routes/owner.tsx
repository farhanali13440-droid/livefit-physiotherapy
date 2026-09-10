import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/owner")({ component: OwnerDashboard });

type Lead = {
  id: string; name: string; phone: string; email: string | null; contact_method: string | null;
  lead_status: string; notes: string | null; source: string | null; created_at: string;
  landing_page: string | null; referrer: string | null; utm_source: string | null; utm_medium: string | null;
  utm_campaign: string | null; utm_term: string | null; utm_content: string | null;
};
type Event = { id: string; event_type: string; page: string; cta_location: string | null; lead_id: string | null; contact_method: string | null; source: string | null; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; utm_term: string | null; utm_content: string | null; landing_page: string | null; referrer: string | null; event_data: Record<string, unknown> | null; created_at: string };
const statuses = ["New", "Contacted", "Assessment Booked", "Completed", "No Response", "Cancelled"];

function dateText(value: string) { return new Date(value).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" }); }
function inRange(value: string, days: number) { return Date.now() - new Date(value).getTime() <= days * 86400000; }

function OwnerDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [tab, setTab] = useState<"leads" | "events">("leads");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [source, setSource] = useState("All");
  const [contact, setContact] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    if (!supabase) { void navigate({ to: "/owner/login", replace: true }); return; }
    setLoading(true); setError("");
    const { data: owner, error: ownerError } = await supabase.rpc("is_livefit_owner");
    if (ownerError || owner !== true) { await supabase.auth.signOut(); void navigate({ to: "/owner/login", replace: true }); return; }
    const [leadResult, eventResult] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("lead_events").select("*").order("created_at", { ascending: false }).limit(1000),
    ]);
    if (leadResult.error) setError("Could not load leads. Make sure the latest Supabase migration has been applied.");
    else setLeads((leadResult.data || []) as Lead[]);
    if (!eventResult.error) setEvents((eventResult.data || []) as Event[]);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => leads.filter(l => {
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q);
    const matchesStatus = status === "All" || l.lead_status === status;
    const matchesSource = source === "All" || (l.source || "Direct") === source;
    const matchesContact = contact === "All" || (l.contact_method || "Not Selected") === contact;
    const matchesDate = dateFilter === "All" || (dateFilter === "Today" ? inRange(l.created_at, 1) && new Date(l.created_at).toDateString() === new Date().toDateString() : dateFilter === "This Week" ? inRange(l.created_at, 7) : inRange(l.created_at, 30));
    return matchesSearch && matchesStatus && matchesSource && matchesContact && matchesDate;
  }), [leads, search, status, source, contact, dateFilter]);

  const counts = useMemo(() => ({
    total: leads.length, New: leads.filter(l => l.lead_status === "New").length, Contacted: leads.filter(l => l.lead_status === "Contacted").length,
    booked: leads.filter(l => l.lead_status === "Assessment Booked").length, Completed: leads.filter(l => l.lead_status === "Completed").length,
    noResponse: leads.filter(l => l.lead_status === "No Response").length,
    today: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length,
    week: leads.filter(l => inRange(l.created_at, 7)).length, month: leads.filter(l => inRange(l.created_at, 30)).length,
  }), [leads]);

  async function updateLead(id: string, patch: Partial<Lead>) {
    if (!supabase) return;
    const { error: updateError } = await supabase.from("leads").update(patch).eq("id", id);
    if (updateError) { setError("Could not update this lead."); return; }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...patch } : prev);
  }

  async function logout() { if (supabase) await supabase.auth.signOut(); void navigate({ to: "/owner/login", replace: true }); }

  const kpis = [["Total Leads", counts.total], ["New Leads", counts.New], ["Contacted", counts.Contacted], ["Assessments Booked", counts.booked], ["Completed", counts.Completed], ["No Response", counts.noResponse]] as const;
  return <main className="min-h-screen bg-background text-charcoal">
    <header className="border-b border-border bg-card"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 sm:px-8"><div><p className="eyebrow text-primary">LiveFit Physiotherapy</p><h1 className="mt-1 font-display text-3xl font-bold">Lead Tracking</h1></div><div className="flex gap-2"><button onClick={() => void load()} className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Refresh</button><button onClick={() => void logout()} className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-background">Logout</button></div></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      {error && <p className="mb-5 border border-border bg-sand p-4 text-sm text-destructive">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{kpis.map(([label,value]) => <div key={label} className="border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl font-bold">{value}</p></div>)}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-card p-4"><span className="text-sm text-muted-foreground">Leads Today</span><strong className="float-right">{counts.today}</strong></div><div className="border border-border bg-card p-4"><span className="text-sm text-muted-foreground">Leads This Week</span><strong className="float-right">{counts.week}</strong></div><div className="border border-border bg-card p-4"><span className="text-sm text-muted-foreground">Leads This Month</span><strong className="float-right">{counts.month}</strong></div></div>
      <div className="mt-8 flex gap-2 border-b border-border"><button onClick={() => setTab("leads")} className={`px-4 py-3 text-sm font-semibold ${tab === "leads" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>Leads</button><button onClick={() => setTab("events")} className={`px-4 py-3 text-sm font-semibold ${tab === "events" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>Tracking Events ({events.length})</button></div>
      {tab === "leads" ? <>
        <div className="mt-5 grid gap-3 md:grid-cols-5"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or phone" className="border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2"/><select value={status} onChange={e => setStatus(e.target.value)} className="border border-border bg-card px-4 py-3 text-sm"><option>All</option>{statuses.map(s => <option key={s}>{s}</option>)}</select><select value={source} onChange={e => setSource(e.target.value)} className="border border-border bg-card px-4 py-3 text-sm"><option>All</option><option>Google Ads</option><option>Meta Ads</option><option>Organic</option><option>Direct</option><option>Other</option></select><select value={contact} onChange={e => setContact(e.target.value)} className="border border-border bg-card px-4 py-3 text-sm"><option>All</option><option>Call</option><option>WhatsApp</option><option>Not Selected</option></select><select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border border-border bg-card px-4 py-3 text-sm"><option>All</option><option>Today</option><option>This Week</option><option>This Month</option></select></div>
        <div className="mt-5 overflow-x-auto border border-border bg-card">{loading ? <p className="p-8 text-sm text-muted-foreground">Loading leads…</p> : <table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-border bg-sand"><tr>{["Date","Name","Phone","Contact Method","Status","Source","Actions"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">{h}</th>)}</tr></thead><tbody>{filtered.map(l => <tr key={l.id} className="border-b border-border last:border-0"><td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{dateText(l.created_at)}</td><td className="px-4 py-4 font-semibold">{l.name}</td><td className="px-4 py-4">{l.phone}</td><td className="px-4 py-4">{l.contact_method || "Not Selected"}</td><td className="px-4 py-4"><select value={l.lead_status} onChange={e => void updateLead(l.id,{lead_status:e.target.value})} className="border border-border bg-background px-2 py-2 text-xs">{statuses.map(s=><option key={s}>{s}</option>)}</select></td><td className="px-4 py-4">{l.source || "Direct"}</td><td className="px-4 py-4"><div className="flex gap-2"><button onClick={() => setSelected(l)} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">Open</button><a href={`tel:${l.phone}`} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Call</a><a href={`https://wa.me/${l.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">WhatsApp</a></div></td></tr>)}{filtered.length===0&&<tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No leads match the current filters.</td></tr>}</tbody></table>}</div>
      </> : <div className="mt-5 overflow-x-auto border border-border bg-card"><table className="w-full min-w-[1100px] text-left text-sm"><thead className="border-b border-border bg-sand"><tr>{["Date","Event","Page","CTA","Source","Campaign","Lead ID","Contact"].map(h=><th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">{h}</th>)}</tr></thead><tbody>{events.map(e=><tr key={e.id} className="border-b border-border"><td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{dateText(e.created_at)}</td><td className="px-4 py-3 font-semibold">{e.event_type}</td><td className="px-4 py-3">{e.page}</td><td className="px-4 py-3">{e.cta_location || "—"}</td><td className="px-4 py-3">{e.source || "Direct"}</td><td className="px-4 py-3">{e.utm_campaign || "—"}</td><td className="px-4 py-3 text-xs">{e.lead_id || "—"}</td><td className="px-4 py-3">{e.contact_method || "—"}</td></tr>)}</tbody></table></div>}
      <p className="mt-4 text-xs text-muted-foreground">Tracking events include CTA clicks, form views/submissions, direct calls, WhatsApp clicks, contact selection and attribution data captured by the existing LiveFit tracking system.</p>
    </div>
    {selected && <div className="fixed inset-0 z-50 bg-charcoal/50 p-5" onClick={() => setSelected(null)}><aside onClick={e=>e.stopPropagation()} className="ml-auto h-full max-w-xl overflow-y-auto bg-card p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="eyebrow text-primary">Lead Details</p><h2 className="mt-2 font-display text-3xl">{selected.name}</h2><p className="mt-1 text-sm text-muted-foreground">{dateText(selected.created_at)}</p></div><button onClick={()=>setSelected(null)} className="rounded-full border border-border px-3 py-2 text-sm">Close</button></div><div className="mt-7 grid gap-3 text-sm">{[["Phone",selected.phone],["Email",selected.email||"—"],["Contact Method",selected.contact_method||"Not Selected"],["Status",selected.lead_status],["Source",selected.source||"Direct"],["Landing Page",selected.landing_page||"—"],["Referrer",selected.referrer||"—"],["UTM Source",selected.utm_source||"—"],["UTM Medium",selected.utm_medium||"—"],["UTM Campaign",selected.utm_campaign||"—"],["UTM Term",selected.utm_term||"—"],["UTM Content",selected.utm_content||"—"]].map(([label,value])=><div key={label} className="border-b border-border pb-3"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 break-words">{value}</p></div>)}</div><label className="mt-6 block"><span className="mb-2 block text-sm font-semibold">Internal Notes</span><textarea defaultValue={selected.notes||""} onBlur={e=>void updateLead(selected.id,{notes:e.target.value})} rows={5} className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary" placeholder="Add internal notes…"/></label><div className="mt-5 flex gap-2"><a href={`tel:${selected.phone}`} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Call</a><a href={`https://wa.me/${selected.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">WhatsApp</a></div></aside></div>}
  </main>;
}
