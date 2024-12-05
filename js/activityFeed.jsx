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

    return (
        <div>
            {activities.map((activity) => (
                <div key={activity.id} className="mb-4 pb-4 border-b">
                    <ReactMarkdown>{activity.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

export default ActivityFeed;