import React from 'react';

// Contains the structure and content for the Profile sphere!
const ProfileContent = () => {
    return (
        <div className="my-4 mx-2 max-h-[60vh] scrollbar-thin scrollbar-webkit overflow-y-auto">
            <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto,auto] gap-4 p-4 bg-gray-900 place-items-center text-white rounded-lg shadow-lg">
                {/* Profile Picture (Top Left) */}
                <div className="h-full flex flex-col items-center justify-center">
                    <img 
                        src="images/headshot.webp"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>

                {/* Name & Bio (Top Right) */}
                <div className="flex flex-col justify-center h-full">
                    <h2 className="text-5xl font-bold">Elijah Johnson</h2>
                    <div className="text-xl text-white">
                        <h3>
                            Undergraduate, Third Year | University of Florida
                        </h3>
                        <h3>
                            B.S. in Computer Science, Astronomy Minor
                        </h3>
                        <hr/>
                        <div className="w-full">
                            <div>
                                <h3 className="text-gray-400">Contact:</h3>
                                <h4 className="text-lg text-gray-500">
                                    <a href="mailto:elijahdanjohnson@gmail.com">elijahdanjohnson@gmail.com</a>
                                </h4>
                                <br/>
                                <h3 className="text-gray-400">GitHub:</h3>
                                <h4 className="text-lg text-gray-500">
                                    <a href="https://www.github.com/eli-johnson-04">eli-johnson-04</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Additional Info (Bottom - Spans 2 Columns) */}
                <div className="col-span-2 text-gray-300 break-words whitespace-normal">
                    <p>
                        Hello, I'm Eli! I'm actively working in pursuit of working in a variety of fields: virtual reality, cybersecurity, systems-level engineering, or applications of ML and AI. While I thoroughly enjoy developing, I have loftier goals; I want to tell a story of superior security, of efficient systems, of immersive experiences, and of the future of technology. I want to be a part of the next generation of engineers and developers who are not only capable of creating, but of realizing the future.
                    </p>
                    <br/>
                    <p>
                        Outside of work, I love cats, heavy and inaccessible music, journaling, and Wikipedia. I could never learn enough about astrophysics, virtual reality experiences and development, interior design, and psychology, just to name a few. Thanks for stopping by! Feel free to reach out to me via email or GitHub if you have any questions, comments, or just want to chat! I love meeting people and hearing new ideas. 
                    </p>
                    {/* <blockquote className="flex font-gentilis justify-center pl-4 italic text-gray-500 my-4">
                        "Alas, the future will find you. You must find yourself first; life is not hide and seek."
                    </blockquote> */}
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;