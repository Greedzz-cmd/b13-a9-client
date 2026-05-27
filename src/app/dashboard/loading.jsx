export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_24%,#ffffff_100%)] px-4 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="rounded-[2rem] border border-white/70 bg-white/95 px-6 py-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] md:px-10 md:py-12">
          <div className="h-4 w-28 rounded-full bg-blue-100" />
          <div className="mt-6 h-12 max-w-3xl rounded-2xl bg-slate-200" />
          <div className="mt-4 h-5 max-w-2xl rounded-2xl bg-slate-100" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="h-[520px] rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_-36px_rgba(15,23,42,0.25)]" />
          <div className="h-[320px] rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_-36px_rgba(15,23,42,0.25)]" />
        </div>
      </div>
    </main>
  );
}
