"use client";

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório."),
    email: z.string().email("Digite um email válido").min(1, "O email é obrigatório."),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O número de telefone deve estar (DD) XXXXXXXXX"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterCustomer(data: FormData) {
        await api.post("/api/customer", {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            userId: userId
        })

        router.replace("/dashboard/customer");
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="font-medium text-lg mb-1">Nome completo <span className="text-red-500">*</span></label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />
            <section className="flex flex-col gap-2 my-2 md:flex-row">
                <div className="flex-1">
                    <label className="font-medium text-lg mb-1">Email <span className="text-red-500">*</span></label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite o email"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
                <div className="flex-1">
                    <label className="font-medium text-lg mb-1">Telefone <span className="text-red-500">*</span></label>
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="(DD) XXXXXXXXX"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>
            </section>
            <label className="font-medium text-lg mb-1">Endereço</label>
            <Input
                type="text"
                name="address"
                placeholder="Digite o endereço"
                error={errors.address?.message}
                register={register}
            />
            <button type="submit" className="bg-blue-500 my-4 py-2 rounded text-white font-medium cursor-pointer">Cadastrar</button>
        </form>
    )
}