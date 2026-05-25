import { auth } from "@/lib/auth";
import { getDoctorById } from "@/lib/doctors";
import { db } from "@/lib/mongodb";

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.email) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    doctorId,
    patientName,
    gender,
    phone,
    appointmentDate,
    appointmentTime,
    notes,
  } = body;

  if (
    !doctorId ||
    !patientName ||
    !gender ||
    !phone ||
    !appointmentDate ||
    !appointmentTime
  ) {
    return Response.json(
      { message: "Please fill in all required appointment fields." },
      { status: 400 },
    );
  }

  const doctor = await getDoctorById(doctorId);

  if (!doctor) {
    return Response.json({ message: "Doctor not found." }, { status: 404 });
  }

  const appointment = {
    userEmail: session.user.email,
    doctorId,
    doctorName: doctor.name,
    patientName,
    gender,
    phone,
    appointmentDate,
    appointmentTime,
    notes: notes?.trim() || "",
    createdAt: new Date(),
  };

  const result = await db.collection("appointments").insertOne(appointment);

  return Response.json({
    message: "Appointment booked successfully!",
    insertedId: result.insertedId,
  });
}
