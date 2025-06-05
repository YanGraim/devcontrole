import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, phone, address } = await request.json();

    try {
        await PrismaClient

    } catch (error) {
        return NextResponse.json({ error: "Falied create new customer" }, { status: 400 })
    }

}