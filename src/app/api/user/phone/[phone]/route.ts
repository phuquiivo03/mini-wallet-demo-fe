import { findManyByPhone, getBalance, getUserTransactions } from "@/lib/api";
import { Jersey_10, M_PLUS_1 } from "next/font/google";
import { NextRequest } from "next/server";
interface RouteContext {
  params: Promise<{
    phone: string;
  }>;
}
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { phone } = await params;
    if (!phone) throw new Error("Event phone not found");
    const result = await findManyByPhone(phone);
    return Response.json(result);
  } catch (e) {
    return Response.json({
      success: false,
      status: 400,
      message: (e as Error).message || "Internal server error",
    });
  }
}
