const fs = require('fs');
const path = require('path');

const toolsDir = 'c:/Users/rangd/seopanel/seopanelpro-hub/src/pages/tools';

// Get all tool files
const files = fs.readdirSync(toolsDir).filter(file => file.endsWith('.tsx'));

// Tool categories mapping (you can extend this based on your tools.ts file)
const categoryMapping = {
  'SEOScoreChecker': 'SEO',
  'KeywordDensity': 'SEO',
  'MetaAnalyzer': 'SEO',
  'HashtagGenerator': 'Social Media',
  'InstagramBioGenerator': 'Social Media',
  'DomainAge': 'Domain',
  'WhoisLookup': 'Domain',
  'TextCaseConverter': 'Content',
  'WordCounter': 'Content',
  'ColorPicker': 'Utility',
  'QRGenerator': 'Utility',
  'PasswordGenerator': 'Utility',
  'AgeCalculator': 'Calculation',
  'BMICalculator': 'Calculation',
  'YouTubeTagsExtractor': 'Viral',
  'YouTubeThumbnail': 'Viral',
  'BacklinkChecker': 'Link',
  'LinkAnalyzer': 'Link'
};

files.forEach(file => {
  const filePath = path.join(toolsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if RelatedTools is already imported
  if (content.includes('import RelatedTools')) {
    console.log(`✓ ${file} already has RelatedTools`);
    return;
  }
  
  const toolName = file.replace('.tsx', '');
  const category = categoryMapping[toolName] || 'Utility';
  const toolId = toolName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  
  // Find import section and add RelatedTools import
  const importMatch = content.match(/(import.*from '@\/components\/ToolHeader';)/);
  if (importMatch) {
    const newImports = `${importMatch[1]}
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';`;
    
    let newContent = content.replace(importMatch[1], newImports);
    
    // Find the closing ToolPageLayout tag and add RelatedTools before it
    const layoutMatch = newContent.match(/(.*)(    <\/ToolPageLayout>)/s);
    if (layoutMatch) {
      const relatedToolsSection = `
      <RelatedTools 
        currentToolId="${toolId}"
        currentCategory="${category}"
        allTools={allTools}
      />
    </ToolPageLayout>`;
      
      newContent = newContent.replace('    </ToolPageLayout>', relatedToolsSection);
      
      // Write the updated content back
      fs.writeFileSync(filePath, newContent);
      console.log(`✓ Added RelatedTools to ${file}`);
    } else {
      console.log(`⚠️  Could not find ToolPageLayout closing tag in ${file}`);
    }
  } else {
    console.log(`⚠️  Could not find ToolHeader import in ${file}`);
  }
});

console.log('\\nRelatedTools addition complete!');
