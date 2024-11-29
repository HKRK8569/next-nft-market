import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");
    const uuid = randomUUID();

    const extension = image.name.split(".").pop();
    const pictureUploadDir = path.join(process.cwd(), "public/files/images");
    const jsonUploadDir = path.join(process.cwd(), "public/files/jsons");
    const pictureUploadPath = path.join(
      pictureUploadDir,
      `${uuid}.${extension}`,
    );
    const jsonUploadPath = path.join(jsonUploadDir, `${uuid}.json`);
    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.promises.writeFile(pictureUploadPath, buffer);

    const jsonObj = {
      name: name,
      description,
      image: pictureUploadPath,
    };
    await fs.promises.writeFile(jsonUploadPath, JSON.stringify(jsonObj));

    return NextResponse.json(
      {
        json_path: `/files/jsons/${uuid}.json`,
        image_path: `/files/images/${uuid}.${extension}`,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
