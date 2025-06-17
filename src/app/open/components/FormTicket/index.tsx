"use client"
import { Input } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco sobre seu problema")
})

type FormData = z.infer<typeof schema>

export function FormTicket() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    return (
        <form>
            <label>Nome do chamado</label>
            <Input
                name="name"
                placeholder="Digite o nome do chamado"
                type="text"
                register={register}
                error={errors.name?.message}
            />
        </form>
    )
}