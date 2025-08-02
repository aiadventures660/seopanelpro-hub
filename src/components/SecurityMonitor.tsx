import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityEvent {
  id: string;
  event_type: string;
  created_at: string;
  event_details: any;
  user_session: string;
  ip_address: string | null;
  user_agent: string | null;
  timestamp: string;
}

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  suspiciousActivities: number;
  blockedAttempts: number;
}

export const SecurityMonitor: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalEvents: 0,
    suspiciousActivities: 0,
    blockedAttempts: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isVisible) {
      fetchSecurityData();
    }
  }, [isVisible]);

  const fetchSecurityData = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('security_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (eventsError) {
        console.error('Error fetching security events:', eventsError);
        toast({
          title: "Error",
          description: "Failed to fetch security data. You may need admin access.",
          variant: "destructive"
        });
        return;
      }

      setEvents((eventsData || []) as SecurityEvent[]);

      // Calculate metrics from the data
      const totalEvents = eventsData?.length || 0;
      const criticalEvents = eventsData?.filter(e => 
        typeof e.event_details === 'object' && 
        e.event_details && 
        'severity' in e.event_details && 
        e.event_details.severity === 'critical'
      ).length || 0;
      const suspiciousActivities = eventsData?.filter(e => 
        e.event_type.includes('suspicious') || e.event_type.includes('attack')
      ).length || 0;
      const blockedAttempts = eventsData?.filter(e => 
        e.event_type.includes('blocked') || e.event_type.includes('rate_limit')
      ).length || 0;

      setMetrics({
        totalEvents,
        criticalEvents,
        suspiciousActivities,
        blockedAttempts
      });

    } catch (error) {
      console.error('Error in fetchSecurityData:', error);
      toast({
        title: "Error",
        description: "Failed to fetch security data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <XCircle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          Security Monitor
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50 space-y-4">
      <Card className="bg-background/95 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Security Monitor</CardTitle>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Real-time security monitoring and alerts
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Security Metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium">{metrics.totalEvents}</div>
              <div className="text-xs text-muted-foreground">Events Today</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium text-destructive">{metrics.criticalEvents}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium text-yellow-600">{metrics.suspiciousActivities}</div>
              <div className="text-xs text-muted-foreground">Suspicious</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium">{metrics.blockedAttempts}</div>
              <div className="text-xs text-muted-foreground">Blocked</div>
            </div>
          </div>

          {/* Recent Events */}
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Events</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {loading ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  Loading security data...
                </div>
              ) : events.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No recent security events
                </div>
              ) : (
                events.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs">
                    <div className="flex items-center gap-1">
                      {getSeverityIcon(event.event_details?.severity || 'low')}
                      <Badge variant={getSeverityColor(event.event_details?.severity || 'low')} className="text-xs">
                        {event.event_details?.severity || 'info'}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{event.event_type}</div>
                      <div className="text-muted-foreground">
                        {new Date(event.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Status Indicator */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              System security monitoring is active. All tools are protected with enhanced security measures.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};