/**
 * Current User Profile API Route
 *
 * GET /api/users/me - Get current user's profile
 * PATCH /api/users/me - Update current user's profile
 *
 * PROTECTED ROUTE: Requires authentication
 *
 * This demonstrates the pattern for protected API routes:
 * 1. Verify authentication first
 * 2. Only then access Prisma/database
 */

import { NextRequest, NextResponse } from "next/server";
import {
  requireAuthWithProfile,
  AuthenticationError,
} from "@/lib/auth";
import { updateProfile } from "@/lib/db/queries/profiles";
import { updateProfileSchema } from "@/lib/validations/auth";
import { ZodError } from "zod";

/**
 * GET /api/users/me
 * Returns the authenticated user's profile.
 */
export async function GET() {
  try {
    // Step 1: Verify authentication FIRST
    const authUser = await requireAuthWithProfile();

    // Step 2: Return profile data (already fetched during auth)
    return NextResponse.json({
      user: {
        id: authUser.supabaseUser.id,
        email: authUser.supabaseUser.email,
        profile: {
          fullName: authUser.profile!.fullName,
          avatarUrl: authUser.profile!.avatarUrl,
          role: authUser.profile!.role,
          createdAt: authUser.profile!.createdAt,
        },
      },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users/me
 * Updates the authenticated user's profile.
 */
export async function PATCH(request: NextRequest) {
  try {
    // Step 1: Verify authentication FIRST
    const authUser = await requireAuthWithProfile();

    // Step 2: Validate input
    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    // Step 3: Only now access Prisma
    const updatedProfile = await updateProfile(
      authUser.supabaseUser.id,
      validatedData
    );

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: {
        fullName: updatedProfile.fullName,
        avatarUrl: updatedProfile.avatarUrl,
        role: updatedProfile.role,
      },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
