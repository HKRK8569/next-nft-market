import { ListingApiBody } from "@/apis/list";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: ListingApiBody = await req.json();
  const { nftId, price } = body;

  const response = await prisma.list.create({
    data: {
      nftId,
      price,
      status: "ACTIVE",
    },
  });

  return NextResponse.json(response, { status: 200 });
}
