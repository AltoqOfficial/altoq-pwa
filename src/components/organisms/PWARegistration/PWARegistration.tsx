"use client";

import { useEffect, useState } from "react";

/**
 * PWA Registration Component
 * Registers the service worker and handles updates
 */
export function PWARegistration() {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("[PWA] Service Worker registered successfully:", reg.scope);
        setRegistration(reg);

        // Check for updates periodically
        setInterval(() => {
          reg.update();
        }, 60000); // Check every minute

        // Handle service worker updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;

          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available
                console.log("[PWA] New version available");
                setUpdateAvailable(true);
              }
            });
          }
        });
      } catch (error) {
        console.error("[PWA] Service Worker registration failed:", error);
      }
    };

    registerServiceWorker();

    // Listen for controller change (new SW activated)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("[PWA] New service worker activated");
      window.location.reload();
    });
  }, []);

  // Show update notification if available
  useEffect(() => {
    if (updateAvailable && registration?.waiting) {
      const shouldUpdate = confirm(
        "¡Nueva versión disponible! ¿Deseas actualizar ahora?"
      );

      if (shouldUpdate) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    }
  }, [updateAvailable, registration]);

  return null;
}
