import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/auth";

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const {
    doctorId,
    userEmail,
    doctorName,
    patientName,
    gender,
    phone,
    appointmentDate,
    appointmentTime,
    notes,
  } = body;

  if (
    !doctorId ||
    !userEmail ||
    !doctorName ||
    !patientName ||
    !gender ||
    !phone ||
    !appointmentDate ||
    !appointmentTime
  ) {
    return NextResponse.json(
      { message: "Please fill in all required appointment fields." },
      { status: 400 },
    );
  }

  const appointment = {
    doctorId,
    userEmail,
    doctorName,
    patientName,
    gender,
    phone,
    appointmentDate,
    appointmentTime,
    notes,
    createdAt: new Date().toISOString(),
  };

  const result = await db.collection("appointments").insertOne(appointment);

  if (!result.insertedId) {
    return NextResponse.json(
      { message: "Failed to create appointment." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Appointment created successfully." },
    { status: 201 },
  );
}
