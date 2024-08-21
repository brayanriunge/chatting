import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/utils/db";

export async function POST(req: NextResponse) {
  const session = await getServerSession(authOptions);
  const { content } = await req.json();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await prisma.message.create({
    data: {
      content,
      userId: session.user.id,
    },
  });

  return NextResponse.json(message);
}
