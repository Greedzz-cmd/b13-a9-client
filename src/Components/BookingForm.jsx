"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, toast } from "@heroui/react";

function toMinutes(time12h) {
  const [time, meridiem] = time12h.trim().split(" ");
  const [hoursText, minutesText] = time.split(":");
  let hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

function to12Hour(minutesTotal) {
  const hours24 = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;
  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const normalizedHour = hours24 % 12 || 12;

  return `${String(normalizedHour).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )} ${meridiem}`;
}

function expandAvailability(availability = []) {
  const slots = new Set();

  for (const range of availability) {
    const [startText, endText] = range.split(" - ");

    if (!startText || !endText) {
      continue;
    }

    let cursor = toMinutes(startText);
    const end = toMinutes(endText);

    while (cursor <= end) {
      slots.add(to12Hour(cursor));
      cursor += 30;
    }
  }

  return [...slots];
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function BookingForm({ doctor, user }) {
  const router = useRouter();
  const doctorDetailsHref = `/doctors/${doctor._id}`;
  const appointmentTimes = useMemo(
    () => expandAvailability(doctor.availability),
    [doctor.availability],
  );
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    userEmail: user.email ?? "",
    doctorName: doctor.name,
    patientName: user.name ?? "",
    gender: "",
    phone: "",
    appointmentDate: today,
    appointmentTime: appointmentTimes[0] ?? "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  useEffect(() => {
    router.prefetch(doctorDetailsHref);
  }, [doctorDetailsHref, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            ...form,
          }),
        },
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to book appointment");
      }

      toast.success("Appointment booked successfully!");
      router.replace(doctorDetailsHref);
    } catch (error) {
      toast.danger(error.message || "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="User Email">
          <input
            name="userEmail"
            type="email"
            value={form.userEmail}
            readOnly
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none"
          />
        </Field>

        <Field label="Doctor">
          <input
            name="doctorName"
            value={form.doctorName}
            readOnly
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none"
          />
        </Field>

        <Field label="Patient Name">
          <input
            required
            name="patientName"
            value={form.patientName}
            onChange={(event) => updateField("patientName", event.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
          />
        </Field>

        <Field label="Phone Number">
          <input
            required
            name="phone"
            placeholder="01712345678"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
          />
        </Field>

        <Field label="Gender">
          <select
            required
            name="gender"
            value={form.gender}
            onChange={(event) => updateField("gender", event.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
          >
            <option value="">Select gender</option>
            {["Male", "Female", "Other"].map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Appointment Date">
          <input
            required
            name="appointmentDate"
            type="date"
            min={today}
            value={form.appointmentDate}
            onChange={(event) =>
              updateField("appointmentDate", event.target.value)
            }
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
          />
        </Field>

        <Field label="Appointment Time">
          <select
            required
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={(event) =>
              updateField("appointmentTime", event.target.value)
            }
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
          >
            {appointmentTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Reason for Visit">
        <textarea
          name="notes"
          placeholder="Share symptoms or anything the clinic should know before your visit."
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          rows={5}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-950"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="rounded-full bg-blue-950 px-8 text-sm font-semibold text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5"
        >
          Save Appointment
        </Button>
        <Button
          as={Link}
          href={doctorDetailsHref}
          variant="bordered"
          className="rounded-full border-slate-300 px-8 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5"
        >
          Back to Details
        </Button>
      </div>
    </form>
  );
}
