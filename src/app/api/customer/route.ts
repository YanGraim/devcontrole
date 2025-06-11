import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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