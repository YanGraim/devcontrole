import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prisma from "@/lib/prisma";


export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO"
    },
    include: {
      customer: true
    }
  })

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link href={"/dashboard/new"} className="bg-blue-500 px-4 py-1 rounded text-white">Novo chamado</Link>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-center">DATA CADASTRO</th>
              <th className="font-medium text-center">STATUS</th>
              <th className="font-bold text-right pr-6">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer} />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="font-medium text-gray-600 text-center mt-4 underline select-none">Nenhuma chamado foi encontrado aberto.</h1>
        )}
      </main>
    </Container>
  );
}
