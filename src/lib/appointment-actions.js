"use server";

import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { db } from "@/lib/mongodb";
import {
  getAppointmentDocumentByIdForUser,
  serializeAppointment,
} from "@/lib/appointments";

function normalizeEditableAppointmentFields(input) {
  return {
    patientName: String(input.patientName ?? "").trim(),
    gender: String(input.gender ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    appointmentDate: String(input.appointmentDate ?? "").trim(),
    appointmentTime: String(input.appointmentTime ?? "").trim(),
    notes: String(input.notes ?? "").trim(),
  };
}

async function getSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

export async function updateAppointment(input) {
  const user = await getSessionUser();

  if (!input?.id || !ObjectId.isValid(input.id)) {
    throw new Error("Invalid appointment.");
  }

  const updates = normalizeEditableAppointmentFields(input);

  if (
    !updates.patientName ||
    !updates.gender ||
    !updates.phone ||
    !updates.appointmentDate ||
    !updates.appointmentTime
  ) {
    throw new Error("Please fill in all required appointment fields.");
  }

  const existingAppointment = await getAppointmentDocumentByIdForUser(
    input.id,
    user.email,
  );

  if (!existingAppointment) {
    throw new Error("Appointment not found.");
  }

  await db.collection("appointments").updateOne(
    {
      _id: new ObjectId(input.id),
      userEmail: user.email,
    },
    {
      $set: updates,
    },
  );

  const updatedAppointment = await getAppointmentDocumentByIdForUser(
    input.id,
    user.email,
  );

  if (!updatedAppointment) {
    throw new Error("Appointment update could not be confirmed.");
  }

  return {
    appointment: serializeAppointment(updatedAppointment),
    message: "Appointment updated successfully!",
  };
}

export async function deleteAppointment(id) {
  const user = await getSessionUser();

  if (!id || !ObjectId.isValid(id)) {
    throw new Error("Invalid appointment.");
  }

  const result = await db.collection("appointments").deleteOne({
    _id: new ObjectId(id),
    userEmail: user.email,
  });

  if (!result.deletedCount) {
    throw new Error("Appointment not found.");
  }

  return {
    id,
    message: "Appointment deleted successfully!",
  };
}
