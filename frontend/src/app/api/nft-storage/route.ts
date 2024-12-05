import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { message: "File is NotFound" },
        { status: 404 },
      );
    }

    if (!name || !description) {
      return NextResponse.json(
        { message: "data is NotFound" },
        { status: 404 },
      );
    }

    const imageUpload = await pinata.upload.file(image);
    const imageIpfsHash = imageUpload.IpfsHash;

    const jsonUpload = await pinata.upload.json({
      name,
      description,
      image: imageIpfsHash,
    });

    const { IpfsHash } = jsonUpload;

    return NextResponse.json({
      imageIpfsHash,
      jsonIpfsHash: IpfsHash,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
