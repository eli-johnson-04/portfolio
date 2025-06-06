import React, { useState, useEffect } from "react";
import BlackHoleIconCW from "../public/images/black-hole-icon-cw.svg?react";
import BlackHoleIconCCW from "../public/images/black-hole-icon-ccw.svg?react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'; // Handles raw HTML rendering
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import SkillsReactMarkdownComponents from "./SkillsReactMarkdownComponents.jsx";

// Contains the structure and content for the Profile sphere!
const ProfileContent = ({ markdown }) => {
    // State to manage the text in the button
    const [buttonText, setButtonText] = useState("Skills");

    return (
        <div className="my-4 mx-2 h-full overflow-y-none scrollbar-thin scrollbar-webkit">
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
                <div className="flex flex-col justify-center h-full w-4/5">
                    <h2 className="text-5xl font-bold">Elijah Johnson</h2>
                    <div className="text-xl text-white">
                        <h3>
                            Undergraduate, Fourth Year | University of Florida
                        </h3>
                        <h3>
                            B.S. in Computer Science, Astronomy Minor
                        </h3>
                        <hr/>
                        <div className="w-full">
                            <div>
                                <h3 className="text-gray-400">Contact:</h3>
                                <h4 className="text-lg text-gray-500 break-all">
                                    <a href="mailto:elijahdanjohnson@gmail.com">elijahdanjohnson@gmail.com</a>
                                </h4>
                                <br/>
                                <h3 className="text-gray-400">GitHub:</h3>
                                <h4 className="text-lg text-gray-500 break-all">
                                    <a href="https://www.github.com/eli-johnson-04">eli-johnson-04</a>
                                </h4>
                                <br />

                                <Tooltip
                                    placement="bottom"
                                    motion={{ motionName: 'rc-tooltip-zoom' }}
                                    trigger={['click']}
                                    styles={{
                                        root: {
                                            opacity: 1,
                                            transition: 'opacity 0.1s ease-in-out',
                                        },
                                        body: {
                                            backgroundColor: 'transparent',
                                            color: "#d9d9da",
                                            padding: 0,
                                            border: 'none',
                                            opacity: 1,
                                        },
                                    }}
                                    overlay={
                                        <div className="min-w-[15vw] w-auto max-w-[60vw] min-h-[10vh] h-auto max-h-[50vh]
                                        bg-[#d9d9da] p-3 justify-center rounded-lg shadow-md text-white font-medium overflow-hidden flex flex-col"
                                        >
                                            <div className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-webkit">
                                                <ReactMarkdown className="text-white" components={SkillsReactMarkdownComponents} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
                                            </div>
                                        </div>
                                    }
                                    className="flex justify-center"
                                    onVisibleChange={(visible) => {setButtonText(visible ? "Close Skills" : "Skills")}}
                                >
                                    <span className="max-w-1/2 flex p-3 justify-end">
                                        <button 
                                            className="flex font-gentilis font-medium text-gray-400 text-xl px-4 pt-2 pb-1 rounded-lg shadow-xl bg-[#282f3c]
                                                    hover:bg-[#404652] hover:text-neutral-50 hover:shadow-md hover:scale-105 transition-all duration-100 ease-in-out
                                                    active:bg-[#404652] active:shadow-inner active:scale-95"
                                            onClick={() => setButtonText(buttonText === "Skills" ? "Close Skills" : "Skills")}
                                        >
                                            <span className="flex items-center justify-center">
                                                <BlackHoleIconCW className="w-5 h-5 stroke-current animate-spin-cw"/>
                                                <h1 className="mx-2">{buttonText}</h1>
                                                <BlackHoleIconCCW className="w-5 h-5 stroke-current animate-spin-ccw"/>
                                            </span>
                                        </button>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Additional Info (Bottom - Spans 2 Columns) */}
                <div className="col-span-2 text-gray-300 break-words whitespace-normal">
                    <span className="flex min-w-[20vw] w-auto max-w-[80vw] justify-center">
                        
                        <br/>
                    </span>
                    <p>
                        Hello, I'm Eli! I'm actively pursuing a career in design and development of virtual reality applications and games, a longstanding passion. I can think of no better way to share my vision with the world then to curate every detail of the experiences I dream of. My goal is to be a part of the next generation of engineers and developers who are not only capable of creating, but of realizing the future.
                    </p>
                    <br/>
                    <p>
                        In the real world I love cats, serene and extreme music, journaling, and Wikipedia to explore any and everything. I could never learn enough about astrophysics, VR tech advances, interior design, and psychology to name some favorites. Thanks for visiting! Feel free to reach out to me via email or GitHub if you have any questions, comments, or just want to chat! I love meeting people and hearing new ideas. 
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