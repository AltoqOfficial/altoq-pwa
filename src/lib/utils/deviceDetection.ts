/**
 * Utilidades para detectar información del dispositivo, navegador y sistema operativo
 */

export interface DeviceInfo {
  deviceType: "mobile" | "tablet" | "desktop";
  os: string;
  browser: string;
  browserVersion: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  timezone: string;
  language: string;
}

/**
 * Detecta el tipo de dispositivo basándose en el user agent y el ancho de pantalla
 */
export function getDeviceType(
  userAgent: string,
  screenWidth: number
): "mobile" | "tablet" | "desktop" {
  const ua = userAgent.toLowerCase();

  // Detectar por user agent
  if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
    // Si es mobile pero tiene pantalla grande, puede ser tablet
    if (screenWidth >= 768) {
      return "tablet";
    }
    return "mobile";
  }

  if (/ipad|android(?!.*mobile)|tablet/i.test(ua)) {
    return "tablet";
  }

  // Si la pantalla es pequeña pero no detectamos mobile, es tablet
  if (screenWidth >= 768 && screenWidth < 1024) {
    return "tablet";
  }

  return "desktop";
}

/**
 * Detecta el sistema operativo
 */
export function getOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (/windows nt 10/i.test(ua)) return "Windows 10/11";
  if (/windows nt 6.3/i.test(ua)) return "Windows 8.1";
  if (/windows nt 6.2/i.test(ua)) return "Windows 8";
  if (/windows nt 6.1/i.test(ua)) return "Windows 7";
  if (/windows/i.test(ua)) return "Windows";

  if (/macintosh|mac os x/i.test(ua)) {
    const match = ua.match(/mac os x ([\d_]+)/);
    if (match) {
      return `macOS ${match[1].replace(/_/g, ".")}`;
    }
    return "macOS";
  }

  if (/android ([\d.]+)/i.test(ua)) {
    const match = ua.match(/android ([\d.]+)/i);
    return match ? `Android ${match[1]}` : "Android";
  }

  if (/iphone os ([\d_]+)/i.test(ua)) {
    const match = ua.match(/iphone os ([\d_]+)/i);
    return match ? `iOS ${match[1].replace(/_/g, ".")}` : "iOS";
  }

  if (/ipad.*os ([\d_]+)/i.test(ua)) {
    const match = ua.match(/os ([\d_]+)/i);
    return match ? `iPadOS ${match[1].replace(/_/g, ".")}` : "iPadOS";
  }

  if (/linux/i.test(ua)) return "Linux";
  if (/ubuntu/i.test(ua)) return "Ubuntu";
  if (/fedora/i.test(ua)) return "Fedora";

  return "Unknown";
}

/**
 * Detecta el navegador y su versión
 */
export function getBrowserInfo(userAgent: string): {
  browser: string;
  version: string;
} {
  const ua = userAgent.toLowerCase();

  // Edge (debe ir antes que Chrome porque usa Chromium)
  if (/edg\/([\d.]+)/i.test(ua)) {
    const match = ua.match(/edg\/([\d.]+)/i);
    return { browser: "Edge", version: match ? match[1] : "" };
  }

  // Chrome
  if (/chrome\/([\d.]+)/i.test(ua) && !/edg/i.test(ua)) {
    const match = ua.match(/chrome\/([\d.]+)/i);
    return { browser: "Chrome", version: match ? match[1] : "" };
  }

  // Safari (debe ir después de Chrome)
  if (/safari\/([\d.]+)/i.test(ua) && !/chrome|chromium/i.test(ua)) {
    const match = ua.match(/version\/([\d.]+)/i);
    return { browser: "Safari", version: match ? match[1] : "" };
  }

  // Firefox
  if (/firefox\/([\d.]+)/i.test(ua)) {
    const match = ua.match(/firefox\/([\d.]+)/i);
    return { browser: "Firefox", version: match ? match[1] : "" };
  }

  // Opera
  if (/opr\/([\d.]+)/i.test(ua) || /opera\/([\d.]+)/i.test(ua)) {
    const match = ua.match(/(?:opr|opera)\/([\d.]+)/i);
    return { browser: "Opera", version: match ? match[1] : "" };
  }

  // Samsung Internet
  if (/samsungbrowser\/([\d.]+)/i.test(ua)) {
    const match = ua.match(/samsungbrowser\/([\d.]+)/i);
    return { browser: "Samsung Internet", version: match ? match[1] : "" };
  }

  // UC Browser
  if (/ucbrowser\/([\d.]+)/i.test(ua)) {
    const match = ua.match(/ucbrowser\/([\d.]+)/i);
    return { browser: "UC Browser", version: match ? match[1] : "" };
  }

  return { browser: "Unknown", version: "" };
}

/**
 * Obtiene toda la información del dispositivo (lado del cliente)
 */
export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;

  const deviceType = getDeviceType(userAgent, screenWidth);
  const os = getOS(userAgent);
  const { browser, version: browserVersion } = getBrowserInfo(userAgent);

  return {
    deviceType,
    os,
    browser,
    browserVersion,
    userAgent,
    screenWidth,
    screenHeight,
    timezone,
    language,
  };
}

/**
 * Parsea el user agent desde el servidor (Next.js API route)
 */
export function parseUserAgent(userAgent: string) {
  const { browser, version } = getBrowserInfo(userAgent);
  const os = getOS(userAgent);

  return {
    browser,
    browserVersion: version,
    os,
  };
}
