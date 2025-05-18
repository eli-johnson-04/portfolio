import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'; // Handles raw HTML rendering
import MarkdownToHTMLComponentStyles from "./reactMarkdownComponents";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

// Stores a single entry in a content feed. Corresponds to a single markdown file.
const ContentFeedEntry = ({ data }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleVisibility = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div 
            className={`m-4 pb-4 rounded-xl px-2 pt-2 transition-transform duration-100 ease-in-out ${
                isCollapsed ? 'hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02]' : 'border-2 border-gray-600'}`
            }
        >
            <Tooltip
                placement="top" // Tooltip appears above the title
                motion={{ motionName: 'rc-tooltip-zoom' }}
                trigger={['hover']}
                styles={{
                    root: {
                        //opacity: 1,
                        transition: 'opacity 0.1s ease-in-out',
                        pointerEvents: 'none',
                    },
                    body: {
                        backgroundColor: 'white',
                        padding: 0,
                        border: 'none',
                        opacity: 1,
                    },
                }}
                overlay={
                    <div className="whitespace-pre-wrap text-center max-w-xs bg-white p-3 rounded-lg shadow-md text-gray-800 text-sm font-medium">
                        {isCollapsed ? data.tooltipContent : "Click to collapse"}
                    </div>
                }
                mouseEnterDelay={0.2} // Delay before showing the tooltip
                mouseLeaveDelay={0.1} // Delay before hiding the tooltip
            >
                <div 
                    onClick={toggleVisibility}
                    className={`rounded-xl flex items-center transition-transform duration-100 ease-in-out
                        ${isCollapsed ? '' : 'hover:scale-[1.01]'}`
                    }
                >
                    <span>
                        <h1 className="text-3xl font-bold text-gray-800">{data.isPriority || (data.subfolderIndex === -1) ? "" : `#${data.subfolderIndex}: `}{extractName(data.id)}{data.isPriority ? " ★" : ""}</h1>
                        <h1 className="text-sm font-semibold text-gray-800">{convertDateToText(data.date)}</h1>
                    </span>
                </div>
            </Tooltip>
            {!isCollapsed && (
                <div>
                    <div className="pb-2 border-b border-gray-300"/>
                    <ReactMarkdown components={MarkdownToHTMLComponentStyles} rehypePlugins={[rehypeRaw]}>{data.md}</ReactMarkdown>
                    <div className="flex justify-center mt-2 w-full">
                        <button className="close-btn text-lg" onClick={toggleVisibility}>Collapse</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper function to extract the name from a filename. 
export function extractName(id) {
    const match = id.match(/^(?:!)?\d{1,2}-\d{1,2}-\d{4}-(.+)$/);
    if (!match) {
        console.log("Unexpected filename format (name): ", id);
        return null;
    }
    
    // Replace hyphens with spaces to get the title.
    return match[1].replace(/-/g, ' ');
}

export function convertDateToText(date) {
    const monthMap = {
        "0": "January",
        "1": "February",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "September",
        "9": "October",
        "10": "November",
        "11": "December"
    }
    return `${monthMap[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default ContentFeedEntry;