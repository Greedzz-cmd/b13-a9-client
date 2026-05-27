const DOCTORS_API_URL = `${process.env.BACKEND_SERVER}/doctors`;

export async function getDoctors() {
  const response = await fetch(DOCTORS_API_URL, {
    next: { revalidate: 300 },
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
