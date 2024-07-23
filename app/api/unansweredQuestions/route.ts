import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export const revalidate = 0; 

export async function GET() {
  const unansweredQuestions = await prisma.unansweredQuestions.findMany();
  return NextResponse.json(unansweredQuestions)
}