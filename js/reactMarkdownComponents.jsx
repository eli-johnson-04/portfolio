import React from "react";

// Custom formatting options for Markdown converted to HTML. 
const MarkdownToHTMLComponentStyles = {
    h1: ({ node, ...props }) => (
        <h1
            className="text-2xl font-semibold text-gray-800 mt-5 mb-3"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    h2: ({ node, ...props }) => (
        <h2
            className="text-xl font-semibold text-gray-800 mt-3 mb-2"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    h3: ({ node, ...props }) => (
        <h3
            className="text-lg font-medium text-gray-800"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    h6: ({ node, ...props }) => (
        <h6
            className="italic text-center text-gray-800 my-2"
            style={{ fontFamily: 'Gentilis', fontStyle: 'italic', fontWeight: 'normal' }}
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
    img: ({ node, ...props }) => (
        <span className="flex justify-center my-4">
            <img
                className="w-auto h-auto object-cover rounded-lg shadow-md max-w-full border-gray-300"
                style={{
                    fontFamily: 'Gentilis',
                    border: '1px solid #d1d5db',
                    padding: '4px',
                    //backgroundColor: '#fff',
                }}
                {...props}
            />
        </span>
    ),
    a: ({ node, ...props }) => (
        <a
            className="text-blue-600 hover:text-blue-800 underline font-semibold"
            style={{
                fontFamily: 'Gentilis',
                transition: 'color 0.2s ease-in-out',
                textDecorationThickness: '2px',
            }}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),
    iframe: ({ node, ...props }) => (
        <div className="flex justify-center my-4">
            <iframe
                className="w-full max-w-4xl h-[500px] border-0 rounded-lg shadow-md"
                style={{
                    fontFamily: 'Gentilis',
                }}
                {...props}
                width="100%"  // Override width
                height="500px"  // Override height
            ></iframe>
        </div>
    ),
};

export default MarkdownToHTMLComponentStyles;