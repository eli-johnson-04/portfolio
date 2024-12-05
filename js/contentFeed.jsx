import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Creates a feed out of markdown entries. 
const ContentFeed = ({ data }) => {
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
        h3: ({ node, ...props }) => (
            <h3
                className="text-xl font-semibold text-gray-700 mt-3 mb-2"
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
        //TODO: will need to add image styling here for sure. links too most likely. 
    };

    // Return a set of HTML generated from markdown using ReactMarkdown. 
    return (
        <div className="my-4 mx-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-webkit">
            <div className="max-h-full">
                {data.map((entry) => (
                    <div key={entry.id} className="m-4 pb-4 rounded-xl border-2 border-gray-600 px-2 pt-2">
                        <ReactMarkdown components={customComponents}>{entry.md}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentFeed;