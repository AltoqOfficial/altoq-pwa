"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { ProfileEntity } from "@/types/profile";

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

interface UseUserProfileResult {
  user: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to get the current user's profile
 * Fetches user data from Supabase auth and profile table
 */
export function useUserProfile(): UseUserProfileResult {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true);

        // Get access token from cookie
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!accessToken) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Get user from Supabase using the token
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser(accessToken);

        if (authError || !authUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Get profile from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (profileError) {
          // If no profile found, use email as fallback
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            fullName: authUser.email?.split("@")[0] || "Usuario",
          });
        } else {
          const profile = profileData as ProfileEntity;
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            fullName:
              profile.full_name || authUser.email?.split("@")[0] || "Usuario",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error fetching user"));
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  return { user, isLoading, error };
}
