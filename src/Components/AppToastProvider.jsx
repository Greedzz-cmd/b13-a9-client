"use client";

import { ToastProvider } from "@heroui/react";

export default function AppToastProvider() {
  return <ToastProvider placement="top-end" maxVisibleToasts={4} />;
}
