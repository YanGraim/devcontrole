import { FiFile, FiTrash2 } from "react-icons/fi";

export function TicketItem() {
    return (
        <>
            <tr className="bg-slate-100 border-b-2 border-b-slate-300 h-14 last:border-b-0 hover:bg-gray-200 duration-300 select-none">
                <td className="text-left pl-1">Mercado do Doda</td>
                <td className="text-center">29/05/2025</td>
                <td className="text-center"><span className="bg-green-500 px-2 py-1 rounded">Em Aberto</span></td>
                <td className="text-right">
                    <button className="cursor-pointer mr-2">
                        <FiTrash2 size={24} color="#ef4444" />
                    </button>
                    <button className="cursor-pointer">
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}