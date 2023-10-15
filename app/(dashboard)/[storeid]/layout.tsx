import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
    const { userId } = auth();

    if(!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId,
            id: params.userId,
        }
    })

    if(!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}
