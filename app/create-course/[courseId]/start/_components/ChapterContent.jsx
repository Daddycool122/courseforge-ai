import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

function ChapterContent({ chapter, content }) {
  const opts = {
    height: "100%", // Use percentage for responsiveness
    width: "100%",  // Use percentage for responsiveness
    playerVars: {
      autoplay: 0,
    },
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
        {content?.content.map((item, index) => (
          <div key={index} className="p-3 md:p-5 rounded-lg bg-sky-100 mb-3 md:mb-5">
            <h2 className="font-medium text-lg md:text-xl">{item?.title}</h2>
            <div className="text-xs md:text-sm">
              <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            </div>
            {item?.codeExample && (
              <pre className="p-2 md:p-4 bg-black text-white rounded-lg my-2 md:my-4">
                <code className="text-xs md:text-sm">{item?.codeExample}</code>
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;