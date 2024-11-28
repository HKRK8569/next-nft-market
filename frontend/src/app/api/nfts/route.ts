import { CreateNFTApiBody } from "@/apis/nft";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body: CreateNFTApiBody = await req.json();
    const { tokenId, name, description, userAddress, imageUri, metadataUri } =
      body;
    const response = await prisma.nft.create({
      data: {
        tokenId,
        name,
        description,
        userAddress,
        image: imageUri,
        metadataUri,
      },
    });
    return NextResponse.json({ response }, { status: 200 });
  } catch {
    return NextResponse.json({ status: 500 });
  }
}
