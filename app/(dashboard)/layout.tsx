import { getServerSession } from "next-auth";
import Sidebar from "../_components/sidebar";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex h-full">
      <Sidebar />
      {children}
    </div>
  );
}
