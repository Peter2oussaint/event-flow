import { NextResponse } from "next/server";

const clientSessionCookie = "eventflow_client_session";

export async function POST(request: Request) {
  const expectedUsername = process.env.CLIENT_TEST_USERNAME;
  const expectedPassword = process.env.CLIENT_TEST_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return NextResponse.json(
      { error: "CLIENT_TEST_USERNAME or CLIENT_TEST_PASSWORD is not configured" },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.username !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  if (body.username !== expectedUsername || body.password !== expectedPassword) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(clientSessionCookie, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
