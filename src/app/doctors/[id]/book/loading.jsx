export default function BookAppointmentLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-8 h-5 w-44 rounded-full bg-slate-200" />
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8">
            <div className="mb-5 h-7 w-32 rounded-full bg-slate-700" />
            <div className="mb-4 h-10 w-4/5 rounded-3xl bg-slate-700" />
            <div className="mb-8 h-24 rounded-3xl bg-slate-800" />
            <div className="space-y-4">
              <div className="h-24 rounded-3xl bg-slate-800" />
              <div className="h-24 rounded-3xl bg-slate-800" />
              <div className="h-24 rounded-3xl bg-slate-800" />
            </div>
          </section>
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8">
            <div className="mb-4 h-4 w-28 rounded-full bg-slate-200" />
            <div className="mb-8 h-10 w-3/4 rounded-3xl bg-slate-200" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-14 rounded-2xl bg-slate-100" />
              <div className="h-14 rounded-2xl bg-slate-100" />
              <div className="h-14 rounded-2xl bg-slate-100" />
              <div className="h-14 rounded-2xl bg-slate-100" />
              <div className="h-14 rounded-2xl bg-slate-100" />
              <div className="h-14 rounded-2xl bg-slate-100" />
            </div>
            <div className="mt-6 h-28 rounded-3xl bg-slate-100" />
            <div className="mt-6 flex gap-3">
              <div className="h-12 w-44 rounded-full bg-slate-200" />
              <div className="h-12 w-40 rounded-full bg-slate-200" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
