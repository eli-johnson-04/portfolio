import React from "react";

const ContentFeed = ({ content }) => {
    return (
        <div className="my-4 mx-2 max-h-[60vh] overflow-y-auto overscroll-auto scrollbar-thin scrollbar-webkit">
            {content}
        </div>
    );
};

export default ContentFeed;