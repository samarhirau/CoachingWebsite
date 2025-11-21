// import { NextResponse } from "next/server";

// export async function GET() {
//   const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

//   const params = new URLSearchParams({
//     redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
//     client_id: process.env.GOOGLE_CLIENT_ID!,
//     access_type: "offline",
//     response_type: "code",
//     prompt: "consent",
//     scope: [
//       "openid",
//       "profile",
//       "email",
//     ].join(" "),
//   });

//   return NextResponse.redirect(`${rootUrl}?${params.toString()}`);
// }
// working


import { NextResponse } from "next/server";

export async function GET() {
  const redirect = process.env.GOOGLE_REDIRECT_URI!;
  const clientId = process.env.GOOGLE_CLIENT_ID!;

  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirect,
      response_type: "code",
      scope: "openid email profile",
      prompt: "consent",
    }).toString();

  return NextResponse.redirect(url);
}
