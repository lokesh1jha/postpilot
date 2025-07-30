import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardClient } from "./dashboard-client"

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <DashboardClient user={user} />
}
