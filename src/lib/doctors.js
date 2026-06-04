import { headers } from "next/headers";
import { auth } from "@/lib/auth";

async function getAuthHeaders() {
  try {
    const token = await auth.api.getToken({ headers: await headers() });

    if (token?.token) {
      return {
        authorization: `Bearer ${token.token}`,
      };
    }
  } catch (error) {
    console.error("Unable to read auth token for doctor request.", error);
  }

  return {};
}

async function readJsonResponse(res) {
  try {
    return await res.json();
  } catch (error) {
    console.error("Doctor response was not valid JSON.", error);
    return null;
  }
}

function findDoctorById(doctors, id) {
  if (!Array.isArray(doctors)) {
    return null;
  }

  return (
    doctors.find((doctor) => doctor?._id === id || doctor?.id === id) ?? null
  );
}

export async function getDoctorById(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER;

  if (!baseUrl || !id) {
    console.error("Doctor request skipped: missing backend URL or doctor id.");
    return null;
  }

  try {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/doctors/${id}`, {
      headers: authHeaders,
      cache: "no-store",
    });

    if (res.ok) {
      return await readJsonResponse(res);
    }

    if (res.status !== 404) {
      console.error(`Doctor request failed with status ${res.status}.`);
      return null;
    }

    const listRes = await fetch(`${baseUrl}/doctors`, {
      headers: authHeaders,
      cache: "no-store",
    });

    if (!listRes.ok) {
      console.error(`Doctor list fallback failed with status ${listRes.status}.`);
      return null;
    }

    const doctors = await readJsonResponse(listRes);
    return findDoctorById(doctors, id);
  } catch (error) {
    console.error("Doctor request failed.", error);
    return null;
  }
}
