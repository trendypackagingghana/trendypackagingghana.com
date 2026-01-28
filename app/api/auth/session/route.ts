/**
 * Session API Route
 *
 * GET /api/auth/session
 *
 * Returns the current user's session information.
 * Used by client components to check authentication status.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const authUser = await getAuthenticatedUser();

    if (!authUser) {
      return NextResponse.json(
        { user: null, authenticated: false },
        { status: 200 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: authUser.supabaseUser.id,
        email: authUser.supabaseUser.email,
        emailVerified: !!authUser.supabaseUser.email_confirmed_at,
        profile: authUser.profile
          ? {
              fullName: authUser.profile.fullName,
              avatarUrl: authUser.profile.avatarUrl,
              role: authUser.profile.role,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
