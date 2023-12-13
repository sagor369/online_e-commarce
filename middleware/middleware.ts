import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (req: NextRequest) => {
  try {
    let cookie = req.cookies.get("jwt")?.value;

    if (!cookie) {
      throw new Error("Invalid Token");
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = cookie.split("Bearer ")[1];

    const result = await jwtVerify(token, secret);

    if (result?.payload) {
      return NextResponse.next();
    } else {
      throw new Error("Invalid Token");
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
    matcher: ["/user"]
}