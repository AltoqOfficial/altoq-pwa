/**
 * Geolocation utilities using ipapi.co free tier
 * Free tier: 30,000 requests/month (~1,000/day)
 * No API key required for basic usage
 *
 * IMPORTANT: This utility is designed to be FAIL-SAFE:
 * - If rate limit is exceeded (429), returns { country: null, city: null }
 * - If API is down or timeout, returns { country: null, city: null }
 * - Subscriptions will ALWAYS be saved, even without geolocation data
 * - Uses 24-hour cache to minimize API calls and stay within limits
 */

interface GeoLocationData {
  country: string | null;
  city: string | null;
}

/**
 * Get geolocation data from IP address using ipapi.co
 * @param ipAddress - IP address to lookup (optional, will use requester's IP if not provided)
 * @returns Object with country and city, or null values if lookup fails
 */
export async function getGeoLocation(
  ipAddress?: string | null
): Promise<GeoLocationData> {
  try {
    // ipapi.co endpoint - if no IP provided, it uses the requester's IP
    const url = ipAddress
      ? `https://ipapi.co/${ipAddress}/json/`
      : "https://ipapi.co/json/";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "altoq-pwa/1.0",
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      console.warn(
        `Geolocation API returned status ${response.status} for IP: ${ipAddress || "auto"}`
      );
      return { country: null, city: null };
    }

    const data = await response.json();

    // ipapi.co returns country_name and city
    return {
      country: data.country_name || null,
      city: data.city || null,
    };
  } catch (error) {
    // Log error but don't throw - geolocation is optional
    console.warn("Failed to fetch geolocation data:", error);
    return { country: null, city: null };
  }
}

/**
 * Get geolocation with caching to reduce API calls
 * Note: In production, consider using Redis or similar for distributed caching
 */
const geoCache = new Map<
  string,
  { data: GeoLocationData; timestamp: number }
>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function getGeoLocationCached(
  ipAddress?: string | null
): Promise<GeoLocationData> {
  const cacheKey = ipAddress || "auto";

  // Check cache
  const cached = geoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Fetch fresh data
  const data = await getGeoLocation(ipAddress);

  // Update cache
  geoCache.set(cacheKey, { data, timestamp: Date.now() });

  // Clean old entries (keep cache size reasonable)
  if (geoCache.size > 1000) {
    const oldestKey = geoCache.keys().next().value;
    if (oldestKey) {
      geoCache.delete(oldestKey);
    }
  }

  return data;
}
