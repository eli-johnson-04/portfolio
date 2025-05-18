import ContentFeed from './contentFeed.jsx';
import ContentFeedEntry from'./contentFeedEntry.jsx';
import CollapsibleFolderFeed from './collapsibleFolderFeed.jsx';

class subFolder {
    name = null;
    entries = [];
    latest = null;
    feed = null;

    constructor(name, entries) {
        this.name = name;
        if (entries.length > 0) this.entries = entries;
    }

    addEntry(entry) { this.entries.push(entry); }

    getEntries() { return this.entries; }
    getFeed() { return this.feed; }

    initialize() {
        this.setLatestEntry();
        this.setContentFeed();
        this.setEntryNumbers();
    }

    setLatestEntry() {
        // Determine the first priority and non-priority entries in the folder.
        const latestPriority = this.entries.find(entry => entry.isPriority);
        const latestNonPriority = this.entries.find(entry => !entry.isPriority);

        // If both entries are found, compare their dates and keep the latest one.
        if (!latestPriority && !latestNonPriority) this.latest = null; // Skip if no entries found.
        else if (!latestNonPriority) this.latest = latestPriority;
        else if (!latestPriority) this.latest = latestNonPriority;
        else {
            this.latest = latestPriority.date > latestNonPriority.date
                    ? latestPriority
                    : latestNonPriority;
        }
    }

    // Give each entry an individual number for its subfolder, if it is not a priority entry.
    setEntryNumbers() {
        const nonPriorityEntries = this.entries.filter(entry => !entry.isPriority).length;
        this.entries.filter(entry => !entry.isPriority)
            .forEach((entry, index) => {
                entry.subfolderIndex = nonPriorityEntries - index;
            });
    }

    // Create the content feed for this subfolder.
    setContentFeed() {
        this.feed = <ContentFeed
            content={
                this.entries.map((entry) => 
                    <ContentFeedEntry key={entry.id} data={entry}/>
                )
            }
        />;
    }
}

export default class markdownLoader {
    constructor() { this.allContent = null; }

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

    // Count the number of markdown files in a given directory.
    countFilesInFolder(folder) {
        return this.allContent.filter(({ path }) => path.includes(`/${folder}/`)).length;
    }

    // Helper function that gets a specified set of markdown content for a sphere.
    async getSphereMarkdown(folder) {
        // Filter out the specified content by the folder it is located in. 
        const entries = this.allContent
            .filter(({ path }) => path.includes(`/${folder}/`))
            .map(({ path, loader }) => {
                const splitted = path.split("/");
                const id = splitted.at(splitted.length - 1).replace('.md', '');
                const date = this.extractDate(id);

                return { entryType: folder, path, id, loader, date: date, isPriority: id.at(0) === '!', subfolderIndex: -1}; 
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
            return b.date - a.date;
        });

        // Return the final list of imported and sorted markdown content.
        return await this.getFolderHTML(resolvedContent, folder);
    }

    // Iterate over each markdown file and add it to a Map containing the immediate parent folder as the key, and return the base-level entries in their own array.
    parseDirectory(mds) {
        const [subfolders, rootdirEntries] = this.getOrganizedEntries(mds);
        // Sort the subfolders by their latest entry date.
        const sortedSubfolders = [...subfolders.entries()].sort((a, b) => {
            const aDate = a[1].latest ? a[1].latest.date : new Date(0);
            const bDate = b[1].latest ? b[1].latest.date : new Date(0);
            return bDate - aDate; // Sort in descending order
        });
        return [sortedSubfolders, rootdirEntries];
    }

    // Organize the subfolders into a map and the root directory entries into an array.
    getOrganizedEntries(mds) {
        let subfolders = new Map();
        let rootdirEntries = [];
        mds.forEach((md) => {
            let match = md.path.match(/([^\/]+)\/([!|\d].*\.md)/);
            // If it matches and is in a subfolder, add it to the hierarchy.
            if (match && match[1] != md.entryType) {
                // Check if this folder already exists. If so, append this entry to the end of its owned files. 
                if (subfolders.has(match[1])) {
                    subfolders.get(match[1]).addEntry(md);
                }
                // Otherwise, create a new subfolder. 
                else subfolders.set(match[1], new subFolder(match[1], [md]));
            }
            // Otherwise if this entry does not belong in a subfolder, create its entry.
            else if (match && match[1] == md.entryType)
                rootdirEntries.push(md);
            else console.log("Regex failed for file: " + md.path);
        });
        subfolders.values().forEach((subfolder) => subfolder.initialize());
        return [subfolders, rootdirEntries];
    }

    // Parse and generate the proper content structure based on subfolders. 
    // For example, subfolders of activity should be in their own CollapsibleFolderFeed that holds a content feed.
    async getFolderHTML(mds) {
        const [subfolders, rootdirEntries] = this.parseDirectory(mds);
        const collapsibleFeeds = subfolders.map(([name, subfolder]) => {
            return <CollapsibleFolderFeed 
                key={name}
                title={name} 
                contentFeed={subfolder.getFeed()} 
                length={subfolder.getEntries().length}
                lastUpdate={subfolder.latest}
            />;
        });
        
        const isRootdirEmpty = rootdirEntries.length === 0;
        const rootdirPriority = rootdirEntries.filter((entry) => entry.isPriority)
                                    .map((entry) => <ContentFeedEntry key={entry.id} data={entry}/>);
        const rootdirNonPriority = rootdirEntries.filter((entry) => !entry.isPriority)
                                    .map((entry) => <ContentFeedEntry key={entry.id} data={entry}/>);

        const orderedContent = [isRootdirEmpty ? null : rootdirPriority, collapsibleFeeds, isRootdirEmpty ? null : rootdirNonPriority];
        return <ContentFeed content={orderedContent}/>;
    }
}