
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';
import { storeToolPosition } from '@/hooks/useScrollPosition';

interface SearchResultsProps {
  filteredTools: Tool[];
  searchQuery: string;
  onBackToHome: () => void;
}

const SearchResults = ({ filteredTools, searchQuery, onBackToHome }: SearchResultsProps) => {
  const handleToolClick = (tool: Tool) => {
    console.log(`Search result tool clicked: ${tool.name} (ID: ${tool.id})`);
    storeToolPosition(tool.id);
  };

  return (
    <section className="py-8 md:py-12 px-4" data-search-results>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Search Results ({filteredTools.length})</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Results for "{searchQuery}"
            </p>
          </div>
          <Button variant="outline" onClick={onBackToHome} className="w-full sm:w-auto">
            Back to Home
          </Button>
        </div>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.id} id={`tool-${tool.id}`}>
                <ToolCard tool={tool} onToolClick={() => handleToolClick(tool)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 md:h-16 w-12 md:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">No tools found</h3>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
