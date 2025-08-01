import { logSecurityEvent } from './securityUtils';

// Security monitoring utilities
export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private eventQueue: Array<{type: string, details: any, severity: string}> = [];
  private isProcessing = false;

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  // Monitor for suspicious patterns
  public monitorUserBehavior(action: string, metadata: Record<string, any> = {}) {
    const patterns = this.detectSuspiciousPatterns(action, metadata);
    
    if (patterns.length > 0) {
      this.queueSecurityEvent('suspicious_behavior_detected', {
        action,
        patterns,
        metadata
      }, 'medium');
    }
  }

  // Detect various suspicious patterns
  private detectSuspiciousPatterns(action: string, metadata: Record<string, any>): string[] {
    const patterns: string[] = [];
    
    // Rapid successive actions
    if (metadata.rapidActions && metadata.rapidActions > 10) {
      patterns.push('rapid_successive_actions');
    }
    
    // Unusual timing patterns
    const hour = new Date().getHours();
    if (hour < 4 || hour > 23) { // Very late night activity
      patterns.push('unusual_timing');
    }
    
    // High volume of requests
    if (metadata.requestCount && metadata.requestCount > 100) {
      patterns.push('high_volume_requests');
    }
    
    return patterns;
  }

  // Queue security events for batch processing
  private queueSecurityEvent(type: string, details: any, severity: string) {
    this.eventQueue.push({ type, details, severity });
    
    // Process queue if it gets large or if high severity event
    if (this.eventQueue.length > 10 || severity === 'high' || severity === 'critical') {
      this.processEventQueue();
    }
  }

  // Process the event queue
  private async processEventQueue() {
    if (this.isProcessing || this.eventQueue.length === 0) return;
    
    this.isProcessing = true;
    const events = [...this.eventQueue];
    this.eventQueue = [];
    
    try {
      // Process events in batch
      for (const event of events) {
        await logSecurityEvent(event.type, event.details, event.severity as any);
        
        // Add small delay between events to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    } catch (error) {
      console.error('Error processing security events:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  // Monitor page navigation for suspicious patterns
  public monitorNavigation(from: string, to: string) {
    this.monitorUserBehavior('page_navigation', {
      from,
      to,
      timestamp: Date.now()
    });
  }

  // Monitor form submissions
  public monitorFormSubmission(formType: string, success: boolean, metadata: Record<string, any> = {}) {
    this.monitorUserBehavior('form_submission', {
      formType,
      success,
      ...metadata
    });
  }

  // Force process all queued events (call on page unload)
  public async flush() {
    await this.processEventQueue();
  }
}

// Export singleton instance
export const securityMonitor = SecurityMonitor.getInstance();

// Auto-flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    securityMonitor.flush();
  });
}