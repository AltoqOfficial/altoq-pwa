"use client";

import { useEffect } from "react";
import { useTheme } from "@/contexts";
import { useUserProfile } from "@/hooks/useUserProfile";

/**
 * ThemeAuthGuard Component
 *
 * This component ensures that dark mode is only accessible to authenticated users.
 * If a user is not authenticated (and not loading), it forces the theme to 'light'.
 *
 * It should be placed inside the ThemeProvider in the application layout.
 */
export function ThemeAuthGuard() {
  const { theme, setTheme } = useTheme();
  const { user, isLoading } = useUserProfile();

  useEffect(() => {
    // Wait for auth check to complete
    if (isLoading) return;

    // If user is not logged in and theme is not light, force light mode
    if (!user && theme !== "light") {
      setTheme("light");
    }
  }, [user, isLoading, theme, setTheme]);

  // This component doesn't render anything visually
  return null;
}
