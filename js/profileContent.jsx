import React from 'react';

// Contains the structure and content for the Profile sphere!
const ProfileContent = () => {
    return (
        <div className="my-4 mx-2 max-h-[60vh] scrollbar-thin scrollbar-webkit overflow-y-auto">
            <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto,auto] gap-4 p-4 bg-gray-900 place-items-center text-white rounded-lg shadow-lg">
                {/* Profile Picture (Top Left) */}
                <img 
                    src="images/headshot.webp"
                    alt="Profile"
                    className="place-self-start rounded-full object-cover"
                    
                />

                {/* Name & Bio (Top Right) */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-5xl font-bold">Elijah Johnson</h2>
                    <div className="text-xl text-gray-400">
                        <h3>
                            Undergraduate, Third Year | University of Florida
                        </h3>
                        <h3>
                            B.S. in Computer Science, Astronomy Minor
                        </h3>
                        <hr/>
                        <div className="w-full">
                            <div>
                                <h3 className="text-gray-500">Contact:</h3>
                                <h4 className="text-lg text-gray-600">
                                    <a href="mailto:elijahdanjohnson@gmail.com">elijahdanjohnson@gmail.com</a>
                                </h4>
                                <br/>
                                <h3 className="text-gray-500">GitHub:</h3>
                                <h4 className="text-lg text-gray-600">
                                    <a href="https://www.github.com/eli-johnson-04">eli-johnson-04</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Additional Info (Bottom - Spans 2 Columns) */}
                <div className="col-span-2 text-gray-300 break-words whitespace-normal">
                    <p>
                        Hello, I'm Eli! I'm actively working to pursue a career in a variety of fields of interest: virtual reality, cybersecurity, systems-level engineering, or applications of ML and AI. Beyond the actual coding, I want to transcend the programming and work in the abstract world of computing through the dynamic and ever-changing cybersecurity landscape, the importance and conscientiousness of managing memory and high-performance systems engineering, and the constantly broadening horizon of AI applications. 
                    </p>
                    <br/>
                    <p>
                        Outside of work, I love cats, a vast array of music, journaling, and Wikipedia. I could never learn enough, with particular interests in astrophysics, virtual reality 
                        experiences and development, interior design, and psychology. 
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;