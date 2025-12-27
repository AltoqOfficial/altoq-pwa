import { NextResponse } from "next/server";
import { ApiError } from "@/types";
import type { AuthError, PostgrestError } from "@supabase/supabase-js";

type ExtendedError = Partial<AuthError & PostgrestError> & {
  message?: string;
  reasons?: string[];
};

export function handleApiError(err: unknown) {
  const errorObj = err as ExtendedError;

  const apiError: ApiError = {
    message: errorObj.message || "Internal Server Error",
    code: errorObj.code ?? "unknown_error",
    status: errorObj.status ?? 500,
    reasons: errorObj.reasons,
  };

  return NextResponse.json(apiError, { status: apiError.status });
}
