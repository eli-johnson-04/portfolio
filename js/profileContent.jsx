import React from 'react';

// Contains the structure and content for the Profile sphere!
const ProfileContent = () => {

    return (
        <div className="my-4 mx-2">
            <div className="container grid grid-cols-[auto,1fr] grid-rows-[auto,auto] gap-4 p-4 bg-gray-900 place-items-center text-white rounded-lg shadow-lg">
                {/* Profile Picture (Top Left) */}
                <img 
                    src="/images/Current Headshot (Feb 2025).jpeg"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                    style={{ width: "420 px", height: "420 px", maxWidth: "438px", maxHeight: "438px"}}
                />

                {/* Name & Bio (Top Right) */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-bold">Elijah Johnson</h2>
                    <p className="text-sm text-gray-400">Undergraduate, Third Year, B.S. in Computer Science, University of Florida</p>
                </div>

                {/* Additional Info (Bottom - Spans 2 Columns) */}
                <div className="col-span-2 text-sm text-gray-300">
                    Hello, I'm Eli! I'm actively working to pursue a career in cybersecurity, systems-level engineering, or applications of ML and AI. Beyond the actual coding, 
                    I want to transcend the programming and work in the abstract world of computing through the dynamic and ever-changing cybersecurity landscape, the importance and 
                    conscientiousness of managing memory and high-performance systems engineering, and the constantly broadening horizon of AI applications. 

                    Outside of work, I love cats, a vast array of music, journaling, and Wikipedia. I love learning, with particular interests in astrophysics, virtual reality, 
                    interior design, and psychology.
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;