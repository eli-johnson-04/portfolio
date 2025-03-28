import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'; // Handles raw HTML rendering
import MarkdownToHTMLComponentStyles from "./reactMarkdownComponents";
import ContentFeedEntry from "./contentFeedEntry.jsx";

// Creates a feed out of markdown entries. 
const ContentFeed = ({ data }) => {
    // Return a set of HTML generated from markdown using ReactMarkdown. 
    return (
        <div className="my-4 mx-2 max-h-[60vh] overflow-y-auto overscroll-auto scrollbar-thin scrollbar-webkit">
            {data.map((entry) => (
                <ContentFeedEntry 
                    key={entry.id} 
                    data={entry} 
                />
            ))}
        </div>
    );
};

export default ContentFeed;