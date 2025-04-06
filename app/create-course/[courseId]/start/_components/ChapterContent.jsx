import React from 'react';
import YouTube from 'react-youtube';

import ReactMarkdown  from "react-markdown";

function ChapterContent({ chapter, content }) {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className='p-10'>
      <h2 className='font-md text-2xl'>
        {chapter?.["Chapter Name"] || chapter?.["Chapter name"]}
      </h2>
      <p className='text-gray-500'>{chapter?.About}</p>


      <div className='flex  m-5 justify-center'>
        {/* Video */}
      <YouTube
        videoId={content?.videoId}
        opts={opts}
        key={content?.videoId} // ✅ Force remount when videoId changes
      />
      </div>

      <div className='p-5  mb-5 rounded-lg'>
        {content?.content.map((item,index)=>(
            <div key={index} className='p-5 rounded-lg bg-sky-100  mb-5'>
                <h2 className='font-md  text-xl '>{item?.title}</h2>
                {/* <p className='text-sm whitespace-pre-wrap'>{item?.explanation}</p> */}
                <div className='text-sm'>
                <ReactMarkdown >{item?.explanation}</ReactMarkdown>
                </div>
                
                <div>
                {item?.codeExample&&<pre className='p-4 bg-black text-white rounded-lg my-4'>
                    <code className='text-sm'>
                        {item?.codeExample}
                    </code>
                </pre>}
                </div>
            </div>
            
        ))}
      </div>
      
    </div>
  );
}

export default ChapterContent;