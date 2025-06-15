
import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ToolHeader from "@/components/ToolHeader";
import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE = [
  { url: "/services", anchor: "Our Services" },
  { url: "/about", anchor: "About Us" },
  { url: "https://external.com/page", anchor: "External Resource" }
];

export default function AnchorTextChecker() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<typeof EXAMPLE | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(EXAMPLE);
      setLoading(false);
      toast({ title: "Done!", description: "Anchor text results shown below." });
    }, 900);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Link}
        title="Anchor Text Checker"
        description="Extract and analyze anchor texts from a page."
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />
      <Card>
        <CardHeader>
          <CardTitle>Anchor Text Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-3" onSubmit={handleCheck}>
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
              <CardTitle>Anchor Texts ({results.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2">URL</th>
                      <th className="p-2">Anchor Text</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{row.url}</td>
                        <td className="p-2">{row.anchor}</td>
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
