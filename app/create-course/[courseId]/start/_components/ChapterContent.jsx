import React from "react";
import YouTube from "react-youtube";
import DOMPurify from "dompurify"; // Add this package for security

function ChapterContent({ chapter, content }) {
  const opts = {
    height: "100%", // Use percentage for responsiveness
    width: "100%", // Use percentage for responsiveness
    playerVars: {
      autoplay: 0,
    },
  };

  // Function to format code examples with proper line breaks
  // Function to format code examples with proper indentation and line breaks
const formatCodeExample = (codeExample) => {
  if (!codeExample) return "";
  
  // First, remove <precode> tags and extract just the code content
  let code = codeExample.replace(/<\/?precode>/g, '');
  
  // Handle common programming languages structure
  
  // 1. Add line breaks to key programming syntax
  code = code
    // Add newlines before and after braces and common control statements
    .replace(/\{/g, ' {\n')
    .replace(/\}/g, '\n}')
    .replace(/;/g, ';\n')
    .replace(/\) /g, ') ')
    
    // Fix potential over-breaking by consolidating multiple newlines
    .replace(/\n\s*\n/g, '\n')
    
    // Handle if-else, for, while statements
    .replace(/(if|for|while|else if|switch)\s*\(/g, '$1 (')
    .replace(/else\s*\{/g, 'else {')
    .replace(/\}\s*else/g, '} else');
  
  // 2. Apply proper indentation
  let lines = code.split('\n');
  let indentLevel = 0;
  let formattedLines = [];
  
  lines.forEach(line => {
    // Trim the line first
    let trimmedLine = line.trim();
    
    // Adjust indent level before processing the line
    if (trimmedLine.includes('}') && !trimmedLine.includes('{')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    // Add the line with proper indentation
    if (trimmedLine.length > 0) {
      formattedLines.push('  '.repeat(indentLevel) + trimmedLine);
    }
    
    // Adjust indent level after processing the line
    if (trimmedLine.includes('{') && !trimmedLine.includes('}')) {
      indentLevel++;
    }
  });
  
  // 3. Wrap in <precode> tags again
  return '<precode>\n' + formattedLines.join('\n') + '\n</precode>';
};

  // Function to process explanation text - removing ** markers
  const processExplanation = (explanation) => {
    if (!explanation) return "";
    
    // Simply remove all ** markers without adding HTML tags
    let processed = explanation.replace(/\*\*/g, '');
    
    // Ensure numbered items (like "1.", "2.") start on new lines
    processed = processed.replace(/([^\n])(\d+\.\s)/g, '$1\n$2');
    
    return processed;
  };

  return (
    <div className="p-4 md:p-10">
      <h2 className="font-medium text-lg md:text-2xl">
        {chapter?.["Chapter Name"] || chapter?.["Chapter name"]}
      </h2>
      <p className="text-gray-500 text-sm md:text-base">{chapter?.About}</p>

      <div className="flex m-2 md:m-5 justify-center">
        {/* Video */}
        <div className="w-full max-w-[640px]">
          <YouTube
            videoId={content?.videoId}
            opts={opts}
            key={content?.videoId}
            className="w-full h-[200px] md:h-[390px]" // Responsive height
          />
        </div>
      </div>

      <div className="p-2 md:p-5 mb-5 rounded-lg">
        {content?.content?.map((item, index) => (
          <div key={index} className="p-3 md:p-5 rounded-lg bg-sky-100 mb-3 md:mb-5">
            <h2 className="font-medium text-lg md:text-xl">{item?.title}</h2>
            {item?.explanation && (
              <div
                className="text-xs md:text-sm whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify
                    ? DOMPurify.sanitize(processExplanation(item.explanation))
                    : processExplanation(item.explanation),
                }}
              />
            )}
            {item?.codeExample && (
              <pre className="p-2 md:p-4 bg-black text-white rounded-lg my-2 md:my-4">
                <code className="text-xs md:text-sm whitespace-pre-wrap">
                  {formatCodeExample(item?.codeExample)}
                </code>
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;