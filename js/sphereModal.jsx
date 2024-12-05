import React from 'react';
import Modal from 'react-modal';
import '../css/output.css';

// Set the modal's app element
Modal.setAppElement('#root');

const SphereModal = ({ isOpen, onRequestClose, label, content }) => {

    // Custom styling for the modal. 
    const customStyling = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker overlay for visibility
        },
        
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '60%',
            height: '75%',
            backgroundColor: 'rgba(224, 224, 224, 0.95)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyling}
        >
            <div className="sticky top-0 z-10 flex items-center w-full pb-4">
                <span className="absolute left-1/2 transform -translate-x-1/2 font-gentilis font-medium text-3xl text-neutral-900 text-center pt-2 pb-2">
                    {label}
                </span>
                <button 
                    className="ml-auto font-gentilis font-medium text-neutral-900 text-2xl px-4 py-2 rounded-md shadow-xl bg-[#c5c5c5]
                            hover:bg-neutral-500 hover:text-neutral-800 hover:shadow-md hover:scale-[1.05] transition-all duration-100 ease-in-out
                            active:bg-neutral-600 active:shadow-inner active:scale-95"
                    onClick={onRequestClose}
                >
                    Close
                </button>
            </div>
            <div className="overflow-y-auto p-0 flex-grow">{content}</div>
        </Modal>
    );
};

export default SphereModal;