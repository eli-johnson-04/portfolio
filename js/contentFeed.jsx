import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownToHTMLComponentStyles from "./reactMarkdownComponents";

// Creates a feed out of markdown entries. 
const ContentFeed = ({ data }) => {
    // Return a set of HTML generated from markdown using ReactMarkdown. 
    return (
        <div className="my-4 mx-2 max-h-[60vh] overflow-y-auto overscroll-auto scrollbar-thin scrollbar-webkit">
            {data.map((entry) => (
                <div key={entry.id} className="m-4 pb-4 rounded-xl border-2 border-gray-600 px-2 pt-2">
                    <h1 className="text-sm font-semibold text-gray-800">{extractDate(entry.id)}</h1>
                    <ReactMarkdown components={MarkdownToHTMLComponentStyles}>{entry.md}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

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