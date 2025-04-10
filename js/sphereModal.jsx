import React from 'react';
import Modal from 'react-modal';
import { gsap } from 'gsap';
import '../css/output.css';

// Set the modal's app element.
Modal.setAppElement('#root');

const SphereModal = ({ isOpen, onRequestClose, label, content }) => {

    // Custom styling for the modal. 
    const customStyling = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker overlay for visibility
            opacity: 0
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
            maxHeight: '90vh',
            backgroundColor: 'rgba(224, 224, 224, 0.95)',
            opacity: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                // Fade-out animations.
                gsap.to('.ReactModal__Content', {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'easeOut'
                });
                gsap.to('.ReactModal__Overlay', {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'easeIn'
                });

                // Only close the modal when the animation completes.
                setTimeout(() => {onRequestClose(); }, 200);
            }}
            onAfterOpen={() => {
                // Fade-in animations.
                gsap.to('.ReactModal__Content', {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'easeOut'
                });
                gsap.to('.ReactModal__Overlay', {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'easeIn'
                });
            }}
            onBeforeClose={() => {
                
            }}
            style={customStyling}
        >
            <div className="flex items-center w-full pb-2">
                <span className="ml-4 mt-2 flex-grow font-gentilis font-medium text-5xl text-neutral-900 pb-1 truncate select-none">
                    {label}
                </span>
                <button 
                    className="ml-4 close-btn"
                    onClick={() => {
                        // Start the fade-out before closing the modal.
                        gsap.to('.ReactModal__Content', {
                            opacity: 0,
                            duration: 0.2,
                            ease: 'easeOut'
                        });
                        gsap.to('.ReactModal__Overlay', {
                            opacity: 0,
                            duration: 0.2,
                            ease: 'easeIn'
                        });
                        
                        // Delay the closing until the animations complete.
                        setTimeout(() => onRequestClose(), 200);
                    }}
                >
                    Close
                </button>
            </div>
            <div className="rounded-lg p-0 flex-grow overflow-none">{content}</div>
        </Modal>
    );
};

export default SphereModal;