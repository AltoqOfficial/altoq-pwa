import { NextResponse } from "next/server";
import { ApiError } from "@/types";
import type { AuthError, PostgrestError } from "@supabase/supabase-js";

type ExtendedError = Partial<AuthError & PostgrestError> & {
  message?: string;
  reasons?: string[];
};

export function handleApiError(err: ExtendedError) {
  const apiError: ApiError = {
    message: err.message || "Internal Server Error",
    code: err.code ?? "unknown_error",
    status: err.status ?? 500,
    reasons: err.reasons,
  };

  return NextResponse.json(apiError, { status: apiError.status });
}
