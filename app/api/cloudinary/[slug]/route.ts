

// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function GET() {
//   try {
//     const result = await cloudinary.search
//       .expression("folder:course-materials/interview-prep")
//       .sort_by("public_id", "desc")
//       .max_results(100)
//       .execute({ resource_type: "raw" });

//     const files = result.resources.map((file: any) => ({
//       name: file.public_id.split("/").pop(),
//       url: file.secure_url,
//       format: file.format,
//     }));

//     return NextResponse.json({ files });
//   } catch (error: any) {
//     console.error("Cloudinary API error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const folderPath = `course-materials/${params.slug}`;
    console.log("🔍 Searching Cloudinary folder:", folderPath);

    const result = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .sort_by("public_id", "desc")
      .max_results(100)
      .execute({ resource_type: "raw" });

    console.log("📁 Found resources:", result.resources.length);

    const files = result.resources.map((file: any) => ({
      name: file.public_id.split("/").pop(),
      url: file.secure_url,
      format: file.format,
    }));

    return NextResponse.json({ files });
  } catch (error: any) {
    console.error("❌ Cloudinary API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
