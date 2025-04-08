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
  const formatCodeExample = (codeExample) => {
    if (!codeExample) return "";
    
    // Replace <precode> tags to be on their own lines
    let formatted = codeExample.replace(/<precode>/g, '<precode>\n');
    formatted = formatted.replace(/<\/precode>/g, '\n</precode>');
    
    // Ensure hashtags start on new lines
    formatted = formatted.replace(/([^\n])#/g, '$1\n#');
    
    return formatted;
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