"use client"

import { Input } from "@/components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FiSearch, FiX } from "react-icons/fi"
import { useState } from "react"
import { FormTicket } from "./components/FormTicket"

const schema = z.object({
    email: z.string().email("Digite o email do cliente para localizar.").min(1, "O campo email é obrigatório.")
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
    id: string;
    name: string;
}

export default function OpenTicket() {
    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "");
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl mt-24 text-center">Abrir chamado</h1>
            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="flex items-centerssss justify-between bg-slate-200 py-6 px-4 rounded border border-slate-400">
                        <p className="text-lg"><strong>Cliente selecionado:</strong> {customer.name}</p>
                        <button className="flex items-center justify-center rounded cursor-pointer" onClick={handleClearCustomer}>
                            <FiX size={26} color="#ff2929" />
                        </button>
                    </div>
                ) : (
                    <form className="bg-slate-200 py-6 px-2 rounded border border-slate-400">
                        <div>
                            <Input
                                name="email"
                                placeholder="Digite o email do cliente"
                                type="text"
                                error={errors.email?.message}
                                register={register}
                            />
                            <button className="w-full flex flex-row items-center justify-center gap-4 px-2 bg-blue-500 h-11 rounded mt-6 text-white cursor-pointer font-medium">
                                Procurar clientes <FiSearch size={24} color="#fff" />
                            </button>
                        </div>
                    </form>
                )}
                {customer !== null && <FormTicket />}
            </main>
        </div>
    )
}