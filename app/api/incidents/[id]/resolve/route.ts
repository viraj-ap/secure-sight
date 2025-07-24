import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid incident ID" }, { status: 400 });
    }

    const incident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(incident);
  } catch (error) {
    console.error("Error resolving incident:", error);
    return NextResponse.json(
      { error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}