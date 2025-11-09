/**
 * Simple in-memory rate limiter for API routes
 * Tracks requests by IP address with multiple time windows
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitStore {
  [key: string]: {
    minute: RateLimitEntry;
    hour: RateLimitEntry;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private globalCount = 0;
  private globalResetTime = Date.now() + 60 * 60 * 1000; // 1 hour

  // Configuration
  private readonly REQUESTS_PER_MINUTE = 10;
  private readonly REQUESTS_PER_HOUR = 50;
  private readonly GLOBAL_REQUESTS_PER_HOUR = 500; // Protect overall API quota
  private readonly MINUTE_WINDOW = 60 * 1000; // 1 minute
  private readonly HOUR_WINDOW = 60 * 60 * 1000; // 1 hour

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanup() {
    const now = Date.now();

    // Clean up individual IP entries
    for (const ip in this.store) {
      const entry = this.store[ip];

      // Remove if both windows are expired
      if (entry.minute.resetTime < now && entry.hour.resetTime < now) {
        delete this.store[ip];
      }
    }

    // Reset global counter if window expired
    if (this.globalResetTime < now) {
      this.globalCount = 0;
      this.globalResetTime = now + this.HOUR_WINDOW;
    }
  }

  /**
   * Check if a request should be allowed
   * @param identifier - Usually IP address
   * @returns Object with allowed status and details
   */
  checkLimit(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    reason?: string;
  } {
    this.cleanup();

    const now = Date.now();

    // Check global limit first
    if (this.globalCount >= this.GLOBAL_REQUESTS_PER_HOUR) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: this.globalResetTime,
        reason: 'global',
      };
    }

    // Initialize entry if doesn't exist
    if (!this.store[identifier]) {
      this.store[identifier] = {
        minute: { count: 0, resetTime: now + this.MINUTE_WINDOW },
        hour: { count: 0, resetTime: now + this.HOUR_WINDOW },
      };
    }

    const entry = this.store[identifier];

    // Reset minute counter if window expired
    if (entry.minute.resetTime < now) {
      entry.minute.count = 0;
      entry.minute.resetTime = now + this.MINUTE_WINDOW;
    }

    // Reset hour counter if window expired
    if (entry.hour.resetTime < now) {
      entry.hour.count = 0;
      entry.hour.resetTime = now + this.HOUR_WINDOW;
    }

    // Check minute limit
    if (entry.minute.count >= this.REQUESTS_PER_MINUTE) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.minute.resetTime,
        reason: 'minute',
      };
    }

    // Check hour limit
    if (entry.hour.count >= this.REQUESTS_PER_HOUR) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.hour.resetTime,
        reason: 'hour',
      };
    }

    // All checks passed - allow request and increment counters
    entry.minute.count++;
    entry.hour.count++;
    this.globalCount++;

    // Return remaining from most restrictive limit
    const remainingMinute = this.REQUESTS_PER_MINUTE - entry.minute.count;
    const remainingHour = this.REQUESTS_PER_HOUR - entry.hour.count;
    const remainingGlobal = this.GLOBAL_REQUESTS_PER_HOUR - this.globalCount;

    return {
      allowed: true,
      remaining: Math.min(remainingMinute, remainingHour, remainingGlobal),
      resetTime: entry.minute.resetTime,
    };
  }

  /**
   * Get statistics for monitoring (optional)
   */
  getStats() {
    return {
      totalIPs: Object.keys(this.store).length,
      globalCount: this.globalCount,
      globalLimit: this.GLOBAL_REQUESTS_PER_HOUR,
      globalResetTime: this.globalResetTime,
    };
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Helper function to get client IP from request
 * Handles various proxy scenarios
 */
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (in order of priority)
  const headers = new Headers(request.headers);

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a generic identifier
  return 'unknown';
}

/**
 * Format time remaining until reset
 */
export function formatTimeRemaining(resetTime: number): string {
  const secondsRemaining = Math.ceil((resetTime - Date.now()) / 1000);

  if (secondsRemaining < 60) {
    return `${secondsRemaining} second${secondsRemaining !== 1 ? 's' : ''}`;
  }

  const minutesRemaining = Math.ceil(secondsRemaining / 60);
  return `${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}`;
}
