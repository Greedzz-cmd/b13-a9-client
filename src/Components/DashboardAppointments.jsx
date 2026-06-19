"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Button, Card, Chip, toast } from "@heroui/react";
import {
  deleteAppointment,
  updateAppointment,
} from "@/lib/appointment-actions";

function createDraft(appointment) {
  return {
    patientName: appointment.patientName,
    gender: appointment.gender,
    phone: appointment.phone,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    notes: appointment.notes,
  };
}

function formatDate(dateText) {
  if (!dateText) {
    return "Date not set";
  }

  const date = new Date(`${dateText}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateText;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default function DashboardAppointments({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [draft, setDraft] = useState(null);
  const [activeAction, setActiveAction] = useState(null);
  const [isPending, startTransition] = useTransition();
  const today = new Date().toISOString().split("T")[0];

  const upcomingCount = useMemo(
    () =>
      appointments.filter((appointment) => appointment.appointmentDate >= today)
        .length,
    [appointments, today],
  );

  useEffect(() => {
    if (!editingAppointment) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape" && !isPending) {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [editingAppointment, isPending]);

  function openModal(appointment) {
    setEditingAppointment(appointment);
    setDraft(createDraft(appointment));
  }

  function closeModal() {
    setEditingAppointment(null);
    setDraft(null);
    setActiveAction(null);
  }

  function updateDraft(name, value) {
    setDraft((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!editingAppointment || !draft) {
      return;
    }

    setActiveAction(`update:${editingAppointment.id}`);

    startTransition(async () => {
      try {
        const result = await updateAppointment({
          id: editingAppointment.id,
          ...draft,
        });

        setAppointments((current) =>
          current.map((appointment) =>
            appointment.id === result.appointment.id
              ? result.appointment
              : appointment,
          ),
        );
        closeModal();
        toast.success(result.message);
      } catch (error) {
        setActiveAction(null);
        toast.danger(error.message || "Failed to update appointment");
      }
    });
  }

  function handleDelete(id) {
    setActiveAction(`delete:${id}`);

    startTransition(async () => {
      try {
        const result = await deleteAppointment(id);

        setAppointments((current) =>
          current.filter((appointment) => appointment.id !== result.id),
        );

        if (editingAppointment?.id === id) {
          closeModal();
        } else {
          setActiveAction(null);
        }

        toast.success(result.message);
      } catch (error) {
        setActiveAction(null);
        toast.danger(error.message || "Failed to delete appointment");
      }
    });
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
            Total Bookings
          </p>
          <p className="mt-2 text-3xl font-black text-blue-950">
            {appointments.length}
          </p>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Upcoming
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-700">
            {upcomingCount}
          </p>
        </div>
        <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Editable
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
            Change patient, schedule, and notes without touching doctor or
            account details.
          </p>
        </div>
      </div>

      {appointments.length ? (
        <div className="mt-8 grid gap-6">
          {appointments.map((appointment) => {
            const isDeleting =
              isPending && activeAction === `delete:${appointment.id}`;
            const isUpdating =
              isPending && activeAction === `update:${appointment.id}`;

            return (
              <Card
                key={appointment.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_-36px_rgba(15,23,42,0.45)]"
              >
                <Card.Header className="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Chip className="bg-blue-100 text-xs font-semibold uppercase tracking-[0.18em] text-blue-950">
                        Booking
                      </Chip>
                      <Chip className="bg-slate-100 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                        {appointment.gender || "Gender not set"}
                      </Chip>
                    </div>
                    <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                      {appointment.doctorName}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Appointment for {appointment.patientName} on{" "}
                      {formatDate(appointment.appointmentDate)} at{" "}
                      {appointment.appointmentTime || "time not set"}.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={() => openModal(appointment)}
                      isDisabled={isPending}
                      isLoading={isUpdating}
                      className="rounded-full bg-blue-950 px-6 text-sm font-semibold text-white hover:bg-blue-900"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(appointment.id)}
                      isDisabled={isPending}
                      isLoading={isDeleting}
                      className="rounded-full bg-rose-600 px-6 text-sm font-semibold text-white hover:bg-rose-500"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>

                <Card.Content className="grid gap-4 md:grid-cols-2 px-6 py-6">
                  <Detail label="User Email" value={appointment.userEmail} />
                  <Detail
                    label="Phone"
                    value={appointment.phone || "Phone not set"}
                  />
                  <Detail
                    label="Date"
                    value={formatDate(appointment.appointmentDate)}
                  />
                  <Detail
                    label="Time"
                    value={appointment.appointmentTime || "Time not set"}
                  />
                </Card.Content>

                <Card.Footer className="border-t border-slate-100 px-6 py-6">
                  <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Notes
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {appointment.notes ||
                        "No extra notes were added for this appointment."}
                    </p>
                  </div>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white px-8 py-12 text-center shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            No appointments booked yet
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            When you book a doctor, the appointment will appear here so you can
            update or remove it later.
          </p>
          <Link
            href="/all-appointments"
            className="mt-6 inline-flex rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            Browse Doctors
          </Link>
        </div>
      )}

      {editingAppointment && draft ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm"
          onClick={() => {
            if (!isPending) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-edit-title"
            className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_120px_-40px_rgba(15,23,42,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-500">
                  Edit Booking
                </p>
                <h2
                  id="appointment-edit-title"
                  className="mt-3 text-2xl font-black tracking-tight text-slate-950"
                >
                  Update appointment for {editingAppointment.patientName}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isPending}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              className="px-6 py-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    User Email
                  </span>
                  <input
                    readOnly
                    value={editingAppointment.userEmail}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Doctor
                  </span>
                  <input
                    readOnly
                    value={editingAppointment.doctorName}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Patient Name
                  </span>
                  <input
                    required
                    value={draft.patientName}
                    onChange={(event) =>
                      updateDraft("patientName", event.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </span>
                  <input
                    required
                    value={draft.phone}
                    onChange={(event) =>
                      updateDraft("phone", event.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Gender
                  </span>
                  <select
                    required
                    value={draft.gender}
                    onChange={(event) =>
                      updateDraft("gender", event.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                  >
                    {["Male", "Female", "Other"].map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Appointment Date
                  </span>
                  <input
                    required
                    type="date"
                    value={draft.appointmentDate}
                    min={today}
                    onChange={(event) =>
                      updateDraft("appointmentDate", event.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Appointment Time
                  </span>
                  <input
                    required
                    value={draft.appointmentTime}
                    onChange={(event) =>
                      updateDraft("appointmentTime", event.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Notes
                </span>
                <textarea
                  rows={5}
                  value={draft.notes}
                  onChange={(event) => updateDraft("notes", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="bordered"
                  onClick={closeModal}
                  isDisabled={isPending}
                  className="rounded-full border-slate-300 px-6 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isPending}
                  className="rounded-full bg-blue-950 px-6 text-sm font-semibold text-white hover:bg-blue-900"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
