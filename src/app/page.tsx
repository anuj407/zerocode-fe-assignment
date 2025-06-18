// ✅ app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeLayout from "@/app/components/HomeLayout";

export default async function HomePage() {
  const token = (await cookies()).get("token");

  if (!token) {
    redirect("/login");
  }

  return <HomeLayout />;
}
