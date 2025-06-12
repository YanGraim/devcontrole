import { Container } from "@/components/container";
import Link from "next/link";

export default function NewTicket() {
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

                <label className="font-medium">Selecione o cliente</label>
                <select className="w-full border border-slate-400 rounded-md h-11 px-2 mb-2 resize-none outline-none required">
                    <option value="cliente1">Cliente 1</option>
                </select>
            </form>
        </Container>
    )
}