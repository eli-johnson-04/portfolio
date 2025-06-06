// Custom formatting options for Markdown converted to HTML. 
const SkillsReactMarkdownComponents = {
    h1: ({ node, ...props }) => (
        <h1
            className="text-xl underline font-semibold text-gray-800 mt-5 mb-3 break-words"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    h2: ({ node, ...props }) => (
        <h2
            className="text-lg italic text-gray-800 mt-3 mb-2 break-words"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    h3: ({ node, ...props }) => (
        <h3
            className="text-lg italic font-medium text-gray-800 break-words"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    ul: ({ node, ...props }) => (
        <ul
            className="text-base list-disc list-inside pl-5 mb-4 space-y-1 text-gray-800"
            style={{ fontFamily: 'Gentilis' }}
            {...props}
        />
    ),
    ol: ({ node, ...props }) => (
        <ol
            className="text-base list-decimal list-inside pl-5 mb-4 space-y-1 text-gray-800"
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
};

export default SkillsReactMarkdownComponents;