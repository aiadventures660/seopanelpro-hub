import { supabase } from '@/integrations/supabase/client';

// Enhanced session ID generation with cryptographic randomness
export const generateSecureSessionId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const randomString = Array.from(randomBytes, byte => byte.toString(36)).join('');
  return `session_${timestamp}_${randomString}`;
};

// Session expiration management
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_ROTATION_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

export const getSessionId = (): string => {
  const stored = localStorage.getItem('tool_session_data');
  if (stored) {
    try {
      const sessionData = JSON.parse(stored);
      const now = Date.now();
      
      // Check if session is expired
      if (now > sessionData.expiresAt) {
        removeSession();
        return createNewSession();
      }
      
      // Check if session needs rotation
      if (now > sessionData.rotateAt) {
        return rotateSession(sessionData);
      }
      
      return sessionData.id;
    } catch {
      removeSession();
      return createNewSession();
    }
  }
  
  return createNewSession();
};

const createNewSession = (): string => {
  const sessionId = generateSecureSessionId();
  const now = Date.now();
  const sessionData = {
    id: sessionId,
    createdAt: now,
    expiresAt: now + SESSION_DURATION,
    rotateAt: now + SESSION_ROTATION_INTERVAL,
    rotationCount: 0
  };
  
  localStorage.setItem('tool_session_data', JSON.stringify(sessionData));
  return sessionId;
};

const rotateSession = (currentSession: any): string => {
  const newSessionId = generateSecureSessionId();
  const now = Date.now();
  const sessionData = {
    ...currentSession,
    id: newSessionId,
    rotateAt: now + SESSION_ROTATION_INTERVAL,
    rotationCount: currentSession.rotationCount + 1
  };
  
  localStorage.setItem('tool_session_data', JSON.stringify(sessionData));
  logSecurityEvent('session_rotated', { oldSession: currentSession.id, newSession: newSessionId });
  return newSessionId;
};

const removeSession = (): void => {
  localStorage.removeItem('tool_session_data');
};

// Input validation utilities
export const validateInput = {
  toolId: (input: string): boolean => {
    return /^[a-zA-Z0-9-_]+$/.test(input) && input.length <= 100;
  },
  
  email: (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) && input.length <= 320;
  },
  
  text: (input: string, maxLength = 1000): boolean => {
    return typeof input === 'string' && input.length <= maxLength;
  },
  
  url: (input: string): boolean => {
    try {
      const url = new URL(input);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  }
};

// Rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const current = rateLimits.get(identifier);
  
  if (!current || now > current.resetTime) {
    rateLimits.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (current.count >= MAX_REQUESTS) {
    logSecurityEvent('rate_limit_exceeded', { identifier });
    return false;
  }
  
  current.count++;
  return true;
};

// Security event logging
export const logSecurityEvent = async (
  eventType: string, 
  details: Record<string, any> = {}
): Promise<void> => {
  try {
    const sessionId = getSessionId();
    await supabase.from('security_logs').insert({
      event_type: eventType,
      event_details: details,
      user_session: sessionId,
      user_agent: navigator.userAgent,
      ip_address: null, // Will be populated server-side
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

// Content Security Policy helpers
export const sanitizeUserInput = (input: string): string => {
  return input
    .replace(/[<>'"&]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[char];
    });
};

// Detect suspicious patterns
export const detectSuspiciousActivity = (input: string): boolean => {
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};