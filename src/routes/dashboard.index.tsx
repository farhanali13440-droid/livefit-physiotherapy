import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { adminLogout, getDashboard, updateLead, STATUSES, type DashboardLead } from "@/lib/admin.functions";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Leads Dashboard | LiveFit Physiotherapy" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

const fmt = (value: string) => new Date(value).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });

function Dashboard() {
  const navigate = useNavigate();
  const load = useServerFn(getDashboard);
  const save = useServerFn(updateLead);
  const logout = useServerFn(adminLogout);
  const [leads, setLeads] = useState<DashboardLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const result = await load({ data: undefined });
      setLeads(result.leads);
    } catch (err) {
      if (err instanceof Error && err.message.includes("UNAUTHORIZED")) {
        await navigate({ to: "/dashboard/login", replace: true });
        return;
      }
      setError("Could not load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function patch(id: string, changes: { status?: string; notes?: string }) {
    try {
      const result = await save({ data: { id, ...changes } });
      setLeads((prev) => prev.map((lead) => (lead.id === id ? result.lead : lead)));
    } catch (err) {
      if (err instanceof Error && err.message.includes("UNAUTHORIZED")) {
        await navigate({ to: "/dashboard/login", replace: true });
        return;
      }
      setError("Could not save that change.");
    }
  }

  const summary = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: leads.length,
      fresh: leads.filter((lead) => lead.status === "New").length,
      today: leads.filter((lead) => new Date(lead.created_at).toDateString() === today).length,
    };
  }, [leads]);

  return (
    <main className="min-h-screen bg-background text-charcoal">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="eyebrow text-primary">LiveFit Physiotherapy</p>
            <h1 className="mt-1 font-display text-3xl font-bold">Leads</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void refresh()} className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Refresh</button>
            <button
              onClick={async () => {
                await logout({ data: undefined });
                await navigate({ to: "/dashboard/login", replace: true });
              }}
              className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-background"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {error && <p className="mb-5 border border-border bg-sand p-4 text-sm text-destructive">{error}</p>}
        <div className="grid gap-3 sm:grid-cols-3">
          {[["Total Leads", summary.total], ["New Leads", summary.fresh], ["Leads Today", summary.today]].map(([label, value]) => (
            <div key={String(label)} className="border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-2 font-display text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-border bg-sand text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Date", "Name", "Phone", "Email", "Source", "Contact Method", "Status", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
              )}
              {!loading && leads.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No leads yet.</td></tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/70 align-top">
                  <td className="px-4 py-3 whitespace-nowrap">{fmt(lead.created_at)}</td>
                  <td className="px-4 py-3 font-semibold">{lead.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.email || "—"}</td>
                  <td className="px-4 py-3">{lead.source || "Direct"}</td>
                  <td className="px-4 py-3">{lead.contact_method || "Not Selected"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => void patch(lead.id, { status: e.target.value })}
                      className="border border-border bg-background px-2 py-1.5 text-sm"
                    >
                      {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      defaultValue={lead.notes ?? ""}
                      onBlur={(e) => { if (e.target.value !== (lead.notes ?? "")) void patch(lead.id, { notes: e.target.value }); }}
                      rows={2}
                      placeholder="Add a note…"
                      className="w-56 border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-primary"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
