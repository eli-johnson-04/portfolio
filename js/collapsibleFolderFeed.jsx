import React, { useState } from "react";
import { convertDateToText, extractName } from './contentFeedEntry.jsx';
import "rc-tooltip/assets/bootstrap.css";

// Stores a folder's markdown files inside a ContentFeed, displayed as a collapsible folder. By itself, strongly resembles a contentFeedEntry.
const CollapsibleFolderFeed = ({ title, contentFeed, lastUpdate }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleVisibility = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div 
            className={`m-4 rounded-xl pt-2 pb-4 px-2 transition-transform duration-100 ease-in-out ${
                isCollapsed ? 'hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02]' : 'border-l-2 border-t-2 border-gray-600 bg-gray-500 bg-opacity-5'
            }`}
        >
            <div 
                onClick={toggleVisibility}
                className={`rounded-xl flex items-center transition-transform duration-100 ease-in-out
                    ${isCollapsed ? '' : 'hover:scale-[1.01]'
                    }`}
            >
                <span>
                    <h1 className={`text-3xl font-bold text-gray-800 ${isCollapsed ? "" : "underline"}`}>
                        <span className="italic">Topic: </span>
                        {title}
                    </h1>
                    {/*<h1 className="text-sm font-semibold italic text-gray-800">{isCollapsed ? `Latest: ${convertDateToText(lastUpdate.date)} - ${extractName(lastUpdate.id)}` : ""}</h1>*/}
                    <h1 className="text-sm font-semibold italic text-gray-800">{`Latest: ${convertDateToText(lastUpdate.date)} - ${extractName(lastUpdate.id)}`}</h1>
                </span>
            </div>
            {!isCollapsed && (
                <div>
                    <div className="pb-2 border-b border-gray-300"/>
                    {contentFeed}
                    <div className="flex justify-left mt-2 w-full">
                        <button className="close-btn text-lg" onClick={toggleVisibility}>Close Topic</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollapsibleFolderFeed;