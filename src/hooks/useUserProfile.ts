"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ProfileEntity } from "@/types/profile";
import { useEffect } from "react";

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

interface UseUserProfileResult {
  user: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Query key for caching
export const USER_PROFILE_KEY = ["userProfile"];

/**
 * Hook to get the current user's profile
 * Uses React Query for global caching and deduplication
 */
export function useUserProfile(): UseUserProfileResult {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: USER_PROFILE_KEY,
    queryFn: async (): Promise<UserProfile | null> => {
      // 1. Get user from Supabase SDK
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        return null;
      }

      // 2. Get profile details
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      // 3. Construct user object
      if (profileError) {
        return {
          id: authUser.id,
          email: authUser.email || "",
          fullName: authUser.email?.split("@")[0] || "Usuario",
        };
      }

      const profile = profileData as ProfileEntity;
      return {
        id: authUser.id,
        email: authUser.email || "",
        fullName:
          profile.full_name || authUser.email?.split("@")[0] || "Usuario",
      };
    },
    // Don't retry on 401/403, fail fast
    retry: (failureCount, error) => {
      // If unauthorized, don't retry
      if (error instanceof Error && error.message.includes("Auth"))
        return false;
      return failureCount < 2;
    },
  });

  // Listen for auth state changes to invalidate cache
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY });
      }
      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(USER_PROFILE_KEY, null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return {
    user: user ?? null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
