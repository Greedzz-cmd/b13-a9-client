import { ObjectId } from "mongodb";
import { db } from "@/lib/mongodb";

export function serializeAppointment(appointment) {
  return {
    id: appointment._id.toString(),
    userEmail: appointment.userEmail ?? "",
    doctorId: appointment.doctorId ?? "",
    doctorName: appointment.doctorName ?? "",
    patientName: appointment.patientName ?? "",
    gender: appointment.gender ?? "",
    phone: appointment.phone ?? "",
    appointmentDate: appointment.appointmentDate ?? "",
    appointmentTime: appointment.appointmentTime ?? "",
    notes: appointment.notes ?? "",
    createdAt: appointment.createdAt
      ? new Date(appointment.createdAt).toISOString()
      : null,
  };
}

export async function getAppointmentsByUserEmail(userEmail) {
  const appointments = await db
    .collection("appointments")
    .find({ userEmail })
    .sort({ createdAt: -1 })
    .toArray();

  return appointments.map(serializeAppointment);
}

export async function getAppointmentDocumentByIdForUser(id, userEmail) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return db.collection("appointments").findOne({
    _id: new ObjectId(id),
    userEmail,
  });
}
