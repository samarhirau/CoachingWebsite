

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import User from "@/models/User";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const url = new URL(req.url);
//     const code = url.searchParams.get("code");

//     if (!code)
//       return NextResponse.json(
//         { success: false, message: "Missing code" },
//         { status: 400 }
//       );

//     const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID!,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//         redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
//         grant_type: "authorization_code",
//         code,
//       }),
//     });

//     const tokenData = await tokenRes.json();

//     if (!tokenData.access_token) {
//       console.log(tokenData);
//       return NextResponse.json(
//         { success: false, message: "Invalid token" },
//         { status: 400 }
//       );
//     }

//     const userInfoRes = await fetch(
//       "https://www.googleapis.com/oauth2/v2/userinfo",
//       {
//         headers: { Authorization: `Bearer ${tokenData.access_token}` },
//       }
//     );

//     const googleUser = await userInfoRes.json();

//     let user = await User.findOne({ email: googleUser.email });

//     if (!user) {
//       user = await User.create({
//         name: googleUser.name,
//         email: googleUser.email,
//         phone: "",
//         password: bcrypt.hashSync("google_oauth_temp", 10),
//       });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
//       expiresIn: "7d",
//     });

//     const base =
//       process.env.NODE_ENV === "production"
//         ? process.env.NEXTAUTH_URL!
//         : "http://localhost:3000";

//     const redirectUrl =
//       user.role === "admin"
//         ? `${base}/admin`
//         : `${base}/dashboard`;

//     const response = NextResponse.redirect(redirectUrl);

//     response.cookies.set("auth-token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60,
//     });

//     return response;
//   } catch (err) {
//     console.error("Google OAuth Error:", err);
//     return NextResponse.json(
//       { success: false, message: "OAuth failed" },
//       { status: 500 }
//     );
//   }
// }

// working











import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Missing code" },
        { status: 400 }
      );
    }

    // 1 - Exchange CODE for TOKEN
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    console.log("TOKEN:", tokenData);

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, message: tokenData.error_description || "OAuth token error" },
        { status: 400 }
      );
    }

    // 2 - Get Google User Data
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoRes.json();
    console.log("GOOGLE USER:", googleUser);

    // 3 - Check / Create user
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        password: bcrypt.hashSync("google_oauth_temp", 10),
      });
    }

    // 4 - Create JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 5 - Redirect
    const base = process.env.NEXTAUTH_URL!;
    const redirectUrl = user.role === "admin" ? `${base}/admin` : `${base}/dashboard`;

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.log("OAuth Error:", err);
    return NextResponse.json(
      { success: false, message: "OAuth failed" },
      { status: 500 }
    );
  }
}
