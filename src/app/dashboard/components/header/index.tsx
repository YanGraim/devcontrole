import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full bg-gray-900 flex items-center gap-4 rounded my-4 p-3">
                <Link href={"/dashboard"} className=" text-zinc-100 hover:font-bold duration-300">
                    Chamados
                </Link>
                <Link href={"/dashboard/customer"} className=" text-zinc-100 hover:font-bold duration-300">
                    Clientes
                </Link>
            </header>
        </Container>
    )
}