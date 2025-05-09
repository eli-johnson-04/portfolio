import React from 'react';
import ContentFeed from './contentFeed.jsx';
import ContentFeedEntry from'./contentFeedEntry.jsx';
import CollapsibleFolderFeed from './collapsibleFolderFeed.jsx';

export default class markdownLoader {
    constructor() { this.allContent = null; }

    getContent() { return this.allContent; }

    // Extract a date string and turn it into Date object.
    extractDate(filename) {
        const match = filename.match(/^(?:!)?(?<month>\d{1,2})-(?<day>\d{1,2})-(?<year>\d{4})/);
        if (!match) {
            console.log("Unexpected filename format (date): ", filename);
            return null;
        }
        const date = new Date(Number(match.groups.year), Number(match.groups.month)-1, Number(match.groups.day))
        return date;
    }

    // Get all markdown content available in website folders. 
    importAllMarkdown() {
        const rawContent = import.meta.glob('/**/*.md', { query: '?raw', import: 'default' });
        this.allContent = Object.entries(rawContent).map(([path, loader]) => ({
            path,
            loader,
        }));
        console.log("Finished importing markdown.");
    }

    // Helper function that gets a specific set of markdown content. 
    async getContentFromFolder(folder) {
        // Filter out the specified content by the folder it is located in. 
        const entries = this.allContent
            .filter(({ path }) => path.includes(`/${folder}/`))
            .map(({ path, loader }) => {
                const splitted = path.split("/");
                const id = splitted.at(splitted.length - 1).replace('.md', '');
                const date = this.extractDate(id);

                return { entryType: folder, path, id, loader, date: date }; 
            });

        // Resolve the content of all markdown files. 
        const contentPromises = entries.map(async (entry) => {
            const md = await entry.loader(); // Resolves markdown content

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
        
        // Wait for all the content to be loaded and sort it by date with priority on "!" files.
        const resolvedContent = (await Promise.all(contentPromises));
        resolvedContent.sort((a, b) => {
            // Check if either filename starts with "!".
            const aPriority = a.id.startsWith("!");
            const bPriority = b.id.startsWith("!");
            
            // If priorities differ, prioritize the one with "!".
            if (aPriority !== bPriority) {
                return aPriority ? -1 : 1;
            }
            
            // Otherwise, sort by date in reverse chronological order.
            return b.id.localeCompare(a.id);
        });

        // Return the final list of imported and sorted markdown content.
        return resolvedContent;
    }

    // Make a ContentFeed out of a selection of processed and sorted markdown entries.
    makeMarkdownContentFeed(mds) {
        return <ContentFeed
            content={
                mds.map((entry) => 
                    <ContentFeedEntry key={entry.id} data={entry}/>
                )
            }
        />
    }

    // Parse and generate the proper content structure based on subfolders. 
    // For example, subfolders of activity should be in their own CollapsibleFolderFeed that holds a content feed.
    async getFolderHTML(mds) {
        // Iterate over each file once, storing them in an array according to their immediate parent.
        let subfolders = new Map();
        let rootdirEntries = [];
        mds.forEach((md) => {
            let match = md.path.match(/([^\/]+)\/([!|\d].*\.md)/);
            // If it matches and is in a subfolder, add it to the hierarchy.
            if (match && match[1] != md.entryType) {
                // Check if this folder already exists. If so, append this entry to the end of its owned files. 
                if (subfolders.has(match[1])) {
                    let arr = subfolders.get(match[1]);
                    arr.push(md);
                    subfolders.set(match[1], arr);
                }
                // Otherwise, create a new subfolder. 
                else subfolders.set(match[1], [md]);
            }
            // Otherwise if this entry does not belong in a subfolder, create its entry.
            else if (match && match[1] == md.entryType)
                rootdirEntries.push(md);
            else console.log("Regex failed for file: " + md.path);
        });

        // Now we have a map of immediate parents. We need to set up the relationships between these parents up to the top. 
        // Assume this is just one sublevel below "activity" or "portfolio", since I don't think I will need more than that 
        // when writing entries. 
        let feeds = [];
        function isPriority(entry) { return entry.id.at(0) === '!'; }
        for (const [subfolder, entries] of subfolders) {
            const latestPriority = entries.at(0);
            const latestNonPriority = entries.find((entry) => !isPriority(entry));
            const latestEntry = latestPriority.date > latestNonPriority.date
                    ? latestPriority
                    : latestNonPriority;
            feeds.push(<CollapsibleFolderFeed 
                    key={subfolder}
                    title={subfolder} 
                    contentFeed={this.makeMarkdownContentFeed(entries)} 
                    lastUpdate={latestEntry}
                />
            );
        }

        const isRootdirEmpty = rootdirEntries.length === 0;
        const rootdirPriority = rootdirEntries.filter((entry) => isPriority(entry))
                                    .map((entry) => <ContentFeedEntry key={entry.id} data={entry}/>);
        const rootdirNonPriority = rootdirEntries.filter((entry) => !isPriority (entry))
                                    .map((entry) => <ContentFeedEntry key={entry.id} data={entry}/>);

        const orderedContent = [isRootdirEmpty ? null : rootdirPriority, feeds, isRootdirEmpty ? null : rootdirNonPriority];
        return <ContentFeed content={orderedContent}/>;
    }

}