import React, { useState } from 'react';
import '../css/output.css';

const Popup = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div
            className={`fixed bottom-5 left-5 transition-all duration-700 ease-in-out ${
                isMinimized ? 'w-20 h-20 flex items-center justify-center bg-blue-500 border-4 border-white rounded-full shadow-lg' : 'p-5 bg-white text-black rounded-lg'
            }`}
        >
            {isMinimized ? (
                <button
                    className="close-btn help-icon text-xl w-full h-full bg-white text-blue-500 flex items-center justify-center rounded-full cursor-pointer font-semibold"
                    onClick={() => setIsMinimized(false)}
                >
                    ?
                </button>
            ) : (
                <div className="w-full">
                    <h1 className="text-xl font-semibold mb-3 select-none">Welcome! (DEVELOPMENT BUILD)</h1>
                    <p className="mb-4 select-none">Press and drag to pan around.</p>
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
