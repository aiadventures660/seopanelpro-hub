
import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ToolHeader from "@/components/ToolHeader";
import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE = {
  internal: 10,
  external: 7,
  links: [
    { url: "/about", text: "About Us", type: "Internal" },
    { url: "https://external.com", text: "Learn more", type: "External" }
  ]
};

export default function LinkAnalyzer() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<typeof EXAMPLE | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(EXAMPLE);
      setLoading(false);
      toast({ title: "Analysis complete", description: "Link breakdown is below." });
    }, 1000);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Link}
        title="Link Analyzer"
        description="Analyze internal and external links on a page."
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />
      <Card>
        <CardHeader>
          <CardTitle>Link Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-3" onSubmit={handleAnalyze}>
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter page URL"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-5 mb-3">
                <span className="font-semibold text-green-700">Internal: {results.internal}</span>
                <span className="font-semibold text-blue-700">External: {results.external}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2">URL</th>
                      <th className="p-2">Anchor Text</th>
                      <th className="p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.links.map((l, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{l.url}</td>
                        <td className="p-2">{l.text}</td>
                        <td className="p-2">{l.type}</td>
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
