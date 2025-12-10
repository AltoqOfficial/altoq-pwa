import { describe, it, expect, vi, beforeEach } from "vitest";
import { getGeoLocation, getGeoLocationCached } from "../geolocation";

// Mock global fetch
global.fetch = vi.fn();

describe("Geolocation utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getGeoLocation", () => {
    it("should return country and city for valid IP", async () => {
      const mockResponse = {
        country_name: "Peru",
        city: "Lima",
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getGeoLocation("8.8.8.8");

      expect(result).toEqual({
        country: "Peru",
        city: "Lima",
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://ipapi.co/8.8.8.8/json/",
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("should use auto IP when no IP provided", async () => {
      const mockResponse = {
        country_name: "United States",
        city: "Mountain View",
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getGeoLocation();

      expect(result).toEqual({
        country: "United States",
        city: "Mountain View",
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://ipapi.co/json/",
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("should return null values when API fails", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await getGeoLocation("1.1.1.1");

      expect(result).toEqual({
        country: null,
        city: null,
      });
    });

    it("should handle rate limit (429) gracefully and allow subscription to proceed", async () => {
      // Simulate ipapi.co rate limit exceeded
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 429, // Too Many Requests
      });

      const result = await getGeoLocation("1.1.1.1");

      // Should return null values instead of throwing
      expect(result).toEqual({
        country: null,
        city: null,
      });

      // This ensures that even if rate limit is reached,
      // the subscription can still be saved with country/city as null
    });

    it("should return null values when fetch throws error", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await getGeoLocation("1.1.1.1");

      expect(result).toEqual({
        country: null,
        city: null,
      });
    });

    it("should handle missing country_name or city gracefully", async () => {
      const mockResponse = {
        // Missing country_name and city
        ip: "8.8.8.8",
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getGeoLocation("8.8.8.8");

      expect(result).toEqual({
        country: null,
        city: null,
      });
    });
  });

  describe("getGeoLocationCached", () => {
    beforeEach(() => {
      // Clear mocks before each test to ensure clean state
      vi.clearAllMocks();
    });

    it("should cache results and return from cache on second call", async () => {
      const mockResponse = {
        country_name: "Peru",
        city: "Arequipa",
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      // First call - should fetch
      const result1 = await getGeoLocationCached("200.48.1.1");
      expect(result1).toEqual({
        country: "Peru",
        city: "Arequipa",
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Second call - should use cache
      const result2 = await getGeoLocationCached("200.48.1.1");
      expect(result2).toEqual({
        country: "Peru",
        city: "Arequipa",
      });
      expect(global.fetch).toHaveBeenCalledTimes(1); // Still 1, not called again
    });

    it("should use different cache entries for different IPs", async () => {
      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ country_name: "Peru", city: "Lima" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ country_name: "Mexico", city: "Mexico City" }),
        });

      // Use unique IPs that haven't been cached yet
      const result1 = await getGeoLocationCached("201.100.1.1");
      const result2 = await getGeoLocationCached("190.200.1.1");

      expect(result1.country).toBe("Peru");
      expect(result2.country).toBe("Mexico");
      // Should have made 2 separate API calls for different IPs
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
