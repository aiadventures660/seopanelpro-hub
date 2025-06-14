
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';

interface SearchResultsProps {
  filteredTools: Tool[];
  searchQuery: string;
  onBackToHome: () => void;
}

const SearchResults = ({ filteredTools, searchQuery, onBackToHome }: SearchResultsProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Search Results ({filteredTools.length})</h2>
          <Button variant="outline" onClick={onBackToHome}>
            Back to Home
          </Button>
        </div>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">No tools found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
