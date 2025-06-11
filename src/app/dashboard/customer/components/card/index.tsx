"use client";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";

export function CardCustomer({ customer }: { customer: CustomerProps }) {

    async function handleDeleteCustomer() {
        try {
            const response = await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <article className="flex flex-col bg-gray-100 border border-slate-200 p-2 gap-2 rounded-lg hover:-translate-y-1 hover:shadow-xl transition duration-300 select-none">
            <h2>
                <span className="font-bold">Nome:</span> {customer.name}
            </h2>
            <p>
                <span className="font-bold">Email:</span> {customer.email}
            </p>
            {customer.address && (
                <p>
                    <span className="font-bold">Endereço:</span> {customer.address}
                </p>
            )}
            <p>
                <span className="font-bold">Telefone:</span> {customer.phone}
            </p>
            <button className="bg-red-500 px-6 rounded text-white mt-2 self-start cursor-pointer" onClick={handleDeleteCustomer}>Deletar</button>
        </article>
    )
}