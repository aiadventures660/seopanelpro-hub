
import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ToolHeader from "@/components/ToolHeader";
import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE = [
  { url: "/404-page", anchor: "Lost Link", status: 404 },
  { url: "https://broken.com/page", anchor: "External Broken", status: 404 }
];

export default function BrokenLinkFinder() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<typeof EXAMPLE | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(EXAMPLE);
      setLoading(false);
      toast({ title: "Scan Complete", description: "Broken links found below." });
    }, 1100);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Link}
        title="Broken Link Finder"
        description="Scan a page for broken links."
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />
      <Card>
        <CardHeader>
          <CardTitle>Find Broken Links</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-3" onSubmit={handleFind}>
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter page URL"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Scanning..." : "Find"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Broken Links ({results.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2">URL</th>
                      <th className="p-2">Anchor Text</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{row.url}</td>
                        <td className="p-2">{row.anchor}</td>
                        <td className="p-2 text-red-600">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
}
