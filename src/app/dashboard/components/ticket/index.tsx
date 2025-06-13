import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
    return (
        <>
            <tr className="bg-slate-100 border-b-2 border-b-slate-300 h-14 last:border-b-0 hover:bg-gray-300 duration-300 select-none">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-center">{ticket.created_at?.toLocaleDateString("pt-BR")}</td>
                <td className="text-center"><span className="bg-green-500 text-white px-2 py-1 rounded">{ticket.status}</span></td>
                <td className="text-right">
                    <button className="cursor-pointer mr-2">
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button className="cursor-pointer">
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}