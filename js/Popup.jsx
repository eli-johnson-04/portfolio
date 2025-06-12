import { useState } from 'react';
import '../css/output.css';

// Welcome popup providing basic information about how to interact with the site. 
const Popup = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div
            className={`fixed bottom-5 left-5 transition-all duration-700 ease-in-out ${
                isMinimized ? 'w-auto h-auto flex items-center justify-center rounded-full shadow-lg' : 'max-w-[30vw] p-5 bg-white text-black rounded-lg'
            }`}
        >
            {isMinimized ? (
                <button
                    className="close-btn help-icon text-xl w-auto h-auto bg-white text-black flex items-center justify-center rounded-full cursor-pointer font-semibold"
                    onClick={() => setIsMinimized(false)}
                >
                    ?
                </button>
            ) : (
                <div className="w-full">
                    <h1 className="text-xl font-semibold mb-3 select-none">Welcome!</h1>
                    <p className="mb-4 select-none break-words">Press and drag to look around. Try clicking a planet!</p>
                    <button
                        className="close-btn text-xl"
                        onClick={() => setIsMinimized(true)}
                    >
                        Great!
                    </button>
                </div>
            )}
        </div>
    );
};

export default Popup;
