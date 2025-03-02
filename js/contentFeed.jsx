import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'; // Handles raw HTML rendering
import MarkdownToHTMLComponentStyles from "./reactMarkdownComponents";

// Creates a feed out of markdown entries. 
const ContentFeed = ({ data }) => {
    // Initialize state to manage visibility of each entry.
    const [visibleEntryIds, setVisibleEntryIds] = useState({});

    // Toggles the visibility of a given entry.
    const toggleVisibility = (id) => {
        setVisibleEntryIds(prevState => ({
            ...prevState, 
            [id]: !prevState[id]
        }));
    };

    // Return a set of HTML generated from markdown using ReactMarkdown. 
    return (
        <div className="my-4 mx-2 max-h-[60vh] overflow-y-auto overscroll-auto scrollbar-thin scrollbar-webkit">
            {data.map((entry) => {
                const isCollapsed = !visibleEntryIds[entry.id];
                return (
                    <div 
                        key={entry.id} 
                        onClick={() => toggleVisibility(entry.id)}
                        className={`m-4 pb-4 rounded-xl px-2 pt-2 transition-transform duration-100 ease-in-out ${
                            isCollapsed ? 'hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02]' : 'border-2 border-gray-600'
                        }`}
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{extractName(entry.id)}</h1>
                            <h1 className="text-sm font-semibold text-gray-800">{extractDate(entry.id)}</h1>
                        </div>
                        {!isCollapsed && (
                            <div>
                                <div className="pb-2 border-b border-gray-300"/>
                                <ReactMarkdown components={MarkdownToHTMLComponentStyles} rehypePlugins={[rehypeRaw]}>{entry.md}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// Helper function to extract the name from a filename. 
function extractName(id) {
    const match = id.match(/^\d{2}-\d{2}-\d{4}-(.+)$/);
    if (!match) {
        console.log("Unexpected filename format: ", id);
        return null;
    }
    
    // Replace hyphens with spaces to get the title
    return match[1].replace(/-/g, ' ');
}

// Helper function to extract the date from a filename.
function extractDate(id) {
    const match = id.match(/^(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/);
    if (!match) {
        console.log("Unexpected filename format: ", id + ".md");
        return null;
    }

    const monthMap = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    const month = monthMap[match.groups.month] || match.groups.month;
    return `${month} ${match.groups.day}, ${match.groups.year}`;
}

export default ContentFeed;