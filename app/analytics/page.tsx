"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsResult {
  [key: string]: string | number | boolean | null;
}

interface AnalyticsData {
  name: string;
  timeRange: {
    step: string;
    start: string;
    end: string;
    timezone: string;
  };
  result: AnalyticsResult[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/analytics");
        if (!response.ok) throw new Error("Failed to fetch analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
        Analytics
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 font-medium">{error}</div>
      ) : analytics && analytics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analytics.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  {new Date(item.timeRange.start).toLocaleString()} -{" "}
                  {new Date(item.timeRange.end).toLocaleString()} (
                  {item.timeRange.timezone})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {item.result && item.result.length > 0 ? (
                  <ul className="space-y-2">
                    {item.result.map((res, i) => (
                      <li key={i} className="border-b pb-2 last:border-b-0">
                        {Object.entries(res).map(([k, v]) => (
                          <div key={k} className="flex justify-between text-sm">
                            <span className="font-medium text-muted-foreground">
                              {k}:
                            </span>
                            <span>{String(v)}</span>
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground">No results</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground">
          No analytics data available.
        </div>
      )}
    </div>
  );
}
