import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
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
                <div className="flex items-center gap-3">
                    <Link href={"/dashboard"} className="bg-gray-900 text-white px-4 py-1 rounded">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo chamado</h1>
                </div>
            </main>
            <form className="flex flex-col mt-6">
                <label className="font-medium">Nome do chamado</label>
                <input type="text" placeholder="Digite o nome do chamado" required className="w-full border border-slate-400 rounded-md h-11 px-2 mb-2 outline-none" />

                <label className="font-medium">Descreva o problema</label>
                <textarea className="w-full border border-slate-400 rounded-md h-24 px-2 mb-2 resize-none outline-none required"></textarea>

                {customers.length !== 0 && (
                    <>
                        <label className="font-medium">Selecione o cliente</label>
                        <select className="w-full border border-slate-400 rounded-md h-11 px-2 mb-2 resize-none outline-none required">
                            {customers.map((customer) => (
                                <option value={customer.id} key={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                    </>
                )}
                {customers.length === 0 && (
                    <Link href="">
                        Você ainda não tem nenhum cliente, <span>cadastar cliente.</span>
                    </Link>
                )}
            </form>
        </Container>
    )
}