import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import prisma from "@/lib/prisma";


export default async function Customer() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link href={"/dashboard/customer/new"} className="text-white bg-blue-500 rounded px-4 py-1">Novo cliente</Link>
                </div>
                <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {customers.map((customer) => (
                        <CardCustomer key={customer.id} customer={customer} />
                    ))}
                </section>
                {customers.length === 0 && (
                    <h1 className="font-medium text-gray-600 text-center mt-4 underline select-none">Você ainda não possui nenhum cliente.</h1>
                )}
            </main>
        </Container>
    )
}