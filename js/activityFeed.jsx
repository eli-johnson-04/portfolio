import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Uses vite to import and parse activity markdown files. 
const useActivityFeed = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Load all activity markdown files. 
        const loadActivities = async () => {
            // Get all markdown files from the activity folder. 
            const activityContent = import.meta.glob('/activity/*.md', { query: '?raw', import: 'default' });
    
            const loadedActivities = await Promise.all(
                Object.entries(activityContent).map(async ([path, loader]) => {
                    const entry = await loader();
                    return {
                        id: path.replace('/activity', '').replace('.md', ''),
                        content: entry
                    };
                })
            );
    
            // TODO: Sort the activities by date.
            const sortedActivities = loadedActivities.sort((a, b) =>
                a.id.localeCompare(b.id)
            );

            setActivities(sortedActivities);
        };

        loadActivities();
    }, []);

    return activities;
};

const ActivityFeed = () => {
    // Generate the entries. 
    const activities = useActivityFeed();

    // Custom formatting options for generated HTML.
    const customComponents = {
        h1: ({ node, ...props }) => (
            <h1
                className="text-3xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-300"
                style={{ fontFamily: 'Gentilis' }}
                {...props}
            />
        ),
        h2: ({ node, ...props }) => (
            <h2
                className="text-2xl font-semibold text-gray-700 mt-5 mb-3"
                style={{ fontFamily: 'Gentilis' }}
                {...props}
            />
        ),
        ul: ({ node, ...props }) => (
            <ul
                className="list-disc list-inside pl-5 mb-4 space-y-2 text-gray-800"
                style={{ fontFamily: 'Gentilis' }}
                {...props}
            />
        ),
        ol: ({ node, ...props }) => (
            <ol
                className="list-decimal list-inside pl-5 mb-4 space-y-2 text-gray-800"
                style={{ fontFamily: 'Gentilis' }}
                {...props}
            />
        ),
        p: ({ node, ...props }) => (
            <p
                className="text-base leading-7 text-gray-800 mb-4"
                style={{ fontFamily: 'Gentilis' }}
                {...props}
            />
        ),
        a: ({ node, ...props }) => (
            <a
                className="text-blue-600 hover:text-blue-800 underline"
                style={{ fontFamily: 'Gentilis' }}
                {...props}
            />
        ),
        blockquote: ({ node, ...props }) => (
            <blockquote
                className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4"
                style={{
                    fontFamily: 'Gentilis',
                    backgroundColor: '#f9f9f9',
                    padding: '1em',
                    borderRadius: '0.5em',
                }}
                {...props}
            />
        ),
        code: ({ node, ...props }) => (
            <code
                className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-red-600"
                style={{
                    fontFamily: 'Gentilis',
                    backgroundColor: '#f5f5f5',
                    color: '#d63384',
                }}
                {...props}
            />
        ),
        pre: ({ node, ...props }) => (
            <pre
                className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                style={{
                    fontFamily: 'Gentilis',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                {...props}
            />
        ),
    };

    return (
        <div>
            {activities.map((activity) => (
                <div key={activity.id} className="mb-4 pb-4 border-b">
                    <ReactMarkdown components={customComponents}>{activity.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

export default ActivityFeed;