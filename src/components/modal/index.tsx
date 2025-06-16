"use client"

import { ModalContext } from "@/providers/modal"
import { useContext, useRef } from "react"

export function ModalTicket() {
    const { handleModalVisible } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible();
        }
    }

    return (
        <div className="absolute bg-gray-900/60 w-full min-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>
                        <button className="bg-red-500 p-1 text-white rounded cursor-pointer" onClick={handleModalVisible}>
                            Fechar
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Nome:</h2>
                        <p>Problema no pc</p>
                    </div>
                    <div className="flex flex-col flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Descrição:</h2>
                        <p>Teste descrição</p>
                    </div>
                    <div className="w-full border-b border-b-slate-300 my-4"></div>
                    <h1 className="font-bold text-lg mb-4">Destalhes do cliente</h1>
                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Nome:</h2>
                        <p>Loja da Wanessa</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Telefone:</h2>
                        <p>(11) 512321233s</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Email:</h2>
                        <p>wanessa@teste.com</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Endereço:</h2>
                        <p>Rua teste</p>
                    </div>
                </div>
            </div>
        </div>
    )
}