import connectDB from "@/lib/mongoDb";
import Action from "@/models/Action";

export async function GET() {
  try {
    await connectDB();

    const result = await Action.deleteMany({
      status: "Processed",
      deleteAfter: { $lte: new Date() },
    });

    return Response.json({
      success: true,
      deleted: result.deletedCount,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
