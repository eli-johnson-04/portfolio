import React from 'react';
import Modal from 'react-modal';
import '../css/output.css';

// Set the modal's app element
Modal.setAppElement('#root');

const SphereModal = ({ isOpen, onRequestClose, label, content }) => {
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
            backgroundColor: 'rgba(224, 224, 224, 0.85)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyling}
        >
            <h1 className="sticky top-0 z-10 font-gentilis">{label}</h1>
            <div>{content}</div>
            <button 
                className="font-gentilis font-medium mt-4 bg-[#c5c5c5] text-neutral-900 px-4 py-2 rounded-md shadow-lg text-2xl 
                        hover:bg-neutral-500 hover:text-neutral-800 hover:shadow-md transition-all duration-100 ease-in-out
                        active:bg-neutral-600 active:shadow-inner active:scale-95"
                onClick={onRequestClose}
            >
                Close
            </button>
        </Modal>
    );
};

export default SphereModal;