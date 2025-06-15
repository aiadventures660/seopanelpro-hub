
import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ToolHeader from "@/components/ToolHeader";
import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE_RESULTS = [
  { url: "https://example.com", anchor: "Your Website", from: "Blog", type: "follow" },
  { url: "https://partner.com/page", anchor: "Check this resource", from: "Resources", type: "nofollow" }
];

export default function BacklinkChecker() {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<typeof EXAMPLE_RESULTS | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    // Demo: pretend fetch
    setTimeout(() => {
      setResults(EXAMPLE_RESULTS);
      setLoading(false);
      toast({ title: "Backlink scan complete", description: "Results shown below." });
    }, 1200);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Link}
        title="Backlink Checker"
        description="Find who links to your site. Analyze backlinks for SEO."
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />
      <Card>
        <CardHeader>
          <CardTitle>Check Backlinks</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-3" onSubmit={handleCheck}>
            <Input
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="Enter your domain (e.g. yoursite.com)"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        {results ? (
          <Card>
            <CardHeader>
              <CardTitle>Results ({results.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2 text-left">From Page</th>
                      <th className="p-2 text-left">Anchor Text</th>
                      <th className="p-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 text-blue-600 underline">{row.url}</td>
                        <td className="p-2">{row.anchor}</td>
                        <td className="p-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full ${
                            row.type === "nofollow" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                          }`}>
                            {row.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </ToolPageLayout>
  );
}
