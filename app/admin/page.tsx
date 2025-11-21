export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import AdminPanel from "@/components/admin-dashboard";




export default function AdminPage() {
  return <AdminPanel />;
}
