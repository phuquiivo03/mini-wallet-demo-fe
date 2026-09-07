import { getBalance, getUserTransactions } from "@/lib/api";
import { Jersey_10, M_PLUS_1 } from "next/font/google";
import { NextRequest } from "next/server";
interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    if (!id) throw new Error("Event Id not found");
    const result = await getUserTransactions(1, 20, id);
    return Response.json(result);
  } catch (e) {
    return Response.json({
      success: false,
      status: 400,
      message: (e as Error).message || "Internal server error",
    });
  }
}
