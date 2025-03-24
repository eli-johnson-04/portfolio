import React from 'react';
import ContentFeed from './contentFeed.jsx';

export default class markdownLoader {
    constructor() { this.allContent = null; }

    getContent() { return this.allContent; }

    // Get all markdown content available in website folders. 
    importAllMarkdown() {
        this.allContent = import.meta.glob('/*/*.md', { query: '?raw', import: 'default' });
        console.log("Finished importing markdown files.");
        //console.log(this.allContent);
    }

    // Helper function that gets a specific set of markdown content. 
    async makeFeed(folder) {
        // Filter out the specified content. 
        const entries = Object.entries(this.allContent)
            .filter(([path]) => path.includes(`/${folder}/`))
            .map(([path, entry]) => {
                const id = path.split(`/${folder}/`)[1].replace('.md', '');
                return { path, id }; 
            });

        // Resolve the content of all markdown files. 
        const contentPromises = entries.map(async (entry) => {
            const md = await this.allContent[entry.path](); // Resolves the markdown content
            return { ...entry, md }; // Merge the content with the other data
        });
        
        // Wait for all the content to be loaded and sort it in reverse chronological order.
        const resolvedContent = (await Promise.all(contentPromises));
        resolvedContent.sort((a, b) => b.id.localeCompare(a.id));
        return <ContentFeed data={resolvedContent}/>;
    }
}