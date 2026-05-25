export default function DoctorDetailsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 h-5 w-40 rounded-full bg-slate-200" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 h-8 w-56 rounded-full bg-slate-200" />
            <div className="mb-4 h-5 w-40 rounded-full bg-slate-200" />
            <div className="mb-8 h-28 rounded-3xl bg-slate-100" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-24 rounded-3xl bg-slate-100" />
              <div className="h-24 rounded-3xl bg-slate-100" />
              <div className="h-24 rounded-3xl bg-slate-100" />
              <div className="h-24 rounded-3xl bg-slate-100" />
            </div>
          </section>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mx-auto mb-6 h-32 w-32 rounded-full bg-slate-200" />
            <div className="mb-4 h-6 w-44 rounded-full bg-slate-200" />
            <div className="mb-8 h-16 rounded-3xl bg-slate-100" />
            <div className="space-y-4">
              <div className="h-16 rounded-3xl bg-slate-100" />
              <div className="h-16 rounded-3xl bg-slate-100" />
              <div className="h-16 rounded-3xl bg-slate-100" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
