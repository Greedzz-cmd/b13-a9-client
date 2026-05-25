const DOCTORS_API_URL = "http://localhost:4000/doctors";

export async function getDoctors() {
  const response = await fetch(DOCTORS_API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
}

export async function getDoctorById(id) {
  const doctors = await getDoctors();
  return doctors.find((doctor) => doctor.id === id) ?? null;
}
