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
            onClick={toggleVisibility}
            className={`m-4 pb-4 rounded-xl px-2 pt-2 transition-transform duration-100 ease-in-out ${
                isCollapsed ? 'hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02]' : 'border-2 border-gray-600'
            }`}
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
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{extractName(data.id)}</h1>
                    <h1 className="text-sm font-semibold text-gray-800">{extractDate(data.id)}</h1>
                </div>
            </Tooltip>
            {!isCollapsed && (
                <div>
                    <div className="pb-2 border-b border-gray-300"/>
                    <ReactMarkdown components={MarkdownToHTMLComponentStyles} rehypePlugins={[rehypeRaw]}>{data.md}</ReactMarkdown>
                </div>
            )}
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
    // Allow for improper day formatting to use just the month and year in the date.
    let day = match.groups.day;
    if (parseInt(day) > 31) { day = " "; }
    else { day = " " + day + ", ";}

    // Return the formatted date. 
    return `${month}${day}${match.groups.year}`;
}

export default ContentFeedEntry;