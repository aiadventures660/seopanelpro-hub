// Performance monitoring utility for tools
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();
  
  static startTiming(label: string): () => void {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      
      const times = this.metrics.get(label)!;
      times.push(duration);
      
      // Keep only last 10 measurements
      if (times.length > 10) {
        times.shift();
      }
      
      // Log slow operations
      if (duration > 1000) {
        console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`);
      }
    };
  }
  
  static getAverageTime(label: string): number {
    const times = this.metrics.get(label);
    if (!times || times.length === 0) return 0;
    
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }
  
  static getAllMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    
    for (const [label, times] of this.metrics.entries()) {
      result[label] = this.getAverageTime(label);
    }
    
    return result;
  }
  
  static clearMetrics(): void {
    this.metrics.clear();
  }
}

// Decorator for timing function calls
export function withTiming<T extends (...args: any[]) => any>(
  fn: T,
  label: string
): T {
  return ((...args: any[]) => {
    const stopTiming = PerformanceMonitor.startTiming(label);
    
    try {
      const result = fn(...args);
      
      // Handle promises
      if (result && typeof result.then === 'function') {
        return result.finally(stopTiming);
      }
      
      stopTiming();
      return result;
    } catch (error) {
      stopTiming();
      throw error;
    }
  }) as T;
}
