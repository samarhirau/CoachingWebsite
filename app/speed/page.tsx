import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function SpeedPage() {
  const url = "https://upcoderv1.vercel.app"; 
  const insights = await SpeedInsights.run(url, { strategy: "mobile" });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Speed Insights</h1>
      <pre>{JSON.stringify(insights.categories, null, 2)}</pre>
    </div>
  );
}
