import { createTransaction, login } from "@/lib/api";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const loginResult = await createTransaction({
      fromUserId: body.fromUserId,
      toUserId: body.toUserId,
      amount: body.amount,
      currency: "VND",
      message: body.message},
    );
    if (loginResult) return Response.json(loginResult);
  } catch (e) {
    console.log("===============ERROR============");
    console.error(e);
    return Response.json({
      success: false,
      status: 400,
      message:
        JSON.parse(JSON.stringify((e as Error).message)) ||
        "Fail to create event!!",
    });
  }
}
