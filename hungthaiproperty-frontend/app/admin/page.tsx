import type { Metadata } from "next";

import { AdminDashboard } from "../sections/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Hưng Thái Property",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
