import React from 'react';
import Modal from 'react-modal';
import '../css/output.css';

// Set the modal's app element
Modal.setAppElement('#root');

const SphereModal = ({ isOpen, onRequestClose, label }) => {
    const customStyling = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for visibility
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
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyling}
        >
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded border-2 border-blue-700 shadow-lg text-2xl" onClick={onRequestClose}>CLOSE BUTTON YAY</button>
        </Modal>
    );
};

export default SphereModal;