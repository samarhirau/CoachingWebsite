

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:course-materials/interview-prep")
      .sort_by("public_id", "desc")
      .max_results(100)
      .execute({ resource_type: "raw" });

    const files = result.resources.map((file: any) => ({
      name: file.public_id.split("/").pop(),
      url: file.secure_url,
      format: file.format,
    }));

    return NextResponse.json({ files });
  } catch (error: any) {
    console.error("Cloudinary API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const files = [
//     {
//       name: "cracking_interview_bjeqam.pdf",
//       url: "https://res.cloudinary.com/dmfkglv8a/image/upload/v1762594224/cracking_interview_bjeqam.pdf",
//       format: "pdf"
//     },
//     {
//       name: "interview_questions_lh77un.docx",
//       url: "https://res.cloudinary.com/dmfkglv8a/raw/upload/v1762594239/interview_questions_lh77un.docx",
//       format: "docx"
//     }
//     // ...add the rest of your files
//   ];

//   return NextResponse.json({ files });
// }
