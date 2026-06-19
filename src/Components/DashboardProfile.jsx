"use client";

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { Button, toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

function createDraft(user) {
  return {
    name: user?.name ?? "",
    image: user?.image ?? "",
  };
}

function ProfileField({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default function DashboardProfile({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [draft, setDraft] = useState(() => createDraft(initialUser));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initials = useMemo(() => {
    return (user?.name || user?.email || "DA")
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  function openModal() {
    setDraft(createDraft(user));
    setIsModalOpen(true);
  }

  function closeModal() {
    if (!isPending) {
      setIsModalOpen(false);
    }
  }

  function updateDraft(name, value) {
    setDraft((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextName = draft.name.trim();
    const nextImage = draft.image.trim();

    if (!nextName || !nextImage) {
      toast.danger("Please fill in your name and photo URL.");
      return;
    }

    startTransition(async () => {
      try {
        const { error } = await authClient.updateUser({
          name: nextName,
          image: nextImage,
        });

        if (error) {
          throw new Error(error.message || "Failed to update profile");
        }

        setUser((current) => ({
          ...current,
          name: nextName,
          image: nextImage,
        }));
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.danger(error.message || "Failed to update profile");
      }
    });
  }

  return (
    <>
      <section className="rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User profile"}
                width={88}
                height={88}
                unoptimized
                className="h-[88px] w-[88px] rounded-full border-4 border-blue-100 object-cover"
              />
            ) : (
              <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-blue-950 text-xl font-black text-white">
                {initials}
              </div>
            )}

            <div>
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-950">
                My Profile
              </span>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                Keep your patient account details current.
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Update your public profile information here. Your email address
                stays locked to protect account ownership.
              </p>
            </div>
          </div>

          <Button
            onClick={openModal}
            className="rounded-full bg-blue-950 px-6 text-sm font-semibold text-white hover:bg-blue-900"
          >
            Update Profile
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ProfileField label="Name" value={user?.name} />
          <ProfileField label="Email Address" value={user?.email} />
          <ProfileField label="Photo URL" value={user?.image} />
        </div>
      </section>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-edit-title"
            className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_120px_-40px_rgba(15,23,42,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-500">
                  Edit Profile
                </p>
                <h2
                  id="profile-edit-title"
                  className="mt-3 text-2xl font-black tracking-tight text-slate-950"
                >
                  Update your account information
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

            <form onSubmit={handleSubmit} className="px-6 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </span>
                  <input
                    required
                    value={draft.name}
                    onChange={(event) =>
                      updateDraft("name", event.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </span>
                  <input
                    readOnly
                    value={user?.email ?? ""}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 outline-none"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Photo URL
                </span>
                <input
                  required
                  type="url"
                  value={draft.image}
                  onChange={(event) => updateDraft("image", event.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-950"
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
