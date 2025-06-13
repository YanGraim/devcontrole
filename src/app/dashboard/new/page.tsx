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

    async function handleRegisterTicket(formData: FormData) {
        "use server"
        const name = formData.get("name");
        const description = formData.get("description");
        const customerId = formData.get("customer");

        if (!name || !description || !customerId) {
            return;
        }
    }

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
            <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                <label className="font-medium">Nome do chamado</label>
                <input type="text" placeholder="Digite o nome do chamado" required className="w-full border border-slate-400 rounded-md h-11 px-2 mb-2 outline-none" name="name" />

                <label className="font-medium">Descreva o problema</label>
                <textarea placeholder="Descreva o problema..." className="w-full border border-slate-400 rounded-md h-24 px-2 mb-2 resize-none outline-none" required name="description"></textarea>

                {customers.length !== 0 && (
                    <>
                        <label className="font-medium">Selecione o cliente</label>
                        <select className="w-full border border-slate-400 rounded-md h-11 px-2 mb-2 resize-none outline-none" name="customer">
                            {customers.map((customer) => (
                                <option value={customer.id} key={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                    </>
                )}
                {customers.length === 0 && (
                    <Link href="/dashboard/customer/new">
                        Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium">cadastar cliente.</span>
                    </Link>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold px-2 my-4 h-11 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={customers.length === 0}>
                    Cadastrar
                </button>
            </form>
        </Container>
    )
}