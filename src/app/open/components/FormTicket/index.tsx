"use client"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomerDataInfo } from "../../page"

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco sobre seu problema")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
    customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data: FormData) {
        const response = await api.post("/api/ticket", {
            name: data.name,
            description: data.description,
            customerId: customer.id
        })
    }

    return (
        <form className="bg-slate-200 py-6 px-2 rounded border border-slate-400 mt-6" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input
                name="name"
                placeholder="Digite o nome do chamado"
                type="text"
                register={register}
                error={errors.name?.message}
            />
            <label className="mb-1 font-medium text-lg">Descreva o problema</label>
            <textarea
                className="w-full border border-slate-400 bg-white rounded-md h-24 resize-none outline-none px-2"
                id="description"
                placeholder="Descreva o problema"
                {...register("description")}
            ></textarea>
            {errors.description?.message && <p className="text-red-500 mb-4">{errors.description?.message}</p>}
            <button className="w-full bg-blue-500 rounded h-11 text-white cursor-pointer font-medium px-2">
                Cadastrar
            </button>
        </form>
    )
}