import { login } from "@/lib/api";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const loginResult = await login(body.phone, body.password);
    if (loginResult) return Response.json(loginResult);
    return Response.error();
  } catch (e) {
    console.log("===============ERROR============");
    console.error(e);
    return Response.error();
  }
}
