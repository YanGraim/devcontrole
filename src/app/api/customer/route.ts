import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//Rota para cadastras cliente
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, phone, address, userId } = await request.json();

    try {
        await prisma.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({ message: "Cliente cadastrado com sucesso!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Falied create new customer" }, { status: 400 })
    }

}

//Rota para deletar cliente
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");
    const findTicket = await prisma.tickect.findFirst({
        where: {
            customerId: userId
        }
    })

    if (!userId) {
        return NextResponse.json({ error: "Falied delete customer" }, { status: 400 })
    }

    if (findTicket) {
        return NextResponse.json({ error: "Falied delete customer" }, { status: 400 })
    }

    try {
        await prisma.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ message: "Cliente deletado com sucesso!" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Falied delete customer" }, { status: 400 })
    }
}