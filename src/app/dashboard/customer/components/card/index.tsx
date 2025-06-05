export function CardCustomer() {
    return (
        <article className="flex flex-col bg-gray-100 border border-slate-200 p-2 gap-2 rounded-lg hover:-translate-y-1 hover:shadow-xl transition duration-300 select-none">
            <h2>
                <span className="font-bold">Nome:</span> Mercado do Doda
            </h2>
            <p>
                <span className="font-bold">Email:</span> teste@teste.com
            </p>
            <p>
                <span className="font-bold">Telefone:</span> (xx) xxxxx-xxxx
            </p>
            <button className="bg-red-500 px-6 rounded text-white mt-2 self-start cursor-pointer">Deletar</button>
        </article>
    )
}