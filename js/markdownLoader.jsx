import React from 'react';
import ContentFeed from './contentFeed.jsx';

export default class markdownLoader {
    constructor() { this.allContent = null; }

    getContent() { return this.allContent; }

    // Get all markdown content available in website folders. 
    importAllMarkdown() {
        const rawContent = import.meta.glob('/*/*.md', { query: '?raw', import: 'default' });
        this.allContent = Object.entries(rawContent).map(([path, loader]) => ({
            path, // Add the path property
            loader,
        }));
        console.log("Finished importing markdown.");
    }

    // Helper function that gets a specific set of markdown content. 
    async getContentFromFolder(folder) {
        // Filter out the specified content. 
        const entries = this.allContent
            .filter(({ path }) => path.includes(`/${folder}/`))
            .map(({ path, loader }) => {
                const id = path.split(`/${folder}/`)[1].replace('.md', '');
                return { path, id, loader }; 
            });

        // Resolve the content of all markdown files. 
        const contentPromises = entries.map(async (entry) => {
            const md = await entry.loader(); // Resolves the markdown content

            // Attempt to extract TL;DR section (first line starting with "**TL;DR:**").
            let tooltipMatch = md.match(/\*\*TL;DR:.*?\*\*/);
            let tooltipContent;
            if (tooltipMatch)
                tooltipContent = tooltipMatch[0].replace(/\*\*/g, '').replace(/TL;DR: /, '').trim();

            // If no TL;DR section, attempt to match "Keywords:" section (first line starting with "*Keywords:*").
            else {
                tooltipMatch = md.match(/\*Keywords:.*?\*/);
                if (tooltipMatch) 
                    tooltipContent = tooltipMatch[0].replace(/\*/g, '').replace(/Keywords: /, '').trim();
                else
                    tooltipContent = "Click to expand";
            }

            return { ...entry, md, tooltipContent };
        });
        
        // Wait for all the content to be loaded and sort it in reverse chronological order.
        const resolvedContent = (await Promise.all(contentPromises));
        resolvedContent.sort((a, b) => b.id.localeCompare(a.id));

        return resolvedContent;
    }
}