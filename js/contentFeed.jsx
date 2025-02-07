import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownToHTMLComponentStyles from "./reactMarkdownComponents";

// Creates a feed out of markdown entries. 
const ContentFeed = ({ data }) => {
    // Return a set of HTML generated from markdown using ReactMarkdown. 
    return (
        <div className="my-4 mx-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-webkit">
            <div className="max-h-full">
                {data.map((entry) => (
                    <div key={entry.id} className="m-4 pb-4 rounded-xl border-2 border-gray-600 px-2 pt-2">
                        <ReactMarkdown components={MarkdownToHTMLComponentStyles}>{entry.md}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentFeed;