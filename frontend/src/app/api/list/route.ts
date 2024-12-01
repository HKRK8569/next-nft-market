import { ListingApiBody } from "@/apis/list";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userAddress = searchParams.get("userAddress");

  if (userAddress) {
    const response = await prisma.list.findMany({
      where: {
        status: "ACTIVE",
        nft: {
          userAddress: userAddress,
        },
      },
      include: {
        nft: true,
      },
    });
    return NextResponse.json(response, { status: 200 });
  }
  const response = await prisma.list.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      nft: true,
    },
  });

  return NextResponse.json(response, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body: ListingApiBody = await req.json();
  const { nftId, price } = body;

  await prisma.nft.update({
    data: {
      isListing: true,
    },
    where: {
      id: nftId,
    },
  });

  const response = await prisma.list.create({
    data: {
      nftId,
      price: price,
    },
  });

  return NextResponse.json(response, { status: 200 });
}
