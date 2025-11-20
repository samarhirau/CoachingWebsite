// components/SpeedInsightsClient.tsx
"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function SpeedInsightsClient() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Speed Insights</h1>
      <SpeedInsights url="https://upcoderv1.vercel.app" strategy="mobile" />
    </div>
  );
}
