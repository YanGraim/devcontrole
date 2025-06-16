"use client";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)
    const router = useRouter();

    async function handleChangeStatus() {
        try {
            await api.patch("/api/ticket", {
                id: ticket.id
            })
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    function handleOpenModal() {
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }

    return (
        <>
            <tr className="bg-slate-100 border-b-2 border-b-slate-300 h-14 last:border-b-0 hover:bg-gray-300 duration-300 select-none">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-center">{ticket.created_at?.toLocaleDateString("pt-BR")}</td>
                <td className="text-center"><span className="bg-green-500 text-white px-2 py-1 rounded">{ticket.status}</span></td>
                <td className="text-right">
                    <button className="cursor-pointer mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button className="cursor-pointer" onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}