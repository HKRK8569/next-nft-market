import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  await prisma.list.update({
    data: {
      status: "CANCELLED",
    },
    where: {
      id: id,
    },
  });
  const nftId = await prisma.list.findFirst({
    select: {
      nft: {
        select: {
          id: true,
        },
      },
    },
    where: {
      id: id,
    },
  });

  await prisma.nft.update({
    data: {
      isListing: false,
    },
    where: {
      id: nftId?.nft.id,
    },
  });

  return NextResponse.json({ status: 200 });
}
