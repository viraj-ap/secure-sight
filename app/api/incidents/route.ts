import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const resolved = req.nextUrl.searchParams.get("resolved");
    const where = resolved === "false" ? { resolved: false } : undefined;

    const incidents = await prisma.incident.findMany({
      where,
      orderBy: { tsStart: "desc" },
      include: { camera: true },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}
