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

export async function getDoctorById(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER;

  if (!baseUrl || !id) {
    console.error("Doctor request skipped: missing backend URL or doctor id.");
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/doctors/${id}`, {
      headers: await getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Doctor request failed with status ${res.status}.`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Doctor request failed.", error);
    return null;
  }
}
