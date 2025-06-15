
import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ToolHeader from "@/components/ToolHeader";
import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE = [
  { from: "https://a.com", to: "https://b.com", type: "301" },
  { from: "https://b.com", to: "https://c.com", type: "302" }
];

export default function LinkRedirectMapper() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<typeof EXAMPLE | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleMap = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(EXAMPLE);
      setLoading(false);
      toast({ title: "Mapping complete", description: "Redirects below." });
    }, 1250);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Link}
        title="Link Redirect Mapper"
        description="See all redirects between URLs."
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />
      <Card>
        <CardHeader>
          <CardTitle>Map Link Redirects</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-3" onSubmit={handleMap}>
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter starting URL"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Mapping..." : "Map"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Redirect Chain ({results.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2">From</th>
                      <th className="p-2">To</th>
                      <th className="p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{row.from}</td>
                        <td className="p-2">{row.to}</td>
                        <td className="p-2">{row.type}</td>
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
